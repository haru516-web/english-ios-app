import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  PanResponder,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

export type RadialNavigationItem = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  accessibilityLabel?: string;
};

export type RadialNavigationMenuProps = {
  items: RadialNavigationItem[];
  activeKey: string;
  onChange: (key: string) => void;
  onPreviewChange?: (key: string | null) => void;
  onOpenChange?: (open: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

type Point = { x: number; y: number };
type ItemPosition = RadialNavigationItem & { centerX: number; centerY: number };
type WebPointerTarget = {
  setPointerCapture?: (pointerId: number) => void;
  releasePointerCapture?: (pointerId: number) => void;
};

const MENU_SIZE = 338;
const MAIN_SIZE = 68;
const ITEM_SIZE = 64;
const MENU_EDGE = 12;
const ITEM_RADIUS = 144;
const FOUR_ITEM_RADIUS = 170;
const LONG_PRESS_MS = 350;
const MOVE_TOLERANCE = 10;
const HIT_RADIUS = ITEM_SIZE / 2 + 8;
const MAIN_LEFT = MENU_SIZE - MENU_EDGE - MAIN_SIZE;
const MAIN_TOP = MENU_SIZE - MENU_EDGE - MAIN_SIZE;
const MAIN_CENTER: Point = {
  x: MAIN_LEFT + MAIN_SIZE / 2,
  y: MAIN_TOP + MAIN_SIZE / 2,
};

function readNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function getPointerId(event: any): number | null {
  const nativeEvent = event?.nativeEvent ?? event;
  return readNumber(nativeEvent?.pointerId);
}

function getWebPoint(event: any): Point | null {
  const nativeEvent = event?.nativeEvent ?? event;
  const x = readNumber(nativeEvent?.clientX);
  const y = readNumber(nativeEvent?.clientY);
  return x !== null && y !== null ? { x, y } : null;
}

function getNativeStartPoint(event: any): Point {
  const nativeEvent = event?.nativeEvent ?? event;
  const locationX = readNumber(nativeEvent?.locationX) ?? MAIN_SIZE / 2;
  const locationY = readNumber(nativeEvent?.locationY) ?? MAIN_SIZE / 2;
  return { x: MAIN_LEFT + locationX, y: MAIN_TOP + locationY };
}

function distanceBetween(first: Point, second: Point) {
  return Math.hypot(first.x - second.x, first.y - second.y);
}

export function RadialNavigationMenu({ items, activeKey, onChange, onPreviewChange, onOpenChange, style }: RadialNavigationMenuProps) {
  const rootRef = useRef<View | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredKey, setHoveredKeyState] = useState<string | null>(null);
  const isOpenRef = useRef(false);
  const hoveredKeyRef = useRef<string | null>(null);
  const pressedRef = useRef(false);
  const movedRef = useRef(false);
  const longPressRef = useRef(false);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressPointRef = useRef<Point | null>(null);
  const nativeStartPointRef = useRef<Point>(MAIN_CENTER);
  const pointerIdRef = useRef<number | null>(null);
  const interactionEpochRef = useRef(0);
  const selectedEpochRef = useRef<number | null>(null);

  const itemPositions = useMemo<ItemPosition[]>(() => {
    const hasFourOrMoreItems = items.length >= 4;
    const startAngle = hasFourOrMoreItems ? -Math.PI : -Math.PI * 0.94;
    const endAngle = hasFourOrMoreItems ? -Math.PI * 0.5 : -Math.PI * 0.51;
    const itemRadius = hasFourOrMoreItems ? FOUR_ITEM_RADIUS : ITEM_RADIUS;
    const angleStep = items.length > 1 ? (endAngle - startAngle) / (items.length - 1) : 0;
    return items.map((item, index) => {
      const angle = items.length === 1 ? -Math.PI * 0.72 : startAngle + angleStep * index;
      return {
        ...item,
        centerX: MAIN_CENTER.x + Math.cos(angle) * itemRadius,
        centerY: MAIN_CENTER.y + Math.sin(angle) * itemRadius,
      };
    });
  }, [items]);

  const setHoveredKey = useCallback((key: string | null) => {
    hoveredKeyRef.current = key;
    setHoveredKeyState(key);
  }, []);

  const setMenuOpen = useCallback((open: boolean) => {
    if (isOpenRef.current === open) return;
    isOpenRef.current = open;
    setIsOpen(open);
    if (!open) {
      setHoveredKey(null);
      onPreviewChange?.(null);
    }
    onOpenChange?.(open);
  }, [onOpenChange, onPreviewChange, setHoveredKey]);

  const toggleMenu = useCallback(() => setMenuOpen(!isOpenRef.current), [setMenuOpen]);

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current !== null) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const beginInteraction = useCallback(() => {
    interactionEpochRef.current += 1;
    selectedEpochRef.current = null;
  }, []);

  const selectOnce = useCallback((key: string) => {
    const epoch = interactionEpochRef.current;
    if (selectedEpochRef.current === epoch) return;
    selectedEpochRef.current = epoch;
    onChange(key);
    setMenuOpen(false);
  }, [onChange, setMenuOpen]);

  const findItemAtPoint = useCallback((point: Point) => {
    let closestKey: string | null = null;
    let closestDistance = Number.POSITIVE_INFINITY;
    for (const item of itemPositions) {
      const distance = distanceBetween(point, { x: item.centerX, y: item.centerY });
      if (distance <= HIT_RADIUS && distance < closestDistance) {
        closestKey = item.key;
        closestDistance = distance;
      }
    }
    return closestKey;
  }, [itemPositions]);

  const getWebRootPoint = useCallback((point: Point): Point | null => {
    const node = rootRef.current as unknown as { getBoundingClientRect?: () => { left: number; top: number } } | null;
    const rect = node?.getBoundingClientRect?.();
    return rect ? { x: point.x - rect.left, y: point.y - rect.top } : null;
  }, []);

  const startLongPressTimer = useCallback(() => {
    clearLongPressTimer();
    longPressTimerRef.current = setTimeout(() => {
      longPressTimerRef.current = null;
      if (!pressedRef.current || movedRef.current) return;
      longPressRef.current = true;
      setMenuOpen(true);
      setHoveredKey(null);
      onPreviewChange?.(null);
    }, LONG_PRESS_MS);
  }, [clearLongPressTimer, onPreviewChange, setHoveredKey, setMenuOpen]);

  const updateDragHighlight = useCallback((point: Point) => {
    if (!longPressRef.current) return;
    const nextKey = findItemAtPoint(point);
    if (hoveredKeyRef.current === nextKey) return;
    setHoveredKey(nextKey);
    onPreviewChange?.(nextKey);
  }, [findItemAtPoint, onPreviewChange, setHoveredKey]);

  const finishInteraction = useCallback((cancelled: boolean, shouldToggleOnTap: boolean) => {
    if (!pressedRef.current) return;
    clearLongPressTimer();
    const wasLongPress = longPressRef.current;
    const didMove = movedRef.current;
    const selectedKey = hoveredKeyRef.current;
    pressedRef.current = false;
    movedRef.current = false;
    longPressRef.current = false;
    pressPointRef.current = null;
    pointerIdRef.current = null;

    if (cancelled) {
      if (wasLongPress) setMenuOpen(false);
      return;
    }
    if (wasLongPress) {
      if (selectedKey !== null) selectOnce(selectedKey);
      setMenuOpen(false);
      return;
    }
    if (didMove) {
      setMenuOpen(false);
      return;
    }
    if (shouldToggleOnTap) toggleMenu();
  }, [clearLongPressTimer, selectOnce, setMenuOpen, toggleMenu]);

  const captureWebPointer = useCallback((event: any) => {
    const pointerId = getPointerId(event);
    const target = event?.currentTarget as WebPointerTarget | undefined;
    if (pointerId !== null && typeof target?.setPointerCapture === 'function') {
      try { target.setPointerCapture(pointerId); } catch { /* Pointer already ended. */ }
    }
    pointerIdRef.current = pointerId;
  }, []);

  const releaseWebPointer = useCallback((event: any) => {
    const pointerId = pointerIdRef.current ?? getPointerId(event);
    const target = event?.currentTarget as WebPointerTarget | undefined;
    if (pointerId !== null && typeof target?.releasePointerCapture === 'function') {
      try { target.releasePointerCapture(pointerId); } catch { /* Browser already released it. */ }
    }
  }, []);

  const handleWebPointerDown = useCallback((event: any) => {
    const nativeEvent = event?.nativeEvent ?? event;
    if (nativeEvent?.isPrimary === false || pressedRef.current) return;
    event?.preventDefault?.();
    beginInteraction();
    pressedRef.current = true;
    movedRef.current = false;
    longPressRef.current = false;
    pressPointRef.current = getWebPoint(event);
    captureWebPointer(event);
    startLongPressTimer();
  }, [beginInteraction, captureWebPointer, startLongPressTimer]);

  const handleWebPointerMove = useCallback((event: any) => {
    if (!pressedRef.current) return;
    const pointerId = getPointerId(event);
    if (pointerIdRef.current !== null && pointerId !== null && pointerId !== pointerIdRef.current) return;
    const point = getWebPoint(event);
    if (!point) return;
    if (!longPressRef.current) {
      const pressPoint = pressPointRef.current;
      if (pressPoint && distanceBetween(point, pressPoint) > MOVE_TOLERANCE) {
        movedRef.current = true;
        clearLongPressTimer();
      }
      return;
    }
    event?.preventDefault?.();
    const rootPoint = getWebRootPoint(point);
    if (rootPoint) updateDragHighlight(rootPoint);
  }, [clearLongPressTimer, getWebRootPoint, updateDragHighlight]);

  const handleWebPointerUp = useCallback((event: any) => {
    if (!pressedRef.current) return;
    const pointerId = getPointerId(event);
    if (pointerIdRef.current !== null && pointerId !== null && pointerId !== pointerIdRef.current) return;
    event?.preventDefault?.();
    finishInteraction(false, true);
    releaseWebPointer(event);
  }, [finishInteraction, releaseWebPointer]);

  const handleWebPointerCancel = useCallback((event: any) => {
    if (!pressedRef.current) return;
    finishInteraction(true, false);
    releaseWebPointer(event);
  }, [finishInteraction, releaseWebPointer]);

  const handleWebLostPointerCapture = useCallback(() => {
    if (pressedRef.current) finishInteraction(true, false);
  }, [finishInteraction]);

  const handleNativeGrant = useCallback((event: any) => {
    beginInteraction();
    pressedRef.current = true;
    movedRef.current = false;
    longPressRef.current = false;
    nativeStartPointRef.current = getNativeStartPoint(event);
    pressPointRef.current = nativeStartPointRef.current;
    startLongPressTimer();
  }, [beginInteraction, startLongPressTimer]);

  const handleNativeMove = useCallback((_event: any, gestureState: { dx: number; dy: number }) => {
    if (!pressedRef.current) return;
    const point = {
      x: nativeStartPointRef.current.x + gestureState.dx,
      y: nativeStartPointRef.current.y + gestureState.dy,
    };
    if (!longPressRef.current) {
      const pressPoint = pressPointRef.current;
      if (pressPoint && distanceBetween(point, pressPoint) > MOVE_TOLERANCE) {
        movedRef.current = true;
        clearLongPressTimer();
      }
      return;
    }
    updateDragHighlight(point);
  }, [clearLongPressTimer, updateDragHighlight]);

  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: handleNativeGrant,
    onPanResponderMove: handleNativeMove,
    onPanResponderRelease: () => finishInteraction(false, true),
    onPanResponderTerminate: () => finishInteraction(true, false),
    onPanResponderTerminationRequest: () => false,
    onShouldBlockNativeResponder: () => true,
  }), [finishInteraction, handleNativeGrant, handleNativeMove]);

  useEffect(() => {
    if (hoveredKeyRef.current !== null && !items.some((item) => item.key === hoveredKeyRef.current)) setHoveredKey(null);
  }, [items, setHoveredKey]);

  useEffect(() => () => clearLongPressTimer(), [clearLongPressTimer]);

  useEffect(() => () => onPreviewChange?.(null), [onPreviewChange]);

  useEffect(() => () => onOpenChange?.(false), [onOpenChange]);

  const webGestureProps = Platform.OS === 'web' ? ({
    onPointerDown: handleWebPointerDown,
    onPointerMove: handleWebPointerMove,
    onPointerUp: handleWebPointerUp,
    onPointerCancel: handleWebPointerCancel,
    onLostPointerCapture: handleWebLostPointerCapture,
  } as any) : panResponder.panHandlers;

  return (
    <View ref={rootRef} pointerEvents="box-none" style={[styles.root, style]}>
      {isOpen ? itemPositions.map((item) => {
        const active = item.key === activeKey;
        const hovered = item.key === hoveredKey;
        return (
          <Pressable
            key={item.key}
            onPress={() => selectOnce(item.key)}
            onPressIn={() => setHoveredKey(item.key)}
            onPressOut={() => { if (!longPressRef.current) setHoveredKey(null); }}
            {...(Platform.OS === 'web' ? {
              onPointerEnter: () => { if (isOpenRef.current) setHoveredKey(item.key); },
              onPointerLeave: () => { if (!pressedRef.current) setHoveredKey(null); },
            } : {}) as any}
            accessibilityRole="button"
            accessibilityLabel={item.accessibilityLabel || item.label}
            accessibilityState={{ selected: active }}
            hitSlop={6}
            style={({ pressed }) => [
              styles.item,
              active && styles.itemActive,
              hovered && styles.itemHovered,
              active && hovered && styles.itemActiveHovered,
              pressed && styles.itemPressed,
              { left: item.centerX - ITEM_SIZE / 2, top: item.centerY - ITEM_SIZE / 2 },
            ]}
          >
            <View pointerEvents="none" accessible={false} style={styles.itemIcon}>
              {item.icon || <Text style={styles.fallbackIcon}>•</Text>}
            </View>
            <Text pointerEvents="none" numberOfLines={1} style={styles.itemLabel}>{item.label}</Text>
          </Pressable>
        );
      }) : null}

      <View
        {...(webGestureProps as any)}
        accessible
        accessibilityRole="button"
        accessibilityLabel={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        accessibilityState={{ expanded: isOpen, disabled: items.length === 0 }}
        onAccessibilityTap={toggleMenu}
        style={[styles.mainButton, isOpen && styles.mainButtonOpen, Platform.OS === 'web' && styles.webMainButton]}
      >
        <Ionicons pointerEvents="none" name={isOpen ? 'close' : 'grid-outline'} size={28} color="#F2EEFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { position: 'absolute', right: 12, bottom: 12, width: MENU_SIZE, height: MENU_SIZE, zIndex: 50, elevation: 50, overflow: 'visible' },
  mainButton: { position: 'absolute', left: MAIN_LEFT, top: MAIN_TOP, width: MAIN_SIZE, height: MAIN_SIZE, alignItems: 'center', justifyContent: 'center', borderRadius: MAIN_SIZE / 2, borderWidth: 1, borderColor: 'rgba(204,197,255,0.68)', backgroundColor: 'rgba(78,70,173,0.78)', shadowColor: '#8174FF', shadowOpacity: 0.52, shadowRadius: 22, shadowOffset: { width: 0, height: 8 } },
  mainButtonOpen: { backgroundColor: 'rgba(108,96,221,0.82)', borderColor: 'rgba(226,216,255,0.88)' },
  webMainButton: { cursor: 'pointer', touchAction: 'none', userSelect: 'none', WebkitTapHighlightColor: 'transparent' } as any,
  item: { position: 'absolute', width: ITEM_SIZE, height: ITEM_SIZE, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(185,199,255,0.38)', backgroundColor: 'rgba(14,20,40,0.76)', shadowColor: '#766BFF', shadowOpacity: 0.34, shadowRadius: 16, shadowOffset: { width: 0, height: 5 }, elevation: 12 },
  itemActive: { borderColor: '#817BF0', backgroundColor: 'rgba(109,103,225,0.42)' },
  itemHovered: { borderColor: '#70D5C9', backgroundColor: 'rgba(46,113,111,0.58)', transform: [{ scale: 1.08 }] },
  itemActiveHovered: { borderColor: '#B4F0E4', backgroundColor: 'rgba(94,112,208,0.66)' },
  itemPressed: { opacity: 0.78 },
  itemIcon: { height: 23, minWidth: 23, alignItems: 'center', justifyContent: 'center', marginBottom: 1 },
  fallbackIcon: { color: '#B9C0CC', fontSize: 20, lineHeight: 21 },
  itemLabel: { maxWidth: ITEM_SIZE - 8, color: '#EEF0FF', fontSize: 11, fontWeight: '700', lineHeight: 13, textAlign: 'center' },
});
