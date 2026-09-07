import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Image,
  Modal,
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
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { DEFAULT_PET_ID, PetWidget } from './src/PetWidget';
import { RadialNavigationMenu } from './src/RadialNavigationMenu';
import { getPetCharacter, PET_CHARACTERS, type PetCharacter, type PetId } from './src/petCatalog';
import { characterStreetVisuals } from './src/characterVisuals';
import { getCharacterProfile } from './src/characterProfiles';

import {
  Character,
  CharacterId,
  ChatId,
  ChatSummary,
  Message,
  ReplyChoice,
  chatSummaries,
  characters,
  colors,
  getCharacter,
  spacing,
  typography,
} from './src/design';
import { buildConversationReply, getConversationRound, RELATIONSHIP_ROUND_COUNT, type ConversationHistory, type UserGender } from './src/relationshipConversations';
import {
  Avatar,
  ChatRow,
  GlassPanel,
  IconButton,
  MessageBubble,
  ProfileRow,
  ReplyChoice as ReplyChoiceButton,
  SearchField,
  SectionTitle,
} from './src/ui';

type TabKey = 'chats' | 'people' | 'me' | 'pets';
type AppearanceMode = 'black' | 'midnight';

type PendingConversationReply = {
  characterId: CharacterId;
  reply: NonNullable<ReturnType<typeof buildConversationReply>>;
};

const initialFriends: CharacterId[] = characters.map((character) => character.id);
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

function ScreenBackground({
  children,
  petAvoidBottom = 126,
  appearanceMode = 'black',
  navigationPetPickerOpen = false,
  onNavigationPetPickerClose,
  hideFloatingPet = false,
  selectedPetId,
  onSelectedPetChange,
}: {
  children: React.ReactNode;
  petAvoidBottom?: number;
  appearanceMode?: AppearanceMode;
  navigationPetPickerOpen?: boolean;
  onNavigationPetPickerClose?: () => void;
  hideFloatingPet?: boolean;
  selectedPetId?: PetId;
  onSelectedPetChange?: (id: PetId) => void;
}) {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.canvas}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill} />
      <View style={[styles.phoneFrame, appearanceMode === 'midnight' && styles.midnightPhoneFrame, width > 560 && styles.desktopPhoneFrame]}>
        <View pointerEvents="none" style={StyleSheet.absoluteFill} />
        <StatusBar style="light" />
        <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
        <PetWidget
          avoidBottom={petAvoidBottom}
          navigationPickerOpen={navigationPetPickerOpen}
          onNavigationPickerClose={onNavigationPetPickerClose}
          hideFloatingPet={hideFloatingPet}
          selectedPetId={selectedPetId}
          onSelectedPetChange={onSelectedPetChange}
        />
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
  openChat,
  openPeople,
}: {
  friends: CharacterId[];
  openChat: (id: CharacterId) => void;
  openPeople: () => void;
}) {
  const chats = useMemo(() => friends.map((id) => {
    const character = getCharacter(id)!;
    return { character, summary: formatChatSummary(character, chatSummaries.find((item) => item.characterId === id)) };
  }), [friends]);

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <MainHeader title="Chats" />

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
              avatar={<Avatar name={character.name} initials={character.initials} colors={character.gradient} source={characterStreetVisuals[character.id]} size={50} accessibilityLabel={`${character.name}'s avatar`} />}
              style={styles.chatRowSpacing}
            />
          ))}

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
      <Avatar name={character.name} initials={character.initials} colors={character.gradient} source={characterStreetVisuals[character.id]} size={66} />
      <View style={styles.friendCardNameRow}>
        <Text style={styles.friendCardName}>{character.name}</Text>
        <View style={styles.friendOnlineDot} />
      </View>
      <Text style={styles.friendCardLocation}>{character.location}</Text>
    </Pressable>
  );
}

function AllFriendRow({ character, onPress }: { character: Character; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`Open ${character.name}'s profile`} style={({ pressed }) => [styles.allFriendRow, pressed && styles.pressed]}>
      <Avatar name={character.name} initials={character.initials} colors={character.gradient} source={characterStreetVisuals[character.id]} size={44} />
      <View style={styles.allFriendCopy}>
        <Text style={styles.allFriendName}>{character.name}</Text>
        <Text style={styles.allFriendMeta}>{character.location} · {character.tone}</Text>
      </View>
      <AppIcon name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

function ProfileInfoSection({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label + ': ' + value}
      accessibilityHint="Tap to switch the profile language"
      onPress={onPress}
      style={({ pressed }) => [styles.profileModalInfoCard, pressed && styles.profileModalInfoCardPressed]}
    >
      <Text style={styles.profileModalDetailLabel}>{label}</Text>
      <Text style={styles.profileModalDetailValue}>{value}</Text>
    </Pressable>
  );
}

function FriendProfileModal({
  character,
  isConnected,
  onClose,
  onOpenChat,
  onMeet,
}: {
  character: Character | null;
  isConnected: boolean;
  onClose: () => void;
  onOpenChat: () => void;
  onMeet: () => void;
}) {
  const [profileLanguage, setProfileLanguage] = useState<'en' | 'ja'>('en');

  useEffect(() => {
    setProfileLanguage('en');
  }, [character?.id]);

  const profile = character ? getCharacterProfile(character.id) : null;
  const isJapanese = profileLanguage === 'ja';
  const toggleProfileLanguage = useCallback(() => {
    setProfileLanguage((current) => current === 'en' ? 'ja' : 'en');
  }, []);

  if (!character || !profile) return null;

  const localized = (value: { en: string; ja: string }) => value[profileLanguage];
  const labels = isJapanese ? {
    streetProfile: 'プロフィール',
    inCircle: 'あなたのフレンド',
    newPerson: '新しいフレンド',
    connected: '接続済み',
    notConnected: '未接続',
    language: '英語で表示',
    languageHint: 'タップして英語に戻す',
    closeProfile: 'プロフィールを閉じる',
    close: '閉じる',
    message: 'メッセージ',
    meet: '会ってみる',
    about: '概要',
    model: 'モデル',
    birthday: '誕生日',
    origin: '出生地・居住地',
    role: '仕事',
    education: '学歴',
    personality: '性格',
    innerWorld: '内面の欲求と恐れ',
    family: '家族構成',
    friends: '友人関係',
    hobbies: '趣味',
    relationship: '人間関係',
    conversation: '会話スタイル',
    growth: '成長軸',
  } : {
    streetProfile: 'STREET PROFILE',
    inCircle: 'IN YOUR CIRCLE',
    newPerson: 'NEW PERSON',
    connected: 'Connected',
    notConnected: 'Not connected yet',
    language: '日本語で表示',
    languageHint: 'Tap to switch back to Japanese',
    closeProfile: 'Close profile',
    close: 'Close',
    message: 'Message',
    meet: 'Meet',
    about: 'ABOUT',
    model: 'MODEL',
    birthday: 'BIRTHDAY',
    origin: 'ORIGIN',
    role: 'ROLE',
    education: 'EDUCATION',
    personality: 'PERSONALITY',
    innerWorld: 'INNER WORLD',
    family: 'FAMILY',
    friends: 'FRIENDS',
    hobbies: 'HOBBIES',
    relationship: 'RELATIONSHIPS',
    conversation: 'CONVERSATION STYLE',
    growth: 'GROWTH',
  };

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.profileModalRoot}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={labels.closeProfile}
          onPress={onClose}
          style={StyleSheet.absoluteFillObject}
        />
        <GlassPanel style={styles.profileModalCard} intensity={58} borderColor="rgba(185,199,255,0.62)">
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={styles.profileModalScroll}
            contentContainerStyle={styles.profileModalScrollContent}
          >
            {characterStreetVisuals[character.id] ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={character.name + ' profile image. ' + labels.languageHint}
                accessibilityHint={labels.languageHint}
                onPress={toggleProfileLanguage}
                style={({ pressed }) => [styles.profileModalHero, pressed && styles.profileModalHeroPressed]}
              >
                <Image
                  source={characterStreetVisuals[character.id]}
                  resizeMode="cover"
                  style={styles.profileModalHeroBackdrop}
                />
                <LinearGradient
                  pointerEvents="none"
                  colors={['rgba(14,20,40,0.22)', 'rgba(14,20,40,0.06)', 'rgba(14,20,40,0.2)']}
                  style={StyleSheet.absoluteFillObject}
                />
                <Image
                  accessibilityLabel={character.name + ' street profile'}
                  source={characterStreetVisuals[character.id]}
                  resizeMode="contain"
                  style={styles.profileModalHeroImage}
                />
                <LinearGradient
                  pointerEvents="none"
                  colors={['rgba(14,20,40,0)', 'rgba(14,20,40,0.04)', 'rgba(14,20,40,0.64)']}
                  locations={[0, 0.72, 1]}
                  style={StyleSheet.absoluteFillObject}
                />
                <View pointerEvents="none" style={styles.profileModalHeroBadge}>
                  <AppIcon name="sparkles-outline" size={12} color="#D8D2FF" />
                  <Text style={styles.profileModalHeroBadgeText}>{labels.streetProfile}</Text>
                </View>
              </Pressable>
            ) : null}
            <View style={styles.profileModalBody}>
              <View style={styles.profileModalHeader}>
                <View style={styles.profileModalAvatarWrap}>
                  <Avatar name={character.name} initials={character.initials} colors={character.gradient} source={characterStreetVisuals[character.id]} size={82} />
                  <View style={styles.profileModalOnlineDot} />
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={character.name + ' profile summary. ' + labels.languageHint}
                  accessibilityHint={labels.languageHint}
                  onPress={toggleProfileLanguage}
                  style={({ pressed }) => [styles.profileModalIdentity, pressed && styles.profileModalIdentityPressed]}
                >
                  <Text style={styles.profileModalEyebrow}>{isConnected ? labels.inCircle : labels.newPerson}</Text>
                  <Text style={styles.profileModalName}>{character.name}</Text>
                  <Text style={styles.profileModalMeta}>{character.location} · {character.age}</Text>
                  <View style={[styles.profileModalStatus, isConnected && styles.profileModalStatusConnected]}>
                    <View style={styles.profileModalStatusDot} />
                    <Text style={styles.profileModalStatusText}>{isConnected ? labels.connected : labels.notConnected}</Text>
                  </View>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={labels.closeProfile}
                  onPress={onClose}
                  style={({ pressed }) => [styles.profileModalClose, pressed && styles.pressed]}
                >
                  <AppIcon name="close" size={20} color={colors.textSecondary} />
                </Pressable>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={labels.about + '. ' + labels.languageHint}
                accessibilityHint={labels.languageHint}
                onPress={toggleProfileLanguage}
                style={({ pressed }) => [styles.profileModalAbout, pressed && styles.profileModalAboutPressed]}
              >
                <Text style={styles.profileModalSectionLabel}>{labels.about}</Text>
                <Text style={styles.profileModalBio}>{localized(profile.about)}</Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={labels.language}
                accessibilityHint={labels.languageHint}
                onPress={toggleProfileLanguage}
                style={({ pressed }) => [styles.profileModalLanguageToggle, pressed && styles.pressed]}
              >
                <AppIcon name="language-outline" size={15} color="#C8C2FF" />
                <Text style={styles.profileModalLanguageText}>{labels.language}</Text>
                <Text style={styles.profileModalLanguageHint}>{labels.languageHint}</Text>
              </Pressable>

              <View style={styles.profileModalDetails}>
                <ProfileInfoSection label={labels.model} value={localized(profile.model)} onPress={toggleProfileLanguage} />
                <ProfileInfoSection label={labels.birthday} value={localized(profile.birthday)} onPress={toggleProfileLanguage} />
                <ProfileInfoSection label={labels.origin} value={localized(profile.origin)} onPress={toggleProfileLanguage} />
                <ProfileInfoSection label={labels.role} value={localized(profile.role)} onPress={toggleProfileLanguage} />
                <ProfileInfoSection label={labels.education} value={localized(profile.education)} onPress={toggleProfileLanguage} />
                <ProfileInfoSection label={labels.personality} value={localized(profile.personality)} onPress={toggleProfileLanguage} />
                <ProfileInfoSection label={labels.innerWorld} value={localized(profile.innerWorld)} onPress={toggleProfileLanguage} />
                <ProfileInfoSection label={labels.family} value={localized(profile.family)} onPress={toggleProfileLanguage} />
                <ProfileInfoSection label={labels.friends} value={localized(profile.friends)} onPress={toggleProfileLanguage} />
                <ProfileInfoSection label={labels.hobbies} value={localized(profile.hobbies)} onPress={toggleProfileLanguage} />
                <ProfileInfoSection label={labels.relationship} value={localized(profile.relationship)} onPress={toggleProfileLanguage} />
                <ProfileInfoSection label={labels.conversation} value={localized(profile.conversation)} onPress={toggleProfileLanguage} />
                <ProfileInfoSection label={labels.growth} value={localized(profile.growth)} onPress={toggleProfileLanguage} />
              </View>

              <View style={styles.profileModalActions}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={labels.closeProfile}
                  onPress={onClose}
                  style={({ pressed }) => [styles.profileModalButton, styles.profileModalButtonSecondary, pressed && styles.pressed]}
                >
                  <Text style={styles.profileModalButtonSecondaryText}>{labels.close}</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={(isConnected ? labels.message : labels.meet) + ' ' + character.name}
                  onPress={isConnected ? onOpenChat : onMeet}
                  style={({ pressed }) => [styles.profileModalButton, styles.profileModalButtonPrimary, pressed && styles.pressed]}
                >
                  <AppIcon name={isConnected ? 'chatbubble-ellipses-outline' : 'sparkles-outline'} size={16} color={colors.white} />
                  <Text style={styles.profileModalButtonPrimaryText}>{isConnected ? labels.message : labels.meet}</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </GlassPanel>
      </View>
    </Modal>
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
  const [showNewPeople, setShowNewPeople] = useState(false);
  const [profileCharacter, setProfileCharacter] = useState<Character | null>(null);
  const normalized = search.trim().toLowerCase();
  const connected = characters.filter((character) => friends.includes(character.id));
  const suggestions = characters.filter((character) => !friends.includes(character.id) && (!normalized || `${character.name} ${character.location} ${character.bio}`.toLowerCase().includes(normalized)));

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <MainHeader title="People" />
        <SearchField value={search} onChangeText={setSearch} />

        <GlassPanel style={styles.friendsHighlight} intensity={42} borderColor="rgba(129,123,240,0.62)">
          <View style={styles.friendsHighlightHeader}>
            <View style={styles.friendsHighlightCopy}>
              <Text style={styles.friendsHighlightEyebrow}>YOUR CIRCLE</Text>
              <View style={styles.friendsHighlightTitleRow}>
                <Text style={styles.friendsHighlightTitle}>Your friends</Text>
                <View style={styles.friendsHighlightDot} />
              </View>
              <Text style={styles.friendsHighlightSubtitle}>{connected.length} connected and ready to chat</Text>
            </View>
            <View style={styles.friendsCountBadge}>
              <Text style={styles.friendsCountNumber}>{connected.length}</Text>
              <Text style={styles.friendsCountLabel}>friends</Text>
            </View>
          </View>
          {connected.length === 0 ? (
            <Text style={styles.friendsEmpty}>Your circle is waiting for its first connection.</Text>
          ) : (
            <View style={styles.friendGrid}>
              {connected.map((character) => <FriendCard key={character.id} character={character} onPress={() => setProfileCharacter(character)} />)}
            </View>
          )}
        </GlassPanel>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={showNewPeople ? 'Hide new people' : 'Show new people'}
          accessibilityState={{ expanded: showNewPeople, disabled: suggestions.length === 0 }}
          disabled={suggestions.length === 0}
          onPress={() => setShowNewPeople((current) => !current)}
          style={({ pressed }) => [styles.peopleDiscoverToggle, pressed && styles.pressed]}
        >
          <View style={styles.peopleDiscoverCopy}>
            <Text style={styles.peopleDiscoverTitle}>Meet new people</Text>
            <Text style={styles.peopleDiscoverSubtitle}>
              {suggestions.length > 0 ? suggestions.length + ' people to discover' : 'No new people right now'}
            </Text>
          </View>
          <AppIcon name={showNewPeople ? 'chevron-up' : 'chevron-down'} size={19} color={colors.textSecondary} />
        </Pressable>
        {showNewPeople || suggestions.length === 0 ? (
          <View style={styles.peopleList}>
          {suggestions.map((character) => (
            <GlassPanel key={character.id} style={styles.personCard}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={"Open " + character.name + "'s profile"}
                onPress={() => setProfileCharacter(character)}
                style={({ pressed }) => [styles.personCardMain, pressed && styles.pressed]}
              >
              <Avatar name={character.name} initials={character.initials} colors={character.gradient} source={characterStreetVisuals[character.id]} size={50} />
              <View style={styles.personCopy}>
                <View style={styles.personNameRow}>
                  <Text style={styles.personName}>{character.name}</Text>
                  <Text style={styles.personMeta}>{character.location} · {character.age}</Text>
                </View>
                <Text style={styles.personBio} numberOfLines={2}>{character.bio}</Text>
              </View>
              </Pressable>
              <Pressable onPress={() => meet(character.id)} accessibilityRole="button" accessibilityLabel={`Meet ${character.name}`} style={({ pressed }) => [styles.meetButton, pressed && styles.pressed]}>
                <Text style={styles.meetButtonText}>Meet</Text>
              </Pressable>
            </GlassPanel>
          ))}
          {suggestions.length === 0 ? <Text style={styles.emptyPeople}>Everyone here already knows you.</Text> : null}
          </View>
        ) : null}

        <Text style={styles.peopleFooter}>New connections begin quietly. Give it a little time.</Text>
      </ScrollView>
      <FriendProfileModal
        character={profileCharacter}
        isConnected={profileCharacter ? friends.includes(profileCharacter.id) : false}
        onClose={() => setProfileCharacter(null)}
        onOpenChat={() => {
          if (!profileCharacter) return;
          const id = profileCharacter.id;
          setProfileCharacter(null);
          openChat(id);
        }}
        onMeet={() => {
          if (!profileCharacter) return;
          const id = profileCharacter.id;
          setProfileCharacter(null);
          meet(id);
        }}
      />
    </View>
  );
}

function MeScreen({
  notificationsEnabled,
  toggleNotifications,
  appearanceMode,
  setAppearanceMode,
  onOpenPeople,
  showToast,
}: {
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  appearanceMode: AppearanceMode;
  setAppearanceMode: (value: AppearanceMode) => void;
  onOpenPeople: () => void;
  showToast: (message: string) => void;
}) {
  const [appLockEnabled, setAppLockEnabled] = useState(true);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState('Aiko');
  const [profileBio, setProfileBio] = useState('Tokyo · keeping life interesting');

  const toggleAppearance = () => {
    const next = appearanceMode === 'black' ? 'midnight' : 'black';
    setAppearanceMode(next);
    showToast(next === 'black' ? 'Pure black is on.' : 'Midnight mode is on.');
  };

  const toggleAppLock = () => {
    setAppLockEnabled((current) => !current);
    showToast(appLockEnabled ? 'App lock is off.' : 'Face ID app lock is on.');
  };

  const toggleQuietHours = () => {
    setQuietHoursEnabled((current) => !current);
    showToast(quietHoursEnabled ? 'Quiet hours are off.' : 'Quiet hours are on.');
  };

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <MainHeader title="Me" />

        <Pressable onPress={() => setEditingProfile((current) => !current)} accessibilityRole="button" accessibilityLabel="Edit your profile" style={({ pressed }) => [styles.profileCardPressable, pressed && styles.pressed]}>
          <GlassPanel style={styles.profileCard} intensity={36}>
            <View style={styles.profileCardTop}>
              <View style={styles.profileAvatarWrap}>
                <Avatar name={profileName} initials={profileName.slice(0, 1).toUpperCase()} colors={['#7B75E8', '#293A63']} size={66} />
                <View style={styles.profileAvailableDot} />
              </View>
              <View style={styles.profileCardCopy}>
                <Text style={styles.profileName}>{profileName}</Text>
                <Text style={styles.profileHandle}>{profileBio}</Text>
                <Text style={styles.profileStatus}>Available for a conversation</Text>
              </View>
              <AppIcon name={editingProfile ? 'chevron-up' : 'chevron-forward'} size={18} color={colors.textMuted} />
            </View>
          </GlassPanel>
        </Pressable>

        {editingProfile ? (
          <GlassPanel style={styles.profileEditor}>
            <Text style={styles.profileEditorLabel}>Display name</Text>
            <TextInput value={profileName} onChangeText={setProfileName} placeholder="Your name" placeholderTextColor={colors.textMuted} style={styles.profileEditorInput} />
            <Text style={styles.profileEditorLabel}>Profile line</Text>
            <TextInput value={profileBio} onChangeText={setProfileBio} placeholder="A short line about you" placeholderTextColor={colors.textMuted} style={styles.profileEditorInput} />
            <Pressable onPress={() => { setEditingProfile(false); showToast('Profile saved.'); }} accessibilityRole="button" accessibilityLabel="Save profile" style={({ pressed }) => [styles.profileSaveButton, pressed && styles.pressed]}>
              <Text style={styles.profileSaveText}>Save profile</Text>
            </Pressable>
          </GlassPanel>
        ) : null}

        <SectionTitle title="Preferences" style={styles.settingsTitle} />
        <GlassPanel style={styles.settingsPanel}>
          <ProfileRow title="Notifications" value={notificationsEnabled ? 'On' : 'Off'} icon={<AppIcon name="notifications-outline" color="#B8B5FF" />} onPress={toggleNotifications} />
          <ProfileRow title="Appearance" value={appearanceMode === 'black' ? 'Black' : 'Midnight'} icon={<AppIcon name="moon-outline" />} onPress={toggleAppearance} />
          <ProfileRow title="App lock" value={appLockEnabled ? 'Face ID' : 'Off'} icon={<AppIcon name="lock-closed-outline" />} onPress={toggleAppLock} />
        </GlassPanel>

        <SectionTitle title="How it feels" style={styles.settingsTitle} />
        <GlassPanel style={styles.settingsPanel}>
          <ProfileRow title="Quiet hours" value={quietHoursEnabled ? 'On' : 'Off'} icon={<AppIcon name="moon-outline" />} onPress={toggleQuietHours} />
          <ProfileRow title="Connected people" value="Manage" icon={<AppIcon name="people-outline" />} onPress={onOpenPeople} />
        </GlassPanel>

        <View style={styles.meFooter}>
        <View style={styles.meFooterMark}><AppIcon name="chatbubble-ellipses" size={15} color="#B9B6FF" /></View>
          <Text style={styles.meFooterText}>A little English, hidden inside a real conversation.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

type FloatingPetMotion = {
  left: `${number}%`;
  top: number;
  size: number;
  delay: number;
  duration: number;
  x: [number, number, number];
  y: [number, number, number];
  rotate: [string, string, string];
  opacity: number;
};

const FLOATING_PET_MOTIONS: FloatingPetMotion[] = [
  { left: '1%', top: 12, size: 54, delay: 0, duration: 4300, x: [0, 18, -10], y: [0, 18, -8], rotate: ['-7deg', '5deg', '-3deg'], opacity: 0.86 },
  { left: '78%', top: 22, size: 56, delay: 650, duration: 5100, x: [0, -16, 12], y: [0, -15, 13], rotate: ['6deg', '-5deg', '4deg'], opacity: 0.82 },
  { left: '-2%', top: 122, size: 58, delay: 1200, duration: 4700, x: [0, 19, -14], y: [0, 12, -17], rotate: ['-4deg', '7deg', '-5deg'], opacity: 0.8 },
  { left: '84%', top: 142, size: 58, delay: 350, duration: 5600, x: [0, -18, 11], y: [0, 16, -12], rotate: ['5deg', '-7deg', '3deg'], opacity: 0.84 },
  { left: '4%', top: 292, size: 55, delay: 900, duration: 4900, x: [0, 15, -9], y: [0, -14, 16], rotate: ['-6deg', '4deg', '-2deg'], opacity: 0.78 },
  { left: '80%', top: 308, size: 56, delay: 1500, duration: 5300, x: [0, -14, 17], y: [0, -16, 11], rotate: ['4deg', '-6deg', '5deg'], opacity: 0.8 },
  { left: '26%', top: 438, size: 50, delay: 1800, duration: 4600, x: [0, -15, 11], y: [0, 16, -7], rotate: ['-5deg', '6deg', '-3deg'], opacity: 0.72 },
  { left: '63%', top: 452, size: 52, delay: 500, duration: 5800, x: [0, 17, -12], y: [0, -13, 14], rotate: ['5deg', '-4deg', '6deg'], opacity: 0.74 },
  { left: '1%', top: 66, size: 40, delay: 2100, duration: 4200, x: [0, 12, -8], y: [0, 13, -8], rotate: ['-4deg', '5deg', '-2deg'], opacity: 0.76 },
  { left: '84%', top: 72, size: 40, delay: 230, duration: 4500, x: [0, -12, 9], y: [0, -11, 9], rotate: ['4deg', '-5deg', '2deg'], opacity: 0.76 },
  { left: '0%', top: 184, size: 40, delay: 520, duration: 4700, x: [0, 11, -10], y: [0, 10, -12], rotate: ['-3deg', '6deg', '-4deg'], opacity: 0.74 },
  { left: '83%', top: 196, size: 40, delay: 780, duration: 4900, x: [0, -10, 12], y: [0, 12, -9], rotate: ['5deg', '-4deg', '3deg'], opacity: 0.74 },
  { left: '2%', top: 248, size: 40, delay: 1040, duration: 4300, x: [0, 13, -7], y: [0, -11, 12], rotate: ['-5deg', '4deg', '-2deg'], opacity: 0.72 },
  { left: '82%', top: 252, size: 40, delay: 1280, duration: 4600, x: [0, -13, 8], y: [0, -10, 13], rotate: ['4deg', '-6deg', '3deg'], opacity: 0.72 },
  { left: '1%', top: 374, size: 40, delay: 1560, duration: 4800, x: [0, 12, -9], y: [0, 12, -10], rotate: ['-4deg', '5deg', '-3deg'], opacity: 0.7 },
  { left: '84%', top: 388, size: 40, delay: 1780, duration: 5000, x: [0, -11, 10], y: [0, 11, -12], rotate: ['5deg', '-5deg', '2deg'], opacity: 0.7 },
  { left: '2%', top: 488, size: 38, delay: 1960, duration: 4400, x: [0, 10, -7], y: [0, -9, 8], rotate: ['-3deg', '4deg', '-2deg'], opacity: 0.68 },
  { left: '84%', top: 488, size: 38, delay: 2180, duration: 4700, x: [0, -10, 8], y: [0, -8, 9], rotate: ['4deg', '-4deg', '2deg'], opacity: 0.68 },
  { left: '18%', top: 4, size: 34, delay: 2400, duration: 4200, x: [0, 10, -6], y: [0, 8, -6], rotate: ['-3deg', '4deg', '-2deg'], opacity: 0.66 },
  { left: '38%', top: 8, size: 34, delay: 2580, duration: 4500, x: [0, -9, 7], y: [0, 9, -7], rotate: ['3deg', '-4deg', '2deg'], opacity: 0.66 },
  { left: '58%', top: 4, size: 34, delay: 2760, duration: 4700, x: [0, 8, -7], y: [0, 7, -8], rotate: ['-2deg', '4deg', '-3deg'], opacity: 0.66 },
  { left: '78%', top: 8, size: 34, delay: 2940, duration: 4900, x: [0, -8, 6], y: [0, 8, -7], rotate: ['4deg', '-3deg', '2deg'], opacity: 0.66 },
  { left: '18%', top: 488, size: 34, delay: 3120, duration: 4300, x: [0, 9, -6], y: [0, -8, 7], rotate: ['-3deg', '4deg', '-2deg'], opacity: 0.64 },
  { left: '38%', top: 492, size: 34, delay: 3300, duration: 4600, x: [0, -8, 6], y: [0, -7, 8], rotate: ['3deg', '-4deg', '2deg'], opacity: 0.64 },
  { left: '58%', top: 488, size: 34, delay: 3480, duration: 4800, x: [0, 7, -6], y: [0, -8, 7], rotate: ['-2deg', '3deg', '-2deg'], opacity: 0.64 },
  { left: '78%', top: 492, size: 34, delay: 3660, duration: 5000, x: [0, -7, 6], y: [0, -7, 8], rotate: ['3deg', '-3deg', '2deg'], opacity: 0.64 },
];

const FLOATING_PET_GLASS_STYLE = Platform.OS === 'web'
  ? ({ backdropFilter: 'blur(9px)', WebkitBackdropFilter: 'blur(9px)' } as any)
  : undefined;

const FLOATING_PET_REFLECTION_BLUR_STYLE = Platform.OS === 'web'
  ? ({ filter: 'blur(2.5px)' } as any)
  : undefined;

const FLOATING_PET_POP_PARTICLES = [
  { x: -88, y: -60, curveX: -22, curveY: 8, gravity: 24, size: 6, color: 'rgba(238, 247, 255, 0.95)', opacity: 0.96 },
  { x: -59, y: -98, curveX: -15, curveY: -6, gravity: 40, size: 4, color: 'rgba(191, 215, 255, 0.9)', opacity: 0.88 },
  { x: -12, y: -112, curveX: 18, curveY: -4, gravity: 42, size: 5, color: 'rgba(255, 255, 255, 0.92)', opacity: 0.94 },
  { x: 54, y: -91, curveX: 24, curveY: 12, gravity: 38, size: 4, color: 'rgba(226, 214, 255, 0.9)', opacity: 0.86 },
  { x: 98, y: -28, curveX: 21, curveY: 22, gravity: 32, size: 6, color: 'rgba(240, 248, 255, 0.94)', opacity: 0.92 },
  { x: 84, y: 56, curveX: 18, curveY: -10, gravity: 30, size: 4, color: 'rgba(185, 203, 255, 0.9)', opacity: 0.84 },
  { x: 32, y: 105, curveX: -14, curveY: -12, gravity: 24, size: 5, color: 'rgba(255, 255, 255, 0.92)', opacity: 0.9 },
  { x: -48, y: 98, curveX: -24, curveY: 14, gravity: 20, size: 4, color: 'rgba(223, 211, 255, 0.9)', opacity: 0.86 },
  { x: -101, y: 52, curveX: -18, curveY: -20, gravity: 32, size: 6, color: 'rgba(232, 244, 255, 0.94)', opacity: 0.9 },
] as const;

function FloatingPet({
  pet,
  motion,
  entering = false,
  onPop,
}: {
  pet: PetCharacter;
  motion: FloatingPetMotion;
  entering?: boolean;
  onPop?: (id: PetId) => void;
}) {
  const progress = useRef(new Animated.Value(0)).current;
  const popProgress = useRef(new Animated.Value(0)).current;
  const entryProgress = useRef(new Animated.Value(entering ? 0 : 1)).current;
  const [popped, setPopped] = useState(false);

  useEffect(() => {
    progress.stopAnimation();
    progress.setValue(0);
    const animation = Animated.loop(Animated.sequence([
      Animated.delay(motion.delay),
      Animated.timing(progress, {
        toValue: 1,
        duration: motion.duration,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(progress, {
        toValue: 0,
        duration: Math.round(motion.duration * 0.92),
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]));
    animation.start();
    return () => {
      animation.stop();
      progress.stopAnimation();
    };
  }, [motion.delay, motion.duration, progress]);

  useEffect(() => {
    entryProgress.stopAnimation();
    entryProgress.setValue(entering ? 0 : 1);
    if (!entering) return undefined;
    const animation = Animated.timing(entryProgress, {
      toValue: 1,
      duration: 1050,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: Platform.OS !== 'web',
    });
    animation.start();
    return () => {
      animation.stop();
      entryProgress.stopAnimation();
    };
  }, [entering, entryProgress]);

  const translateX = progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: motion.x });
  const translateY = progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: motion.y });
  const rotate = progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: motion.rotate });
  const scale = progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.98, 1.03, 0.99] });
  const entryTranslateX = entryProgress.interpolate({ inputRange: [0, 1], outputRange: [Number.parseFloat(motion.left) < 50 ? -280 : 280, 0] });
  const entryTranslateY = entryProgress.interpolate({ inputRange: [0, 1], outputRange: [motion.top < 240 ? -90 : 90, 0] });
  const totalTranslateX = Animated.add(translateX, entryTranslateX);
  const totalTranslateY = Animated.add(translateY, entryTranslateY);
  const popScale = popProgress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.2, 0.12] });
  const popOpacity = popProgress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0.82, 0] });
  const popFlashScale = popProgress.interpolate({ inputRange: [0, 0.1, 0.26, 1], outputRange: [0.2, 1, 1.9, 2.8] });
  const popFlashOpacity = popProgress.interpolate({ inputRange: [0, 0.1, 0.26, 0.7, 1], outputRange: [0, 0.9, 0.28, 0, 0] });
  const popRingScale = popProgress.interpolate({ inputRange: [0, 0.16, 1], outputRange: [0.72, 1.18, 2.5] });
  const popRingOpacity = popProgress.interpolate({ inputRange: [0, 0.12, 0.4, 0.8, 1], outputRange: [0, 0.72, 0.24, 0, 0] });
  const handlePop = useCallback(() => {
    if (popped) return;
    setPopped(true);
    popProgress.setValue(0);
    Animated.timing(popProgress, {
      toValue: 1,
      duration: 420,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: Platform.OS !== 'web',
    }).start(({ finished }) => {
      if (finished) onPop?.(pet.id);
    });
  }, [onPop, pet.id, popped, popProgress]);

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.floatingPet,
        {
          left: motion.left,
          top: motion.top,
          width: motion.size + 24,
          height: motion.size + 24,
          opacity: motion.opacity,
          transform: [{ translateX: totalTranslateX }, { translateY: totalTranslateY }, { scale }, { rotate }],
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${pet.name}のシャボン玉を割る`}
        accessibilityHint="タップするとシャボン玉がはじけます"
        onPress={handlePop}
        disabled={popped}
          style={styles.floatingPetPressable}
      >
        <Animated.View
          style={[
            styles.floatingPetBubble,
            FLOATING_PET_GLASS_STYLE,
            { opacity: popOpacity, transform: [{ scale: popScale }] },
          ]}
        >
          <View pointerEvents="none" style={[styles.floatingPetBubbleReflectionArc, FLOATING_PET_REFLECTION_BLUR_STYLE]} />
          <View pointerEvents="none" style={[styles.floatingPetBubbleReflectionSoft, FLOATING_PET_REFLECTION_BLUR_STYLE]} />
          <View pointerEvents="none" style={styles.floatingPetBubbleReflectionStreak} />
          <View pointerEvents="none" style={styles.floatingPetBubbleReflectionStreakShort} />
          <View pointerEvents="none" style={styles.floatingPetBubbleReflectionGlint} />
          <View pointerEvents="none" style={styles.floatingPetBubbleReflectionPin} />
          <Image
            source={pet.image}
            resizeMode="contain"
            style={[styles.floatingPetImage, { width: motion.size, height: motion.size }]}
          />
        </Animated.View>
        <Animated.View
          pointerEvents="none"
          style={[styles.floatingPetBurstRing, { opacity: popRingOpacity, transform: [{ scale: popRingScale }] }]}
        />
        <Animated.View
          pointerEvents="none"
          style={[styles.floatingPetBurstFlash, { opacity: popFlashOpacity, transform: [{ scale: popFlashScale }] }]}
        />
        {FLOATING_PET_POP_PARTICLES.map((particle, index) => {
          const particleX = popProgress.interpolate({
            inputRange: [0, 0.12, 0.36, 0.68, 1],
            outputRange: [0, particle.x * 0.58, particle.x * 0.78 + particle.curveX, particle.x * 0.92 + particle.curveX * 0.65, particle.x],
          });
          const particleY = popProgress.interpolate({
            inputRange: [0, 0.12, 0.36, 0.68, 1],
            outputRange: [0, particle.y * 0.58, particle.y * 0.7 + particle.curveY, particle.y * 0.9 + particle.curveY * 0.55 + particle.gravity * 0.35, particle.y + particle.gravity],
          });
          const particleOpacity = popProgress.interpolate({ inputRange: [0, 0.08, 0.52, 1], outputRange: [0, particle.opacity, particle.opacity * 0.84, 0] });
          const particleScale = popProgress.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0.35, 1, 0.25] });
          return (
            <Animated.View
              key={`${pet.id}-pop-particle-${index}`}
              pointerEvents="none"
              style={[
                styles.floatingPetBurstParticle,
                {
                  width: particle.size,
                  height: particle.size,
                  marginLeft: -particle.size / 2,
                  marginTop: -particle.size / 2,
                  backgroundColor: particle.color,
                  opacity: particleOpacity,
                  transform: [{ translateX: particleX }, { translateY: particleY }, { scale: particleScale }],
                },
              ]}
            />
          );
        })}
      </Pressable>
    </Animated.View>
  );
}

function PetsScreen({ pet, onSwitch, onSelectPet }: { pet: PetCharacter; onSwitch: () => void; onSelectPet: (id: PetId) => void }) {
  const [incomingPetId, setIncomingPetId] = useState<PetId | null>(null);
  // Keep one bubble slot for every other pet, including the newly added roster.
  // The smaller outer slots keep the central companion readable while making
  // every pet reachable directly from the bubble field.
  const companions = PET_CHARACTERS.filter((candidate) => candidate.id !== pet.id);

  const handleCompanionPop = useCallback((id: PetId) => {
    setIncomingPetId(pet.id);
    onSelectPet(id);
  }, [onSelectPet, pet.id]);

  useEffect(() => {
    if (!incomingPetId) return undefined;
    const timer = setTimeout(() => setIncomingPetId(null), 1500);
    return () => clearTimeout(timer);
  }, [incomingPetId]);

  return (
    <View style={styles.screen}>
      <View style={styles.petHomeContent}>
        <MainHeader title="Pets" />
        <View style={styles.petHomeStage}>
          <Text style={styles.petHomeEyebrow}>YOUR COMPANION</Text>
          <View style={styles.petHomeFloatField}>
            {companions.map((companion, index) => (
              <FloatingPet
                key={`${pet.id}-${companion.id}`}
                pet={companion}
                motion={FLOATING_PET_MOTIONS[index]}
                entering={companion.id === incomingPetId}
                onPop={handleCompanionPop}
              />
            ))}
            <View style={styles.petHomeImageStage}>
            <Image
              accessible
              accessibilityLabel={`${pet.name}。選択中のペット`}
              source={pet.image}
              resizeMode="contain"
              style={styles.petHomeImage}
            />
            </View>
          </View>
          <Text style={styles.petHomeName}>{pet.name}</Text>
          <Text style={styles.petHomeCatchphrase}>{pet.catchphrase}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="ペットを切り替える"
            onPress={onSwitch}
            style={({ pressed }) => [styles.petSwitchButton, pressed && styles.pressed]}
          >
            <AppIcon name="sparkles" size={17} color="#F2EEFF" />
            <Text style={styles.petSwitchButtonText}>ペットを切り替える</Text>
          </Pressable>
        </View>
      </View>
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

function PhotoMessageCard({
  photo,
  isMine,
  translationStep,
  onPress,
}: {
  photo: NonNullable<Message['photo']>;
  isMine: boolean;
  translationStep: number;
  onPress?: () => void;
}) {
  const showJapanese = translationStep % 2 === 1;
  return (
    <Pressable onPress={onPress} disabled={!onPress} accessibilityRole={onPress ? 'button' : undefined} accessibilityLabel="Photo message">
      <LinearGradient colors={[photo.accent, '#10152B']} style={[styles.photoMessageCard, isMine && styles.photoMessageCardMine]}>
        <View style={styles.photoMessageHeader}>
          <Text style={styles.photoMessageBadge}>{showJapanese ? '写真' : 'PHOTO'}</Text>
          <Text style={styles.photoMessageScene}>{showJapanese ? photo.sceneJapanese : photo.sceneEnglish}</Text>
        </View>
        <View style={styles.photoMessageSceneArea}>
          <View style={styles.photoMessageGlow} />
          <Text style={styles.photoMessageEmoji}>{photo.emoji}</Text>
        </View>
        <Text style={styles.photoMessageDetail}>{showJapanese ? photo.detailJapanese : photo.detailEnglish}</Text>
        {onPress ? <Text style={styles.photoMessageHint}>{showJapanese ? 'タップで英語に戻す' : 'Tap to see Japanese'}</Text> : null}
      </LinearGradient>
    </Pressable>
  );
}

function ChatDetailScreen({
  character,
  sentMessages,
  translationSteps,
  userGender,
  onChangeUserGender,
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
  userGender: UserGender;
  onChangeUserGender: (value: UserGender) => void;
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
  const conversationMessages = sentMessages.filter((message) => message.chatId === chatId);
  const completedRounds = conversationMessages.filter((message) => message.sender === 'user').length;
  const replyHistory: ConversationHistory = conversationMessages
    .filter((message) => message.sender === 'user')
    .map((message) => message.replyChoiceId);
  const openingTimestampRef = useRef(Date.now());
  const openingRound = getConversationRound(character.id, 0, userGender, replyHistory);
  const openingMessage: Message = {
    id: `${character.id}-opening`,
    chatId,
    sender: 'character',
    text: openingRound?.promptEnglish || `Hey. I wasn't sure if I should text first.`,
    timestamp: openingTimestampRef.current,
    translation: {
      english: [openingRound?.promptEnglish || `Hey. I wasn't sure if I should text first.`],
      japanese: [openingRound?.promptJapanese || 'ねえ。先に連絡していいのか迷ってた。'],
    },
  };
  const allMessages = [openingMessage, ...conversationMessages];
  const latestMessage = allMessages[allMessages.length - 1];
  const round = getConversationRound(character.id, completedRounds, userGender, replyHistory);
  const canShowReplyPrompt = Boolean(round && latestMessage.sender === 'character');
  const isQuestionTurn = round?.turnType === 'question';
  const isShareTurn = round?.turnType === 'share';
  const isWaitingForCharacter = latestMessage.sender === 'user';
  const conversationComplete = !round && latestMessage.sender === 'character';
  const messageScrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => messageScrollRef.current?.scrollToEnd({ animated: true }), 60);
    return () => clearTimeout(timer);
  }, [conversationMessages.length, isWaitingForCharacter, latestMessage.id]);

  return (
    <KeyboardAvoidingView style={styles.chatScreen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.chatTopBar}>
        <IconButton label="Back to chats" onPress={onBack} icon={<AppIcon name="arrow-back" size={23} color={colors.textPrimary} />} />
        <View style={styles.chatIdentity}>
          <View>
            <Avatar name={character.name} initials={character.initials} colors={character.gradient} source={characterStreetVisuals[character.id]} size={38} />
            <View style={styles.chatOnlineDot} />
          </View>
          <View style={styles.chatIdentityCopy}>
            <Text style={styles.chatIdentityName}>{character.name}</Text>
            <Text style={styles.chatIdentityStatus}>{character.tone}</Text>
          </View>
        </View>
        <View style={styles.routeToggle}>
          <Pressable
            onPress={() => onChangeUserGender('male')}
            accessibilityRole="button"
            accessibilityLabel="Use male relationship route"
            accessibilityState={{ selected: userGender === 'male' }}
            style={[styles.routeToggleButton, userGender === 'male' && styles.routeToggleButtonActive]}
          >
            <Text style={styles.routeToggleText}>M</Text>
          </Pressable>
          <Pressable
            onPress={() => onChangeUserGender('female')}
            accessibilityRole="button"
            accessibilityLabel="Use female relationship route"
            accessibilityState={{ selected: userGender === 'female' }}
            style={[styles.routeToggleButton, userGender === 'female' && styles.routeToggleButtonActive]}
          >
            <Text style={styles.routeToggleText}>F</Text>
          </Pressable>
        </View>
        <IconButton label="More options" icon={<AppIcon name="ellipsis-horizontal" size={23} color={colors.textPrimary} />} />
      </View>

      <ScrollView ref={messageScrollRef} style={styles.messageScroll} contentContainerStyle={styles.messageContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.dateDivider}><View style={styles.dateLine} /><Text style={styles.dateText}>Today</Text><View style={styles.dateLine} /></View>
        {allMessages.map((message) => (
          <View key={message.id}>
            {message.sessionLabelEnglish ? (
              <View style={styles.sessionDivider}>
                <View style={styles.dateLine} />
                <Text style={styles.sessionDividerText}>{(translationSteps[message.id] || 0) % 2 === 1 ? message.sessionLabelJapanese : message.sessionLabelEnglish}</Text>
                <View style={styles.dateLine} />
              </View>
            ) : null}
            {message.photo ? (
              <PhotoMessageCard
                photo={message.photo}
                isMine={message.sender === 'user'}
                translationStep={translationSteps[message.id] || 0}
                onPress={message.translation ? () => onTranslate(message.id) : undefined}
              />
            ) : null}
            {message.text ? (
              <MessageBubble
                text={getTranslationText(message, translationSteps[message.id] || 0)}
                time={message.timestamp}
                isMine={message.sender === 'user'}
                onPress={message.translation ? () => onTranslate(message.id) : undefined}
              />
            ) : null}
          </View>
        ))}
        {isWaitingForCharacter ? <TypingIndicator /> : null}
      </ScrollView>

      <View style={styles.replyDock}>
        {conversationComplete ? (
          <View style={styles.replyDockHeader}>
            <Text style={styles.replyDockTitle}>Conversation complete</Text>
            <Text style={styles.replyDockHint}>{RELATIONSHIP_ROUND_COUNT} turns</Text>
          </View>
        ) : null}
        {canShowReplyPrompt && round ? (
          <View style={styles.replyDockHeader}>
            <Text style={styles.replyDockTitle}>{isQuestionTurn ? 'Ask them something' : `Reply to ${character.name}`}</Text>
            <Text style={styles.replyDockHint}>{isShareTurn ? 'Stay with the moment' : round.turnType === 'goodnight' ? 'Let the evening end naturally' : 'Pick a thought or write your own'}</Text>
          </View>
        ) : null}
        {canShowReplyPrompt && round ? (
          <ScrollView
            style={styles.replyChoices}
            contentContainerStyle={styles.replyChoicesContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
          >
            {round.choices.map((choice) => (
              <ReplyChoiceButton key={choice.id} text={choice.japanese} selected={selectedReply?.id === choice.id} onPress={() => onSelectReply(choice, round.id)} />
            ))}
          </ScrollView>
        ) : null}
        {selectedReply ? (
          <GlassPanel style={styles.englishSuggestion}>
            <Text style={styles.suggestionLabel}>Reply preview</Text>
            <Text style={styles.suggestionText}>{selectedReply.english}</Text>
          </GlassPanel>
        ) : null}
        <View style={styles.composerRow}>
          <View style={styles.composerInputShell}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              editable={!conversationComplete}
              placeholder={conversationComplete ? 'Conversation complete' : selectedReply ? 'Type it in your own words…' : 'Write whatever feels natural…'}
              placeholderTextColor={colors.textMuted}
              style={styles.composerInput}
              accessibilityLabel="Type your English reply"
              multiline
            />
          </View>
          <IconButton
            label="Send message"
            variant="accent"
            disabled={!canSend || conversationComplete}
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
  const [radialPreviewTab, setRadialPreviewTab] = useState<TabKey | null>(null);
  const [radialMenuOpen, setRadialMenuOpen] = useState(false);
  const [navigationPetPickerOpen, setNavigationPetPickerOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<PetId>(DEFAULT_PET_ID);
  const [activeCharacterId, setActiveCharacterId] = useState<CharacterId | null>(null);
  const [userGender, setUserGender] = useState<UserGender>('female');
  const [friends, setFriends] = useState<CharacterId[]>(initialFriends);
  const [appearanceMode, setAppearanceMode] = useState<AppearanceMode>('black');
  const [search, setSearch] = useState('');
  const [translationSteps, setTranslationSteps] = useState<Record<string, number>>({});
  const [selectedReply, setSelectedReply] = useState<ReplyChoice | null>(null);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [pendingConversationReplies, setPendingConversationReplies] = useState<PendingConversationReply[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!pendingConversationReplies.length) return undefined;
    const timer = setTimeout(() => {
      setSentMessages((current) => [
        ...current,
        ...pendingConversationReplies.flatMap((pending) => {
          const { nextPrompt, ...reply } = pending.reply;
          const chatId = `chat-${pending.characterId}` as ChatId;
          const timestamp = Date.now();
          const replyMessage = {
            ...reply,
            chatId,
            sender: 'character' as const,
            timestamp,
            isRead: false,
          };
          const promptMessage = nextPrompt ? {
            ...nextPrompt,
            chatId,
            sender: 'character' as const,
            timestamp: timestamp + 1,
            isRead: false,
          } : null;
          return promptMessage ? [replyMessage, promptMessage] : [replyMessage];
        }),
      ]);
      setPendingConversationReplies([]);
    }, 1400);
    return () => clearTimeout(timer);
  }, [pendingConversationReplies]);

  const activeCharacter = activeCharacterId ? getCharacter(activeCharacterId) : undefined;
  const selectedPet = getPetCharacter(selectedPetId);
  const canSend = Boolean(activeCharacterId && draft.trim());
  const visibleTab = radialPreviewTab ?? activeTab;

  const openChat = (id: CharacterId) => {
    setRadialPreviewTab(null);
    setRadialMenuOpen(false);
    setActiveCharacterId(id);
    setActiveTab('chats');
    setSearch('');
    setSelectedReply(null);
    setSelectedPromptId(null);
    setDraft('');
  };

  const openPeople = () => {
    setRadialPreviewTab(null);
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
    if (!activeCharacterId || !canSend) return;
    const chatId = `chat-${activeCharacterId}` as ChatId;
    const roundIndex = sentMessages.filter((message) => message.chatId === chatId && message.sender === 'user').length;
    const replyHistory: ConversationHistory = sentMessages
      .filter((message) => message.chatId === chatId && message.sender === 'user')
      .map((message) => message.replyChoiceId);
    const round = getConversationRound(activeCharacterId, roundIndex, userGender, replyHistory);
    if (!round || (selectedPromptId && round.id !== selectedPromptId)) return;
    const response = buildConversationReply(activeCharacterId, roundIndex, selectedReply?.id, userGender, replyHistory, draft.trim());
    if (!response) return;
    setSentMessages((current) => [...current, {
      id: `local-${Date.now()}`,
      chatId,
      sender: 'user',
      text: draft.trim(),
      timestamp: Date.now(),
      translation: {
        english: [draft.trim()],
        japanese: [selectedReply?.japanese || draft.trim()],
      },
      replyChoiceId: response.choiceId,
      isRead: true,
    }]);
    setPendingConversationReplies((current) => [...current.filter((pending) => pending.characterId !== activeCharacterId), { characterId: activeCharacterId, reply: response }]);
    setSelectedReply(null);
    setSelectedPromptId(null);
    setDraft('');
  };

  const changeUserGender = (value: UserGender) => {
    setUserGender(value);
    setSelectedReply(null);
    setSelectedPromptId(null);
    setDraft('');
  };

  const toggleTranslation = (messageId: string) => {
    setTranslationSteps((current) => ({ ...current, [messageId]: ((current[messageId] || 0) + 1) % 6 }));
  };

  const showToast = (message: string) => setToast(message);

  const handleRadialPreviewChange = useCallback((key: string | null) => {
    setRadialPreviewTab(key as TabKey | null);
  }, []);

  const handleRadialOpenChange = useCallback((open: boolean) => {
    setRadialMenuOpen(open);
    if (!open) setRadialPreviewTab(null);
  }, []);

  const handleRadialChange = useCallback((key: string) => {
    const destination = key as TabKey;
    setRadialPreviewTab(null);
    setActiveTab(destination);
    setSearch('');
  }, []);

  const handleBubblePetSwitch = useCallback((id: PetId) => {
    setSelectedPetId(id);
    setToast(getPetCharacter(id).name + 'に切り替えました。');
  }, []);

  return (
    <ScreenBackground
      appearanceMode={appearanceMode}
      petAvoidBottom={activeCharacter || radialMenuOpen ? 260 : 126}
      navigationPetPickerOpen={navigationPetPickerOpen}
      onNavigationPetPickerClose={() => setNavigationPetPickerOpen(false)}
      hideFloatingPet={!activeCharacter && visibleTab === 'pets'}
      selectedPetId={selectedPetId}
      onSelectedPetChange={setSelectedPetId}
    >
      {activeCharacter ? (
        <ChatDetailScreen
          character={activeCharacter}
          sentMessages={sentMessages}
          translationSteps={translationSteps}
          userGender={userGender}
          onChangeUserGender={changeUserGender}
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
          {visibleTab === 'chats' ? <ChatsScreen friends={friends} openChat={openChat} openPeople={openPeople} /> : null}
           {visibleTab === 'people' ? <PeopleScreen friends={friends} search={search} setSearch={setSearch} openChat={openChat} meet={meet} /> : null}
           {visibleTab === 'me' ? <MeScreen notificationsEnabled={notificationsEnabled} toggleNotifications={() => setNotificationsEnabled((value) => !value)} appearanceMode={appearanceMode} setAppearanceMode={setAppearanceMode} onOpenPeople={openPeople} showToast={showToast} /> : null}
           {visibleTab === 'pets' ? <PetsScreen pet={selectedPet} onSwitch={() => setNavigationPetPickerOpen(true)} onSelectPet={handleBubblePetSwitch} /> : null}
           <RadialNavigationMenu activeKey={visibleTab} onPreviewChange={handleRadialPreviewChange} onOpenChange={handleRadialOpenChange} onChange={handleRadialChange} items={[
             { key: 'chats', label: 'Chats', icon: <AppIcon name="chatbubble-ellipses-outline" size={22} color={visibleTab === 'chats' ? colors.textPrimary : colors.textSecondary} /> },
             { key: 'people', label: 'Friends', icon: <AppIcon name="people-outline" size={22} color={visibleTab === 'people' ? colors.textPrimary : colors.textSecondary} /> },
             { key: 'me', label: 'Profile', icon: <AppIcon name="person-outline" size={22} color={visibleTab === 'me' ? colors.textPrimary : colors.textSecondary} /> },
             { key: 'pets', label: 'Pets', icon: <AppIcon name="paw-outline" size={22} color={visibleTab === 'pets' ? colors.textPrimary : colors.textSecondary} /> },
           ]} />
        </View>
      )}
      {toast ? <View pointerEvents="none" style={styles.toast}><AppIcon name="checkmark-circle" size={16} color="#9DF0C8" /><Text style={styles.toastText}>{toast}</Text></View> : null}
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  canvas: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  phoneFrame: { flex: 1, width: '100%', maxWidth: 430, backgroundColor: '#000000', overflow: 'hidden' },
  midnightPhoneFrame: { backgroundColor: '#070A16' },
  desktopPhoneFrame: { borderRadius: 42, borderWidth: 1, borderColor: colors.glassBorder, marginVertical: 18, maxHeight: 900, shadowColor: colors.accentBlue, shadowOpacity: 0.34, shadowRadius: 16, shadowOffset: { width: 0, height: 5 }, elevation: 12 },
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
  discoverCard: { flexDirection: 'row', alignItems: 'center', marginTop: 18, padding: 15, borderRadius: 22, borderWidth: 1, borderColor: colors.glassBorder, backgroundColor: colors.glass, shadowColor: colors.accentBlue, shadowOpacity: 0.34, shadowRadius: 16, shadowOffset: { width: 0, height: 5 }, elevation: 12, overflow: 'hidden' },
  discoverIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBorder, shadowColor: colors.accentBlue, shadowOpacity: 0.34, shadowRadius: 16, shadowOffset: { width: 0, height: 5 }, elevation: 12, overflow: 'hidden', marginRight: 12 },
  discoverCopy: { flex: 1 },
  discoverTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  discoverSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 3 },
  friendGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  friendCard: { width: '48%', minHeight: 144, alignItems: 'center', justifyContent: 'center', padding: 13, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(185,199,255,0.52)', backgroundColor: 'rgba(14,20,40,0.58)', shadowColor: colors.accentBlue, shadowOpacity: 0.34, shadowRadius: 16, shadowOffset: { width: 0, height: 5 }, elevation: 12, overflow: 'hidden' },
  friendCardNameRow: { flexDirection: 'row', alignItems: 'center', marginTop: 9 },
  friendCardName: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  friendOnlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accentBlue, marginLeft: 5 },
  friendCardLocation: { color: colors.textMuted, fontSize: 11, marginTop: 3 },
  allFriendsList: { gap: 8 },
  allFriendRow: { minHeight: 66, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 9, borderRadius: 18, borderWidth: 1, borderColor: colors.glassBorder, backgroundColor: colors.glass },
  allFriendCopy: { flex: 1, marginLeft: 11 },
  allFriendName: { color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  allFriendMeta: { color: colors.textMuted, fontSize: 11, marginTop: 3 },
  peopleSectionTitle: { marginTop: 26, marginBottom: 11 },
  peopleSectionTitleLarge: { marginTop: 27, marginBottom: 11 },
  friendsHighlight: { marginTop: 26, padding: 14, borderRadius: 26, backgroundColor: 'rgba(69,61,140,0.28)' },
  friendsHighlightHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 13 },
  friendsHighlightCopy: { flex: 1, minWidth: 0, paddingTop: 2 },
  friendsHighlightEyebrow: { color: '#B9B6FF', fontSize: 9, lineHeight: 13, fontWeight: '900', letterSpacing: 1.45 },
  friendsHighlightTitleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  friendsHighlightTitle: { color: colors.textPrimary, fontSize: 21, lineHeight: 27, fontWeight: '900' },
  friendsHighlightDot: { width: 8, height: 8, borderRadius: 4, marginLeft: 8, backgroundColor: '#70D5A4', shadowColor: '#70D5A4', shadowOpacity: 0.75, shadowRadius: 7, shadowOffset: { width: 0, height: 0 }, elevation: 5 },
  friendsHighlightSubtitle: { color: colors.textSecondary, fontSize: 11, lineHeight: 16, marginTop: 2 },
  friendsCountBadge: { width: 58, height: 55, alignItems: 'center', justifyContent: 'center', marginLeft: 10, borderRadius: 17, backgroundColor: 'rgba(109,103,225,0.46)', borderWidth: 1, borderColor: '#817BF0' },
  friendsCountNumber: { color: '#F2EEFF', fontSize: 20, lineHeight: 22, fontWeight: '900' },
  friendsCountLabel: { color: '#C8C2FF', fontSize: 9, lineHeight: 12, fontWeight: '800', marginTop: 1 },
  friendsEmpty: { color: colors.textMuted, fontSize: 12, lineHeight: 18, textAlign: 'center', paddingVertical: 15 },
  peopleDiscoverToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 66, marginTop: 27, marginBottom: 11, paddingHorizontal: 15, paddingVertical: 12, borderRadius: 19, borderWidth: 1, borderColor: colors.glassBorder, backgroundColor: colors.glass },
  peopleDiscoverCopy: { flex: 1, minWidth: 0 },
  peopleDiscoverTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '800' },
  peopleDiscoverSubtitle: { color: colors.textMuted, fontSize: 11, lineHeight: 16, marginTop: 3 },
  peopleList: { gap: 9 },
  personCard: { minHeight: 84, flexDirection: 'row', alignItems: 'center', padding: 11, borderRadius: 22 },
  personCardMain: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', minHeight: 60 },
  personCopy: { flex: 1, minWidth: 0, marginHorizontal: 11 },
  personNameRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  personName: { color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  personMeta: { color: colors.textMuted, fontSize: 11 },
  personBio: { color: colors.textSecondary, fontSize: 12, lineHeight: 17, marginTop: 4 },
  meetButton: { minWidth: 57, minHeight: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: 'rgba(109,103,225,0.42)', borderWidth: 1, borderColor: '#817BF0', shadowColor: colors.accentBlue, shadowOpacity: 0.34, shadowRadius: 16, shadowOffset: { width: 0, height: 5 }, elevation: 12, overflow: 'hidden', paddingHorizontal: 12 },
  meetButtonText: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' },
  emptyPeople: { color: colors.textMuted, textAlign: 'center', paddingVertical: 28 },
  peopleFooter: { color: colors.textMuted, fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 26, paddingHorizontal: 30 },
  profileModalRoot: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: 'rgba(0,0,0,0.74)' },
  profileModalCard: { width: '100%', maxWidth: 390, maxHeight: '90%', borderRadius: 28, backgroundColor: 'rgba(14,20,40,0.96)', overflow: 'hidden' },
  profileModalScroll: { flexGrow: 0, flexShrink: 1 },
  profileModalScrollContent: { flexGrow: 1 },
  profileModalHero: { width: '100%', height: 230, position: 'relative', overflow: 'hidden', backgroundColor: '#151B34' },
  profileModalHeroPressed: { opacity: 0.88 },
  profileModalHeroBackdrop: { ...StyleSheet.absoluteFillObject, opacity: 0.28 },
  profileModalHeroImage: { width: '100%', height: '100%', zIndex: 1 },
  profileModalHeroBadge: { position: 'absolute', top: 14, left: 16, zIndex: 3, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 12, backgroundColor: 'rgba(10,13,29,0.58)', borderWidth: 1, borderColor: 'rgba(216,210,255,0.32)' },
  profileModalHeroBadgeText: { color: '#D8D2FF', fontSize: 9, lineHeight: 12, fontWeight: '900', letterSpacing: 1.05 },
  profileModalBody: { padding: 20 },
  profileModalHeader: { flexDirection: 'row', alignItems: 'center' },
  profileModalAvatarWrap: { position: 'relative' },
  profileModalOnlineDot: { position: 'absolute', width: 14, height: 14, right: 1, bottom: 2, borderRadius: 7, borderWidth: 2, borderColor: '#0E1428', backgroundColor: colors.success },
  profileModalIdentity: { flex: 1, minWidth: 0, marginLeft: 14, borderRadius: 16, paddingVertical: 3 },
  profileModalIdentityPressed: { backgroundColor: 'rgba(132,140,169,0.12)' },
  profileModalEyebrow: { color: '#B9B6FF', fontSize: 9, lineHeight: 13, fontWeight: '900', letterSpacing: 1.25 },
  profileModalName: { color: colors.textPrimary, fontSize: 24, lineHeight: 30, fontWeight: '900', marginTop: 1 },
  profileModalMeta: { color: colors.textSecondary, fontSize: 12, lineHeight: 17, marginTop: 2 },
  profileModalStatus: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginTop: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: 'rgba(132,140,169,0.14)', borderWidth: 1, borderColor: 'rgba(132,140,169,0.25)' },
  profileModalStatusConnected: { backgroundColor: 'rgba(112,213,164,0.12)', borderColor: 'rgba(112,213,164,0.32)' },
  profileModalStatusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 5, backgroundColor: colors.success },
  profileModalStatusText: { color: colors.textSecondary, fontSize: 10, fontWeight: '700' },
  profileModalClose: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginLeft: 8, borderRadius: 22, backgroundColor: 'rgba(132,140,169,0.12)', borderWidth: 1, borderColor: colors.glassBorder },
  profileModalAbout: { borderRadius: 16 },
  profileModalAboutPressed: { backgroundColor: 'rgba(132,140,169,0.08)' },
  profileModalSectionLabel: { color: colors.textMuted, fontSize: 10, lineHeight: 14, fontWeight: '900', letterSpacing: 1.2, marginTop: 24, marginBottom: 7 },
  profileModalBio: { color: colors.textPrimary, fontSize: 16, lineHeight: 23 },
  profileModalLanguageToggle: { minHeight: 40, flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16, paddingHorizontal: 11, borderRadius: 13, backgroundColor: 'rgba(109,103,225,0.14)', borderWidth: 1, borderColor: 'rgba(129,123,240,0.42)' },
  profileModalLanguageText: { color: '#D8D2FF', fontSize: 12, fontWeight: '800' },
  profileModalLanguageHint: { flex: 1, color: colors.textMuted, fontSize: 10, textAlign: 'right' },
  profileModalDetails: { marginTop: 12, gap: 9 },
  profileModalInfoCard: { minWidth: 0, padding: 12, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.2)', borderWidth: 1, borderColor: colors.glassBorder },
  profileModalInfoCardPressed: { backgroundColor: 'rgba(109,103,225,0.22)', borderColor: 'rgba(129,123,240,0.65)' },
  profileModalDetailLabel: { color: colors.textMuted, fontSize: 9, lineHeight: 13, fontWeight: '900', letterSpacing: 1.05 },
  profileModalDetailValue: { color: colors.textSecondary, fontSize: 12, lineHeight: 17, marginTop: 4 },
  profileModalActions: { flexDirection: 'row', gap: 9, marginTop: 20 },
  profileModalButton: { flex: 1, minHeight: 46, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingHorizontal: 12, borderRadius: 15, borderWidth: 1 },
  profileModalButtonSecondary: { borderColor: colors.glassBorder, backgroundColor: 'rgba(132,140,169,0.1)' },
  profileModalButtonPrimary: { borderColor: '#817BF0', backgroundColor: 'rgba(109,103,225,0.52)' },
  profileModalButtonSecondaryText: { color: colors.textSecondary, fontSize: 13, fontWeight: '700' },
  profileModalButtonPrimaryText: { color: colors.white, fontSize: 13, fontWeight: '800' },
  profileCard: { padding: 16, borderRadius: 22 },
  profileCardPressable: { borderRadius: 22 },
  profileEditor: { marginTop: 9, padding: 14, borderRadius: 18 },
  profileEditorLabel: { color: colors.textMuted, fontSize: 11, marginBottom: 5, marginTop: 4 },
  profileEditorInput: { minHeight: 42, color: colors.textPrimary, fontSize: 14, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.glassBorder, backgroundColor: 'rgba(0,0,0,0.22)', marginBottom: 8 },
  profileSaveButton: { minHeight: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: 'rgba(109,103,225,0.42)', borderWidth: 1, borderColor: '#817BF0', marginTop: 5 },
  profileSaveText: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' },
  profileCardTop: { flexDirection: 'row', alignItems: 'center' },
  profileAvatarWrap: { position: 'relative' },
  profileAvailableDot: { position: 'absolute', width: 12, height: 12, borderRadius: 6, right: 0, bottom: 1, backgroundColor: colors.success, borderWidth: 2, borderColor: colors.surface },
  profileCardCopy: { flex: 1, marginLeft: 13 },
  profileName: { color: colors.textPrimary, fontSize: 20, fontWeight: '700' },
  profileHandle: { color: colors.textSecondary, fontSize: 12, marginTop: 3 },
  profileStatus: { color: colors.success, fontSize: 11, marginTop: 7 },
  settingsTitle: { marginTop: 26, marginBottom: 10 },
  settingsPanel: { borderRadius: 22 },
  meFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 28, paddingHorizontal: 28 },
  meFooterMark: { width: 28, height: 28, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: colors.glassBorder, overflow: 'hidden', marginRight: 9 },
  meFooterText: { flex: 1, color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  petHomeContent: { flex: 1, paddingHorizontal: spacing.screen, paddingTop: 12, paddingBottom: 104 },
  petHomeStage: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 18 },
  petHomeEyebrow: { color: '#A9A5FF', fontSize: 9, lineHeight: 13, fontWeight: '900', letterSpacing: 1.35, marginBottom: 4 },
  petHomeFloatField: { width: '100%', maxWidth: 390, height: 540, position: 'relative', alignItems: 'center', justifyContent: 'center', overflow: 'visible' },
  floatingPet: { position: 'absolute', alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  floatingPetPressable: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  floatingPetBubble: { width: '100%', height: '100%', overflow: 'hidden', borderRadius: 999, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.035)', borderWidth: 1, borderColor: 'rgba(222, 232, 255, 0.54)', borderTopColor: 'rgba(255, 255, 255, 0.82)', borderRightColor: 'rgba(196, 183, 255, 0.62)', borderBottomColor: 'rgba(139, 143, 255, 0.42)', borderLeftColor: 'rgba(227, 238, 255, 0.64)', shadowColor: '#A9B6FF', shadowOpacity: 0.34, shadowRadius: 14, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
  floatingPetBubbleReflectionArc: { position: 'absolute', width: '78%', height: '78%', top: '-28%', left: '-25%', borderRadius: 999, borderWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.44)', borderLeftColor: 'rgba(234, 242, 255, 0.28)', borderRightColor: 'transparent', borderBottomColor: 'transparent', transform: [{ rotate: '-16deg' }] },
  floatingPetBubbleReflectionSoft: { position: 'absolute', width: '43%', height: '20%', top: '8%', left: '10%', borderRadius: 999, backgroundColor: 'rgba(255, 255, 255, 0.16)', transform: [{ rotate: '-27deg' }] },
  floatingPetBubbleReflectionStreak: { position: 'absolute', width: '19%', height: '5%', top: '23%', left: '20%', borderRadius: 999, backgroundColor: 'rgba(255, 255, 255, 0.3)', transform: [{ rotate: '-34deg' }] },
  floatingPetBubbleReflectionStreakShort: { position: 'absolute', width: '12%', height: '4%', top: '30%', left: '25%', borderRadius: 999, backgroundColor: 'rgba(228, 238, 255, 0.22)', transform: [{ rotate: '-34deg' }] },
  floatingPetBubbleReflectionGlint: { position: 'absolute', width: 6, height: 6, top: '35%', left: '39%', borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.82)' },
  floatingPetBubbleReflectionPin: { position: 'absolute', width: 3, height: 3, top: '29%', left: '47%', borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.64)' },
  floatingPetBurstRing: { position: 'absolute', left: '50%', top: '50%', width: 74, height: 74, marginLeft: -37, marginTop: -37, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(226, 239, 255, 0.68)', zIndex: 2 },
  floatingPetBurstFlash: { position: 'absolute', left: '50%', top: '50%', width: 18, height: 18, marginLeft: -9, marginTop: -9, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(245, 250, 255, 0.92)', backgroundColor: 'rgba(255, 255, 255, 0.16)', zIndex: 2 },
  floatingPetBurstParticle: { position: 'absolute', left: '50%', top: '50%', borderRadius: 999, zIndex: 3 },
  floatingPetImage: { width: '100%', height: '100%' },
  petHomeImageStage: { width: 250, height: 250, alignItems: 'center', justifyContent: 'center', zIndex: 5 },
  petHomeImage: { width: 224, height: 224 },
  petHomeName: { width: '100%', alignSelf: 'center', color: colors.textPrimary, fontSize: 22, lineHeight: 29, fontWeight: '900', textAlign: 'center', marginTop: 2 },
  petHomeCatchphrase: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 3 },
  petSwitchButton: { minWidth: 214, minHeight: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24, paddingHorizontal: 22, borderRadius: 17, backgroundColor: 'rgba(109,103,225,0.42)', borderWidth: 1, borderColor: '#817BF0', shadowColor: colors.accentBlue, shadowOpacity: 0.34, shadowRadius: 16, shadowOffset: { width: 0, height: 5 }, elevation: 12 },
  petSwitchButtonText: { color: '#F2EEFF', fontSize: 14, lineHeight: 19, fontWeight: '900' },
  chatScreen: { flex: 1 },
  chatTopBar: { minHeight: 64, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 11, borderBottomWidth: 1, borderBottomColor: colors.glassBorder },
  chatIdentity: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 3 },
  chatIdentityCopy: { marginLeft: 10 },
  chatIdentityName: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
  chatIdentityStatus: { color: colors.success, fontSize: 11, marginTop: 2 },
  routeToggle: { flexDirection: 'row', alignItems: 'center', gap: 3, marginRight: 8, padding: 3, borderRadius: 12, borderWidth: 1, borderColor: colors.glassBorder, backgroundColor: 'rgba(14,20,40,0.7)' },
  routeToggleButton: { width: 22, height: 22, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  routeToggleButtonActive: { backgroundColor: 'rgba(129,123,240,0.72)' },
  routeToggleText: { color: colors.textSecondary, fontSize: 10, fontWeight: '800' },
  chatOnlineDot: { position: 'absolute', width: 9, height: 9, borderRadius: 5, right: -1, bottom: 0, borderWidth: 2, borderColor: colors.background, backgroundColor: colors.success },
  messageScroll: { flex: 1 },
  messageContent: { paddingHorizontal: 20, paddingTop: 17, paddingBottom: 14 },
  dateDivider: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 10 },
  dateLine: { flex: 1, height: 1, backgroundColor: colors.glassBorder },
  dateText: { color: colors.textMuted, fontSize: 11 },
  sessionDivider: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 18, marginBottom: 14 },
  sessionDividerText: { color: '#BEB9FF', fontSize: 10, fontWeight: '700', letterSpacing: 0.7 },
  photoMessageCard: { width: '88%', alignSelf: 'flex-start', marginBottom: 7, borderRadius: 18, borderBottomLeftRadius: 5, padding: 12, borderWidth: 1, borderColor: 'rgba(220,225,255,0.34)', overflow: 'hidden', shadowColor: colors.accentBlue, shadowOpacity: 0.28, shadowRadius: 14, shadowOffset: { width: 0, height: 5 }, elevation: 9 },
  photoMessageCardMine: { alignSelf: 'flex-end', borderBottomLeftRadius: 18, borderBottomRightRadius: 5 },
  photoMessageHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  photoMessageBadge: { color: '#E9E7FF', fontSize: 9, fontWeight: '900', letterSpacing: 1.2 },
  photoMessageScene: { flex: 1, color: '#F5F3FF', fontSize: 12, fontWeight: '700', textAlign: 'right' },
  photoMessageSceneArea: { height: 116, marginTop: 10, marginBottom: 9, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(7,10,24,0.48)', overflow: 'hidden' },
  photoMessageGlow: { position: 'absolute', width: 150, height: 150, borderRadius: 75, backgroundColor: 'rgba(255,255,255,0.12)' },
  photoMessageEmoji: { fontSize: 64 },
  photoMessageDetail: { color: '#F0F0FF', fontSize: 13, lineHeight: 18, fontWeight: '600' },
  photoMessageHint: { color: 'rgba(239,237,255,0.68)', fontSize: 10, marginTop: 7 },
  typingLine: { alignItems: 'flex-start', marginTop: 5 },
  typingBubble: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 14, paddingVertical: 13, borderRadius: 18, borderBottomLeftRadius: 5, borderWidth: 1, borderColor: colors.glassBorder, backgroundColor: colors.glass, shadowColor: colors.accentBlue, shadowOpacity: 0.34, shadowRadius: 16, shadowOffset: { width: 0, height: 5 }, elevation: 12, overflow: 'hidden' },
  typingDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#B0B6C6' },
  replyDock: { paddingHorizontal: 15, paddingTop: 11, paddingBottom: Platform.OS === 'ios' ? 8 : 10, borderTopWidth: 1, borderTopColor: colors.glassBorder, backgroundColor: 'rgba(5,7,20,0.88)', overflow: 'hidden' },
  replyDockHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7, paddingHorizontal: 2 },
  replyDockTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' },
  replyDockHint: { color: colors.textMuted, fontSize: 11 },
  replyChoices: { maxHeight: 184, marginBottom: 2 },
  replyChoicesContent: { gap: 2, paddingBottom: 2 },
  englishSuggestion: { paddingHorizontal: 12, paddingVertical: 9, borderRadius: 14, marginTop: 6, marginBottom: 7, borderWidth: 1, borderColor: '#817BF0', backgroundColor: 'rgba(109,103,225,0.42)', shadowColor: colors.accentBlue, shadowOpacity: 0.34, shadowRadius: 16, shadowOffset: { width: 0, height: 5 }, elevation: 12 },
  suggestionLabel: { color: '#C0BAFF', fontSize: 10, fontWeight: '700', marginBottom: 3, letterSpacing: 0.5 },
  suggestionText: { color: colors.textPrimary, fontSize: 14, lineHeight: 19 },
  composerRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginTop: 3 },
  composerInputShell: { flex: 1, minHeight: 45, maxHeight: 92, borderRadius: 17, borderWidth: 1, borderColor: colors.glassBorder, backgroundColor: colors.glass, shadowColor: colors.accentBlue, shadowOpacity: 0.34, shadowRadius: 16, shadowOffset: { width: 0, height: 5 }, elevation: 12, overflow: 'hidden' },
  composerInput: { flex: 1, minHeight: 45, maxHeight: 92, borderRadius: 17, borderWidth: 0, backgroundColor: 'transparent', color: colors.textPrimary, fontSize: 15, lineHeight: 20, paddingHorizontal: 14, paddingTop: 12, paddingBottom: 10 },
  toast: { position: 'absolute', left: 28, right: 28, bottom: Platform.OS === 'ios' ? 91 : 95, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 38, paddingHorizontal: 15, borderRadius: 19, borderWidth: 1, borderColor: 'rgba(112,213,201,0.38)', backgroundColor: 'rgba(14,20,40,0.76)', shadowColor: colors.accentBlue, shadowOpacity: 0.34, shadowRadius: 16, shadowOffset: { width: 0, height: 5 }, elevation: 12, overflow: 'hidden' },
  toastText: { color: '#DFFFEF', fontSize: 13, fontWeight: '600', marginLeft: 7 },
  pressed: { opacity: 0.72 },
});
