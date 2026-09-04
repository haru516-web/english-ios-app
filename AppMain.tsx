import React, { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { PetWidget } from './src/PetWidget';

import {
  Character,
  CharacterId,
  ChatId,
  ChatSummary,
  Message,
  ReplyChoice,
  ReplyResponse,
  chatSummaries,
  characters,
  colors,
  getCharacter,
  getMessagesForChat,
  replyPrompts,
  spacing,
  typography,
} from './src/design';
import {
  Avatar,
  BottomTabs,
  ChatRow,
  GlassPanel,
  IconButton,
  MessageBubble,
  ProfileRow,
  ReplyChoice as ReplyChoiceButton,
  SearchField,
  SectionTitle,
} from './src/ui';

type TabKey = 'chats' | 'people' | 'me';

const initialFriends: CharacterId[] = ['jack', 'emma', 'oliver'];
const iconColor = colors.textSecondary;

function AppIcon({
  name,
  size = 20,
  color = iconColor,
}: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color?: string;
}) {
  return <Ionicons name={name} size={size} color={color} />;
}

function ScreenBackground({ children, petAvoidBottom = 126 }: { children: React.ReactNode; petAvoidBottom?: number }) {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.canvas}>
      <View pointerEvents="none" style={[styles.glow, width > 600 && styles.glowWide]} />
      <View style={[styles.phoneFrame, width > 560 && styles.desktopPhoneFrame]}>
        <StatusBar style="light" />
        <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
        <PetWidget avoidBottom={petAvoidBottom} />
      </View>
    </View>
  );
}

function MainHeader({ title, onCompose }: { title: string; onCompose?: () => void }) {
  return (
    <View style={styles.mainHeader}>
      <Text style={styles.displayTitle}>{title}</Text>
      {onCompose ? (
        <IconButton
          label="Find someone new"
          variant="glass"
          onPress={onCompose}
          icon={<AppIcon name="add" size={21} color={colors.textPrimary} />}
        />
      ) : null}
    </View>
  );
}

function StatusLine({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <View style={styles.statusLine}>
      <View style={styles.statusLineLeft}>{children}</View>
      {right}
    </View>
  );
}

function formatChatSummary(character: Character, summary?: ChatSummary): ChatSummary {
  return summary || {
    id: `chat-${character.id}` as ChatId,
    characterId: character.id,
    latestMessageId: `${character.id}-latest`,
    preview: 'Hey. I was thinking about you.',
    timeLabel: 'New',
    unreadCount: 0,
  };
}

function ChatsScreen({
  friends,
  search,
  setSearch,
  openChat,
  openPeople,
}: {
  friends: CharacterId[];
  search: string;
  setSearch: (value: string) => void;
  openChat: (id: CharacterId) => void;
  openPeople: () => void;
}) {
  const chats = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return friends
      .map((id) => {
        const character = getCharacter(id)!;
        return { character, summary: formatChatSummary(character, chatSummaries.find((item) => item.characterId === id)) };
      })
      .filter(({ character, summary }) => !normalized || `${character.name} ${summary.preview}`.toLowerCase().includes(normalized));
  }, [friends, search]);

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <MainHeader title="Chats" onCompose={openPeople} />
        <SearchField value={search} onChangeText={setSearch} />

        <StatusLine right={<Text style={styles.statusLineRight}>{friends.length} people</Text>}>
          <View style={styles.liveDot} />
          <Text style={styles.statusLineText}>Your inbox, as it happens</Text>
        </StatusLine>

        <View style={styles.chatList}>
          {chats.map(({ character, summary }) => (
            <ChatRow
              key={character.id}
              name={character.name}
              preview={summary.preview}
              time={summary.timeLabel}
              unread={summary.unreadCount > 0}
              online={summary.isOnline}
              onPress={() => openChat(character.id)}
              avatar={<Avatar name={character.name} initials={character.initials} colors={character.gradient} size={50} accessibilityLabel={`${character.name}'s avatar`} />}
              style={styles.chatRowSpacing}
            />
          ))}
          {chats.length === 0 ? (
            <GlassPanel style={styles.emptyPanel}>
              <AppIcon name="search-outline" size={22} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>No conversations found</Text>
              <Text style={styles.emptyCopy}>Try another name or meet someone new.</Text>
            </GlassPanel>
          ) : null}
        </View>

        <Pressable onPress={openPeople} accessibilityRole="button" accessibilityLabel="Meet someone new" style={({ pressed }) => [styles.discoverCard, pressed && styles.pressed]}>
          <View style={styles.discoverIcon}><AppIcon name="sparkles-outline" size={19} color="#C9C7FF" /></View>
          <View style={styles.discoverCopy}>
            <Text style={styles.discoverTitle}>Meet someone new</Text>
            <Text style={styles.discoverSubtitle}>A different voice. A different everyday life.</Text>
          </View>
          <AppIcon name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

function FriendCard({ character, onPress }: { character: Character; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`Open ${character.name}'s profile`} style={({ pressed }) => [styles.friendCard, pressed && styles.pressed]}>
      <Avatar name={character.name} initials={character.initials} colors={character.gradient} size={58} />
      <View style={styles.friendCardNameRow}>
        <Text style={styles.friendCardName}>{character.name}</Text>
        <View style={styles.friendOnlineDot} />
      </View>
      <Text style={styles.friendCardLocation}>{character.location}</Text>
    </Pressable>
  );
}

function PeopleScreen({
  friends,
  search,
  setSearch,
  openChat,
  meet,
}: {
  friends: CharacterId[];
  search: string;
  setSearch: (value: string) => void;
  openChat: (id: CharacterId) => void;
  meet: (id: CharacterId) => void;
}) {
  const normalized = search.trim().toLowerCase();
  const connected = characters.filter((character) => friends.includes(character.id));
  const suggestions = characters.filter((character) => !friends.includes(character.id) && (!normalized || `${character.name} ${character.location} ${character.bio}`.toLowerCase().includes(normalized)));

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <MainHeader title="People" />
        <SearchField value={search} onChangeText={setSearch} />

        <SectionTitle title="Your friends" actionLabel="See all" onActionPress={() => setSearch('')} style={styles.peopleSectionTitle} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.friendRail}>
          {connected.map((character) => <FriendCard key={character.id} character={character} onPress={() => openChat(character.id)} />)}
        </ScrollView>

        <SectionTitle title="Meet new people" style={styles.peopleSectionTitleLarge} />
        <View style={styles.peopleList}>
          {suggestions.map((character) => (
            <GlassPanel key={character.id} style={styles.personCard}>
              <Avatar name={character.name} initials={character.initials} colors={character.gradient} size={50} />
              <View style={styles.personCopy}>
                <View style={styles.personNameRow}>
                  <Text style={styles.personName}>{character.name}</Text>
                  <Text style={styles.personMeta}>{character.location} · {character.age}</Text>
                </View>
                <Text style={styles.personBio} numberOfLines={2}>{character.bio}</Text>
              </View>
              <Pressable onPress={() => meet(character.id)} accessibilityRole="button" accessibilityLabel={`Meet ${character.name}`} style={({ pressed }) => [styles.meetButton, pressed && styles.pressed]}>
                <Text style={styles.meetButtonText}>Meet</Text>
              </Pressable>
            </GlassPanel>
          ))}
          {suggestions.length === 0 ? <Text style={styles.emptyPeople}>Everyone here already knows you.</Text> : null}
        </View>

        <Text style={styles.peopleFooter}>New connections begin quietly. Give it a little time.</Text>
      </ScrollView>
    </View>
  );
}

function MeScreen({
  notificationsEnabled,
  toggleNotifications,
  showToast,
}: {
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  showToast: (message: string) => void;
}) {
  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <MainHeader title="Me" />

        <GlassPanel style={styles.profileCard} intensity={36}>
          <View style={styles.profileCardTop}>
            <View style={styles.profileAvatarWrap}>
              <Avatar name="Aiko" initials="A" colors={['#7B75E8', '#293A63']} size={66} />
              <View style={styles.profileAvailableDot} />
            </View>
            <View style={styles.profileCardCopy}>
              <Text style={styles.profileName}>Aiko</Text>
              <Text style={styles.profileHandle}>Tokyo · keeping life interesting</Text>
              <Text style={styles.profileStatus}>Available for a conversation</Text>
            </View>
            <AppIcon name="chevron-forward" size={18} color={colors.textMuted} />
          </View>
        </GlassPanel>

        <SectionTitle title="Preferences" style={styles.settingsTitle} />
        <GlassPanel style={styles.settingsPanel}>
          <ProfileRow title="Notifications" value={notificationsEnabled ? 'On' : 'Off'} icon={<AppIcon name="notifications-outline" color="#B8B5FF" />} onPress={toggleNotifications} />
          <ProfileRow title="Appearance" value="Dark" icon={<AppIcon name="moon-outline" />} onPress={() => showToast('Dark mode keeps the conversation close.')} />
          <ProfileRow title="App lock" value="Face ID" icon={<AppIcon name="lock-closed-outline" />} onPress={() => showToast('Face ID is ready when you are.')} />
        </GlassPanel>

        <SectionTitle title="How it feels" style={styles.settingsTitle} />
        <GlassPanel style={styles.settingsPanel}>
          <ProfileRow title="Chat tone" value="Type A" icon={<AppIcon name="chatbubble-ellipses-outline" />} onPress={() => showToast('Type A · warm and unhurried.')} />
          <ProfileRow title="Quiet hours" value="Off" icon={<AppIcon name="moon-outline" />} onPress={() => showToast('Quiet hours are off.')} />
          <ProfileRow title="Connected people" value="Manage" icon={<AppIcon name="people-outline" />} onPress={() => showToast('Your people are all here.')} />
        </GlassPanel>

        <View style={styles.meFooter}>
          <View style={styles.meFooterMark}><AppIcon name="chatbubble-ellipses" size={15} color="#B9B6FF" /></View>
          <Text style={styles.meFooterText}>A little English, hidden inside a real conversation.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function TypingIndicator() {
  return (
    <View style={styles.typingLine}>
      <View style={styles.typingBubble}>
        <View style={styles.typingDot} />
        <View style={styles.typingDot} />
        <View style={styles.typingDot} />
      </View>
    </View>
  );
}

function getTranslationText(message: Message, step: number) {
  if (!message.translation) return message.text;
  const english = message.translation.english;
  const japanese = message.translation.japanese;
  const mode = step % 6;
  const englishIndexes = mode === 0 || mode === 4 ? english.map((_, index) => index) : mode === 2 ? [0] : mode === 3 ? [0, 1] : [];
  return english.map((line, index) => englishIndexes.includes(index) ? line : japanese[index] ?? line).join('\n');
}

function normalizeReplyText(value: string) {
  return value
    .normalize('NFKC')
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9\s']/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function getReplyEditDistance(first: string, second: string) {
  let previousRow = Array.from({ length: second.length + 1 }, (_, index) => index);
  for (let row = 1; row <= first.length; row += 1) {
    const currentRow = [row];
    for (let column = 1; column <= second.length; column += 1) {
      currentRow[column] = Math.min(
        currentRow[column - 1] + 1,
        previousRow[column] + 1,
        previousRow[column - 1] + (first[row - 1] === second[column - 1] ? 0 : 1),
      );
    }
    previousRow = currentRow;
  }
  return previousRow[second.length];
}

function isAcceptableReply(draft: string, expected: string) {
  const typed = normalizeReplyText(draft);
  const target = normalizeReplyText(expected);
  if (!typed || !target) return false;
  const allowedDistance = Math.max(1, Math.min(4, Math.round(target.length * 0.1)));
  return getReplyEditDistance(typed, target) <= allowedDistance;
}
function ChatDetailScreen({
  character,
  sentMessages,
  translationSteps,
  selectedReply,
  draft,
  setDraft,
  onBack,
  onTranslate,
  onSelectReply,
  onSend,
  canSend,
}: {
  character: Character;
  sentMessages: Message[];
  translationSteps: Record<string, number>;
  selectedReply: ReplyChoice | null;
  draft: string;
  setDraft: (value: string) => void;
  onBack: () => void;
  onTranslate: (messageId: string) => void;
  onSelectReply: (choice: ReplyChoice, promptId: string) => void;
  onSend: () => void;
  canSend: boolean;
}) {
  const chatId = `chat-${character.id}` as ChatId;
  const baseMessages = getMessagesForChat(chatId);
  const threadMessages = baseMessages.length ? baseMessages : [{
    id: `${character.id}-hello`,
    chatId,
    sender: 'character' as const,
    text: `Hey. I wasn't sure if I should text first.`,
    timestamp: 'now',
    translation: { english: [`Hey. I wasn't sure if I should text first.`], japanese: ['ねえ。先に連絡していいのか迷ってた。'] },
  }];
  const allMessages = [...threadMessages, ...sentMessages.filter((message) => message.chatId === chatId)];
  const isJack = character.id === 'jack';
  const latestMessage = allMessages[allMessages.length - 1];
  const prompt = latestMessage?.sender === 'character' ? replyPrompts.find((item) => item.messageId === latestMessage.id) : undefined;
  const canShowReplyPrompt = Boolean(prompt && isJack && latestMessage?.sender === 'character');
  const isWaitingForCharacter = Boolean(isJack && latestMessage?.sender === 'user');

  return (
    <KeyboardAvoidingView style={styles.chatScreen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.chatTopBar}>
        <IconButton label="Back to chats" onPress={onBack} icon={<AppIcon name="arrow-back" size={23} color={colors.textPrimary} />} />
        <View style={styles.chatIdentity}>
          <View>
            <Avatar name={character.name} initials={character.initials} colors={character.gradient} size={38} />
            <View style={styles.chatOnlineDot} />
          </View>
          <View style={styles.chatIdentityCopy}>
            <Text style={styles.chatIdentityName}>{character.name}</Text>
            <Text style={styles.chatIdentityStatus}>{isJack ? 'Online now' : character.tone}</Text>
          </View>
        </View>
        <IconButton label="More options" icon={<AppIcon name="ellipsis-horizontal" size={23} color={colors.textPrimary} />} />
      </View>

      <ScrollView style={styles.messageScroll} contentContainerStyle={styles.messageContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.dateDivider}><View style={styles.dateLine} /><Text style={styles.dateText}>Today</Text><View style={styles.dateLine} /></View>
        {allMessages.map((message) => (
          <MessageBubble
            key={message.id}
            text={getTranslationText(message, translationSteps[message.id] || 0)}
            time={message.timestamp}
            isMine={message.sender === 'user'}
            onPress={message.translation ? () => onTranslate(message.id) : undefined}
          />
        ))}
        {isWaitingForCharacter ? <TypingIndicator /> : null}
      </ScrollView>

      <View style={styles.replyDock}>
        {canShowReplyPrompt && prompt ? (
          <View style={styles.replyDockHeader}>
            <Text style={styles.replyDockTitle}>What do you want to say?</Text>
            <Text style={styles.replyDockHint}>Choose your meaning</Text>
          </View>
        ) : null}
        {canShowReplyPrompt && prompt ? (
          <ScrollView
            style={styles.replyChoices}
            contentContainerStyle={styles.replyChoicesContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
          >
            {prompt.choices.map((choice) => (
              <ReplyChoiceButton key={choice.id} text={choice.japanese} selected={selectedReply?.id === choice.id} onPress={() => onSelectReply(choice, prompt.messageId)} />
            ))}
          </ScrollView>
        ) : null}
        {selectedReply ? (
          <GlassPanel style={styles.englishSuggestion}>
            <Text style={styles.suggestionLabel}>Your English</Text>
            <Text style={styles.suggestionText}>{selectedReply.english}</Text>
          </GlassPanel>
        ) : null}
        <View style={styles.composerRow}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            editable={Boolean(selectedReply)}
            placeholder={selectedReply ? 'Type the phrase above…' : 'Choose a reply first'}
            placeholderTextColor={colors.textMuted}
            style={styles.composerInput}
            accessibilityLabel="Type your English reply"
            multiline
          />
          <IconButton
            label="Send message"
            variant="accent"
            disabled={!canSend}
            onPress={onSend}
            icon={<AppIcon name="arrow-up" size={21} color={colors.white} />}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default function AppMain() {
  const [activeTab, setActiveTab] = useState<TabKey>('chats');
  const [activeCharacterId, setActiveCharacterId] = useState<CharacterId | null>(null);
  const [friends, setFriends] = useState<CharacterId[]>(initialFriends);
  const [search, setSearch] = useState('');
  const [translationSteps, setTranslationSteps] = useState<Record<string, number>>({});
  const [selectedReply, setSelectedReply] = useState<ReplyChoice | null>(null);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [pendingJackReply, setPendingJackReply] = useState<ReplyResponse | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const reply = pendingJackReply;
    if (!reply || activeCharacterId !== 'jack') return undefined;
    const timer = setTimeout(() => {
      setSentMessages((current) => [...current, {
        ...reply,
        chatId: 'chat-jack' as ChatId,
        sender: 'character' as const,
        isRead: false,
      }]);
      setPendingJackReply(null);
    }, 1400);
    return () => clearTimeout(timer);
  }, [activeCharacterId, pendingJackReply]);

  const activeCharacter = activeCharacterId ? getCharacter(activeCharacterId) : undefined;
  const canSend = Boolean(selectedReply && isAcceptableReply(draft, selectedReply.english));

  const openChat = (id: CharacterId) => {
    setActiveCharacterId(id);
    setActiveTab('chats');
    setSearch('');
    setSelectedReply(null);
    setSelectedPromptId(null);
    setPendingJackReply(null);
    setDraft('');
  };

  const openPeople = () => {
    setActiveCharacterId(null);
    setActiveTab('people');
    setSearch('');
  };

  const meet = (id: CharacterId) => {
    setFriends((current) => current.includes(id) ? current : [...current, id]);
    const character = getCharacter(id);
    setToast(`${character?.name} will text you soon.`);
  };

  const selectReply = (choice: ReplyChoice, promptId: string) => {
    setSelectedReply(choice);
    setSelectedPromptId(promptId);
    setDraft('');
  };

  const sendReply = () => {
    if (!activeCharacterId || !selectedReply || !canSend) return;
    const chatId = `chat-${activeCharacterId}` as ChatId;
    const prompt = selectedPromptId ? replyPrompts.find((item) => item.messageId === selectedPromptId) : undefined;
    const response = prompt?.responses[selectedReply.id];
    setSentMessages((current) => [...current, {
      id: `local-${Date.now()}`,
      chatId,
      sender: 'user',
      text: draft.trim(),
      timestamp: 'now',
      isRead: true,
    }]);
    setPendingJackReply(response ?? null);
    setSelectedReply(null);
    setSelectedPromptId(null);
    setDraft('');
    setToast('Sent');
  };

  const toggleTranslation = (messageId: string) => {
    setTranslationSteps((current) => ({ ...current, [messageId]: ((current[messageId] || 0) + 1) % 6 }));
  };

  const showToast = (message: string) => setToast(message);

  return (
    <ScreenBackground petAvoidBottom={activeCharacter ? 260 : 126}>
      {activeCharacter ? (
        <ChatDetailScreen
          character={activeCharacter}
          sentMessages={sentMessages}
          translationSteps={translationSteps}
          selectedReply={selectedReply}
          draft={draft}
          setDraft={setDraft}
          onBack={() => setActiveCharacterId(null)}
          onTranslate={toggleTranslation}
          onSelectReply={selectReply}
          onSend={sendReply}
          canSend={canSend}
        />
      ) : (
        <View style={styles.appBody}>
          {activeTab === 'chats' ? <ChatsScreen friends={friends} search={search} setSearch={setSearch} openChat={openChat} openPeople={openPeople} /> : null}
          {activeTab === 'people' ? <PeopleScreen friends={friends} search={search} setSearch={setSearch} openChat={openChat} meet={meet} /> : null}
          {activeTab === 'me' ? <MeScreen notificationsEnabled={notificationsEnabled} toggleNotifications={() => setNotificationsEnabled((value) => !value)} showToast={showToast} /> : null}
          <BottomTabs activeKey={activeTab} onChange={(key) => { setActiveTab(key as TabKey); setSearch(''); }} style={styles.bottomTabs} tabs={[
            { key: 'chats', label: 'Chats', icon: <AppIcon name="chatbubble-ellipses-outline" size={22} color={activeTab === 'chats' ? colors.textPrimary : colors.textSecondary} /> },
            { key: 'people', label: 'People', icon: <AppIcon name="people-outline" size={22} color={activeTab === 'people' ? colors.textPrimary : colors.textSecondary} /> },
            { key: 'me', label: 'Me', icon: <AppIcon name="person-outline" size={22} color={activeTab === 'me' ? colors.textPrimary : colors.textSecondary} /> },
          ]} />
        </View>
      )}
      {toast ? <View pointerEvents="none" style={styles.toast}><AppIcon name="checkmark-circle" size={16} color="#9DF0C8" /><Text style={styles.toastText}>{toast}</Text></View> : null}
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  canvas: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#020307' },
  glow: { position: 'absolute', width: 410, height: 410, borderRadius: 205, backgroundColor: 'rgba(87,78,204,0.11)', top: -170, right: -160 },
  glowWide: { width: 620, height: 620, borderRadius: 310, top: -260, right: -260 },
  phoneFrame: { flex: 1, width: '100%', maxWidth: 430, backgroundColor: colors.background, overflow: 'hidden' },
  desktopPhoneFrame: { borderRadius: 42, borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)', marginVertical: 18, maxHeight: 900, shadowColor: '#000', shadowOpacity: 0.45, shadowRadius: 40, shadowOffset: { width: 0, height: 22 }, elevation: 16 },
  safeArea: { flex: 1 },
  appBody: { flex: 1 },
  screen: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.screen, paddingTop: 12, paddingBottom: 118 },
  mainHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 58, marginBottom: 10 },
  displayTitle: { ...typography.display, color: colors.textPrimary, letterSpacing: -0.8 },
  statusLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 17, marginBottom: 15, paddingHorizontal: 2 },
  statusLineLeft: { flexDirection: 'row', alignItems: 'center' },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.success, marginRight: 7, shadowColor: colors.success, shadowOpacity: 0.7, shadowRadius: 5 },
  statusLineText: { color: colors.textSecondary, fontSize: 12 },
  statusLineRight: { color: colors.textMuted, fontSize: 12 },
  chatList: { gap: 9 },
  chatRowSpacing: { marginBottom: 0 },
  emptyPanel: { minHeight: 160, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 24, marginTop: 4 },
  emptyTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '700', marginTop: 10 },
  emptyCopy: { color: colors.textMuted, fontSize: 13, marginTop: 5, textAlign: 'center' },
  discoverCard: { flexDirection: 'row', alignItems: 'center', marginTop: 18, padding: 15, borderRadius: 19, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(141,137,255,0.28)', backgroundColor: 'rgba(88,82,182,0.14)' },
  discoverIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: 'rgba(134,128,255,0.16)', marginRight: 12 },
  discoverCopy: { flex: 1 },
  discoverTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  discoverSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 3 },
  friendRail: { gap: 10, paddingBottom: 2 },
  friendCard: { width: 112, minHeight: 128, alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 20, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(20,24,34,0.77)' },
  friendCardNameRow: { flexDirection: 'row', alignItems: 'center', marginTop: 9 },
  friendCardName: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  friendOnlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accentBlue, marginLeft: 5 },
  friendCardLocation: { color: colors.textMuted, fontSize: 11, marginTop: 3 },
  peopleSectionTitle: { marginTop: 26, marginBottom: 11 },
  peopleSectionTitleLarge: { marginTop: 27, marginBottom: 11 },
  peopleList: { gap: 9 },
  personCard: { minHeight: 84, flexDirection: 'row', alignItems: 'center', padding: 11, borderRadius: 18 },
  personCopy: { flex: 1, minWidth: 0, marginHorizontal: 11 },
  personNameRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  personName: { color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  personMeta: { color: colors.textMuted, fontSize: 11 },
  personBio: { color: colors.textSecondary, fontSize: 12, lineHeight: 17, marginTop: 4 },
  meetButton: { minWidth: 57, minHeight: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 12 },
  meetButtonText: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' },
  emptyPeople: { color: colors.textMuted, textAlign: 'center', paddingVertical: 28 },
  peopleFooter: { color: colors.textMuted, fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 26, paddingHorizontal: 30 },
  profileCard: { padding: 16, borderRadius: 24 },
  profileCardTop: { flexDirection: 'row', alignItems: 'center' },
  profileAvatarWrap: { position: 'relative' },
  profileAvailableDot: { position: 'absolute', width: 12, height: 12, borderRadius: 6, right: 0, bottom: 1, backgroundColor: colors.success, borderWidth: 2, borderColor: colors.surface },
  profileCardCopy: { flex: 1, marginLeft: 13 },
  profileName: { color: colors.textPrimary, fontSize: 20, fontWeight: '700' },
  profileHandle: { color: colors.textSecondary, fontSize: 12, marginTop: 3 },
  profileStatus: { color: colors.success, fontSize: 11, marginTop: 7 },
  settingsTitle: { marginTop: 26, marginBottom: 10 },
  settingsPanel: { borderRadius: 20 },
  meFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 28, paddingHorizontal: 28 },
  meFooterMark: { width: 28, height: 28, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft, marginRight: 9 },
  meFooterText: { flex: 1, color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  chatScreen: { flex: 1 },
  chatTopBar: { minHeight: 64, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 11, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.divider },
  chatIdentity: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 3 },
  chatIdentityCopy: { marginLeft: 10 },
  chatIdentityName: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
  chatIdentityStatus: { color: colors.success, fontSize: 11, marginTop: 2 },
  chatOnlineDot: { position: 'absolute', width: 9, height: 9, borderRadius: 5, right: -1, bottom: 0, borderWidth: 2, borderColor: colors.background, backgroundColor: colors.success },
  messageScroll: { flex: 1 },
  messageContent: { paddingHorizontal: 20, paddingTop: 17, paddingBottom: 14 },
  dateDivider: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 10 },
  dateLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.divider },
  dateText: { color: colors.textMuted, fontSize: 11 },
  typingLine: { alignItems: 'flex-start', marginTop: 5 },
  typingBubble: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 14, paddingVertical: 13, borderRadius: 18, borderBottomLeftRadius: 5, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.glassBorder, backgroundColor: 'rgba(33,38,49,0.82)' },
  typingDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#B0B6C6' },
  replyDock: { paddingHorizontal: 15, paddingTop: 11, paddingBottom: Platform.OS === 'ios' ? 8 : 10, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.divider, backgroundColor: 'rgba(5,7,11,0.92)' },
  replyDockHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7, paddingHorizontal: 2 },
  replyDockTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' },
  replyDockHint: { color: colors.textMuted, fontSize: 11 },
  replyChoices: { maxHeight: 184, marginBottom: 2 },
  replyChoicesContent: { gap: 2, paddingBottom: 2 },
  englishSuggestion: { paddingHorizontal: 12, paddingVertical: 9, borderRadius: 14, marginTop: 6, marginBottom: 7, borderColor: 'rgba(144,139,255,0.36)', backgroundColor: 'rgba(98,91,193,0.17)' },
  suggestionLabel: { color: '#AEA9FF', fontSize: 10, fontWeight: '700', marginBottom: 3, letterSpacing: 0.5 },
  suggestionText: { color: colors.textPrimary, fontSize: 14, lineHeight: 19 },
  composerRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginTop: 3 },
  composerInput: { flex: 1, minHeight: 45, maxHeight: 92, borderRadius: 17, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.13)', backgroundColor: 'rgba(255,255,255,0.07)', color: colors.textPrimary, fontSize: 15, lineHeight: 20, paddingHorizontal: 14, paddingTop: 12, paddingBottom: 10 },
  bottomTabs: { position: 'absolute', left: 15, right: 15, bottom: Platform.OS === 'ios' ? 8 : 12, zIndex: 10 },
  toast: { position: 'absolute', left: 28, right: 28, bottom: Platform.OS === 'ios' ? 91 : 95, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 38, paddingHorizontal: 15, borderRadius: 19, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(157,240,200,0.26)', backgroundColor: 'rgba(14,29,27,0.94)' },
  toastText: { color: '#DFFFEF', fontSize: 13, fontWeight: '600', marginLeft: 7 },
  pressed: { opacity: 0.72 },
});
