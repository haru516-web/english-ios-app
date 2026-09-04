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

export function GlassPanel({
  children,
  style,
  intensity = 30,
  tint = 'dark',
  borderColor = 'rgba(255,255,255,0.12)',
  testID,
}: GlassPanelProps) {
  const panelStyle = [styles.glassPanel, { borderColor }, style];
  return Platform.OS === 'web' ? (
    <View testID={testID} style={panelStyle}>{children}</View>
  ) : (
    <BlurView testID={testID} intensity={intensity} tint={tint} style={panelStyle}>
      {children}
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
  glassPanel: { backgroundColor: 'rgba(20,24,34,0.78)', borderWidth: StyleSheet.hairlineWidth, borderRadius: 22, overflow: 'hidden' },
  avatar: { alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  avatarText: { color: '#F7F8FC', fontWeight: '700' },
  iconButton: { alignItems: 'center', justifyContent: 'center', borderRadius: 22 },
  iconButtonGlass: { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.14)' },
  iconButtonAccent: { backgroundColor: '#6963D9' },
  iconFallback: { color: '#F5F7FB', fontSize: 22 },
  searchField: { height: 44, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.08)' },
  searchIcon: { color: '#B9C0CC', fontSize: 25, lineHeight: 25, marginRight: 7 },
  searchInput: { flex: 1, color: '#F5F7FB', fontSize: 16, paddingVertical: 0 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { color: '#F5F7FB', fontSize: 16, fontWeight: '700' },
  sectionAction: { color: '#938EFF', fontSize: 14, fontWeight: '600' },
  chatRow: { minHeight: 76, flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 18, backgroundColor: 'rgba(18,22,31,0.72)', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.09)' },
  chatCopy: { flex: 1, marginLeft: 12, minWidth: 0 },
  chatHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  chatName: { flex: 1, color: '#F5F7FB', fontSize: 16, fontWeight: '700' },
  chatTime: { color: '#8D95A4', fontSize: 12 },
  chatPreview: { color: '#AAB2C0', fontSize: 14, lineHeight: 20, marginTop: 3 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#7771E8', marginLeft: 9 },
  onlineDot: { backgroundColor: '#70D5A4' },
  messageLine: { alignItems: 'flex-start', marginVertical: 4 },
  mineLine: { alignItems: 'flex-end' },
  messageBubble: { maxWidth: '82%', paddingHorizontal: 14, paddingVertical: 11, borderRadius: 18, borderWidth: StyleSheet.hairlineWidth },
  theirBubble: { backgroundColor: 'rgba(33,38,49,0.82)', borderColor: 'rgba(255,255,255,0.08)', borderBottomLeftRadius: 5 },
  mineBubble: { backgroundColor: 'rgba(91,85,171,0.55)', borderColor: 'rgba(168,164,255,0.28)', borderBottomRightRadius: 5 },
  messageText: { color: '#F1F3F8', fontSize: 16, lineHeight: 22 },
  mineMessageText: { color: '#FFFFFF' },
  translationText: { color: '#B8C0CE', fontSize: 14, lineHeight: 19, marginTop: 5 },
  messageTime: { alignSelf: 'flex-end', color: '#8D95A4', fontSize: 10, marginTop: 5 },
  mineMessageTime: { color: '#D6D5F2' },
  replyChoice: { minHeight: 46, justifyContent: 'center', paddingHorizontal: 15, marginVertical: 4, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.1)' },
  replyChoiceSelected: { backgroundColor: 'rgba(109,103,225,0.25)', borderColor: '#7771E8' },
  replyText: { color: '#F1F3F8', fontSize: 15 },
  profileRow: { minHeight: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(255,255,255,0.08)' },
  profileIcon: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  profileIconText: { color: '#B9C0CC', fontSize: 23 },
  profileCopy: { flex: 1 },
  profileTitle: { color: '#F5F7FB', fontSize: 15 },
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
