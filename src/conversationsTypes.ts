import type { CharacterId } from './design';

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
};

export type ConversationGroup = Partial<Record<CharacterId, readonly ConversationRound[]>>;
