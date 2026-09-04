/**
 * Shared design tokens and conversation data for the iOS-style messenger UI.
 * The data is intentionally image-free so it can be used before remote assets
 * or an avatar service are introduced.
 */

export type Gradient = readonly [string, string, ...string[]];

export const colors = {
  background: '#05070B',
  surface: '#0B0F16',
  surfaceRaised: '#111722',
  glass: 'rgba(26, 31, 43, 0.72)',
  glassStrong: 'rgba(31, 38, 54, 0.88)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  glassHighlight: 'rgba(255, 255, 255, 0.07)',
  textPrimary: '#F5F7FB',
  textSecondary: '#A7AFBD',
  textMuted: '#697181',
  accent: '#7771E8',
  accentBlue: '#6E8CFF',
  accentSoft: 'rgba(119, 113, 232, 0.22)',
  success: '#70D5A4',
  divider: 'rgba(255, 255, 255, 0.08)',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const spacing = {
  screen: 20,
  section: 24,
  card: 10,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  avatar: 44,
  avatarSmall: 34,
  searchHeight: 42,
  tabBarHeight: 72,
  touchTarget: 44,
  messageMaxWidthRatio: 0.82,
} as const;

export const typography = {
  display: { fontSize: 30, lineHeight: 36, fontWeight: '700' as const },
  title: { fontSize: 20, lineHeight: 26, fontWeight: '700' as const },
  body: { fontSize: 16, lineHeight: 22, fontWeight: '400' as const },
  bodyMedium: { fontSize: 16, lineHeight: 22, fontWeight: '500' as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '600' as const },
} as const;

export const shadows = {
  glass: {
    shadowColor: colors.accentBlue,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  floating: {
    shadowColor: colors.black,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
} as const;

export type CharacterId = 'jack' | 'emma' | 'oliver' | 'noah' | 'alex' | 'liam';
export type ChatId = `chat-${CharacterId}`;
export type MessageId = string;
export type ReplyChoiceId = string;
export type MessageSender = 'character' | 'user';
export type MessageKind = 'text' | 'typing';

export interface Character {
  id: CharacterId;
  name: string;
  location: string;
  age: number;
  bio: string;
  initials: string;
  gradient: Gradient;
  tone: string;
  isFree: boolean;
  isConnected: boolean;
}

export interface TranslationState {
  english: string[];
  japanese: string[];
  /** Sentence indexes shown in English for a partial translation state. */
  englishSentenceIndexes?: number[];
}

export interface Message {
  id: MessageId;
  chatId: ChatId;
  sender: MessageSender;
  kind?: MessageKind;
  text: string;
  timestamp: string;
  translation?: TranslationState;
  isRead?: boolean;
}

export interface ReplyChoice {
  id: ReplyChoiceId;
  japanese: string;
  english: string;
}

export interface ReplyResponse {
  id: MessageId;
  text: string;
  timestamp: string;
  translation?: TranslationState;
}

export interface ReplyPrompt {
  messageId: MessageId;
  choices: readonly ReplyChoice[];
  responses: Readonly<Record<ReplyChoiceId, ReplyResponse>>;
}

export interface ChatSummary {
  id: ChatId;
  characterId: CharacterId;
  latestMessageId: MessageId;
  preview: string;
  timeLabel: string;
  unreadCount: number;
  isOnline?: boolean;
}

export const characters: readonly Character[] = [
  { id: 'jack', name: 'Jack', location: 'New York', age: 24, bio: 'Free-spirited. A little reckless. Somehow easy to talk to.', initials: 'J', gradient: ['#A9653E', '#344C75'], tone: 'Casual American English', isFree: true, isConnected: true },
  { id: 'emma', name: 'Emma', location: 'Chicago', age: 25, bio: 'Warm, observant, and always has an opinion worth hearing.', initials: 'E', gradient: ['#8B5C4D', '#4C405F'], tone: 'Warm conversational English', isFree: false, isConnected: true },
  { id: 'oliver', name: 'Oliver', location: 'London', age: 24, bio: 'Quiet at first. Surprisingly talkative once he knows you.', initials: 'O', gradient: ['#765A42', '#2E4961'], tone: 'Dry British English', isFree: false, isConnected: true },
  { id: 'noah', name: 'Noah', location: 'Los Angeles', age: 21, bio: 'College student. Loves memes and late nights.', initials: 'N', gradient: ['#5F7890', '#B07952'], tone: 'Slang-heavy casual English', isFree: false, isConnected: false },
  { id: 'alex', name: 'Alex', location: 'Toronto', age: 25, bio: 'Works hard, plays hard. Into music and coffee.', initials: 'A', gradient: ['#4B657B', '#6B4E4E'], tone: 'Natural everyday English', isFree: false, isConnected: false },
  { id: 'liam', name: 'Liam', location: 'Dublin', age: 23, bio: 'Easygoing and honest. Always down to talk.', initials: 'L', gradient: ['#6C806D', '#795A4B'], tone: 'Friendly Irish English', isFree: false, isConnected: false },
] as const;

export const chatSummaries: readonly ChatSummary[] = [
  { id: 'chat-jack', characterId: 'jack', latestMessageId: 'jack-3', preview: 'You still awake?', timeLabel: '23:42', unreadCount: 1, isOnline: true },
  { id: 'chat-emma', characterId: 'emma', latestMessageId: 'emma-1', preview: 'I need your opinion on something.', timeLabel: '19:14', unreadCount: 1 },
  { id: 'chat-oliver', characterId: 'oliver', latestMessageId: 'oliver-1', preview: 'That was not what I expected.', timeLabel: '12:06', unreadCount: 1 },
  { id: 'chat-noah', characterId: 'noah', latestMessageId: 'noah-1', preview: "Here's the pic I took today lol", timeLabel: 'Yesterday', unreadCount: 0 },
  { id: 'chat-alex', characterId: 'alex', latestMessageId: 'alex-1', preview: "Let's catch up soon.", timeLabel: 'Mon', unreadCount: 0 },
] as const;

export const messages: readonly Message[] = [
  { id: 'jack-1', chatId: 'chat-jack', sender: 'character', text: 'Morning.', timestamp: '8:14', isRead: true },
  { id: 'jack-2', chatId: 'chat-jack', sender: 'character', text: 'I just had the worst lunch.', timestamp: '13:32', isRead: true },
  { id: 'jack-user-1', chatId: 'chat-jack', sender: 'user', text: 'Oh no, what happened?', timestamp: '13:35', isRead: true },
  { id: 'jack-3', chatId: 'chat-jack', sender: 'character', text: 'You still up?', timestamp: '23:42', translation: { english: ['You still up?'], japanese: ['まだ起きてる？'] }, isRead: false },
] as const;

export const replyPrompts: readonly ReplyPrompt[] = [
  {
    messageId: 'jack-3',
    choices: [
      { id: 'awake-yes', japanese: 'まだ起きてるよ', english: "Yeah, I'm still up." },
      { id: 'awake-sleep', japanese: 'ちょうど寝ようとしてた', english: 'I was just about to go to sleep.' },
      { id: 'awake-waiting', japanese: 'あなたから連絡来ると思って待ってた', english: "I was waiting to see if you'd text me." },
      { id: 'awake-why', japanese: 'なんで？', english: 'Why?' },
    ],
    responses: {
      'awake-yes': {
        id: 'jack-4',
        text: 'I knew it. What are you doing up this late?',
        timestamp: '23:49',
        translation: {
          english: ['I knew it.', 'What are you doing up this late?'],
          japanese: ['やっぱり。', 'こんな遅くまで何してるの？'],
        },
      },
      'awake-sleep': {
        id: 'jack-4',
        text: 'Then I caught you at the exact wrong time. Want to talk for five minutes before you sleep?',
        timestamp: '23:49',
        translation: {
          english: ['Then I caught you at the exact wrong time.', 'Want to talk for five minutes before you sleep?'],
          japanese: ['じゃあ、ちょうど悪いタイミングで連絡しちゃったね。', '寝る前に5分だけ話さない？'],
        },
      },
      'awake-waiting': {
        id: 'jack-4',
        text: "You were waiting for me? That's a dangerous thing to admit this late.",
        timestamp: '23:49',
        translation: {
          english: ['You were waiting for me?', "That's a dangerous thing to admit this late."],
          japanese: ['僕のこと待ってたの？', 'こんな夜中にそんなこと言うのは危険だね。'],
        },
      },
      'awake-why': {
        id: 'jack-4',
        text: 'No reason. I just had a feeling you might still be awake. How was your day?',
        timestamp: '23:49',
        translation: {
          english: ['No reason.', 'I just had a feeling you might still be awake.', 'How was your day?'],
          japanese: ['別に理由はないよ。', 'まだ起きてる気がしただけ。', '今日はどんな一日だった？'],
        },
      },
    },
  },
  {
    messageId: 'jack-4',
    choices: [
      { id: 'late-nothing', japanese: '特に何も。ただ眠れなくて', english: "Nothing much. I just can't sleep." },
      { id: 'late-talk', japanese: 'あなたと話したかった', english: 'I wanted to talk to you.' },
      { id: 'late-you', japanese: 'そっちこそ何してるの？', english: 'What about you?' },
    ],
    responses: {
      'late-nothing': {
        id: 'jack-5',
        text: 'Same. My brain picked tonight to replay every embarrassing thing I have ever done.',
        timestamp: '23:53',
        translation: {
          english: ['Same.', 'My brain picked tonight to replay every embarrassing thing I have ever done.'],
          japanese: ['僕も同じ。', '脳みそが今夜を、今までの恥ずかしいこと全部思い出す夜に決めたみたい。'],
        },
      },
      'late-talk': {
        id: 'jack-5',
        text: 'Careful. I might start thinking you actually like talking to me.',
        timestamp: '23:53',
        translation: {
          english: ['Careful.', 'I might start thinking you actually like talking to me.'],
          japanese: ['気をつけて。', '本当に僕と話すのが好きなのかと思っちゃうよ。'],
        },
      },
      'late-you': {
        id: 'jack-5',
        text: 'Avoiding sleep with impressive commitment, apparently. I had a weird day.',
        timestamp: '23:53',
        translation: {
          english: ['Avoiding sleep with impressive commitment, apparently.', 'I had a weird day.'],
          japanese: ['どうやら見事な覚悟で睡眠を避けてるみたいだね。', '今日は変な一日だったよ。'],
        },
      },
    },
  },
  {
    messageId: 'jack-5',
    choices: [
      { id: 'late-laugh', japanese: 'それは最悪だね（笑）', english: 'That sounds rough lol.' },
      { id: 'late-curious', japanese: 'どんなこと考えてたの？', english: 'What were you thinking about?' },
      { id: 'late-honest', japanese: '実は私も話したかった', english: 'Honestly, I wanted to talk too.' },
    ],
    responses: {
      'late-laugh': {
        id: 'jack-6',
        text: "Exactly. Be honest—what's the most embarrassing thing you've done lately?",
        timestamp: '23:57',
        translation: {
          english: ['Exactly.', "Be honest—what's the most embarrassing thing you've done lately?"],
          japanese: ['本当にそれ。', '正直に言って、最近いちばん恥ずかしかったことは？'],
        },
      },
      'late-curious': {
        id: 'jack-6',
        text: "Mostly old mistakes and one very questionable haircut. Your turn—what's on your mind?",
        timestamp: '23:57',
        translation: {
          english: ['Mostly old mistakes and one very questionable haircut.', "Your turn—what's on your mind?"],
          japanese: ['昔の失敗と、かなり微妙な髪型のことかな。', '今度は君の番。何を考えてるの？'],
        },
      },
      'late-honest': {
        id: 'jack-6',
        text: "Okay, now you're making it hard for me to pretend this is casual.",
        timestamp: '23:57',
        translation: {
          english: ['Okay, now you are making it hard for me to pretend this is casual.'],
          japanese: ['わかった。これを普通の雑談のふりをするのが難しくなってきたよ。'],
        },
      },
    },
  },
  {
    messageId: 'jack-6',
    choices: [
      { id: 'night-keep', japanese: 'もう少しだけ話そう', english: "Let's talk for a little longer." },
      { id: 'night-sleep', japanese: 'そろそろ寝るね', english: 'I should probably sleep soon.' },
      { id: 'night-text', japanese: '明日また連絡してくれる？', english: 'Will you text me again tomorrow?' },
    ],
    responses: {
      'night-keep': {
        id: 'jack-7',
        text: 'Good. I like having you here. One more question, then.',
        timestamp: '00:01',
        translation: {
          english: ['Good.', 'I like having you here.', 'One more question, then.'],
          japanese: ['よかった。', '君がここにいてくれるの、好きだよ。', 'じゃあ、もう一つだけ質問させて。'],
        },
      },
      'night-sleep': {
        id: 'jack-7',
        text: "Okay. Sleep well. Don't disappear on me tomorrow.",
        timestamp: '00:01',
        translation: {
          english: ['Okay.', 'Sleep well.', "Don't disappear on me tomorrow."],
          japanese: ['わかった。', 'ゆっくり寝てね。', '明日、僕の前から消えないでよ。'],
        },
      },
      'night-text': {
        id: 'jack-7',
        text: "Tomorrow, then. But don't pretend you weren't waiting for me.",
        timestamp: '00:01',
        translation: {
          english: ['Tomorrow, then.', "But don't pretend you weren't waiting for me."],
          japanese: ['じゃあ、また明日。', 'でも、僕からの連絡を待ってなかったふりはしないでね。'],
        },
      },
    },
  },
] as const;

export const translationExample: TranslationState = {
  english: ["I'm seriously exhausted today.", "I don't even know why.", "I didn't even do anything."],
  japanese: ['今日マジで疲れた。', '何でか自分でもわからない。', '何もしてないのに。'],
};

export const getCharacter = (id: CharacterId) => characters.find((character) => character.id === id);
export const getMessagesForChat = (chatId: ChatId) => messages.filter((message) => message.chatId === chatId);
