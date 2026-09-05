import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  Keyboard,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type LayoutChangeEvent,
} from 'react-native';

import { getPetCharacter, isPetId, PET_CHARACTERS, type PetCharacter, type PetId } from './petCatalog';
import { lookupPetQuery, sanitizePetInput, type PetDictionaryResult } from './petDictionary';
import { GlassSurfaceLight } from './ui';

const PET_STORAGE_KEY = 'between.pet-widget.v1';
const DEFAULT_PET_ID: PetId = 'babumoby';
const PET_SIZE = 84;
const PET_EDGE_GUTTER = 8;
const PET_TOP_INSET = 54;
const ASK_CARD_WIDTH = 278;
const ASK_CARD_COMPACT_HEIGHT = 130;
const nativeDriver = Platform.OS !== 'web';
const webPetDragStyle = Platform.OS === 'web'
  ? ({ cursor: 'move', touchAction: 'none', userSelect: 'none' } as any)
  : undefined;

type Point = { x: number; y: number };
type LayoutSize = { width: number; height: number };
type StoredPetState = {
  version?: number;
  selectedId?: unknown;
  xRatio?: unknown;
  yRatio?: unknown;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function clampPetPosition(point: Point, layout: LayoutSize, avoidBottom: number): Point {
  const maxX = Math.max(PET_EDGE_GUTTER, layout.width - PET_SIZE - PET_EDGE_GUTTER);
  const maxY = Math.max(PET_TOP_INSET, layout.height - avoidBottom - PET_SIZE);
  return {
    x: clamp(point.x, PET_EDGE_GUTTER, maxX),
    y: clamp(point.y, PET_TOP_INSET, maxY),
  };
}

function getPointerPoint(event: any): Point | null {
  const nativeEvent = event?.nativeEvent ?? event;
  const touch = nativeEvent?.touches?.[0] ?? nativeEvent?.changedTouches?.[0];
  const pointEvent = touch ?? nativeEvent;
  const x = typeof pointEvent?.clientX === 'number' ? pointEvent.clientX : pointEvent?.pageX;
  const y = typeof pointEvent?.clientY === 'number' ? pointEvent.clientY : pointEvent?.pageY;
  return typeof x === 'number' && typeof y === 'number' ? { x, y } : null;
}

function getPointerId(event: any): number | null {
  const pointerId = event?.nativeEvent?.pointerId ?? event?.pointerId;
  return typeof pointerId === 'number' ? pointerId : null;
}

function petReply(pet: PetCharacter, lookup: PetDictionaryResult) {
  const template = pet.meaningTemplates[lookup.word.length % pet.meaningTemplates.length];
  if (!lookup.meaning) {
    return lookup.source === 'unavailable'
      ? 'いま辞書に接続できないみたい。もう一度ためしてね。'
      : 'まだ辞書にない表現だばぶ。';
  }
  return template.replace('{meaning}', lookup.meaning);
}

function lookupKindLabel(kind: PetDictionaryResult['kind']) {
  if (kind === 'sentence') return '定型表現';
  if (kind === 'phrase') return '熟語・句動詞';
  return '単語';
}

function PetIdleMotion({ children, active }: { children: React.ReactNode; active: boolean }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const breathe = useRef(new Animated.Value(1)).current;
  const bob = useRef(new Animated.Value(0)).current;
  const gesture = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let mounted = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      if (mounted) setReduceMotion(value);
    });
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    breathe.stopAnimation();
    bob.stopAnimation();
    breathe.setValue(1);
    bob.setValue(0);
    if (!active || reduceMotion) return undefined;

    const breatheLoop = Animated.loop(Animated.sequence([
      Animated.timing(breathe, { toValue: 1.018, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: nativeDriver }),
      Animated.timing(breathe, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: nativeDriver }),
    ]));
    const bobLoop = Animated.loop(Animated.sequence([
      Animated.timing(bob, { toValue: 1, duration: 1150, easing: Easing.inOut(Easing.sin), useNativeDriver: nativeDriver }),
      Animated.timing(bob, { toValue: 0, duration: 1150, easing: Easing.inOut(Easing.sin), useNativeDriver: nativeDriver }),
    ]));
    breatheLoop.start();
    bobLoop.start();
    return () => {
      breatheLoop.stop();
      bobLoop.stop();
    };
  }, [active, bob, breathe, reduceMotion]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let animation: Animated.CompositeAnimation | undefined;
    let cancelled = false;

    const schedule = () => {
      timer = setTimeout(() => {
        if (cancelled) return;
        gesture.setValue(0);
        animation = Animated.sequence([
          Animated.timing(gesture, { toValue: 1, duration: 280, easing: Easing.out(Easing.quad), useNativeDriver: nativeDriver }),
          Animated.timing(gesture, { toValue: 0, duration: 420, easing: Easing.inOut(Easing.quad), useNativeDriver: nativeDriver }),
        ]);
        animation.start(({ finished }) => {
          if (finished && !cancelled) schedule();
        });
      }, 6500 + Math.random() * 6500);
    };

    if (active && !reduceMotion) schedule();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      animation?.stop();
      gesture.stopAnimation();
      gesture.setValue(0);
    };
  }, [active, gesture, reduceMotion]);

  const motionStyle = {
    transform: [
      { translateY: bob.interpolate({ inputRange: [0, 1], outputRange: [2, -4] }) },
      { rotate: gesture.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '3deg'] }) },
      { scaleY: breathe },
    ],
  };

  return <Animated.View style={motionStyle}>{children}</Animated.View>;
}

function PetPickerModal({
  visible,
  selectedId,
  onClose,
  onConfirm,
}: {
  visible: boolean;
  selectedId: PetId;
  onClose: () => void;
  onConfirm: (id: PetId) => void;
}) {
  const [draftId, setDraftId] = useState<PetId>(selectedId);

  useEffect(() => {
    if (visible) setDraftId(selectedId);
  }, [selectedId, visible]);

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <Pressable accessibilityLabel="ペット選択を閉じる" accessibilityRole="button" onPress={onClose} style={styles.modalBackdrop} />
        <View accessibilityViewIsModal accessibilityLabel="ペットを選ぶ" style={styles.pickerCard}>
          <GlassSurfaceLight />
          <View style={styles.pickerHeader}>
            <View style={styles.pickerHeaderCopy}>
              <Text style={styles.pickerEyebrow}>mobby collection</Text>
              <Text style={styles.pickerTitle}>ペットを選ぶ</Text>
              <Text style={styles.pickerSubtitle}>mobby-main と同じ9キャラ</Text>
            </View>
            <Pressable accessibilityLabel="ペット選択を閉じる" accessibilityRole="button" onPress={onClose} style={styles.closeButton} hitSlop={8}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>

          <ScrollView
            style={styles.pickerScroll}
            contentContainerStyle={styles.pickerGrid}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {PET_CHARACTERS.map((pet) => {
              const selected = pet.id === draftId;
              return (
                <Pressable
                  key={pet.id}
                  accessibilityRole="radio"
                  accessibilityLabel={`${pet.name}を選ぶ`}
                  accessibilityState={{ selected }}
                  onPress={() => setDraftId(pet.id)}
                  style={({ pressed }) => [styles.pickerOption, pressed && styles.pickerOptionPressed]}
                >
                  <View style={[styles.pickerImageWrap, selected && { borderColor: pet.accent, shadowColor: pet.accent }]}>
                    <Image source={pet.image} resizeMode="contain" style={styles.pickerImage} />
                    {selected ? <View style={[styles.pickerCheck, { backgroundColor: pet.accent }]}><Text style={styles.pickerCheckText}>✓</Text></View> : null}
                  </View>
                  <Text numberOfLines={1} style={[styles.pickerName, selected && styles.pickerNameSelected]}>{pet.name}</Text>
                  <Text numberOfLines={1} style={styles.pickerCatchphrase}>{pet.catchphrase}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.pickerFooter}>
            <Pressable accessibilityRole="button" accessibilityLabel="ペット選択をキャンセル" onPress={onClose} style={({ pressed }) => [styles.pickerCancel, pressed && styles.pressed]}>
              <Text style={styles.pickerCancelText}>キャンセル</Text>
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="選んだペットに決定" onPress={() => onConfirm(draftId)} style={({ pressed }) => [styles.pickerConfirm, pressed && styles.pressed]}>
              <Text style={styles.pickerConfirmText}>決定</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function PetWidget({ avoidBottom = 126 }: { avoidBottom?: number }) {
  const [selectedId, setSelectedId] = useState<PetId>(DEFAULT_PET_ID);
  const [layout, setLayout] = useState<LayoutSize>({ width: 0, height: 0 });
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [hydrated, setHydrated] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [askOpen, setAskOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [word, setWord] = useState('');
  const [lookup, setLookup] = useState<PetDictionaryResult | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [askCardHeight, setAskCardHeight] = useState(ASK_CARD_COMPACT_HEIGHT);
  const savedRatioRef = useRef<{ x: number; y: number } | null>(null);
  const positionInitializedRef = useRef(false);
  const positionRef = useRef<Point>(position);
  const dragStartRef = useRef<Point>({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const webPointerIdRef = useRef<number | null>(null);
  const webPointerStartRef = useRef<Point>({ x: 0, y: 0 });
  const webIgnoreClickUntilRef = useRef(0);
  const inputRef = useRef<TextInput>(null);
  const lookupRequestRef = useRef(0);
  const pet = getPetCharacter(selectedId);
  const effectiveAvoidBottom = Math.max(avoidBottom, keyboardHeight > 0 ? keyboardHeight + 20 : avoidBottom);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    let cancelled = false;
    void AsyncStorage.getItem(PET_STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        try {
          const stored = JSON.parse(raw) as StoredPetState;
          if (isPetId(stored.selectedId)) setSelectedId(stored.selectedId);
          if (typeof stored.xRatio === 'number' && typeof stored.yRatio === 'number') {
            savedRatioRef.current = { x: clamp(stored.xRatio, 0, 1), y: clamp(stored.yRatio, 0, 1) };
          }
        } catch {
          // Ignore stale or malformed local state and use the default pet.
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setHydrated(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillChangeFrame' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const shown = Keyboard.addListener(showEvent, (event) => {
      setKeyboardHeight(event.endCoordinates?.height ?? 0);
    });
    const hidden = Keyboard.addListener(hideEvent, () => setKeyboardHeight(0));
    return () => {
      shown.remove();
      hidden.remove();
    };
  }, []);

  useEffect(() => {
    if (!hydrated || !layout.width || !layout.height || positionInitializedRef.current) return;
    const saved = savedRatioRef.current;
    const fallback = {
      x: layout.width - PET_SIZE - 14,
      y: layout.height - effectiveAvoidBottom - PET_SIZE - 10,
    };
    const next = saved
      ? { x: saved.x * layout.width, y: saved.y * layout.height }
      : fallback;
    setPosition(clampPetPosition(next, layout, effectiveAvoidBottom));
    positionInitializedRef.current = true;
  }, [effectiveAvoidBottom, hydrated, layout]);

  useEffect(() => {
    if (!positionInitializedRef.current || !layout.width || !layout.height) return;
    setPosition((current) => clampPetPosition(current, layout, effectiveAvoidBottom));
  }, [effectiveAvoidBottom, layout]);

  const persist = useCallback((id: PetId, point: Point) => {
    if (!layout.width || !layout.height) return;
    void AsyncStorage.setItem(PET_STORAGE_KEY, JSON.stringify({
      version: 1,
      selectedId: id,
      xRatio: point.x / layout.width,
      yRatio: point.y / layout.height,
    })).catch(() => undefined);
  }, [layout]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  }, []);

  const handleAskCardLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setAskCardHeight((current) => Math.abs(current - height) < 1 ? current : height);
  }, []);

  const openAsk = useCallback(() => {
    movedRef.current = false;
    setPickerOpen(false);
    setAskOpen(true);
    setAskCardHeight(ASK_CARD_COMPACT_HEIGHT);
    setLookup(null);
    setValidationMessage(null);
  }, []);

  const closeAsk = useCallback(() => {
    lookupRequestRef.current += 1;
    draggingRef.current = false;
    movedRef.current = false;
    webIgnoreClickUntilRef.current = 0;
    setLookupLoading(false);
    setAskOpen(false);
    setLookup(null);
    setValidationMessage(null);
    inputRef.current?.blur();
    Keyboard.dismiss();
  }, []);

  const toggleAsk = useCallback(() => {
    if (askOpen) {
      closeAsk();
      return;
    }
    openAsk();
  }, [askOpen, closeAsk, openAsk]);

  const finishDrag = useCallback(() => {
    if (!draggingRef.current) return false;
    const didMove = movedRef.current;
    draggingRef.current = false;
    movedRef.current = false;
    if (!didMove) return false;
    const next = clampPetPosition(positionRef.current, layout, effectiveAvoidBottom);
    positionRef.current = next;
    setPosition(next);
    persist(selectedId, next);
    return true;
  }, [effectiveAvoidBottom, layout, persist, selectedId]);

  const handleWebPointerDown = useCallback((event: any) => {
    const nativeEvent = event?.nativeEvent ?? event;
    if (draggingRef.current) return;
    if (nativeEvent?.pointerType === 'mouse' && nativeEvent.button != null && nativeEvent.button !== 0) return;
    const point = getPointerPoint(event);
    if (!point) return;
    webPointerIdRef.current = getPointerId(event);
    webPointerStartRef.current = point;
    draggingRef.current = true;
    movedRef.current = false;
    dragStartRef.current = positionRef.current;
    const pointerId = webPointerIdRef.current;
    if (pointerId != null) event.currentTarget?.setPointerCapture?.(pointerId);
  }, []);

  const handleWebPointerMove = useCallback((event: any) => {
    if (!draggingRef.current) return;
    const activePointerId = webPointerIdRef.current;
    const incomingPointerId = getPointerId(event);
    if (activePointerId != null && incomingPointerId != null && activePointerId !== incomingPointerId) return;
    const point = getPointerPoint(event);
    if (!point) return;
    const dx = point.x - webPointerStartRef.current.x;
    const dy = point.y - webPointerStartRef.current.y;
    if (Math.hypot(dx, dy) <= 4) return;
    event.preventDefault?.();
    movedRef.current = true;
    const next = clampPetPosition({
      x: dragStartRef.current.x + dx,
      y: dragStartRef.current.y + dy,
    }, layout, effectiveAvoidBottom);
    positionRef.current = next;
    setPosition(next);
  }, [effectiveAvoidBottom, layout]);

  const handleWebPointerUp = useCallback((event: any) => {
    if (!draggingRef.current) return;
    const activePointerId = webPointerIdRef.current;
    const incomingPointerId = getPointerId(event);
    if (activePointerId != null && incomingPointerId != null && activePointerId !== incomingPointerId) return;
    webPointerIdRef.current = null;
    const didMove = finishDrag();
    if (activePointerId != null) event.currentTarget?.releasePointerCapture?.(activePointerId);
    if (didMove) {
      webIgnoreClickUntilRef.current = Date.now() + 400;
    } else {
      // Pointer events own the web interaction. Toggle here so a tap still
      // works even when the parent drag surface captures the gesture.
      toggleAsk();
      // React Native Web may also emit Pressable's onPress for the same tap.
      // Ignore that follow-up event so one tap never toggles twice.
      webIgnoreClickUntilRef.current = Date.now() + 400;
    }
  }, [finishDrag, toggleAsk]);

  const handleWebPointerCancel = useCallback((event: any) => {
    if (!draggingRef.current) return;
    const activePointerId = webPointerIdRef.current;
    webPointerIdRef.current = null;
    finishDrag();
    if (activePointerId != null) event.currentTarget?.releasePointerCapture?.(activePointerId);
  }, [finishDrag]);

  const handleWebLostPointerCapture = useCallback(() => {
    if (!draggingRef.current) return;
    webPointerIdRef.current = null;
    finishDrag();
  }, [finishDrag]);

  const handleWebClick = useCallback(() => {
    if (webIgnoreClickUntilRef.current > Date.now()) {
      webIgnoreClickUntilRef.current = 0;
      return;
    }
    toggleAsk();
  }, [toggleAsk]);

  const panResponder = useMemo(() => PanResponder.create({
    // Let the Pressable handle taps. The responder should only take over once
    // the finger has actually moved, so opening the ask card does not depend
    // on the previous responder lifecycle.
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (_event, gesture) => Math.hypot(gesture.dx, gesture.dy) > 4,
    onMoveShouldSetPanResponderCapture: (_event, gesture) => Math.hypot(gesture.dx, gesture.dy) > 4,
    onPanResponderTerminationRequest: () => false,
    onPanResponderGrant: () => {
      draggingRef.current = true;
      movedRef.current = false;
      dragStartRef.current = positionRef.current;
    },
    onPanResponderMove: (_event, gesture) => {
      if (Math.hypot(gesture.dx, gesture.dy) <= 4) return;
      movedRef.current = true;
      const next = clampPetPosition({
        x: dragStartRef.current.x + gesture.dx,
        y: dragStartRef.current.y + gesture.dy,
      }, layout, effectiveAvoidBottom);
      positionRef.current = next;
      setPosition(next);
    },
    onPanResponderRelease: finishDrag,
    onPanResponderTerminate: finishDrag,
  }), [effectiveAvoidBottom, finishDrag, layout]);

  const petDragHandlers = Platform.OS === 'web'
    ? ({
      onPointerDown: handleWebPointerDown,
      onPointerMove: handleWebPointerMove,
      onPointerUp: handleWebPointerUp,
      onPointerCancel: handleWebPointerCancel,
      onLostPointerCapture: handleWebLostPointerCapture,
    } as any)
    : panResponder.panHandlers;

  useEffect(() => {
    if (!askOpen) return undefined;
    const timer = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(timer);
  }, [askOpen]);

  const openPicker = useCallback(() => {
    setAskOpen(false);
    inputRef.current?.blur();
    Keyboard.dismiss();
    setPickerOpen(true);
  }, []);

  const confirmPicker = useCallback((id: PetId) => {
    setSelectedId(id);
    persist(id, position);
    setPickerOpen(false);
    setAskOpen(true);
    setAskCardHeight(ASK_CARD_COMPACT_HEIGHT);
    setLookup(null);
    setValidationMessage(null);
  }, [persist, position]);

  const handleLookup = useCallback(() => {
    if (lookupLoading) return;
    const requestId = ++lookupRequestRef.current;
    setLookup(null);
    setValidationMessage(null);
    setLookupLoading(true);
    void lookupPetQuery(word)
      .then((result) => {
        if (requestId !== lookupRequestRef.current) return;
        if (!result) {
          setValidationMessage('英単語・熟語を入力してね。');
          return;
        }
        setWord(result.word);
        setLookup(result);
      })
      .catch(() => {
        if (requestId === lookupRequestRef.current) setValidationMessage('辞書に接続できなかったみたい。');
      })
      .finally(() => {
        if (requestId === lookupRequestRef.current) setLookupLoading(false);
      });
  }, [lookupLoading, word]);

  const cardWidth = Math.min(ASK_CARD_WIDTH, Math.max(0, layout.width - 16));
  const cardHeight = askCardHeight;
  const cardMaxTop = Math.max(PET_TOP_INSET, layout.height - effectiveAvoidBottom - cardHeight);
  const cardLeft = clamp(position.x + PET_SIZE / 2 - cardWidth / 2, 8, Math.max(8, layout.width - cardWidth - 8));
  const cardAboveTop = position.y - cardHeight - 10;
  const cardBelowTop = position.y + PET_SIZE + 10;
  const cardTop = position.y > 220
    ? clamp(cardAboveTop, PET_TOP_INSET, cardMaxTop)
    : clamp(cardBelowTop, PET_TOP_INSET, cardMaxTop);
  const petVisual = (
    <PetIdleMotion active={!askOpen && !pickerOpen}>
      <Image source={pet.image} resizeMode="contain" style={styles.petImage} />
    </PetIdleMotion>
  );

  return (
    <View pointerEvents="box-none" onLayout={handleLayout} style={styles.overlay}>
      {askOpen && layout.width > 0 ? (
        <View onLayout={handleAskCardLayout} style={[styles.askCard, { width: cardWidth, left: cardLeft, top: cardTop, borderColor: pet.accent, shadowColor: pet.accent }]}>
          <GlassSurfaceLight compact />
          <View style={styles.askHeader}>
            <View style={styles.askHeaderCopy}>
              <Text style={styles.askTitle}>単語や熟語を聞いてみる</Text>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="ペットを選び直す" onPress={openPicker} style={styles.askPetButton}>
              <Image source={pet.image} resizeMode="contain" style={styles.askPetImage} />
            </Pressable>
          </View>
          <View style={styles.inputRow}>
            <TextInput
              ref={inputRef}
              value={word}
              onChangeText={(value) => {
                lookupRequestRef.current += 1;
                setLookupLoading(false);
                setLookup(null);
                setWord(sanitizePetInput(value));
                setValidationMessage(null);
              }}
              onSubmitEditing={handleLookup}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'default'}
              placeholder="Type a word or phrase..."
              placeholderTextColor="#7F8597"
              returnKeyType="search"
              maxLength={120}
              style={styles.wordInput}
              accessibilityLabel="英単語や熟語を入力"
            />
            <Pressable accessibilityRole="button" accessibilityLabel="単語や熟語の意味を調べる" disabled={!word || lookupLoading} onPress={handleLookup} style={({ pressed }) => [styles.lookupButton, (!word || lookupLoading) && styles.lookupButtonDisabled, pressed && styles.pressed]}>
              <Ionicons name="arrow-up" size={18} color="#F4EEFF" />
            </Pressable>
          </View>
          {lookupLoading ? <View style={styles.lookupStatus}><ActivityIndicator size="small" color="#D58A9B" /><Text style={styles.lookupStatusText}>辞書を調べてるよ…</Text></View> : null}
          {validationMessage ? <Text style={styles.validationMessage}>{validationMessage}</Text> : null}
          {lookup ? (
            <View style={[styles.answerBubble, { backgroundColor: `${pet.accent}20`, borderColor: `${pet.accent}66` }]}>
              <Text style={styles.answerKind}>{lookupKindLabel(lookup.kind)}</Text>
              <Text style={styles.answerWord}>{lookup.word}</Text>
              <Text numberOfLines={4} style={styles.answerText}>{petReply(pet, lookup)}</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      <View style={[styles.petAnchor, { left: position.x, top: position.y }]}>
        {Platform.OS === 'web' ? (
          <View
            {...(petDragHandlers as any)}
            style={[styles.petDragSurface, webPetDragStyle]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${pet.name}。タップして単語や熟語を聞く。ドラッグして移動`}
              accessibilityHint="タップすると単語・熟語入力画面を開閉し、ドラッグすると位置を変更します"
              onAccessibilityTap={toggleAsk}
              onPress={handleWebClick}
              style={({ pressed }) => [styles.petButton, pressed && styles.petPressed]}
            >
              {petVisual}
            </Pressable>
          </View>
        ) : (
          <View
            {...panResponder.panHandlers}
            style={styles.petDragSurface}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${pet.name}。タップして単語や熟語を聞く。ドラッグして移動`}
              accessibilityHint="タップすると単語・熟語入力画面を開閉し、ドラッグすると位置を変更します"
              onAccessibilityTap={toggleAsk}
              onPress={toggleAsk}
              style={({ pressed }) => [styles.petButton, pressed && styles.petPressed]}
            >
              {petVisual}
            </Pressable>
          </View>
        )}
        <Pressable accessibilityRole="button" accessibilityLabel="ペットを選び直す" onPress={openPicker} style={({ pressed }) => [styles.petChooser, pressed && styles.pressed]}>
          <Ionicons name="sparkles" size={12} color="#241A25" />
        </Pressable>
      </View>

      <PetPickerModal visible={pickerOpen} selectedId={selectedId} onClose={() => setPickerOpen(false)} onConfirm={confirmPicker} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, zIndex: 40 },
  petAnchor: { position: 'absolute', width: PET_SIZE, height: PET_SIZE, zIndex: 42 },
  petDragSurface: {
    width: PET_SIZE,
    height: PET_SIZE,
  },
  petButton: {
    width: PET_SIZE,
    height: PET_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: PET_SIZE / 2,
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 10,
  },
  petPressed: { transform: [{ scale: 0.94 }], opacity: 0.85 },
  petImage: { width: 78, height: 78 },
  petChooser: {
    position: 'absolute',
    right: -2,
    bottom: -1,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: '#F2C8D3',
    borderWidth: 2,
    borderColor: '#15161F',
  },
  askCard: {
    position: 'absolute',
    zIndex: 70,
    padding: 14,
    borderRadius: 22,
    borderWidth: 2,
    borderTopColor: 'rgba(246,240,246,0.68)',
    borderLeftColor: 'rgba(205,202,218,0.38)',
    backgroundColor: 'rgba(12, 17, 34, 0.72)',
    shadowColor: '#8F82FF',
    shadowOpacity: 0.34,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 },
    elevation: 18,
    overflow: 'hidden',
  },
  askHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 },
  askHeaderCopy: { flex: 1, paddingTop: 2 },
  askTitle: { color: '#EEF0FF', fontSize: 17, fontWeight: '800' },
  askPetButton: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  askPetImage: { width: 42, height: 42 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  wordInput: { flex: 1, height: 44, minWidth: 0, paddingHorizontal: 13, borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(179,195,255,0.30)', backgroundColor: 'rgba(32,40,72,0.52)', color: '#EEF0FF', fontSize: 15 },
  lookupButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: '#D58A9B' },
  lookupButtonDisabled: { opacity: 0.38 },
  lookupStatus: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 7 },
  lookupStatusText: { color: '#A9A5FF', fontSize: 11 },
  validationMessage: { color: '#F0B2C0', fontSize: 11, marginTop: 7 },
  answerBubble: { marginTop: 10, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 15, borderWidth: 1.75, borderTopColor: 'rgba(244,238,244,0.56)' },
  answerKind: { color: '#B9B6FF', fontSize: 9, fontWeight: '900', letterSpacing: 0.7, marginBottom: 3 },
  answerWord: { color: '#F7DDE3', fontSize: 12, fontWeight: '900', letterSpacing: 0.4 },
  answerText: { color: '#EEF0FF', fontSize: 13, lineHeight: 19, marginTop: 3 },
  modalRoot: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 24 },
  modalBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(4,5,15,0.68)' },
  pickerCard: { width: '100%', maxWidth: 410, maxHeight: '88%', minHeight: 420, borderRadius: 28, borderWidth: 2, borderColor: 'rgba(207,185,255,0.50)', borderTopColor: 'rgba(248,241,247,0.70)', borderLeftColor: 'rgba(208,201,218,0.38)', backgroundColor: 'rgba(13,17,35,0.84)', overflow: 'hidden', shadowColor: '#9A76FF', shadowOpacity: 0.38, shadowRadius: 34, shadowOffset: { width: 0, height: 16 }, elevation: 20 },
  pickerHeader: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 22, paddingTop: 20, paddingBottom: 13, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(169,184,245,0.18)' },
  pickerHeaderCopy: { flex: 1 },
  pickerEyebrow: { color: '#D58A9B', fontSize: 9, fontWeight: '900', letterSpacing: 1.2 },
  pickerTitle: { color: '#EEF0FF', fontSize: 22, fontWeight: '900', marginTop: 3 },
  pickerSubtitle: { color: '#8C93A3', fontSize: 11, marginTop: 4 },
  closeButton: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', marginTop: -4 },
  closeButtonText: { color: '#D9B5BE', fontSize: 30, lineHeight: 32, fontWeight: '300' },
  pickerScroll: { flex: 1, minHeight: 0 },
  pickerGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 13, paddingHorizontal: 18, paddingTop: 17, paddingBottom: 18 },
  pickerOption: { width: '31.5%', alignItems: 'center', paddingVertical: 3 },
  pickerOptionPressed: { opacity: 0.7, transform: [{ scale: 0.96 }] },
  pickerImageWrap: { width: '100%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 999, borderWidth: 2, borderColor: 'transparent', backgroundColor: 'rgba(105,119,191,0.10)' },
  pickerImage: { width: '91%', height: '91%' },
  pickerCheck: { position: 'absolute', top: 0, right: 0, width: 23, height: 23, alignItems: 'center', justifyContent: 'center', borderRadius: 12 },
  pickerCheckText: { color: '#241A25', fontSize: 14, lineHeight: 16, fontWeight: '900' },
  pickerName: { maxWidth: '100%', color: '#8E95A6', fontSize: 12, lineHeight: 17, fontWeight: '800', textAlign: 'center', marginTop: 4 },
  pickerNameSelected: { color: '#F3D5DC' },
  pickerCatchphrase: { maxWidth: '100%', color: '#626A7B', fontSize: 9, lineHeight: 13, textAlign: 'center' },
  pickerFooter: { flexDirection: 'row', gap: 10, paddingHorizontal: 18, paddingTop: 12, paddingBottom: 16, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'rgba(169,184,245,0.18)' },
  pickerCancel: { flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 15, borderWidth: 1, borderColor: 'rgba(185,198,255,0.30)', backgroundColor: 'rgba(48,57,96,0.30)' },
  pickerConfirm: { flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#D58A9B' },
  pickerCancelText: { color: '#BFC5D2', fontSize: 13, fontWeight: '700' },
  pickerConfirmText: { color: '#281B25', fontSize: 13, fontWeight: '900' },
  pressed: { opacity: 0.72 },
});
