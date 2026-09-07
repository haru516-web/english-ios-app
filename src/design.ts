/**
 * Shared design tokens and conversation data for the iOS-style messenger UI.
 * The data is intentionally image-free so it can be used before remote assets
 * or an avatar service are introduced.
 */

export type Gradient = readonly [string, string, ...string[]];

export const colors = {
  background: '#000000',
  surface: '#0E1428',
  surfaceRaised: '#161D3B',
  glass: 'rgba(14, 20, 40, 0.76)',
  glassStrong: 'rgba(78, 70, 173, 0.78)',
  glassBorder: 'rgba(185, 199, 255, 0.38)',
  glassHighlight: 'rgba(204, 197, 255, 0.68)',
  textPrimary: '#EEF0FF',
  textSecondary: '#BFC5E4',
  textMuted: '#848CA9',
  accent: '#817BF0',
  accentBlue: '#766BFF',
  accentSoft: 'rgba(109, 103, 225, 0.42)',
  success: '#70D5A4',
  divider: 'rgba(185, 199, 255, 0.18)',
  white: '#F2EEFF',
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
    shadowOpacity: 0.24,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
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

export type CharacterId =
  | 'jack'
  | 'emma'
  | 'oliver'
  | 'noah'
  | 'alex'
  | 'liam'
  | 'luca'
  | 'miles'
  | 'finn'
  | 'lena'
  | 'mara'
  | 'camille'
  | 'milo'
  | 'clara'
  | 'arthur'
  | 'leo'
  | 'julian'
  | 'declan'
  | 'elias'
  | 'adrian'
  | 'caleb'
  | 'sloane'
  | 'victoria'
  | 'elodie'
  | 'blair';
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

export interface PhotoAttachment {
  emoji: string;
  sceneEnglish: string;
  sceneJapanese: string;
  detailEnglish: string;
  detailJapanese: string;
  accent: string;
}

export interface Message {
  id: MessageId;
  chatId: ChatId;
  sender: MessageSender;
  kind?: MessageKind;
  text: string;
  timestamp: string | number;
  translation?: TranslationState;
  photo?: PhotoAttachment;
  sessionLabelEnglish?: string;
  sessionLabelJapanese?: string;
  replyChoiceId?: ReplyChoiceId;
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
  timestamp: string | number;
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
  { id: 'luca', name: 'Luca', location: 'Southampton', age: 23, bio: 'A roaming sketch artist who treats every day like an adventure.', initials: 'L', gradient: ['#8E684E', '#365B70'], tone: 'Warm spontaneous storytelling English', isFree: false, isConnected: false },
  { id: 'miles', name: 'Miles', location: 'Boston', age: 34, bio: 'An archaeology professor who is rarely far from a dangerous mystery.', initials: 'M', gradient: ['#80613E', '#343E4D'], tone: 'Witty adventurous academic English', isFree: false, isConnected: false },
  { id: 'finn', name: 'Finn', location: 'Savannah', age: 29, bio: 'Plain-spoken, deeply sincere, and full of surprising life stories.', initials: 'F', gradient: ['#657B66', '#8A684B'], tone: 'Simple sincere Southern American English', isFree: false, isConnected: false },
  { id: 'lena', name: 'Lena', location: 'Los Angeles', age: 24, bio: 'A fashion-loving law student whose optimism is sharper than people expect.', initials: 'L', gradient: ['#B06988', '#69528A'], tone: 'Upbeat confident Californian English', isFree: false, isConnected: false },
  { id: 'mara', name: 'Mara', location: 'New York', age: 45, bio: 'A legendary editor with exacting standards and immaculate composure.', initials: 'M', gradient: ['#626272', '#3E4354'], tone: 'Precise demanding professional English', isFree: false, isConnected: false },
  { id: 'camille', name: 'Camille', location: 'Paris', age: 25, bio: 'A quiet dreamer who notices small wonders and gently changes lives.', initials: 'C', gradient: ['#9A6B64', '#4F6872'], tone: 'Gentle imaginative French-influenced English', isFree: false, isConnected: false },
  { id: 'milo', name: 'Milo', location: 'New York', age: 24, bio: 'A free-spirited event photographer who finds stories in accidental detours.', initials: 'M', gradient: ['#C17247', '#485E83'], tone: 'Free-spirited curious New York English', isFree: false, isConnected: false },
  { id: 'clara', name: 'Clara', location: 'Chicago', age: 25, bio: 'A thoughtful museum educator who remembers what people meant to say.', initials: 'C', gradient: ['#8B6A58', '#4D5D72'], tone: 'Measured empathetic American English', isFree: false, isConnected: false },
  { id: 'arthur', name: 'Arthur', location: 'London', age: 29, bio: 'A precise contract lawyer who is kinder than his first sentence suggests.', initials: 'A', gradient: ['#687080', '#5A463B'], tone: 'Dry precise British English', isFree: false, isConnected: false },
  { id: 'leo', name: 'Leo', location: 'Seattle', age: 21, bio: 'A quick-witted student who turns nerves into jokes and useful fixes.', initials: 'L', gradient: ['#4B7187', '#76557A'], tone: 'Witty tech-casual American English', isFree: false, isConnected: false },
  { id: 'julian', name: 'Julian', location: 'Chicago', age: 27, bio: 'A curious podcast producer who finds big questions in ordinary details.', initials: 'J', gradient: ['#6E5E7B', '#3E6171'], tone: 'Curious philosophical American English', isFree: false, isConnected: false },
  { id: 'declan', name: 'Declan', location: 'Dublin', age: 30, bio: 'A warm community organizer who makes room for people on the edge.', initials: 'D', gradient: ['#66806D', '#53677B'], tone: 'Encouraging Irish English', isFree: false, isConnected: false },
  { id: 'elias', name: 'Elias', location: 'Manchester', age: 28, bio: 'A quiet visual designer learning to turn daydreams into departures.', initials: 'E', gradient: ['#657B66', '#53647A'], tone: 'Reflective understated British English', isFree: false, isConnected: false },
  { id: 'adrian', name: 'Adrian', location: 'Santa Fe', age: 37, bio: 'An archaeology professor who tests every exciting idea against evidence.', initials: 'A', gradient: ['#80613E', '#46535D'], tone: 'Dry adventurous academic English', isFree: false, isConnected: false },
  { id: 'caleb', name: 'Caleb', location: 'Austin', age: 38, bio: 'A history teacher and coach who believes the next step is enough.', initials: 'C', gradient: ['#6D765C', '#79563F'], tone: 'Direct grounded Texan English', isFree: false, isConnected: false },
  { id: 'sloane', name: 'Sloane', location: 'Los Angeles', age: 25, bio: 'A fashion-minded law student with bright energy and sharper standards.', initials: 'S', gradient: ['#C05C88', '#6B5AA0'], tone: 'Upbeat strategic Californian English', isFree: false, isConnected: false },
  { id: 'victoria', name: 'Victoria', location: 'New York', age: 47, bio: 'An exacting editor who turns vague ideas into something worth publishing.', initials: 'V', gradient: ['#626272', '#4A536C'], tone: 'Concise precise New York English', isFree: false, isConnected: false },
  { id: 'elodie', name: 'Élodie', location: 'Paris', age: 27, bio: 'A gentle illustrator who notices the small details people leave behind.', initials: 'É', gradient: ['#A5746C', '#55727A'], tone: 'Soft sensory French English', isFree: false, isConnected: false },
  { id: 'blair', name: 'Blair', location: 'New York', age: 26, bio: 'A polished brand editor with high standards and fiercely loyal instincts.', initials: 'B', gradient: ['#8D587A', '#4D526F'], tone: 'Sharp polished New York English', isFree: false, isConnected: false },
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
