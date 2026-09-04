import AsyncStorage from '@react-native-async-storage/async-storage';

export type PetLookupKind = 'word' | 'phrase' | 'sentence';
export type PetDictionarySource = 'local' | 'external' | 'not-found' | 'unavailable';

export type PetDictionaryResult = {
  word: string;
  meaning: string | null;
  kind: PetLookupKind;
  source: PetDictionarySource;
};

const PET_DICTIONARY_CACHE_KEY = 'between.pet-dictionary-cache.v1';
const MYMEMORY_ENDPOINT = 'https://api.mymemory.translated.net/get';
const MAX_INPUT_LENGTH = 120;
const REQUEST_TIMEOUT_MS = 8000;
const QUERY_PATTERN = /^[a-z]+(?:['-][a-z]+)*(?:\s+[a-z]+(?:['-][a-z]+)*)*[.!?,;:]?$/i;
const SENTENCE_START_PATTERN = /^(?:i|i'm|i'll|i've|i'd|you|he|she|we|they|it|this|that|what|why|how|can|could|would|will|please|let's|there|there's)\b/i;

// Instant answers for the most natural chat vocabulary. The external
// dictionary fills gaps for a word or phrase that is not listed here.
const ENGLISH_WORD_MEANINGS: Readonly<Record<string, string>> = {
  about: '〜について、約',
  admit: '認める、白状する',
  apparently: 'どうやら、見たところでは',
  awkward: '気まずい、不自然な',
  awake: '起きている、目が覚めて',
  careful: '注意深い、気をつけて',
  casual: '気楽な、カジュアルな',
  commitment: '約束、責任を持って取り組むこと',
  curious: '知りたがる、好奇心の強い',
  dangerous: '危険な',
  disappear: '消える、姿を消す',
  embarrassing: '恥ずかしい、気まずい',
  exhausted: 'へとへとに疲れた',
  exact: '正確な、まさにその',
  figure: '数字、姿・形、人物',
  honestly: '正直に言うと、正直なところ',
  opinion: '意見、考え',
  late: '遅い、遅くに',
  morning: '朝、午前',
  natural: '自然な、無理のない',
  nothing: '何も〜ない、何もないもの',
  probably: 'たぶん、おそらく',
  questionable: '疑わしい、微妙な',
  reckless: '無謀な、後先を考えない',
  seriously: '真剣に、本当に',
  sleep: '眠る、睡眠',
  surprisingly: '驚くほど、意外にも',
  thought: '考え、思ったこと',
  today: '今日、きょうは',
  weird: '変な、奇妙な',
  worst: '最悪の、いちばん悪い',
};

type MyMemoryResponse = {
  responseStatus?: number;
  responseData?: { translatedText?: string };
  matches?: Array<{ translation?: string; match?: number }>;
};

const memoryCache = new Map<string, string>();
let cacheLoadPromise: Promise<void> | null = null;

function loadPersistentCache() {
  if (cacheLoadPromise) return cacheLoadPromise;
  cacheLoadPromise = AsyncStorage.getItem(PET_DICTIONARY_CACHE_KEY)
    .then((raw) => {
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        Object.entries(parsed).forEach(([key, value]) => {
          if (typeof value === 'string') memoryCache.set(key, value);
        });
      } catch {
        // Ignore malformed cache data and use the network/local dictionary.
      }
    })
    .catch(() => undefined);
  return cacheLoadPromise;
}

async function persistTranslation(key: string, translation: string) {
  memoryCache.set(key, translation);
  await loadPersistentCache();

  const serialized: Record<string, string> = {};
  Array.from(memoryCache.entries()).slice(-100).forEach(([entryKey, value]) => {
    serialized[entryKey] = value;
  });
  await AsyncStorage.setItem(PET_DICTIONARY_CACHE_KEY, JSON.stringify(serialized));
}

function normalizeForLookup(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.!?,;:]+$/g, '')
    .replace(/\s+/g, ' ');
}

function getLookupKind(value: string): PetLookupKind {
  const trimmed = value.trim();
  const wordCount = trimmed.split(/\s+/).length;
  if (/[.!?]$/.test(trimmed) || wordCount >= 4 || SENTENCE_START_PATTERN.test(trimmed)) return 'sentence';
  return wordCount > 1 ? 'phrase' : 'word';
}

function cleanTranslation(value: string | undefined, query: string) {
  if (!value) return null;
  const cleaned = value
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned || /^please select two distinct languages/i.test(cleaned)) return null;
  if (cleaned.toLowerCase() === query.toLowerCase()) return null;
  return cleaned;
}

async function fetchExternalMeaning(query: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const url = `${MYMEMORY_ENDPOINT}?q=${encodeURIComponent(query)}&langpair=en|ja&mt=1`;
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) return null;

    const payload = (await response.json()) as MyMemoryResponse;
    if (payload.responseStatus && payload.responseStatus !== 200) return null;

    const translations = [
      payload.responseData?.translatedText,
      ...(payload.matches ?? [])
        .slice()
        .sort((left, right) => (right.match ?? 0) - (left.match ?? 0))
        .map((match) => match.translation),
    ];
    return translations.map((translation) => cleanTranslation(translation, query)).find(Boolean) ?? null;
  } finally {
    clearTimeout(timeout);
  }
}

export function sanitizePetInput(value: string) {
  return value
    .replace(/[’‘]/g, "'")
    .replace(/[^a-zA-Z'.,!?;:\- ]/g, '')
    .replace(/\s+/g, ' ')
    .slice(0, MAX_INPUT_LENGTH);
}

export function normalizePetWord(value: string) {
  return normalizeForLookup(value);
}

export function lookupPetWord(value: string): PetDictionaryResult | null {
  const word = sanitizePetInput(value).trim();
  if (!word || !QUERY_PATTERN.test(word)) return null;
  const key = normalizeForLookup(word);
  const meaning = ENGLISH_WORD_MEANINGS[key] ?? null;
  return {
    word,
    meaning,
    kind: getLookupKind(word),
    source: meaning ? 'local' : 'not-found',
  };
}

export async function lookupPetQuery(value: string): Promise<PetDictionaryResult | null> {
  const localResult = lookupPetWord(value);
  if (!localResult) return null;

  // Do not send an arbitrary sentence to a third party in this first step.
  // Full-sentence translation will be a separate, explicit feature decision.
  if (localResult.kind === 'sentence' || localResult.meaning) return localResult;

  const key = normalizeForLookup(localResult.word);
  await loadPersistentCache();
  const cached = memoryCache.get(key);
  if (cached) {
    return { ...localResult, meaning: cached, source: 'external' };
  }

  try {
    const meaning = await fetchExternalMeaning(localResult.word);
    if (!meaning) return { ...localResult, source: 'not-found' };
    void persistTranslation(key, meaning).catch(() => undefined);
    return { ...localResult, meaning, source: 'external' };
  } catch {
    return { ...localResult, source: 'unavailable' };
  }
}
