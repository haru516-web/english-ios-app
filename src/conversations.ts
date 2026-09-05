import type { CharacterId } from './design';
import type { ConversationChoice, ConversationGroup, ConversationRound } from './conversationsTypes';
import { conversationGroup1 } from './conversationGroup1';
import { conversationGroup2 } from './conversationGroup2';
import { conversationGroup3 } from './conversationGroup3';
import { conversationGroup4 } from './conversationGroup4';
import { conversationGroup5 } from './conversationGroup5';
import { conversationGroup6 } from './conversationGroup6';

export type { ConversationChoice, ConversationRound } from './conversationsTypes';

export const conversationScripts: ConversationGroup = {
  ...conversationGroup1,
  ...conversationGroup2,
  ...conversationGroup3,
  ...conversationGroup4,
  ...conversationGroup5,
  ...conversationGroup6,
};

export function getConversationRound(characterId: CharacterId, roundIndex: number): ConversationRound | undefined {
  return conversationScripts[characterId]?.[roundIndex];
}

export function getConversationChoice(characterId: CharacterId, roundIndex: number, choiceId: string): ConversationChoice | undefined {
  return getConversationRound(characterId, roundIndex)?.choices.find((choice) => choice.id === choiceId);
}

export function buildConversationReply(characterId: CharacterId, roundIndex: number, choiceId: string) {
  const choice = getConversationChoice(characterId, roundIndex, choiceId);
  if (!choice) return null;

  const nextRound = getConversationRound(characterId, roundIndex + 1);
  return {
    id: `${characterId}-reply-${roundIndex + 1}-${choiceId}`,
    text: nextRound ? `${choice.responseEnglish} ${nextRound.promptEnglish}` : choice.responseEnglish,
    translation: {
      english: nextRound ? [choice.responseEnglish, nextRound.promptEnglish] : [choice.responseEnglish],
      japanese: nextRound ? [choice.responseJapanese, nextRound.promptJapanese] : [choice.responseJapanese],
    },
  };
}

const expectedCharacterIds: readonly CharacterId[] = [
  'jack',
  'emma',
  'oliver',
  'noah',
  'alex',
  'liam',
  'luca',
  'miles',
  'finn',
  'lena',
  'mara',
  'camille',
];

function assertNonEmpty(value: string, label: string) {
  if (!value.trim()) throw new Error(`Conversation validation failed: empty ${label}`);
}

export function validateConversationScripts(scripts: ConversationGroup = conversationScripts) {
  for (const characterId of expectedCharacterIds) {
    const rounds = scripts[characterId];
    if (!rounds || rounds.length !== 50) {
      throw new Error(`Conversation validation failed: ${characterId} must have exactly 50 rounds`);
    }

    const roundIds = new Set<string>();
    for (const [roundIndex, round] of rounds.entries()) {
      if (roundIds.has(round.id)) throw new Error(`Conversation validation failed: duplicate round ${characterId}/${round.id}`);
      roundIds.add(round.id);
      assertNonEmpty(round.id, `${characterId} round id`);
      assertNonEmpty(round.promptEnglish, `${characterId}/${round.id} English prompt`);
      assertNonEmpty(round.promptJapanese, `${characterId}/${round.id} Japanese prompt`);
      if (round.choices.length !== 3) {
        throw new Error(`Conversation validation failed: ${characterId}/${round.id} must have 3 choices`);
      }

      const choiceIds = new Set<string>();
      for (const choice of round.choices) {
        if (choiceIds.has(choice.id)) throw new Error(`Conversation validation failed: duplicate choice ${characterId}/${round.id}/${choice.id}`);
        choiceIds.add(choice.id);
        assertNonEmpty(choice.id, `${characterId}/${round.id} choice id`);
        assertNonEmpty(choice.japanese, `${characterId}/${round.id}/${choice.id} Japanese choice`);
        assertNonEmpty(choice.english, `${characterId}/${round.id}/${choice.id} English choice`);
        assertNonEmpty(choice.responseEnglish, `${characterId}/${round.id}/${choice.id} English response`);
        assertNonEmpty(choice.responseJapanese, `${characterId}/${round.id}/${choice.id} Japanese response`);
      }

      if (roundIndex > 0 && round.id === rounds[roundIndex - 1].id) {
        throw new Error(`Conversation validation failed: adjacent duplicate round ${characterId}/${round.id}`);
      }
    }
  }
  return true;
}

validateConversationScripts();

