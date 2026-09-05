import type { ConversationChoice, ConversationGroup, ConversationRound } from './conversationsTypes';

type Beat = {
  en: string;
  ja: string;
  choices: [string, string][];
};

const makeRounds = (character: 'alex' | 'liam', beats: Beat[]): ConversationRound[] => beats.map((beat, index) => ({
  id: `${character}-${String(index + 1).padStart(2, '0')}`,
  promptEnglish: beat.en,
  promptJapanese: beat.ja,
  choices: beat.choices.map(([english, japanese], choiceIndex) => {
    const responseEnglish = character === 'alex'
      ? [
        `“${english}” — yeah, I get that. It sounds like a good fit for you.`,
        `That makes sense. “${english}” tells me where your head is today.`,
        `I like that answer. We could make a pretty good plan around “${english}.”`,
      ][choiceIndex]
      : [
        `“${english}” sounds grand to me. There is a good bit of honesty in that.`,
        `Fair enough—“${english}” is a sound way to put it.`,
        `I like that. There is something very human in “${english}.”`,
      ][choiceIndex];
    const responseJapanese = character === 'alex'
      ? [
        `「${japanese}」ね。分かるよ。君にすごく合っている気がする。`,
        `なるほど。「${japanese}」から、今日の君の気分が少し見えるね。`,
        `その答え、いいね。「${japanese}」を軸にしたら、いい計画が立てられそう。`,
      ][choiceIndex]
      : [
        `「${japanese}」か。いいね。そこに正直さがあると思うよ。`,
        `なるほどね。「${japanese}」って、しっかりした言い方だ。`,
        `それ、好きだな。「${japanese}」には人らしさがあるよ。`,
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

const alexBeats: Beat[] = [
  { en: 'What is your first move in the morning?', ja: '朝いちばんにすることは？', choices: [['Make coffee', 'コーヒーをいれる'], ['Check my messages', 'メッセージを確認する'], ['Stay in bed for a minute', '少しベッドにいる']] },
  { en: 'What kind of music matches your mood today?', ja: '今日の気分にはどんな音楽が合う？', choices: [['Something upbeat', '明るい曲'], ['A mellow playlist', '落ち着いたプレイリスト'], ['Whatever is new', '新しい曲なら何でも']] },
  { en: 'How do you usually say hello to a friend?', ja: '友だちにはいつもどうあいさつする？', choices: [['Hey, how is it going?', 'やあ、元気？'], ['Good to see you', '会えてうれしいよ'], ['Want to grab coffee?', 'コーヒー飲む？']] },
  { en: 'What makes a walk worth taking?', ja: 'どんな散歩なら歩く価値がある？', choices: [['A good view', 'いい景色'], ['A good conversation', 'いい会話'], ['A new coffee shop', '新しいコーヒーショップ']] },
  { en: 'What does a good weekend need?', ja: 'いい週末に必要なものは？', choices: [['Time with friends', '友だちとの時間'], ['A little adventure', 'ちょっとした冒険'], ['A proper reset', 'しっかり休むこと']] },
  { en: 'When do you do your best work?', ja: 'いつ仕事が一番はかどる？', choices: [['Early in the day', '一日の早い時間'], ['Late at night', '夜遅く'], ['In a focused burst', '集中できたとき']] },
  { en: 'How do you choose a restaurant?', ja: 'レストランはどう選ぶ？', choices: [['Follow a recommendation', 'おすすめに従う'], ['Try the busy place', '混んでいる店を試す'], ['Go with what I know', '知っている店に行く']] },
  { en: 'What belongs on a great playlist?', ja: 'いいプレイリストに入っていてほしいものは？', choices: [['A song I can sing along to', '一緒に歌える曲'], ['A surprising new track', '意外な新曲'], ['A quiet late-night song', '夜に聴く静かな曲']] },
  { en: 'What makes a commute better?', ja: '通勤・通学をよくするものは？', choices: [['Good music', 'いい音楽'], ['A good book', 'いい本'], ['A message from someone I like', '好きな人からのメッセージ']] },
  { en: 'How do you celebrate a small win?', ja: '小さな成功をどう祝う？', choices: [['Tell a friend', '友だちに伝える'], ['Get a good meal', 'おいしい食事をする'], ['Take a quiet moment', '静かな時間を持つ']] },
  { en: 'What quality matters most in a friend?', ja: '友だちに一番大切な性質は？', choices: [['Honesty', '正直さ'], ['Reliability', '信頼できること'], ['A sense of humor', 'ユーモアのセンス']] },
  { en: 'What do you look for in a new city?', ja: '新しい街で何を探す？', choices: [['Local music', '地元の音楽'], ['A good café', 'いいカフェ'], ['A place with a story', '物語のある場所']] },
  { en: 'What helps when you hit a creative block?', ja: '創作が行き詰まったら何が助けになる？', choices: [['Go for a walk', '散歩する'], ['Change the music', '音楽を変える'], ['Talk it out', '話してみる']] },
  { en: 'Where do you like to study or focus?', ja: '勉強や集中はどこでするのが好き？', choices: [['A quiet café', '静かなカフェ'], ['My desk', '自分の机'], ['A library', '図書館']] },
  { en: 'What makes a morning feel successful?', ja: 'どんな朝だと成功した気分になる？', choices: [['A calm start', '落ち着いた始まり'], ['Finishing one task', '一つ終わらせること'], ['A real breakfast', 'ちゃんと朝食をとること']] },
  { en: 'How do you reset after a long day?', ja: '長い一日の後、どうリセットする？', choices: [['Put on music', '音楽をかける'], ['Cook something simple', '簡単な料理をする'], ['Call someone', '誰かに電話する']] },
  { en: 'What kind of weather brings you outside?', ja: 'どんな天気だと外に出たくなる？', choices: [['Cool and sunny', '涼しく晴れた日'], ['Warm and breezy', '暖かく風のある日'], ['Rain that is almost over', 'もうすぐやみそうな雨']] },
  { en: 'What would you like to learn this year?', ja: '今年何を学びたい？', choices: [['A new language', '新しい言語'], ['Music production', '音楽制作'], ['A practical skill', '実用的なスキル']] },
  { en: 'How do you like to travel?', ja: 'どんな旅が好き？', choices: [['With a loose plan', '大まかな計画で'], ['Spontaneously', '行き当たりばったりで'], ['Slowly and locally', 'ゆっくり地元を味わう']] },
  { en: 'What makes a neighborhood feel alive?', ja: 'どんな街に活気を感じる？', choices: [['People outside', '外にいる人々'], ['Music from somewhere', 'どこかから聞こえる音楽'], ['Small places to discover', '見つけられる小さな場所']] },
  { en: 'What mistake taught you something useful?', ja: 'どんな失敗から役立つことを学んだ？', choices: [['I waited too long', '待ちすぎた'], ['I rushed the choice', '選択を急いだ'], ['I tried to do it alone', '一人でやろうとした']] },
  { en: 'How do you like to receive feedback?', ja: 'どんなふうにフィードバックを受けたい？', choices: [['Directly', '率直に'], ['With an example', '例を添えて'], ['After I have a moment', '少し考える時間を置いて']] },
  { en: 'What project would you start with more time?', ja: 'もっと時間があればどんな企画を始めたい？', choices: [['Make an album', 'アルバムを作る'], ['Open a small café', '小さなカフェを開く'], ['Build something useful', '役に立つものを作る']] },
  { en: 'What did your family teach you well?', ja: '家族から何をよく教わった？', choices: [['Show up for people', '人のそばにいること'], ['Work hard', '一生懸命働くこと'], ['Keep your word', '約束を守ること']] },
  { en: 'What music reminds you of growing up?', ja: '成長した頃を思い出す音楽は？', choices: [['Songs from the car', '車で聴いた曲'], ['A friend’s favorite band', '友だちの好きなバンド'], ['Late-night radio', '深夜ラジオ']] },
  { en: 'What kind of work feels meaningful?', ja: 'どんな仕事に意味を感じる？', choices: [['Work that helps people', '人を助ける仕事'], ['Work that makes something', '何かを作る仕事'], ['Work that keeps me curious', '好奇心を保てる仕事']] },
  { en: 'How do you make a hard decision?', ja: '難しい決断をどうする？', choices: [['Look at the facts', '事実を見る'], ['Talk to someone', '誰かに相談する'], ['Trust my gut', '直感を信じる']] },
  { en: 'What makes you feel confident?', ja: '何があると自信を持てる？', choices: [['Being prepared', '準備ができていること'], ['Knowing my people are there', '仲間がいること'], ['Trying before I overthink', '考えすぎる前に試すこと']] },
  { en: 'When do you feel most vulnerable?', ja: 'いつ一番弱さを感じる？', choices: [['When I need help', '助けが必要なとき'], ['When I care a lot', '深く大切に思うとき'], ['When I do not know the next step', '次の一歩が分からないとき']] },
  { en: 'What support helps on a hard day?', ja: 'つらい日にどんな支えが助かる？', choices: [['Listen to me', '話を聞く'], ['Make me laugh', '笑わせる'], ['Help me make a plan', '計画を一緒に作る']] },
  { en: 'How should friends handle a disagreement?', ja: '友だち同士で意見が違ったらどうする？', choices: [['Talk it through', '話し合う'], ['Take a short break', '少し時間を置く'], ['Find the part we agree on', '合意できる部分を探す']] },
  { en: 'How do you know you can trust someone?', ja: '信頼できる人だとどう分かる？', choices: [['They keep their word', '約束を守る'], ['They are honest without being harsh', 'きつくならずに正直である'], ['They stay consistent', '態度が一貫している']] },
  { en: 'What makes a place feel like home?', ja: 'どんな場所が家のように感じる？', choices: [['My favorite people', '好きな人たち'], ['Familiar sounds', '聞き慣れた音'], ['A good place to make coffee', 'コーヒーをいれる場所']] },
  { en: 'Which memory would you replay?', ja: 'どんな思い出をもう一度再生したい？', choices: [['A spontaneous night out', '思いつきで出かけた夜'], ['A family meal', '家族との食事'], ['A concert with friends', '友だちと行ったライブ']] },
  { en: 'What goal are you working toward now?', ja: '今どんな目標に向かっている？', choices: [['A calmer routine', '落ち着いた習慣'], ['A creative project', '創作の企画'], ['A stronger connection', 'もっと強いつながり']] },
  { en: 'What would you change about your future?', ja: '未来について何を変えたい？', choices: [['Make more time for people', '人のための時間を増やす'], ['Take more chances', 'もっと挑戦する'], ['Worry less', 'もっと心配しない']] },
  { en: 'What kind of good news do you love receiving?', ja: 'どんなよい知らせを受け取るのが好き？', choices: [['A friend reached a goal', '友だちが目標を達成した知らせ'], ['A plan came together', '計画がまとまった知らせ'], ['A surprise invitation', '思いがけない誘い']] },
  { en: 'What do you do when the day goes badly?', ja: '一日がうまくいかないときどうする？', choices: [['Take a walk', '散歩する'], ['Order comfort food', '安心できる料理を頼む'], ['Tell someone the truth', '誰かに本当のことを話す']] },
  { en: 'When did you last feel proud of yourself?', ja: '最後に自分を誇らしく思ったのはいつ？', choices: [['I finished something hard', '難しいことを終えたとき'], ['I spoke up', '自分の意見を言えたとき'], ['I kept going', '続けたとき']] },
  { en: 'What boundary protects your energy?', ja: 'エネルギーを守る境界線は？', choices: [['A quiet evening', '静かな夜'], ['Saying no clearly', 'はっきり断ること'], ['One task at a time', '一度に一つのことをする']] },
  { en: 'What advice would you give your younger self?', ja: '若い頃の自分にどんな助言をする？', choices: [['You do not need to rush', '急がなくていい'], ['Ask for help sooner', 'もっと早く助けを求めて'], ['Keep making things', '作り続けて']] },
  { en: 'What kindness do you want to practice?', ja: 'どんな優しさを実践したい？', choices: [['Listen all the way through', '最後まで聞く'], ['Give people credit', '人の功績を認める'], ['Check in without a reason', '理由がなくても近況を聞く']] },
  { en: 'What are you grateful for today?', ja: '今日は何に感謝している？', choices: [['A calm moment', '穏やかな時間'], ['Someone who showed up', 'そばにいてくれた人'], ['A chance to try again', 'もう一度試す機会']] },
  { en: 'What makes a connection last?', ja: 'つながりを長続きさせるものは？', choices: [['Curiosity', '好奇心'], ['Honest repair', '正直に修復すること'], ['Making time', '時間を作ること']] },
  { en: 'What would a good future evening look like?', ja: 'よい未来の夜はどんな感じ？', choices: [['Music in the background', '背景に音楽がある'], ['Dinner with good people', '大切な人との夕食'], ['A project I am proud of', '誇りに思える企画']] },
  { en: 'What do you hope I remember about you?', ja: '私にあなたの何を覚えていてほしい？', choices: [['I care deeply', '深く大切にすること'], ['I keep learning', '学び続けること'], ['I make room for fun', '楽しむ余白を作ること']] },
  { en: 'Which small ritual could become ours?', ja: 'どんな小さな習慣を私たちのものにできそう？', choices: [['A weekly coffee', '毎週のコーヒー'], ['Sharing one song', '一曲ずつ共有する'], ['A walk after a long day', '長い一日の後に散歩する']] },
  { en: 'How do you show care when words are hard?', ja: '言葉にしにくいとき、どう気遣う？', choices: [['Make time', '時間を作る'], ['Remember details', '細部を覚えておく'], ['Bring something useful', '役立つものを持っていく']] },
  { en: 'What thought would you carry into tonight?', ja: '今夜どんな思いを持っていきたい？', choices: [['I did enough today', '今日は十分やった'], ['There is more music ahead', 'これからも音楽がある'], ['I am not doing this alone', '一人でやっているわけではない']] },
  { en: 'What would you say when we talk again?', ja: 'また話すとき、最初に何と言う？', choices: [['Tell me what happened', '何があったか聞かせて'], ['I saved you a song', '曲をとっておいたよ'], ['Good to hear from you', '連絡をもらえてうれしいよ']] },
];

const liamBeats: Beat[] = [
  { en: 'What kind of morning gets you going?', ja: 'どんな朝だと元気が出る？', choices: [['A strong cup of tea', '濃い紅茶'], ['A bit of fresh air', '新鮮な空気'], ['A friendly message', '親しい人からのメッセージ']] },
  { en: 'What makes you laugh without trying?', ja: '思わず笑ってしまうものは？', choices: [['A silly story', 'おかしな話'], ['A friend’s timing', '友だちの絶妙なタイミング'], ['A dog with too much confidence', '自信満々すぎる犬']] },
  { en: 'How do you greet someone you like?', ja: '好きな人にはどうあいさつする？', choices: [['How are you keeping?', '元気にしてる？'], ['Come on in', '入っておいで'], ['I was hoping you would call', '電話してくれたらと思ってた']] },
  { en: 'What sort of walk would you choose?', ja: 'どんな散歩を選ぶ？', choices: [['Along the river', '川沿い'], ['Through a busy street', 'にぎやかな通り'], ['Somewhere with no plan', '予定のない場所']] },
  { en: 'What makes a weekend feel properly lived?', ja: 'ちゃんと過ごしたと感じる週末は？', choices: [['A long chat', '長いおしゃべり'], ['A day outdoors', '外で過ごす一日'], ['A lazy morning', 'のんびりした朝']] },
  { en: 'When are you at your best?', ja: 'いつが一番自分らしい？', choices: [['When I have company', '誰かと一緒のとき'], ['When I am making something', '何かを作っているとき'], ['When I have room to think', '考える余白があるとき']] },
  { en: 'How do you pick a place to eat?', ja: '食事をする場所はどう選ぶ？', choices: [['Ask a local friend', '地元の友だちに聞く'], ['Follow the smell', '香りについていく'], ['Choose the familiar place', 'なじみの店を選ぶ']] },
  { en: 'What song belongs on a road trip?', ja: '旅の車内で聴きたい曲は？', choices: [['Something everyone knows', 'みんなが知っている曲'], ['A new discovery', '新しく見つけた曲'], ['A quiet song for the last mile', '最後の道で聴く静かな曲']] },
  { en: 'What improves a rainy commute?', ja: '雨の日の移動をよくするものは？', choices: [['A dry coat', '濡れないコート'], ['A good podcast', 'いいポッドキャスト'], ['Someone waiting at the end', '最後に待っている人']] },
  { en: 'How do you mark a small victory?', ja: '小さな勝利をどう記念する？', choices: [['Ring someone', '誰かに電話する'], ['Put the kettle on', 'お茶をいれる'], ['Take the rest of the evening off', 'その夜は休む']] },
  { en: 'What do you value in a friend?', ja: '友だちの何を大切にする？', choices: [['They tell the truth', '本当のことを言う'], ['They make room for you', '居場所を作ってくれる'], ['They can laugh at themselves', '自分のことも笑える']] },
  { en: 'What would you show someone new in Dublin?', ja: 'ダブリンで初めての人に何を見せたい？', choices: [['A quiet corner', '静かな場所'], ['A lively pub street', 'にぎやかなパブの通り'], ['A view across the water', '水辺の景色']] },
  { en: 'What do you do when a plan falls apart?', ja: '計画が崩れたらどうする？', choices: [['Make a cup of tea', 'お茶をいれる'], ['Laugh and start again', '笑ってやり直す'], ['Ask what matters most', '何が一番大切か考える']] },
  { en: 'Where can you think clearly?', ja: 'どこだと考えがまとまる？', choices: [['A library corner', '図書館の隅'], ['By the sea', '海のそば'], ['At a kitchen table', '台所のテーブル']] },
  { en: 'What makes a day start well?', ja: '一日がよく始まるのはどんなとき？', choices: [['No rushing', '急がないこと'], ['A job done early', '早く仕事を一つ終えること'], ['A bit of craic', 'ちょっとした楽しい会話']] },
  { en: 'How do you come down after a long day?', ja: '長い一日の後、どう落ち着く？', choices: [['Walk home slowly', 'ゆっくり歩いて帰る'], ['Cook a warm meal', '温かい料理を作る'], ['Talk until the worry shrinks', '不安が小さくなるまで話す']] },
  { en: 'Which weather makes you feel hopeful?', ja: 'どんな天気だと希望を感じる？', choices: [['Sun after rain', '雨上がりの晴れ'], ['A crisp bright day', '澄んだ明るい日'], ['A storm moving away', '嵐が遠ざかるとき']] },
  { en: 'What would you learn if you had a free year?', ja: '自由な一年があれば何を学ぶ？', choices: [['Play an instrument', '楽器を弾く'], ['Cook properly', 'きちんと料理する'], ['A language for travelling', '旅のための言語']] },
  { en: 'What is your favorite way to travel?', ja: '一番好きな旅の仕方は？', choices: [['By train', '電車で'], ['With a friend and no rush', '友だちと急がずに'], ['Toward a place I have not seen', 'まだ見ていない場所へ']] },
  { en: 'What makes a neighborhood feel friendly?', ja: '親しみを感じる街はどんな街？', choices: [['People say hello', '人があいさつする'], ['There is a place to linger', '長居できる場所がある'], ['Someone knows your order', '注文を覚えてくれる人がいる']] },
  { en: 'What did a recent mistake teach you?', ja: '最近の失敗から何を学んだ？', choices: [['Slow down', 'ゆっくりする'], ['Speak sooner', '早めに話す'], ['Do not carry it alone', '一人で抱えない']] },
  { en: 'How do you like advice to arrive?', ja: 'どんな助言なら受け取りやすい？', choices: [['Straight and kind', '率直で優しい'], ['With a story', '物語と一緒に'], ['When I ask for it', '自分が求めたとき']] },
  { en: 'What would you do with an extra afternoon?', ja: '午後がもう一つあれば何をする？', choices: [['Visit a friend', '友だちに会う'], ['Take a train somewhere', 'どこかへ電車で行く'], ['Fix up my room', '部屋を整える']] },
  { en: 'What did home teach you about care?', ja: '家庭から気遣いについて何を学んだ？', choices: [['Feed people', '人に食事を作る'], ['Listen properly', 'きちんと話を聞く'], ['Be there without fuss', '騒がずそばにいる']] },
  { en: 'What sound brings back a memory?', ja: 'どんな音が思い出を連れてくる？', choices: [['Rain on a window', '窓に当たる雨'], ['Laughter in a kitchen', '台所の笑い声'], ['A train leaving', '出発する列車']] },
  { en: 'What makes work worth doing?', ja: 'どんな仕事ならする価値がある？', choices: [['It helps somebody', '誰かの助けになる'], ['It lets me learn', '学ばせてくれる'], ['It leaves something better', '何かをよくして残す']] },
  { en: 'How do you choose when the answer is unclear?', ja: '答えがはっきりしないときどう選ぶ？', choices: [['Ask a trusted person', '信頼できる人に聞く'], ['Take the kinder option', 'より優しい方を選ぶ'], ['Try the next small step', '次の小さな一歩を試す']] },
  { en: 'What brings your confidence back?', ja: '自信を取り戻すものは？', choices: [['A familiar routine', 'なじみの習慣'], ['A good friend', 'いい友だち'], ['Doing one thing well', '一つのことをうまくやる']] },
  { en: 'When are you most open with people?', ja: 'いつ人に一番心を開く？', choices: [['On a long walk', '長い散歩のとき'], ['After a laugh', '笑った後'], ['When the room is quiet', '部屋が静かなとき']] },
  { en: 'What kind of support feels right?', ja: 'どんな支え方がうれしい？', choices: [['Sit beside me', '隣に座る'], ['Ask one good question', 'いい質問を一つする'], ['Help with something practical', '実際に手伝う']] },
  { en: 'What keeps an argument from getting ugly?', ja: '口論が悪くならないために必要なものは？', choices: [['A pause', '一度止まること'], ['A bit of humor', '少しのユーモア'], ['Remembering we care', '大切に思っていることを思い出す']] },
  { en: 'What proves someone is trustworthy?', ja: '信頼できる人だと分かる証拠は？', choices: [['They turn up', '来てくれる'], ['They own their mistakes', '自分の失敗を認める'], ['They keep private things private', '秘密を守る']] },
  { en: 'What turns a room into home?', ja: '部屋を家に変えるものは？', choices: [['The people in it', 'そこにいる人'], ['A warm meal', '温かい食事'], ['A bit of music', '少しの音楽']] },
  { en: 'Which memory would you keep close?', ja: 'どんな思い出を大切に持っていたい？', choices: [['A family story', '家族の話'], ['A ridiculous adventure', 'ばかばかしい冒険'], ['A quiet kind moment', '静かで優しい瞬間']] },
  { en: 'What are you trying to make time for?', ja: '何のための時間を作ろうとしている？', choices: [['Rest', '休むこと'], ['People I love', '大切な人たち'], ['A thing I keep putting off', '先延ばししていること']] },
  { en: 'What would you change if you were less worried?', ja: '心配が少なければ何を変える？', choices: [['Say yes more often', 'もっと「はい」と言う'], ['Go somewhere new', '新しい場所へ行く'], ['Tell someone the truth', '誰かに本当のことを言う']] },
  { en: 'What good news would you share first?', ja: '最初に誰とよい知らせを分かち合う？', choices: [['A close friend', '親しい友だち'], ['My family', '家族'], ['The person who helped me', '助けてくれた人']] },
  { en: 'What helps you through a rough day?', ja: 'つらい日を乗り切る助けは？', choices: [['A walk and fresh air', '散歩と新鮮な空気'], ['A proper chat', 'ちゃんと話すこと'], ['Sleep and start again', '眠ってやり直すこと']] },
  { en: 'What achievement feels quietly important?', ja: '静かに大切だと感じる達成は？', choices: [['Keeping a promise', '約束を守ること'], ['Asking for help', '助けを求めること'], ['Staying kind under pressure', 'プレッシャーの中でも優しいこと']] },
  { en: 'What boundary gives you peace?', ja: '平穏をくれる境界線は？', choices: [['Turning the phone off', 'スマホを切る'], ['Leaving on time', '時間どおりに帰る'], ['Saying what I can do', 'できることを伝える']] },
  { en: 'What would you tell your younger self?', ja: '若い頃の自分に何を伝える？', choices: [['You will find your people', '自分に合う人が見つかる'], ['You are allowed to rest', '休んでいい'], ['Keep the good heart', 'その優しい心を持ち続けて']] },
  { en: 'What kindness do you want to repeat?', ja: 'どんな優しさを繰り返したい？', choices: [['Make time for a call', '電話の時間を作る'], ['Bring food round', '食べ物を持っていく'], ['Listen without fixing', '解決せずに聞く']] },
  { en: 'What are you thankful for tonight?', ja: '今夜何に感謝している？', choices: [['A safe place', '安心できる場所'], ['A good laugh', '楽しい笑い'], ['Someone who stayed', 'そばにいてくれた人']] },
  { en: 'What keeps a friendship steady?', ja: '友情を安定させるものは？', choices: [['Making the effort', '努力を続ける'], ['Giving each other room', '互いに余白を与える'], ['Coming back after a hard talk', '難しい話の後に戻る']] },
  { en: 'What would a good future day include?', ja: 'よい未来の一日には何がある？', choices: [['A table full of people', '人で囲まれたテーブル'], ['A bit of work I am proud of', '誇りに思える仕事'], ['A road still open ahead', 'まだ開いている道']] },
  { en: 'What should I remember about you?', ja: '私にあなたの何を覚えていてほしい？', choices: [['I mean what I say', '言葉に責任を持つこと'], ['I am always learning', 'いつも学んでいること'], ['I will show up for you', 'あなたのそばにいること']] },
  { en: 'Which ritual could be ours?', ja: 'どんな習慣を私たちのものにできそう？', choices: [['Tea and a chat', 'お茶とおしゃべり'], ['A walk in any weather', 'どんな天気でも散歩'], ['One good story a week', '週に一つよい話をする']] },
  { en: 'How do you show someone they matter?', ja: '大切だとどう伝える？', choices: [['Remember the small things', '小さなことを覚える'], ['Make room in the day', '一日の中に余白を作る'], ['Say it plain', 'まっすぐ言う']] },
  { en: 'What hope are you carrying forward?', ja: 'どんな希望をこれから持っていく？', choices: [['There is time', '時間はある'], ['Good things can grow slowly', 'よいことはゆっくり育つ'], ['We can begin again', 'また始められる']] },
  { en: 'What will you say when we meet again?', ja: 'また会えたら何と言う？', choices: [['You are very welcome', 'よく来たね'], ['Tell me everything', '全部聞かせて'], ['Right, where were we?', 'さて、どこまで話したっけ？']] },
];

export const conversationGroup3: ConversationGroup = {
  alex: makeRounds('alex', alexBeats),
  liam: makeRounds('liam', liamBeats),
};

export default conversationGroup3;
