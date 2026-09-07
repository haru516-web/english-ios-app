import type { CharacterId } from './design';
import type { ConversationChoice, ConversationGroup, ConversationRound } from './conversationsTypes';
import { conversationGroup1 } from './conversationGroup1';
import { conversationGroup2 } from './conversationGroup2';
import { conversationGroup3 } from './conversationGroup3';
import { conversationGroup4 } from './conversationGroup4';
import { conversationGroup5 } from './conversationGroup5';
import { conversationGroup6 } from './conversationGroup6';
import { conversationGroup7 } from './conversationGroup7';
import { getCharacterQuestionTurn } from './characterQuestionTurns';
import { getCharacterShareTransition, getCharacterShareTurn } from './characterShareTurns';
import { practicalConversationBeats } from './practicalConversations';
import { practicalReactionSets } from './practicalReactions';
import { reciprocalTurns } from './reciprocalTurns';
import {
  getCharacterChoiceEcho,
  getCharacterPromptCloser,
  getCharacterReaction,
  getCharacterSelfDisclosure,
} from './characterConversationVoices';

export type { ConversationChoice, ConversationRound } from './conversationsTypes';

export const conversationScripts: ConversationGroup = {
  ...conversationGroup1,
  ...conversationGroup2,
  ...conversationGroup3,
  ...conversationGroup4,
  ...conversationGroup5,
  ...conversationGroup6,
  ...conversationGroup7,
};

const promptUseCounts = new Map<string, number>();
for (const rounds of Object.values(conversationScripts)) {
  for (const round of rounds ?? []) {
    promptUseCounts.set(round.promptEnglish, (promptUseCounts.get(round.promptEnglish) ?? 0) + 1);
  }
}
const sharedPromptEnglish = new Set(
  [...promptUseCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([prompt]) => prompt),
);

export function getConversationRound(characterId: CharacterId, roundIndex: number): ConversationRound | undefined {
  const round = conversationScripts[characterId]?.[roundIndex];
  if (!round) return undefined;

  const questionTurn = getCharacterQuestionTurn(characterId, roundIndex);
  if (questionTurn) {
    return {
      ...round,
      turnType: 'question',
      promptEnglish: questionTurn.promptEnglish,
      promptJapanese: questionTurn.promptJapanese,
      choices: questionTurn.choices,
    };
  }

  const shareTurn = getCharacterShareTurn(characterId, roundIndex);
  if (shareTurn) {
    return {
      ...round,
      turnType: 'share',
      promptEnglish: shareTurn.promptEnglish,
      promptJapanese: shareTurn.promptJapanese,
      choices: shareTurn.choices,
    };
  }

  const needsCharacterAside = roundIndex % 4 === 0 || (!round.isCustom && sharedPromptEnglish.has(round.promptEnglish));
  if (round.isCustom || !needsCharacterAside) return round;
  const closer = getCharacterPromptCloser(characterId, roundIndex);
  return {
    ...round,
    promptEnglish: `${round.promptEnglish.trim()} ${closer[0]}`,
    promptJapanese: `${round.promptJapanese.trim()} ${closer[1]}`,
  };
}

export function getConversationChoice(characterId: CharacterId, roundIndex: number, choiceId: string): ConversationChoice | undefined {
  return getConversationRound(characterId, roundIndex)?.choices.find((choice) => choice.id === choiceId);
}

export function buildConversationReply(characterId: CharacterId, roundIndex: number, choiceId: string) {
  const round = getConversationRound(characterId, roundIndex);
  if (!round) return null;
  const choice = round?.choices.find((item) => item.id === choiceId);
  if (!choice) return null;

  const nextRound = getConversationRound(characterId, roundIndex + 1);
  const choiceIndex = round.choices.findIndex((item) => item.id === choiceId);
  const response = round.turnType === 'question'
    ? (() => {
      const detail = getCharacterSelfDisclosure(characterId, roundIndex + 1, choiceIndex);
      return {
        en: `${choice.responseEnglish} ${detail[0]}`,
        ja: `${choice.responseJapanese}${detail[1]}`,
      };
    })()
    : round.turnType === 'share'
    ? { en: choice.responseEnglish, ja: choice.responseJapanese }
    : round.isCustom
    ? {
      en: choice.responseEnglish + ' ' + getCharacterChoiceEcho(characterId, choice.english, 'en', roundIndex, choiceIndex),
      ja: choice.responseJapanese + getCharacterChoiceEcho(characterId, choice.japanese, 'ja', roundIndex, choiceIndex),
    }
    : (() => {
      const [english, japanese] = getCharacterReaction(characterId, roundIndex, choiceIndex, choice);
      return { en: english, ja: japanese };
    })();
  const disclosure = round.turnType !== 'question' && round.turnType !== 'share'
    ? nextRound?.turnType === 'share'
      ? getCharacterShareTransition(characterId)
      : getCharacterSelfDisclosure(characterId, roundIndex, choiceIndex)
    : null;
  const responseEnglish = [response.en, disclosure?.[0]].filter((line): line is string => Boolean(line));
  const responseJapanese = [response.ja, disclosure?.[1]].filter((line): line is string => Boolean(line));
  const nextPrompt = nextRound ? {
    id: characterId + '-prompt-' + String(roundIndex + 2),
    text: nextRound.promptEnglish,
    translation: {
      english: [nextRound.promptEnglish],
      japanese: [nextRound.promptJapanese],
    },
  } : null;

  return {
    id: characterId + '-reply-' + String(roundIndex + 1) + '-' + choiceId,
    text: responseEnglish.join(' '),
    translation: {
      english: responseEnglish,
      japanese: responseJapanese,
    },
    nextPrompt,
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
  'milo',
  'clara',
  'arthur',
  'leo',
  'julian',
  'declan',
  'elias',
  'adrian',
  'caleb',
  'sloane',
  'victoria',
  'elodie',
  'blair',
];

function assertNonEmpty(value: string, label: string) {
  if (!value.trim()) throw new Error(`Conversation validation failed: empty ${label}`);
}

export function validatePracticalConversationBeats() {
  if (practicalConversationBeats.length !== 50) {
    throw new Error('Conversation validation failed: practical catalog must have exactly 50 rounds');
  }
  if (practicalReactionSets.length !== practicalConversationBeats.length) {
    throw new Error('Conversation validation failed: each practical round must have a reaction set');
  }
  if (reciprocalTurns.length !== practicalConversationBeats.length) {
    throw new Error('Conversation validation failed: each practical round must have a reciprocal turn');
  }

  practicalConversationBeats.forEach(([promptEnglish, promptJapanese, ...replies], roundIndex) => {
    const label = `practical round ${roundIndex + 1}`;
    assertNonEmpty(promptEnglish, `${label} English prompt`);
    assertNonEmpty(promptJapanese, `${label} Japanese prompt`);
    if (replies.length !== 3) {
      throw new Error(`Conversation validation failed: ${label} must have 3 replies`);
    }
    if (practicalReactionSets[roundIndex].length !== replies.length) {
      throw new Error(`Conversation validation failed: ${label} must have one reaction per reply`);
    }
    const [questionEnglish, questionJapanese, answerEnglish, answerJapanese] = reciprocalTurns[roundIndex];
    if (Boolean(questionEnglish) !== Boolean(questionJapanese)) {
      throw new Error(`Conversation validation failed: ${label} reciprocal question translations must match`);
    }
    assertNonEmpty(answerEnglish, `${label} reciprocal English answer`);
    assertNonEmpty(answerJapanese, `${label} reciprocal Japanese answer`);

    replies.forEach(([english, japanese], replyIndex) => {
      assertNonEmpty(english, `${label} reply ${replyIndex + 1} English`);
      assertNonEmpty(japanese, `${label} reply ${replyIndex + 1} Japanese`);
      const [reactionEnglish, reactionJapanese] = practicalReactionSets[roundIndex][replyIndex];
      assertNonEmpty(reactionEnglish, `${label} reaction ${replyIndex + 1} English`);
      assertNonEmpty(reactionJapanese, `${label} reaction ${replyIndex + 1} Japanese`);
    });
  });

  return true;
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
validatePracticalConversationBeats();

