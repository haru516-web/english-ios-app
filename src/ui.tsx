import React, { ReactNode, useMemo } from 'react';
import {
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

export type ColorValue = string;

export type GlassPanelProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: 'default' | 'light' | 'dark' | 'extraLight' | 'prominent';
  borderColor?: ColorValue;
  testID?: string;
};

export function GlassSurfaceLight({ compact = false }: { compact?: boolean }) {
  return <>
    <LinearGradient pointerEvents="none" colors={['rgba(255,252,245,0.17)', 'rgba(240,239,234,0.045)', 'rgba(230,228,221,0)']} start={{ x: 0, y: 0 }} end={{ x: 0.82, y: 0.88 }} style={StyleSheet.absoluteFill} />
    <LinearGradient pointerEvents="none" colors={['rgba(255,253,247,0.16)', 'rgba(255,252,245,0.045)', 'rgba(255,252,245,0)']} start={{ x: 0, y: 0.4 }} end={{ x: 1, y: 0.6 }} style={[styles.glassSweep, compact && styles.glassSweepCompact]} />
    <View pointerEvents="none" style={[styles.glassSpecular, compact && styles.glassSpecularCompact]} />
  </>;
}
export function GlassPanel({
  children,
  style,
  intensity = 30,
  tint = 'dark',
  borderColor = 'rgba(177,190,255,0.30)',
  testID,
}: GlassPanelProps) {
  const panelStyle = [styles.glassPanel, { borderColor }, style];
  const panelContent = <>
    <GlassSurfaceLight />

    <View pointerEvents="none" style={styles.glassInnerRim} />
    <View pointerEvents="none" style={styles.glassTopEdge} />
    {children}
  </>;
  return Platform.OS === 'web' ? (
    <View testID={testID} style={panelStyle}>{panelContent}</View>
  ) : (
    <BlurView testID={testID} intensity={intensity} tint={tint} style={panelStyle}>
      {panelContent}
    </BlurView>
  );
}

export type AvatarProps = {
  name?: string;
  initials?: string;
  size?: number;
  colors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export function Avatar({
  name = '',
  initials,
  size = 44,
  colors = ['#293552', '#7771E8'],
  style,
  accessibilityLabel,
}: AvatarProps) {
  const label = initials || name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || '?';
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }, style]}
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel || `${name || 'Person'} avatar`}
    >
      <Text style={[styles.avatarText, { fontSize: Math.max(11, size * 0.32) }]}>{label}</Text>
    </LinearGradient>
  );
}

export type IconButtonProps = {
  label: string;
  icon?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  variant?: 'plain' | 'glass' | 'accent';
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({ label, icon, onPress, disabled, variant = 'plain', size = 44, style }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      style={({ pressed }) => [
        styles.iconButton,
        { width: Math.max(44, size), height: Math.max(44, size) },
        variant === 'glass' && styles.iconButtonGlass,
        variant === 'accent' && styles.iconButtonAccent,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      {icon || <Text style={styles.iconFallback}>•</Text>}
    </Pressable>
  );
}

export type SearchFieldProps = TextInputProps & { containerStyle?: StyleProp<ViewStyle> };

export function SearchField({ containerStyle, placeholder = 'Search', accessibilityLabel = 'Search', style, ...props }: SearchFieldProps) {
  return (
    <View style={[styles.searchField, containerStyle]}>
      <Text style={styles.searchIcon} accessibilityElementsHidden>⌕</Text>
      <TextInput
        {...props}
        placeholder={placeholder}
        placeholderTextColor="#7B8392"
        accessibilityLabel={accessibilityLabel}
        style={[styles.searchInput, style]}
        returnKeyType="search"
      />
    </View>
  );
}

export type SectionTitleProps = { title: string; actionLabel?: string; onActionPress?: () => void; style?: StyleProp<ViewStyle> };

export function SectionTitle({ title, actionLabel, onActionPress, style }: SectionTitleProps) {
  return (
    <View style={[styles.sectionTitleRow, style]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionLabel ? <Pressable onPress={onActionPress} accessibilityRole="button" accessibilityLabel={actionLabel} hitSlop={8}>
        <Text style={styles.sectionAction}>{actionLabel}</Text>
      </Pressable> : null}
    </View>
  );
}

export type ChatRowProps = {
  name: string;
  preview: string;
  time?: string;
  unread?: boolean;
  online?: boolean;
  onPress?: () => void;
  avatar?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function ChatRow({ name, preview, time, unread, online, onPress, avatar, style }: ChatRowProps) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`Open chat with ${name}`} style={({ pressed }) => [styles.chatRow, pressed && styles.pressed, style]}>
      <GlassSurfaceLight compact />
      <View pointerEvents="none" style={styles.cardInnerRim} />
      {avatar || <Avatar name={name} size={48} />}
      <View style={styles.chatCopy}>
        <View style={styles.chatHeader}><Text numberOfLines={1} style={styles.chatName}>{name}</Text><Text style={styles.chatTime}>{time}</Text></View>
        <Text numberOfLines={2} style={styles.chatPreview}>{preview}</Text>
      </View>
      {online || unread ? <View style={[styles.statusDot, online && styles.onlineDot]} accessible accessibilityLabel={online ? `${name} is online` : 'Unread messages'} /> : null}
    </Pressable>
  );
}

export type MessageBubbleProps = {
  text: string;
  time?: string;
  isMine?: boolean;
  onPress?: () => void;
  translatedText?: string;
  style?: StyleProp<ViewStyle>;
};

export function MessageBubble({ text, time, isMine = false, onPress, translatedText, style }: MessageBubbleProps) {
  const label = translatedText ? `${text}. Translation: ${translatedText}` : text;
  const content = <>
    <Text style={[styles.messageText, isMine && styles.mineMessageText]}>{text}</Text>
    {translatedText ? <Text style={[styles.translationText, isMine && styles.mineMessageText]}>{translatedText}</Text> : null}
    {time ? <Text style={[styles.messageTime, isMine && styles.mineMessageTime]}>{time}</Text> : null}
  </>;
  return (
    <View style={[styles.messageLine, isMine && styles.mineLine, style]}>
      <Pressable onPress={onPress} disabled={!onPress} accessibilityRole={onPress ? 'button' : undefined} accessibilityLabel={label} style={({ pressed }) => [styles.messageBubble, isMine ? styles.mineBubble : styles.theirBubble, pressed && styles.pressed]}>
        {content}
      </Pressable>
    </View>
  );
}

export type ReplyChoiceProps = { text: string; selected?: boolean; onPress?: () => void; style?: StyleProp<ViewStyle> };

export function ReplyChoice({ text, selected, onPress, style }: ReplyChoiceProps) {
  return <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected }} accessibilityLabel={`Reply: ${text}`} style={({ pressed }) => [styles.replyChoice, selected && styles.replyChoiceSelected, pressed && styles.pressed, style]}>
    <Text style={styles.replyText}>{text}</Text>
  </Pressable>;
}

export type ProfileRowProps = { title: string; subtitle?: string; value?: string; icon?: ReactNode; onPress?: () => void; destructive?: boolean; style?: StyleProp<ViewStyle> };

export function ProfileRow({ title, subtitle, value, icon, onPress, destructive, style }: ProfileRowProps) {
  return <Pressable onPress={onPress} disabled={!onPress} accessibilityRole={onPress ? 'button' : undefined} accessibilityLabel={value ? `${title}, ${value}` : title} style={({ pressed }) => [styles.profileRow, pressed && styles.pressed, style]}>
    <View style={styles.profileIcon}>{icon || <Text style={styles.profileIconText}>•</Text>}</View>
    <View style={styles.profileCopy}><Text style={[styles.profileTitle, destructive && styles.destructive]}>{title}</Text>{subtitle ? <Text style={styles.profileSubtitle}>{subtitle}</Text> : null}</View>
    {value ? <Text style={styles.profileValue}>{value}</Text> : onPress ? <Text style={styles.chevron}>›</Text> : null}
  </Pressable>;
}

const styles = StyleSheet.create({
  glassSweep: { position: 'absolute', width: 230, height: 92, top: -38, left: -42, borderRadius: 60, transform: [{ rotate: '-9deg' }] },
  glassSweepCompact: { width: 175, height: 72, top: -32, left: -34 },
  glassSpecular: { position: 'absolute', top: 4, left: 22, width: 66, height: 2, borderRadius: 2, backgroundColor: 'rgba(255,252,245,0.48)', shadowColor: '#FFF8EC', shadowOpacity: 0.42, shadowRadius: 7, shadowOffset: { width: 0, height: 0 } },
  glassSpecularCompact: { left: 18, width: 48 },
  glassPanel: { backgroundColor: 'rgba(12,17,35,0.58)', borderWidth: 2, borderTopColor: 'rgba(238,235,244,0.68)', borderLeftColor: 'rgba(211,211,225,0.48)', borderRightColor: 'rgba(145,150,178,0.30)', borderBottomColor: 'rgba(84,89,116,0.26)', borderRadius: 22, overflow: 'hidden', shadowColor: '#8F82FF', shadowOpacity: 0.08, shadowRadius: 18, shadowOffset: { width: 0, height: 12 }, elevation: 10 },
  glassInnerRim: { ...StyleSheet.absoluteFillObject, margin: 2, borderWidth: 1, borderRadius: 19, borderColor: 'rgba(222,220,235,0.14)' },
  glassTopEdge: { position: 'absolute', top: 2, left: 14, right: 14, height: 3, borderRadius: 2, backgroundColor: 'rgba(246,242,248,0.44)' },
  avatar: { alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(203,211,255,0.38)' },
  avatarText: { color: '#F0EEFF', fontWeight: '700' },
  iconButton: { alignItems: 'center', justifyContent: 'center', borderRadius: 22 },
  iconButtonGlass: { backgroundColor: 'rgba(86,98,173,0.20)', borderWidth: 1, borderColor: 'rgba(186,199,255,0.34)', shadowColor: '#786DFF', shadowOpacity: 0.26, shadowRadius: 14, shadowOffset: { width: 0, height: 7 }, elevation: 7 },
  iconButtonAccent: { backgroundColor: '#6963D9' },
  iconFallback: { color: '#EEE9FF', fontSize: 22 },
  searchField: { height: 44, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, borderRadius: 14, backgroundColor: 'rgba(24,31,58,0.48)', borderWidth: 1, borderColor: 'rgba(157,177,255,0.24)', shadowColor: '#6E8CFF', shadowOpacity: 0, shadowRadius: 0, shadowOffset: { width: 0, height: 6 } },
  searchIcon: { color: '#B9C0CC', fontSize: 25, lineHeight: 25, marginRight: 7 },
  searchInput: { flex: 1, color: '#EEF0FF', fontSize: 16, paddingVertical: 0 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { color: '#EEF0FF', fontSize: 16, fontWeight: '700' },
  sectionAction: { color: '#938EFF', fontSize: 14, fontWeight: '600' },
  chatRow: { minHeight: 76, flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 18, backgroundColor: 'rgba(13,19,38,0.44)', borderWidth: 2, borderColor: 'rgba(166,183,255,0.32)', borderTopColor: 'rgba(240,237,245,0.66)', borderLeftColor: 'rgba(211,211,225,0.46)', borderRightColor: 'rgba(136,144,176,0.28)', borderBottomColor: 'rgba(75,82,111,0.26)', shadowColor: '#786DFF', shadowOpacity: 0, shadowRadius: 0, shadowOffset: { width: 0, height: 9 }, elevation: 7, overflow: 'hidden' },
  cardInnerRim: { ...StyleSheet.absoluteFillObject, margin: 2, borderWidth: 1, borderRadius: 15, borderColor: 'rgba(224,222,236,0.13)' },
  chatCopy: { flex: 1, marginLeft: 12, minWidth: 0 },
  chatHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  chatName: { flex: 1, color: '#EEF0FF', fontSize: 16, fontWeight: '700' },
  chatTime: { color: '#8D95A4', fontSize: 12 },
  chatPreview: { color: '#AAB2C0', fontSize: 14, lineHeight: 20, marginTop: 3 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#7771E8', marginLeft: 9 },
  onlineDot: { backgroundColor: '#70D5A4' },
  messageLine: { alignItems: 'flex-start', marginVertical: 4 },
  mineLine: { alignItems: 'flex-end' },
  messageBubble: { maxWidth: '82%', paddingHorizontal: 14, paddingVertical: 11, borderRadius: 18, borderWidth: StyleSheet.hairlineWidth },
  theirBubble: { backgroundColor: 'rgba(24,31,55,0.62)', borderColor: 'rgba(169,187,255,0.25)', borderBottomLeftRadius: 5 },
  mineBubble: { backgroundColor: 'rgba(96,84,190,0.52)', borderColor: 'rgba(205,187,255,0.40)', borderBottomRightRadius: 5 },
  messageText: { color: '#ECEEFF', fontSize: 16, lineHeight: 22 },
  mineMessageText: { color: '#F4EEFF' },
  translationText: { color: '#B8C0CE', fontSize: 14, lineHeight: 19, marginTop: 5 },
  messageTime: { alignSelf: 'flex-end', color: '#8D95A4', fontSize: 10, marginTop: 5 },
  mineMessageTime: { color: '#D6D5F2' },
  replyChoice: { minHeight: 46, justifyContent: 'center', paddingHorizontal: 15, marginVertical: 4, borderRadius: 14, backgroundColor: 'rgba(30,37,67,0.48)', borderWidth: 1.75, borderColor: 'rgba(159,178,255,0.34)', borderTopColor: 'rgba(226,224,238,0.42)' },
  replyChoiceSelected: { backgroundColor: 'rgba(109,103,225,0.25)', borderColor: '#7771E8' },
  replyText: { color: '#ECEEFF', fontSize: 15 },
  profileRow: { minHeight: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(155,174,239,0.16)' },
  profileIcon: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  profileIconText: { color: '#B9C0CC', fontSize: 23 },
  profileCopy: { flex: 1 },
  profileTitle: { color: '#EEF0FF', fontSize: 15 },
  profileSubtitle: { color: '#8D95A4', fontSize: 12, marginTop: 2 },
  profileValue: { color: '#9CA4B2', fontSize: 14 },
  destructive: { color: '#FF8088' },
  chevron: { color: '#7E8797', fontSize: 25, marginLeft: 8 },
  pressed: { opacity: 0.72 },
  disabled: { opacity: 0.45 },
});

export default {
  GlassPanel,
  Avatar,
  IconButton,
  SearchField,
  SectionTitle,
  ChatRow,
  MessageBubble,
  ReplyChoice,
  ProfileRow,
};
