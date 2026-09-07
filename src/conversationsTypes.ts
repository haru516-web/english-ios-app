import type { CharacterId, PhotoAttachment } from './design';

export type ConversationChoice = {
  id: string;
  japanese: string;
  english: string;
  responseEnglish: string;
  responseJapanese: string;
};

export type ConversationRound = {
  id: string;
  promptEnglish: string;
  promptJapanese: string;
  choices: readonly ConversationChoice[];
  /** The conversational mode: the user answers, asks, or reacts to a share. */
  turnType?: 'answer' | 'question' | 'share' | 'statement' | 'invite' | 'goodnight';
  /** New model-driven scripts bypass the legacy shared practical overlay. */
  isCustom?: boolean;
  photo?: PhotoAttachment;
  sessionLabelEnglish?: string;
  sessionLabelJapanese?: string;
};

export type ConversationGroup = Partial<Record<CharacterId, readonly ConversationRound[]>>;
