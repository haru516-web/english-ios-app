import type { ImageSourcePropType } from 'react-native';

export type PetId =
  | 'mobirin'
  | 'mobichi'
  | 'yami'
  | 'mobiyan'
  | 'mobiyura'
  | 'reomoby'
  | 'potemoby'
  | 'mobibou'
  | 'babumoby';

export type PetCharacter = {
  id: PetId;
  name: string;
  catchphrase: string;
  accent: string;
  image: ImageSourcePropType;
  meaningTemplates: readonly string[];
};

// Keep this roster in the same order and with the same artwork as mobby-main.
// The English chat app starts with babumoby, but every mobby character remains
// available from the in-app picker.
export const PET_CHARACTERS: readonly PetCharacter[] = [
  {
    id: 'mobirin',
    name: 'もびりん',
    catchphrase: '知的なおじ',
    accent: '#DCEAF0',
    image: require('../assets/mobies/mobirin.webp'),
    meaningTemplates: ['{meaning}という意味ですぞ。', '{meaning}ってことですな。'],
  },
  {
    id: 'mobichi',
    name: 'もびち',
    catchphrase: '気ままギャル♡',
    accent: '#FFE1EA',
    image: require('../assets/mobies/mobichi.webp'),
    meaningTemplates: ['{meaning}って意味だよ〜♡', '{meaning}ってこと！ わかった？'],
  },
  {
    id: 'yami',
    name: '病みモビー',
    catchphrase: 'メンヘラちゃん',
    accent: '#E9E0F4',
    image: require('../assets/mobies/yami-mobby.webp'),
    meaningTemplates: ['{meaning}って意味……だよ。', '{meaning}ってこと。忘れないでね……。'],
  },
  {
    id: 'mobiyan',
    name: 'もびやん',
    catchphrase: 'まっすぐなヤンキー',
    accent: '#D8EFF4',
    image: require('../assets/mobies/mobiyan.webp'),
    meaningTemplates: ['{meaning}って意味やで！', '{meaning}っちゅうことや。覚えとき！'],
  },
  {
    id: 'mobiyura',
    name: 'もびゆら',
    catchphrase: '痛いほど本気な堕天王',
    accent: '#E8D9FF',
    image: require('../assets/mobies/mobiyura.webp'),
    meaningTemplates: ['{meaning}という意味だ。覚えておけ。', '{meaning}……それがこの言葉の真実だ。'],
  },
  {
    id: 'reomoby',
    name: 'れおモビー',
    catchphrase: 'お姫様専属の王子様',
    accent: '#FFE3DC',
    image: require('../assets/mobies/reomoby.webp'),
    meaningTemplates: ['{meaning}って意味さ。君のために覚えておこう。', '{meaning}ということだよ。素敵な言葉だね。'],
  },
  {
    id: 'potemoby',
    name: 'ぽてモビー',
    catchphrase: '休むことに全力なニート',
    accent: '#FFF0D9',
    image: require('../assets/mobies/potemoby.webp'),
    meaningTemplates: ['{meaning}って意味だよ〜。覚えたら、ひと休みしよ。', '{meaning}ってこと。ゆっくりで大丈夫〜。'],
  },
  {
    id: 'mobibou',
    name: 'モビ坊',
    catchphrase: '調子のいい悪ガキ',
    accent: '#FFE6C5',
    image: require('../assets/mobies/mobibou.webp'),
    meaningTemplates: ['{meaning}って意味だぞ！ メモったか？', '{meaning}ってこと！ へへ、ひとつ賢くなったな！'],
  },
  {
    id: 'babumoby',
    name: 'ばぶモビー',
    catchphrase: 'みんなを動かす赤ちゃん',
    accent: '#FFF0F3',
    image: require('../assets/mobies/babumoby.webp'),
    meaningTemplates: ['{meaning}って意味だばぶ〜', '{meaning}ってことだばぶ。わかった？'],
  },
] as const;

export function isPetId(value: unknown): value is PetId {
  return typeof value === 'string' && PET_CHARACTERS.some((pet) => pet.id === value);
}

export function getPetCharacter(id: PetId) {
  return PET_CHARACTERS.find((pet) => pet.id === id) ?? PET_CHARACTERS[PET_CHARACTERS.length - 1];
}
