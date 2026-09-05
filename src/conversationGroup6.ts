import type { ConversationChoice, ConversationGroup, ConversationRound } from './conversationsTypes';

type Beat = {
  en: string;
  ja: string;
  choices: [string, string][];
};

const makeRounds = (character: 'mara' | 'camille', beats: Beat[]): ConversationRound[] => beats.map((beat, index) => ({
  id: `${character}-${String(index + 1).padStart(2, '0')}`,
  promptEnglish: beat.en,
  promptJapanese: beat.ja,
  choices: beat.choices.map(([english, japanese], choiceIndex) => {
    const responseEnglish = character === 'mara'
      ? [
        `“${english}.” Clear. I value that kind of directness.`,
        `Noted. “${english}” is a considered choice, and it tells me something useful.`,
        `I can work with “${english}.” It has a sensible shape.`,
      ][choiceIndex]
      : [
        `“${english}” — I can almost see the light in that answer.`,
        `That is gentle. “${english}” leaves a little room for wonder.`,
        `I like “${english}.” It feels like a small door opening.`,
      ][choiceIndex];
    const responseJapanese = character === 'mara'
      ? [
        `「${japanese}」。明快ね。そういう率直さは大切にしたいわ。`,
        `記録しておく。「${japanese}」はよく考えた選択で、あなたのことが少し分かる。`,
        `「${japanese}」なら進められるわ。筋の通った答えね。`,
      ][choiceIndex]
      : [
        `「${japanese}」ね。その答えに差す光まで見える気がする。`,
        `やさしい答え。「${japanese}」には、少し不思議を置く余白があるね。`,
        `「${japanese}」が好き。小さな扉が開くみたいに感じるよ。`,
      ][choiceIndex];
    const choice: ConversationChoice = {
      id: `${character}-${String(index + 1).padStart(2, '0')}-${choiceIndex + 1}`,
      japanese,
      english,
      responseEnglish,
      responseJapanese,
    };
    return choice;
  }),
}));

const maraBeats: Beat[] = [
  { en: 'What makes a first impression credible?', ja: '信頼できる第一印象とは？', choices: [['Specificity', '具体性'], ['Calm confidence', '落ち着いた自信'], ['Listening first', 'まず聞くこと']] },
  { en: 'How do you begin a demanding day?', ja: '忙しい一日をどう始める？', choices: [['Set the priorities', '優先順位を決める'], ['Read the room', '場の状況を見る'], ['Start with one precise task', '一つの正確な仕事から始める']] },
  { en: 'What belongs in a good brief?', ja: 'よいブリーフに必要なものは？', choices: [['A clear goal', '明確な目標'], ['The audience', '対象者'], ['A realistic deadline', '現実的な締め切り']] },
  { en: 'What kind of writing earns your attention?', ja: 'どんな文章なら注意を引く？', choices: [['A sharp opening', '鋭い書き出し'], ['A fresh idea', '新鮮な考え'], ['A truthful detail', '本当らしい細部']] },
  { en: 'How do you prefer feedback?', ja: 'どんなフィードバックが好き？', choices: [['Direct and specific', '率直で具体的'], ['With a proposed fix', '修正案を添えて'], ['After I have read it once', '一度自分で読んだ後']] },
  { en: 'What makes a meeting worthwhile?', ja: '価値のある会議とは？', choices: [['A decision', '決定がある'], ['A useful disagreement', '有益な意見の違いがある'], ['A clear next step', '次の一歩が明確になる']] },
  { en: 'How do you protect your focus?', ja: '集中力をどう守る？', choices: [['Close the notifications', '通知を閉じる'], ['Block the calendar', '予定をブロックする'], ['Finish one thing before opening another', '一つ終えてから次を開く']] },
  { en: 'What is your ideal work setting?', ja: '理想の仕事環境は？', choices: [['A quiet office', '静かなオフィス'], ['A capable team', '有能なチーム'], ['A clean desk and time', '整った机と時間']] },
  { en: 'What small luxury improves a long day?', ja: '長い一日をよくする小さなぜいたくは？', choices: [['Excellent coffee', '上質なコーヒー'], ['A perfect pen', '完璧なペン'], ['An uninterrupted hour', '邪魔の入らない一時間']] },
  { en: 'How do you decide what to remove?', ja: '何を削るかどう決める？', choices: [['It repeats the point', '要点を繰り返している'], ['It weakens the rhythm', 'リズムを弱めている'], ['It is clever but unnecessary', '巧いが不要である']] },
  { en: 'What makes a collaboration work?', ja: '協働をうまくするものは？', choices: [['Shared standards', '共通の基準'], ['Honest updates', '正直な進捗共有'], ['Respect for expertise', '専門性への敬意']] },
  { en: 'How do you handle a vague request?', ja: '曖昧な依頼にはどう対応する？', choices: [['Ask for the outcome', '成果を尋ねる'], ['Offer three options', '三つの選択肢を出す'], ['Rewrite the brief', 'ブリーフを書き直す']] },
  { en: 'What detail changes the quality of a project?', ja: '企画の質を変える細部は？', choices: [['The first sentence', '最初の一文'], ['The final check', '最後の確認'], ['The person it is for', '誰のためか']] },
  { en: 'How do you make a difficult call?', ja: '難しい判断をどうする？', choices: [['Review the evidence', '証拠を見直す'], ['Name the trade-off', '代償を言葉にする'], ['Choose and take responsibility', '選んで責任を持つ']] },
  { en: 'What makes a presentation persuasive?', ja: '説得力のあるプレゼンとは？', choices: [['A clear argument', '明確な論点'], ['Useful evidence', '役立つ証拠'], ['Confidence without noise', '騒がしくない自信']] },
  { en: 'What do you do when a deadline moves?', ja: '締め切りが動いたらどうする？', choices: [['Reprioritize', '優先順位を変える'], ['Protect the essentials', '重要な部分を守る'], ['Ask what can change', '何を変えられるか聞く']] },
  { en: 'What makes a professional trustworthy?', ja: '信頼できるプロとは？', choices: [['They say what is possible', '可能なことを言う'], ['They keep confidences', '秘密を守る'], ['They correct themselves', '自分を訂正できる']] },
  { en: 'What do you notice in a new room?', ja: '新しい部屋で何に気づく？', choices: [['The light', '光'], ['The exits', '出口'], ['Who is being overlooked', '見落とされている人']] },
  { en: 'What habit keeps you prepared?', ja: '準備を保つ習慣は？', choices: [['Read the material early', '資料を早めに読む'], ['Keep notes current', 'メモを最新にする'], ['Leave a margin of time', '時間に余白を残す']] },
  { en: 'What did an early mistake teach you?', ja: '初期の失敗から何を学んだ？', choices: [['Check the assumption', '前提を確認する'], ['Ask sooner', '早めに聞く'], ['Do not confuse speed with progress', '速さと前進を混同しない']] },
  { en: 'What kind of ambition is useful?', ja: '役に立つ野心とは？', choices: [['Ambition with a purpose', '目的のある野心'], ['Ambition that raises the standard', '基準を上げる野心'], ['Ambition that leaves room for people', '人の余白を残す野心']] },
  { en: 'How should a leader use authority?', ja: 'リーダーは権限をどう使うべき？', choices: [['Make decisions clearly', '明確に決める'], ['Give credit away', '功績を人に渡す'], ['Protect the team', 'チームを守る']] },
  { en: 'What do you admire in a colleague?', ja: '同僚のどこを評価する？', choices: [['Good judgment', 'よい判断力'], ['Follow-through', '最後までやり抜くこと'], ['The courage to disagree', '異論を唱える勇気']] },
  { en: 'What makes work meaningful to you?', ja: 'あなたにとって仕事に意味を与えるものは？', choices: [['It improves something', '何かをよくする'], ['It gives people a voice', '人に声を与える'], ['It is done with care', '丁寧に行う']] },
  { en: 'What did your upbringing teach you about standards?', ja: '育った環境から基準について何を学んだ？', choices: [['Do the work properly', '仕事をきちんとする'], ['Be useful', '役に立つ'], ['Leave things better', 'よくして残す']] },
  { en: 'What memory still guides your judgment?', ja: '今も判断の軸になる思い出は？', choices: [['A mentor’s correction', '師の指摘'], ['A difficult project', '難しい企画'], ['A promise I kept', '守った約束']] },
  { en: 'How do you respond to criticism?', ja: '批判にはどう応じる？', choices: [['Find the valid point', '妥当な点を探す'], ['Ask for specifics', '具体性を求める'], ['Keep the standard and adjust the method', '基準を保ち方法を変える']] },
  { en: 'What makes you feel competent?', ja: '有能だと感じるのはいつ？', choices: [['A clean solution', 'きれいな解決'], ['A calm decision under pressure', 'プレッシャー下の落ち着いた判断'], ['Helping someone else succeed', '誰かの成功を助ける']] },
  { en: 'What kind of risk is worth taking?', ja: 'どんなリスクなら取る価値がある？', choices: [['A risk with a clear reason', '明確な理由があるリスク'], ['A risk that opens a door', '扉を開くリスク'], ['A risk after preparation', '準備の後のリスク']] },
  { en: 'What do you protect when you say no?', ja: '断るとき何を守っている？', choices: [['The quality of the work', '仕事の質'], ['My time', '自分の時間'], ['A more important promise', 'もっと大切な約束']] },
  { en: 'What support do you actually appreciate?', ja: '本当にありがたい支えは？', choices: [['A practical solution', '実際的な解決策'], ['An honest assessment', '正直な評価'], ['Someone who stays composed', '落ち着いている人']] },
  { en: 'How should people repair a mistake?', ja: '失敗はどう修復すべき？', choices: [['Name it clearly', '明確に認める'], ['Fix the consequence', '結果を直す'], ['Change the process', '仕組みを変える']] },
  { en: 'What does trust require?', ja: '信頼に必要なものは？', choices: [['Consistency', '一貫性'], ['Privacy', 'プライバシー'], ['The freedom to disagree', '異論を許すこと']] },
  { en: 'What makes a home restorative?', ja: '家が回復できる場所になるものは？', choices: [['Silence', '静けさ'], ['Good food', 'よい食事'], ['No performance required', '演じなくていいこと']] },
  { en: 'Which private accomplishment matters most?', ja: '人に見せない達成で大切なものは？', choices: [['Keeping a difficult promise', '難しい約束を守る'], ['Asking for help', '助けを求める'], ['Changing an old habit', '古い習慣を変える']] },
  { en: 'What are you refining in yourself?', ja: '自分の何を磨いている？', choices: [['Patience', '忍耐'], ['Warmth', '温かさ'], ['The ability to let go', '手放す力']] },
  { en: 'What future do you want to edit toward?', ja: 'どんな未来へ自分を編集していきたい？', choices: [['More purpose', 'もっと目的のある未来'], ['More time', 'もっと時間のある未来'], ['More room for people', '人のための余白がある未来']] },
  { en: 'What would make tomorrow efficient?', ja: '明日を効率よくするものは？', choices: [['One clear priority', '明確な優先事項一つ'], ['A prepared start', '準備された始まり'], ['A boundary around the evening', '夜を守る境界線']] },
  { en: 'What do you want your younger self to know?', ja: '若い頃の自分に何を知ってほしい？', choices: [['Standards can be kind', '基準は優しくてもいい'], ['You can change your mind', '考えを変えていい'], ['You do not have to do everything', 'すべてをやらなくていい']] },
  { en: 'What kind of honesty builds closeness?', ja: '親密さを育てる正直さとは？', choices: [['The truth at the right time', '適切な時の真実'], ['A clear boundary', '明確な境界線'], ['A sincere apology', '心からの謝罪']] },
  { en: 'What kindness should never be considered inefficient?', ja: '非効率と考えてはいけない優しさは？', choices: [['Listening', '聞くこと'], ['Teaching someone patiently', '辛抱強く教えること'], ['Making room for rest', '休む余白を作ること']] },
  { en: 'What are you grateful a colleague taught you?', ja: '同僚から教わって感謝していることは？', choices: [['Ask one better question', 'よりよい質問を一つする'], ['Share the credit', '功績を分かち合う'], ['Leave room for revision', '修正の余地を残す']] },
  { en: 'What does a good partnership feel like?', ja: 'よいパートナーシップとはどんな感じ？', choices: [['Mutual respect', '相互の尊重'], ['High standards without fear', '恐れのない高い基準'], ['A shared sense of purpose', '目的を共有している']] },
  { en: 'What do you want to be remembered for?', ja: '何を覚えていてほしい？', choices: [['Making excellent work', '優れた仕事をしたこと'], ['Making difficult things clearer', '難しいことを明確にしたこと'], ['Treating people with dignity', '人を尊厳を持って扱ったこと']] },
  { en: 'Which ritual keeps you grounded?', ja: '地に足をつける習慣は？', choices: [['A tidy desk', '整った机'], ['A walk without a phone', 'スマホなしの散歩'], ['A quiet meal', '静かな食事']] },
  { en: 'What do you do when confidence slips?', ja: '自信が揺らいだらどうする？', choices: [['Return to the facts', '事実に戻る'], ['Read something excellent', '優れたものを読む'], ['Call someone I trust', '信頼する人に電話する']] },
  { en: 'What should a close person feel with you?', ja: '親しい人にあなたといてどう感じてほしい？', choices: [['Respected', '尊重されている'], ['Safe to be honest', '正直でいて安全'], ['Encouraged to grow', '成長を応援されている']] },
  { en: 'What final standard matters in a life?', ja: '人生で最後に大切な基準は？', choices: [['Did I do the work honestly?', '正直に仕事をしたか'], ['Did I leave people stronger?', '人をより強くして残したか'], ['Did I make room for joy?', '喜びの余白を作ったか']] },
  { en: 'What would you like our next conversation to hold?', ja: '次の会話に何を持たせたい？', choices: [['A useful question', '役立つ質問'], ['A little less certainty', '少しの不確かさ'], ['A clear plan and a laugh', '明確な計画と笑い']] },
  { en: 'What is the clearest thing you know today?', ja: '今日、最も明確に分かっていることは？', choices: [['Care requires consistency', '気遣いには一貫性が必要'], ['Good work needs revision', 'よい仕事には修正が必要'], ['A life needs room for joy', '人生には喜びの余白が必要']] },];

const camilleBeats: Beat[] = [
  { en: 'What small thing did you notice this morning?', ja: '今朝、どんな小さなことに気づいた？', choices: [['Light on a wall', '壁に差す光'], ['A bird’s sound', '鳥の声'], ['A kind face', '優しい顔']] },
  { en: 'Which kind of morning feels like a beginning?', ja: 'どんな朝が始まりらしく感じる？', choices: [['A quiet one', '静かな朝'], ['One full of color', '色に満ちた朝'], ['One with an unexpected message', '思いがけないメッセージのある朝']] },
  { en: 'What makes a place feel welcoming?', ja: '場所を居心地よくするものは？', choices: [['Warm light', 'あたたかな光'], ['A table ready for two', '二人分の用意があるテーブル'], ['A little imperfection', '少しの不完全さ']] },
  { en: 'What would you sketch first in a new street?', ja: '新しい通りで最初に何を描く？', choices: [['An old doorway', '古い扉'], ['A person passing by', '通り過ぎる人'], ['The shadow of a tree', '木の影']] },
  { en: 'What kind of conversation feels gentle?', ja: 'どんな会話がやさしく感じる？', choices: [['One with pauses', '間のある会話'], ['One with shared laughter', '一緒に笑える会話'], ['One where nothing must be solved', '何も解決しなくていい会話']] },
  { en: 'What do you keep when a day is difficult?', ja: 'つらい日に何を大切にする？', choices: [['A small routine', '小さな習慣'], ['A beautiful object', '美しいもの'], ['A message from a friend', '友だちからのメッセージ']] },
  { en: 'Which color belongs to your mood today?', ja: '今日の気分に似合う色は？', choices: [['Soft gold', 'やわらかな金色'], ['Green after rain', '雨上がりの緑'], ['The blue of evening', '夕暮れの青']] },
  { en: 'How do you find your way in a new city?', ja: '新しい街でどう道を見つける？', choices: [['Follow the sound', '音についていく'], ['Notice the light', '光を見る'], ['Ask someone kindly', '誰かに優しく尋ねる']] },
  { en: 'What is your favorite kind of café?', ja: 'どんなカフェが一番好き？', choices: [['One with plants', '植物のある店'], ['One near a window', '窓の近くにある店'], ['One with a handwritten menu', '手書きのメニューがある店']] },
  { en: 'What makes an ordinary day feel special?', ja: '普通の日を特別にするものは？', choices: [['A shared pastry', 'お菓子を分け合うこと'], ['A new thought', '新しい考え'], ['A walk taken slowly', 'ゆっくり歩くこと']] },
  { en: 'What kind of person makes you curious?', ja: 'どんな人に好奇心を感じる？', choices: [['Someone who notices details', '細部に気づく人'], ['Someone who asks unusual questions', '変わった質問をする人'], ['Someone who is quietly brave', '静かに勇敢な人']] },
  { en: 'How do you rest your imagination?', ja: '想像力をどう休ませる？', choices: [['Look out the window', '窓の外を見る'], ['Cook something slowly', 'ゆっくり料理する'], ['Listen to a familiar song', 'なじみの曲を聴く']] },
  { en: 'What would you put in a memory box?', ja: '思い出の箱に何を入れる？', choices: [['A ticket', 'チケット'], ['A note in someone’s handwriting', '誰かの手書きのメモ'], ['A small stone', '小さな石']] },
  { en: 'Where do you go when you need courage?', ja: '勇気が必要なときどこへ行く？', choices: [['Near the water', '水の近く'], ['To a trusted person', '信頼する人のところ'], ['Somewhere I can begin small', '小さく始められる場所']] },
  { en: 'What makes a creative idea arrive?', ja: '創造的な考えは何でやってくる？', choices: [['A quiet mind', '静かな心'], ['A surprising mistake', '思いがけない失敗'], ['A conversation', '会話']] },
  { en: 'What kind of weather changes your plans?', ja: 'どんな天気なら予定を変える？', choices: [['A sudden golden sun', '突然の金色の晴れ'], ['A soft rain', 'やわらかな雨'], ['A storm that asks us to stay in', '家にいようと誘う嵐']] },
  { en: 'What would you learn just for joy?', ja: '喜びのためだけに何を学ぶ？', choices: [['A new recipe', '新しいレシピ'], ['A few words of another language', '別の言語を少し'], ['How to draw hands', '手の描き方']] },
  { en: 'How do you like to travel?', ja: 'どんな旅が好き？', choices: [['By train', '電車で'], ['On foot with no timetable', '予定なしで歩いて'], ['Toward a small town', '小さな町へ']] },
  { en: 'What makes a street memorable?', ja: '通りを忘れられなくするものは？', choices: [['A smell from a kitchen', '台所からの香り'], ['Music from an open window', '開いた窓からの音楽'], ['A person who smiles', '笑っている人']] },
  { en: 'What did a mistake reveal to you?', ja: '失敗は何を教えてくれた？', choices: [['I need more patience', 'もっと忍耐が必要'], ['I can begin again', 'やり直せる'], ['I was carrying too much', '抱えすぎていた']] },
  { en: 'How do you like someone to offer advice?', ja: 'どんな助言ならうれしい？', choices: [['Softly', 'やさしく'], ['With a story', '物語と一緒に'], ['Only after asking', 'まず尋ねてから']] },
  { en: 'What would you do with an empty afternoon?', ja: '予定のない午後に何をする？', choices: [['Visit a museum', '美術館へ行く'], ['Write a letter', '手紙を書く'], ['Follow a new street', '新しい通りを歩く']] },
  { en: 'What did home teach you about love?', ja: '家庭から愛について何を学んだ？', choices: [['Feed someone', '誰かに食事を作る'], ['Remember small details', '小さなことを覚える'], ['Leave the light on', '明かりをつけておく']] },
  { en: 'Which sound feels like home?', ja: 'どんな音が家のように感じる？', choices: [['A kettle', 'ケトルの音'], ['Someone laughing in another room', '別の部屋の笑い声'], ['Rain on glass', 'ガラスに当たる雨']] },
  { en: 'What kind of work feels like a gift?', ja: '贈り物のように感じる仕事は？', choices: [['Making beauty', '美しさを作る'], ['Helping someone feel seen', '誰かが見てもらえたと感じるのを助ける'], ['Making a difficult thing lighter', '難しいことを軽くする']] },
  { en: 'How do you choose when both paths are beautiful?', ja: 'どちらの道も美しいときどう選ぶ？', choices: [['Listen to my body', '体の声を聞く'], ['Ask what I will remember', '何を覚えていたいか考える'], ['Take the smaller step first', '小さな一歩を先に進む']] },
  { en: 'What brings your confidence back?', ja: '自信を取り戻すものは？', choices: [['A familiar song', 'なじみの曲'], ['A kind voice', '優しい声'], ['Finishing one small thing', '小さなことを一つ終える']] },
  { en: 'When do you let people see your heart?', ja: 'いつ人に心を見せる？', choices: [['Over a long walk', '長い散歩のとき'], ['After a shared secret', '秘密を共有した後'], ['When silence feels safe', '沈黙が安心できるとき']] },
  { en: 'What support feels like a warm room?', ja: '温かな部屋のように感じる支えは？', choices: [['Someone listening', '誰かが聞いてくれる'], ['A hand with the practical thing', '実際のことを手伝ってくれる手'], ['A quiet invitation', '静かな誘い']] },
  { en: 'How can two people disagree tenderly?', ja: '二人はどう優しく意見を違えられる？', choices: [['Leave a pause', '間を置く'], ['Stay curious', '好奇心を保つ'], ['Remember the person first', 'まず相手を思い出す']] },
  { en: 'What makes trust feel like a home?', ja: '信頼が家のように感じるものは？', choices: [['Keeping a promise', '約束を守る'], ['Privacy', '秘密を守る'], ['Room to change', '変わる余白']] },
  { en: 'What memory would you paint?', ja: 'どんな思い出を描きたい？', choices: [['A table after dinner', '夕食後のテーブル'], ['A friend arriving', '友だちが来るところ'], ['A sky before rain', '雨の前の空']] },
  { en: 'What are you making time for?', ja: '何のために時間を作っている？', choices: [['Rest', '休むこと'], ['Making something with my hands', '手を使って何かを作ること'], ['People I love', '大切な人たち']] },
  { en: 'What would you change if fear were quieter?', ja: '恐れが静かなら何を変える？', choices: [['Send the message', 'メッセージを送る'], ['Take the journey', '旅に出る'], ['Show someone my work', '誰かに作品を見せる']] },
  { en: 'What kind of good news makes you glow?', ja: 'どんなよい知らせで輝く？', choices: [['A friend found their way', '友だちが道を見つけた知らせ'], ['A small dream became real', '小さな夢が実現した知らせ'], ['Someone felt less alone', '誰かが孤独でなくなった知らせ']] },
  { en: 'What do you do when the world feels too loud?', ja: '世界がうるさく感じるときどうする？', choices: [['Find a quiet corner', '静かな場所を探す'], ['Make tea', 'お茶をいれる'], ['Call someone gentle', '優しい人に電話する']] },
  { en: 'What quiet achievement matters to you?', ja: 'どんな静かな達成が大切？', choices: [['I kept going', '続けたこと'], ['I told the truth', '本当のことを言ったこと'], ['I let myself rest', '自分を休ませたこと']] },
  { en: 'What boundary gives you room to dream?', ja: '夢を見る余白をくれる境界線は？', choices: [['Time without screens', '画面を見ない時間'], ['Saying no gently', 'やさしく断ること'], ['A slow morning', 'ゆっくりした朝']] },
  { en: 'What would you whisper to your younger self?', ja: '若い頃の自分に何をささやく？', choices: [['You are not late', '遅れていないよ'], ['Keep your wonder', '驚きを持ち続けて'], ['Someone will understand', '分かってくれる人がいるよ']] },
  { en: 'What kindness would you like to repeat?', ja: 'どんな優しさを繰り返したい？', choices: [['Leave a light on', '明かりをつけておく'], ['Ask one more question', 'もう一つ質問する'], ['Share the beautiful thing', '美しいものを分かち合う']] },
  { en: 'What are you thankful for tonight?', ja: '今夜何に感謝している？', choices: [['A safe place', '安心できる場所'], ['A small surprise', '小さな驚き'], ['Someone who stayed', 'そばにいてくれた人']] },
  { en: 'What keeps a friendship alive?', ja: '友情を生かし続けるものは？', choices: [['Curiosity', '好奇心'], ['Returning after silence', '沈黙の後に戻ること'], ['Making ordinary time beautiful', '普通の時間を美しくすること']] },
  { en: 'What future scene would you like to see?', ja: 'どんな未来の場面を見たい？', choices: [['A bright kitchen', '明るい台所'], ['A table with many voices', 'たくさんの声があるテーブル'], ['A notebook full of beginnings', '始まりでいっぱいのノート']] },
  { en: 'What should I remember about you?', ja: '私にあなたの何を覚えていてほしい？', choices: [['I notice the little things', '小さなことに気づくこと'], ['I keep looking for light', '光を探し続けること'], ['I make room for tenderness', 'やさしさの余白を作ること']] },
  { en: 'Which ritual could become ours?', ja: 'どんな習慣を私たちのものにできそう？', choices: [['A shared coffee', '一緒にコーヒーを飲む'], ['A letter now and then', '時々手紙を書く'], ['One small wonder each day', '毎日一つ小さな驚きを共有する']] },
  { en: 'How do you show someone they matter?', ja: '大切だとどう伝える？', choices: [['Remember their details', '相手の細部を覚える'], ['Save them a seat', '席を取っておく'], ['Say it without decoration', '飾らずに言う']] },
  { en: 'What hope will you carry into tomorrow?', ja: '明日へどんな希望を持っていく？', choices: [['There is still time', 'まだ時間がある'], ['Beauty can be made', '美しさは作れる'], ['We can begin softly', 'やさしく始められる']] },
  { en: 'What will you say when we meet again?', ja: 'また会えたら何と言う？', choices: [['Look what I found', '見つけたものを見て'], ['Tell me about your day', '今日のことを聞かせて'], ['I am happy you came', '来てくれてうれしいよ']] },
  { en: 'What little light would you leave for tomorrow?', ja: '明日のためにどんな小さな光を残したい？', choices: [['A kind message', '優しいメッセージ'], ['A page left open', '開いたままのページ'], ['A warm lamp', '温かなランプ']] },
  { en: 'What would you like to notice together next?', ja: '次は一緒に何に気づきたい？', choices: [['A new window', '新しい窓'], ['A familiar street in new weather', 'いつもの通りの新しい天気'], ['The moment a story begins', '物語が始まる瞬間']] },];

export const conversationGroup6: ConversationGroup = {
  mara: makeRounds('mara', maraBeats),
  camille: makeRounds('camille', camilleBeats),
};

export default conversationGroup6;

