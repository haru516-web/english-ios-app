import type { CharacterId } from './design';
import type { ConversationChoice, ConversationGroup, ConversationRound } from './conversationsTypes';
import { conversationGroup1 } from './conversationGroup1';
import { conversationGroup2 } from './conversationGroup2';
import { conversationGroup3 } from './conversationGroup3';
import { conversationGroup4 } from './conversationGroup4';
import { conversationGroup5 } from './conversationGroup5';
import { conversationGroup6 } from './conversationGroup6';
import { conversationGroup7 } from './conversationGroup7';
import { practicalConversationBeats } from './practicalConversations';
import { practicalReactionSets } from './practicalReactions';
import { reciprocalTurns } from './reciprocalTurns';

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

export function getConversationRound(characterId: CharacterId, roundIndex: number): ConversationRound | undefined {
  return conversationScripts[characterId]?.[roundIndex];
}

export function getConversationChoice(characterId: CharacterId, roundIndex: number, choiceId: string): ConversationChoice | undefined {
  return getConversationRound(characterId, roundIndex)?.choices.find((choice) => choice.id === choiceId);
}

type DialogueLine = { en: string; ja: string };

const naturalReactions: Partial<Record<CharacterId, readonly DialogueLine[]>> = {
  jack: [
    { en: 'Yeah, I get that.', ja: 'うん、分かるよ。' },
    { en: 'Same here.', ja: '僕も同じ。' },
    { en: 'Good call.', ja: 'それがよさそう。' },
    { en: 'Okay, I’m with you.', ja: 'うん、そうしよう。' },
    { en: 'That works.', ja: 'それでいこう。' },
  ],
  emma: [
    { en: 'I get that.', ja: '分かるよ。' },
    { en: 'That makes sense.', ja: 'それなら納得。' },
    { en: 'Good point.', ja: '確かに。' },
    { en: 'I can see why.', ja: 'そうする理由、分かるよ。' },
    { en: 'Okay, got it.', ja: 'うん、分かった。' },
  ],
  oliver: [
    { en: 'Fair enough.', ja: 'なるほどね。' },
    { en: 'That makes sense.', ja: 'それなら納得だね。' },
    { en: 'That seems reasonable.', ja: 'それは筋が通ってる。' },
    { en: 'I can see why.', ja: 'そうする理由は分かるよ。' },
    { en: 'That works.', ja: 'それで問題なさそう。' },
  ],
  noah: [
    { en: 'Yeah, I get you.', ja: 'うん、分かる。' },
    { en: 'Honestly, same.', ja: 'マジで、僕も同じ。' },
    { en: 'Okay, bet.', ja: 'オッケー、そうしよう。' },
    { en: 'That works.', ja: 'それでいける。' },
    { en: 'Got you.', ja: '了解。' },
  ],
  alex: [
    { en: 'Yeah, that makes sense.', ja: 'うん、それは分かる。' },
    { en: 'I get that.', ja: '分かるよ。' },
    { en: 'Good call.', ja: 'それがよさそう。' },
    { en: 'That works for me.', ja: '僕はそれで大丈夫。' },
    { en: 'I’m with you.', ja: '同感だよ。' },
  ],
  liam: [
    { en: 'Ah, I get you.', ja: 'ああ、分かるよ。' },
    { en: 'Fair enough.', ja: 'なるほどね。' },
    { en: 'Good call.', ja: 'それがいいね。' },
    { en: 'Yeah, same here.', ja: 'うん、僕も同じ。' },
    { en: 'That works.', ja: 'それでいこう。' },
  ],
  luca: [
    { en: 'Oh, I’m into that.', ja: 'あ、それいいね。' },
    { en: 'I can see that.', ja: '分かる気がする。' },
    { en: 'Good idea.', ja: 'いい考えだね。' },
    { en: 'Yeah, let’s do that.', ja: 'うん、そうしよう。' },
    { en: 'I’m in.', ja: '僕もやる。' },
  ],
  miles: [
    { en: 'Fair point.', ja: '確かにそうだね。' },
    { en: 'I can see the logic.', ja: '筋は分かるよ。' },
    { en: 'That works.', ja: 'それでいいと思う。' },
    { en: 'Sounds reasonable.', ja: '妥当だと思う。' },
    { en: 'I can see why.', ja: 'そうする理由は分かるよ。' },
  ],
  finn: [
    { en: 'I hear you.', ja: '分かるよ。' },
    { en: 'Makes sense.', ja: 'なるほど。' },
    { en: 'That works.', ja: 'それでいこう。' },
    { en: 'I get it.', ja: '分かるよ。' },
    { en: 'Fair enough.', ja: 'それなら納得。' },
  ],
  lena: [
    { en: 'I get that.', ja: '分かるよ。' },
    { en: 'Good call.', ja: 'それがよさそう。' },
    { en: 'That works.', ja: 'それでいけそう。' },
    { en: 'Yeah, absolutely.', ja: 'うん、もちろん。' },
    { en: 'Okay, I’m with you.', ja: 'うん、そうしよう。' },
  ],
  mara: [
    { en: 'Understood.', ja: '分かったわ。' },
    { en: 'That works.', ja: 'それでいきましょう。' },
    { en: 'Got it.', ja: '了解。' },
    { en: 'Makes sense.', ja: '筋が通っているわ。' },
    { en: 'Agreed.', ja: '同意するわ。' },
  ],
  camille: [
    { en: 'I understand.', ja: '分かるよ。' },
    { en: 'I can see why.', ja: 'そうする理由、分かるよ。' },
    { en: 'That works.', ja: 'それでいいね。' },
    { en: 'Good idea.', ja: 'いい考えだね。' },
    { en: 'Yes, I get it.', ja: 'うん、分かるよ。' },
  ],
};

const naturalBridges: readonly DialogueLine[] = [
  { en: '', ja: '' },
  { en: 'So, ', ja: 'それで、' },
  { en: 'By the way, ', ja: 'そういえば、' },
  { en: 'Okay—', ja: 'じゃあ、' },
  { en: 'Oh, and ', ja: 'あと、' },
];

function pickDialogueLine(lines: readonly DialogueLine[], index: number) {
  return lines[index % lines.length];
}

export function buildConversationReply(characterId: CharacterId, roundIndex: number, choiceId: string) {
  const choice = getConversationChoice(characterId, roundIndex, choiceId);
  if (!choice) return null;

  const nextRound = getConversationRound(characterId, roundIndex + 1);
  const nextPrompt = nextRound ? {
    en: nextRound.promptEnglish,
    ja: nextRound.promptJapanese,
  } : null;

  return {
    id: characterId + '-reply-' + String(roundIndex + 1) + '-' + choiceId,
    text: nextPrompt ? choice.responseEnglish + ' ' + nextPrompt.en : choice.responseEnglish,
    translation: {
      english: nextPrompt ? [choice.responseEnglish, nextPrompt.en] : [choice.responseEnglish],
      japanese: nextPrompt ? [choice.responseJapanese, nextPrompt.ja] : [choice.responseJapanese],
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

