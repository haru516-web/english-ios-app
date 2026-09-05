import type { ConversationChoice, ConversationGroup, ConversationRound } from './conversationsTypes';

type Beat = [string, string, [string, string][]];

const makeRounds = (
  character: 'luca' | 'miles',
  beats: Beat[],
): ConversationRound[] => beats.map(([promptEnglish, promptJapanese, choices], roundIndex) => ({
  id: `${character}-${String(roundIndex + 1).padStart(2, '0')}`,
  promptEnglish,
  promptJapanese,
  choices: choices.map(([textEnglish, textJapanese], choiceIndex) => ({
    id: `${character}-${String(roundIndex + 1).padStart(2, '0')}-${choiceIndex + 1}`,
    english: textEnglish,
    japanese: textJapanese,
    responseEnglish: character === 'luca'
      ? [
        `You chose “${textEnglish}”—I can see the scene already. Let’s keep that spark with us.`,
        `“${textEnglish},” then! That has the kind of colour I like; I’m happily taking your lead.`,
        `I like your answer, “${textEnglish}.” It gives our little voyage a wonderfully human direction.`,
      ][choiceIndex]
      : [
        `You chose “${textEnglish}.” Sensible evidence, and a promising first step; I approve.`,
        `“${textEnglish},” excellent. That is a defensible hypothesis, and I’m curious to test it with you.`,
        `I’ll remember that you chose “${textEnglish}.” Thoughtful, practical, and just daring enough.`,
      ][choiceIndex],
    responseJapanese: character === 'luca'
      ? [
        `「${textJapanese}」を選んだんだね。もう景色が浮かぶよ。そのきらめきを一緒に持っていこう。`,
        `じゃあ「${textJapanese}」だね。僕の好きな色がある答えだ。君の案内についていくよ。`,
        `「${textJapanese}」が好きだな。僕たちの小さな旅に、すごく人間らしい方向をくれる。`,
      ][choiceIndex]
      : [
        `「${textJapanese}」を選んだね。筋の通った証拠だし、有望な第一歩だ。`,
        `「${textJapanese}」か、いいね。検証できる仮説だ。君と確かめてみたい。`,
        `君が「${textJapanese}」を選んだこと、覚えておくよ。思慮深くて、少し冒険心もある。`,
      ][choiceIndex],
  })) as [ConversationChoice, ConversationChoice, ConversationChoice],
}));

const lucaBeats: Beat[] = [
  ['What catches your eye first in a new place?', '新しい場所で最初に目を引くものは何？', [['A bright doorway', '鮮やかな入口'], ['A face in the crowd', '人混みの中の顔'], ['The line of the sea', '海の水平線']]],
  ['Would you rather sketch a harbour or a busy market?', '港とにぎやかな市場、どちらを描きたい？', [['A harbour', '港'], ['A market', '市場'], ['Both before lunch', '昼前に両方']]],
  ['What makes a walk memorable for you?', 'どんな散歩が心に残る？', [['A surprise turn', '思いがけない曲がり角'], ['A good companion', 'よい同行者'], ['A beautiful view', '美しい景色']]],
  ['Are you comfortable starting conversations with strangers?', '知らない人に話しかけるのは平気？', [['Usually, yes', 'たいてい平気'], ['Only with a smile first', 'まず笑顔があれば'], ['I listen before speaking', '話す前に聞く']]],
  ['Which colour belongs in today’s picture?', '今日の絵にはどの色が似合う？', [['Cobalt blue', 'コバルトブルー'], ['Warm ochre', 'あたたかい黄土色'], ['A daring red', '大胆な赤']]],
  ['What small luxury cheers you up?', '気分を上げる小さなぜいたくは？', [['Fresh coffee', '淹れたてのコーヒー'], ['A train ticket', '列車の切符'], ['A warm pastry', '温かいペストリー']]],
  ['Do you plan a day or follow its weather?', '一日を計画する？それとも天気に任せる？', [['Plan the first hour', '最初の一時間だけ計画する'], ['Follow the weather', '天気に任せる'], ['Make a loose map', '大まかな地図を作る']]],
  ['What would you bring to a tiny island?', '小さな島に何を持っていく？', [['A pencil case', '筆箱'], ['A good coat', 'よいコート'], ['A friend who laughs', '笑ってくれる友だち']]],
  ['What is your ideal morning?', '理想の朝はどんな朝？', [['Sunrise by water', '水辺の日の出'], ['A slow breakfast', 'ゆっくりした朝食'], ['A blank page', 'まっさらなページ']]],
  ['How do you choose a café?', 'カフェはどう選ぶ？', [['The window seat', '窓際の席'], ['The smell from outside', '外まで漂う香り'], ['A handwritten menu', '手書きのメニュー']]],
  ['What do you always carry?', 'いつも持ち歩くものは？', [['A sketchbook', 'スケッチブック'], ['A lucky coin', '幸運のコイン'], ['Too many pens', '多すぎるペン']]],
  ['Do you work best with music?', '音楽を聴きながら働く？', [['Soft jazz', '静かなジャズ'], ['Street sounds', '街の音'], ['Complete silence', '完全な静けさ']]],
  ['What food tastes like home?', '故郷を感じる食べ物は？', [['Toast and jam', 'トーストとジャム'], ['A hearty stew', '具だくさんのシチュー'], ['Something from a bakery', 'パン屋のもの']]],
  ['How do you rest after a long day?', '長い一日の後、どう休む？', [['Draw one last line', '最後に一本描く'], ['Watch the tide', '潮の満ち引きを見る'], ['Talk until sunset', '日暮れまで話す']]],
  ['What weather makes you feel alive?', 'どんな天気で生き生きする？', [['Sharp sea wind', '鋭い海風'], ['Golden rain', '金色の雨'], ['A storm clearing', '嵐が晴れる時']]],
  ['Do you keep souvenirs?', '思い出の品を取っておく？', [['Tickets', 'チケット'], ['Tiny stones', '小さな石'], ['Only stories', '物語だけ']]],
  ['Which sound belongs to a good day?', 'よい日に似合う音は？', [['Gulls over water', '水上のカモメ'], ['A pencil scratching', '鉛筆の音'], ['Laughter nearby', '近くの笑い声']]],
  ['What makes a room feel welcoming?', '部屋を居心地よくするものは？', [['Open curtains', '開いたカーテン'], ['A messy table', '少し散らかった机'], ['Someone expecting you', '待っている人']]],
  ['What did you love doing as a child?', '子どもの頃、何をするのが好きだった？', [['Build paper boats', '紙の船を作る'], ['Climb anything', '何でも登る'], ['Make up adventures', '冒険を作る']]],
  ['What is a mistake that taught you something?', '何を教えてくれた失敗がある？', [['Missing a train', '列車に乗り遅れたこと'], ['Ruining a sketch', '絵を台無しにしたこと'], ['Trusting a wrong map', '間違った地図を信じたこと']]],
  ['Who first encouraged your curiosity?', '好奇心を最初に応援してくれた人は？', [['A grandparent', '祖父母'], ['A patient teacher', '辛抱強い先生'], ['A fellow wanderer', '旅好きの仲間']]],
  ['What does freedom mean to you?', 'あなたにとって自由とは？', [['Choosing the next road', '次の道を選ぶこと'], ['Having time to notice', '気づく時間があること'], ['Being honest about longing', '憧れに正直でいること']]],
  ['What should people protect in a changing city?', '変わる街で人々は何を守るべき？', [['Its old stories', '古い物語'], ['Its public spaces', '公共の場所'], ['Its kindness', '親切さ']]],
  ['When is a life well lived?', '人生をよく生きたと言えるのはいつ？', [['When it is full of colour', '色に満ちている時'], ['When it helps others', '人を助けた時'], ['When it stays curious', '好奇心を失わない時']]],
  ['What memory would you paint in a single frame?', '一枚の絵にするならどんな思い出？', [['A family table', '家族の食卓'], ['A first departure', '初めての旅立ち'], ['A quiet goodbye', '静かな別れ']]],
  ['What do you do when a dream feels impractical?', '夢が現実的でないと感じたら？', [['Try a small version', '小さく試す'], ['Ask someone wise', '賢い人に相談する'], ['Chase it anyway', 'それでも追う']]],
  ['What fear hides behind your confidence?', '自信の裏にある恐れは？', [['Being forgotten', '忘れられること'], ['Not being good enough', '十分でないこと'], ['Losing my freedom', '自由を失うこと']]],
  ['What would you regret never seeing?', '見ないままだと後悔するものは？', [['The far north', 'はるかな北'], ['A city at dawn', '夜明けの街'], ['A friend’s true home', '友だちの本当の故郷']]],
  ['What kind of work feels meaningful?', 'どんな仕事に意味を感じる？', [['Making people notice', '人に気づかせること'], ['Leaving beauty behind', '美しさを残すこと'], ['Telling overlooked stories', '見過ごされた物語を語ること']]],
  ['Where would you hold an exhibition?', '展覧会を開くならどこ？', [['An old station', '古い駅'], ['A ship’s corridor', '船の廊下'], ['A windy rooftop', '風の強い屋上']]],
  ['How do you react when your work is criticised?', '作品を批判されたらどうする？', [['Listen for a useful detail', '役立つ点を聞く'], ['Defend the feeling', '込めた気持ちは守る'], ['Take a walk first', 'まず散歩する']]],
  ['What would you learn if time were generous?', '時間がたっぷりあれば何を学ぶ？', [['Navigation', '航海術'], ['Another language', '別の言語'], ['Resting without guilt', '罪悪感なく休むこと']]],
  ['What promise is hard for you to make?', 'どんな約束をするのが難しい？', [['I will stay', 'ここにいる'], ['I will ask for help', '助けを求める'], ['I will slow down', 'ゆっくりする']]],
  ['What do you hide when you say “I’m fine”?', '「大丈夫」と言う時、何を隠している？', [['Tiredness', '疲れ'], ['Homesickness', 'ホームシック'], ['A wish to be understood', '理解されたい気持ち']]],
  ['What kind of encouragement reaches you?', 'どんな励ましが心に届く？', [['A practical hand', '実際に手を貸すこと'], ['A bright compliment', '明るい褒め言葉'], ['Quiet company', '静かにそばにいること']]],
  ['How can a friend support your wandering life?', '旅する生活を友だちはどう支えられる？', [['Send a local tip', '現地の情報を送る'], ['Keep the door open', '帰る場所を残す'], ['Come for one leg', '旅の一部に同行する']]],
  ['What makes trust grow?', '信頼はどう育つ？', [['Keeping small promises', '小さな約束を守る'], ['Telling the awkward truth', '気まずい真実を話す'], ['Giving room to breathe', '息ができる余白をくれる']]],
  ['What would you say on a difficult day?', 'つらい日にどんな言葉をかける？', [['Let’s take the next step', '次の一歩を進もう'], ['You do not have to shine', '輝かなくていい'], ['I’m here, no map required', '地図がなくてもここにいる']]],
  ['How do you show affection?', '愛情をどう表す？', [['I make time', '時間を作る'], ['I notice details', '細部に気づく'], ['I invite someone along', '一緒に行こうと誘う']]],
  ['What would you share with a trusted person?', '信頼する人と何を分かち合う？', [['A half-finished sketch', '描きかけの絵'], ['A private hope', '胸の内の希望'], ['The last piece of pastry', '最後のペストリー']]],
  ['What does home look like now?', '今のあなたにとって家とは？', [['A room with a view', '景色のある部屋'], ['A familiar voice', '聞き慣れた声'], ['A place I can return to', '戻れる場所']]],
  ['What kind of companion makes travel better?', 'どんな同行者なら旅がもっとよくなる？', [['Someone observant', '観察力のある人'], ['Someone game for detours', '寄り道を楽しむ人'], ['Someone who shares silence', '沈黙を分かち合える人']]],
  ['What would you ask me to remember about you?', 'あなたについて何を覚えていてほしい？', [['I looked closely', 'よく見ていたこと'], ['I kept going', '進み続けたこと'], ['I loved the world loudly', '世界を思いきり愛したこと']]],
  ['Which shared ritual should we keep?', 'どんな二人の習慣を続けたい？', [['A morning sketch', '朝のスケッチ'], ['A weekly long walk', '週一回の長い散歩'], ['A postcard from anywhere', 'どこからでも絵はがき']]],
  ['What is your favourite kind of silence?', '一番好きな沈黙は？', [['Before sunrise', '日の出前'], ['After a good story', 'よい話の後'], ['Beside someone safe', '安心できる人のそば']]],
  ['If we had one free day, where would we go?', '自由な一日があればどこへ行く？', [['The coast by train', '列車で海岸へ'], ['A hidden village', '隠れた村へ'], ['Anywhere with a new horizon', '新しい地平線のある場所へ']]],
  ['What has this conversation given you?', 'この会話は何をくれた？', [['A fresh idea', '新しい考え'], ['A steadier heart', '落ち着いた心'], ['A reason to look up', '顔を上げる理由']]],
  ['What would you write at the end of our travel journal?', '旅の日記の最後に何と書く？', [['We noticed everything', '私たちはすべてに気づいた'], ['The road was kind', '道はやさしかった'], ['Let’s leave one page blank', '一ページ空けておこう']]],
  ['What warm thought will you carry tonight?', '今夜どんな温かな思いを持っていく？', [['A shared laugh', '分かち合った笑い'], ['A brave beginning', '勇敢な始まり'], ['The next beautiful view', '次の美しい景色']]],
  ['What final sketch would you keep from our journey?', '私たちの旅から最後にどんなスケッチを残したい？', [['A sunlit doorway', '日差しの入る入口'], ['Two cups on a table', 'テーブルの上の二つのカップ'], ['A road continuing on', '続いていく道']]],
];

const milesBeats: Beat[] = [
  ['What do you notice first at a new site?', '新しい遺跡で最初に何を見る？', [['The layers of soil', '土の層'], ['The surrounding landscape', '周囲の地形'], ['The people with me', '一緒にいる人']]],
  ['Would you rather explore a ruin or a museum?', '遺跡と博物館、どちらを探検したい？', [['A ruin', '遺跡'], ['A museum basement', '博物館の地下収蔵庫'], ['Whichever has better notes', '記録がよい方']]],
  ['What makes a trip worthwhile?', 'どんな旅に価値がある？', [['A new question', '新しい疑問'], ['A safe return', '無事な帰還'], ['A story worth checking', '確かめる価値のある物語']]],
  ['Do you trust first impressions?', '第一印象を信じる？', [['As a hypothesis', '仮説として'], ['Only after coffee', 'コーヒーの後なら'], ['Rarely; evidence first', 'あまり。まず証拠']]],
  ['Which field tool would you never forget?', '現地調査で絶対に忘れない道具は？', [['A hand lens', 'ルーペ'], ['A notebook', 'ノート'], ['A reliable compass', '信頼できるコンパス']]],
  ['What small luxury helps your research?', '研究を助ける小さなぜいたくは？', [['Strong coffee', '濃いコーヒー'], ['A good field jacket', 'よいフィールドジャケット'], ['A quiet desk', '静かな机']]],
  ['Do you plan every detail of an expedition?', '探検の細部まで計画する？', [['The essentials only', '要点だけ'], ['Every contingency', 'あらゆる不測の事態まで'], ['A plan plus an exit plan', '計画と撤退計画']]],
  ['What belongs in an emergency pack?', '緊急用バッグに入れるものは？', [['Water', '水'], ['A first-aid kit', '救急セット'], ['A charged phone', '充電した携帯電話']]],
  ['What is your ideal morning before fieldwork?', '現地調査前の理想の朝は？', [['A weather report', '天気予報'], ['A quiet breakfast', '静かな朝食'], ['A map and strong tea', '地図と濃い紅茶']]],
  ['How do you choose a place to study?', '研究場所はどう選ぶ？', [['The question it can answer', '答えられる問い'], ['The quality of the archive', '資料の質'], ['The risks and permissions', 'リスクと許可']]],
  ['What do you always carry?', 'いつも持ち歩くものは？', [['A pencil', '鉛筆'], ['A field notebook', '調査ノート'], ['An old photograph', '古い写真']]],
  ['Do you work best alone or with a team?', '一人とチーム、どちらが働きやすい？', [['A small team', '小さなチーム'], ['Alone for analysis', '分析は一人'], ['The right person nearby', '適切な人がそばにいること']]],
  ['What meal tastes like home?', '故郷を感じる食事は？', [['Clam chowder', 'クラムチャウダー'], ['A packed sandwich', '持参したサンドイッチ'], ['Dinner after fieldwork', '調査後の夕食']]],
  ['How do you recover after a long dig?', '長い発掘の後、どう回復する？', [['A shower and notes', 'シャワーと記録'], ['A long sleep', '長い睡眠'], ['An argument about the evidence', '証拠について議論する']]],
  ['What weather tests your patience?', 'どんな天気に忍耐を試される？', [['Relentless rain', '降り続く雨'], ['Dust in every pocket', 'ポケット中の砂ぼこり'], ['Heat that ruins the schedule', '予定を壊す暑さ']]],
  ['Do you keep objects from the field?', '調査地の物を取っておく？', [['Only legal samples', '合法な標本だけ'], ['Photographs', '写真'], ['A labelled pebble from home base', '拠点の名札付きの小石']]],
  ['Which sound means a productive day?', '実りある一日に聞こえる音は？', [['A trowel in soil', '土に入るこて'], ['Pages turning', 'ページをめくる音'], ['A team comparing notes', 'チームが記録を比べる声']]],
  ['What makes a classroom welcoming?', '教室を居心地よくするものは？', [['Good questions', 'よい質問'], ['A room for disagreement', '意見の違いを許す空間'], ['Students who feel heard', '話を聞いてもらえる学生']]],
  ['What did you love doing as a child?', '子どもの頃、何が好きだった？', [['Sorting stones', '石を分類する'], ['Reading maps', '地図を読む'], ['Inventing impossible expeditions', 'ありえない探検を考える']]],
  ['What mistake taught you the most?', '一番多くを教えた失敗は？', [['Misreading a layer', '層を読み違えたこと'], ['Ignoring local advice', '地元の助言を無視したこと'], ['Taking a needless risk', '不要なリスクを取ったこと']]],
  ['Who first encouraged your curiosity?', '好奇心を最初に応援してくれた人は？', [['A patient librarian', '辛抱強い司書'], ['A field mentor', '現地の指導者'], ['A professor with terrible jokes', 'ひどい冗談を言う教授']]],
  ['What does responsible discovery mean?', '責任ある発見とは？', [['Respecting communities', '地域社会を尊重すること'], ['Recording uncertainty', '不確かさを記録すること'], ['Leaving a site safe', '遺跡を安全に残すこと']]],
  ['When is a career well spent?', 'キャリアを有意義に使ったと言えるのは？', [['When knowledge is shared', '知識を共有した時'], ['When students grow', '学生が成長した時'], ['When evidence corrects you', '証拠が自分を正した時']]],
  ['What memory would you preserve in one photograph?', '一枚の写真に残すならどんな思い出？', [['My first trench', '初めての発掘溝'], ['A mentor’s notebook', '師のノート'], ['A team at sunset', '夕暮れのチーム']]],
  ['What do you do when a theory fails?', '理論が外れたらどうする？', [['Revise the model', 'モデルを修正する'], ['Return to the data', 'データに戻る'], ['Admit it at dinner', '夕食で認める']]],
  ['What fear sits behind your expertise?', '専門知識の裏にある恐れは？', [['Being confidently wrong', '自信満々に間違うこと'], ['Failing my students', '学生を失望させること'], ['Not getting back safely', '安全に戻れないこと']]],
  ['What question would you regret never asking?', '聞かないままだと後悔する問いは？', [['Whose voice is missing?', '誰の声が欠けている？'], ['What happened before the record?', '記録の前に何があった？'], ['What would you choose?', 'あなたなら何を選ぶ？']]],
  ['What work feels meaningful to you?', 'どんな仕事に意味を感じる？', [['Making evidence accessible', '証拠を分かりやすくする'], ['Protecting a fragile site', '壊れやすい遺跡を守る'], ['Teaching careful wonder', '慎重な驚きを教える']]],
  ['Where would you build a research centre?', '研究センターを建てるならどこ？', [['Near an archive', '資料館の近く'], ['Beside a field site', '調査地のそば'], ['Somewhere students can reach', '学生が通える場所']]],
  ['How do you handle criticism of your work?', '研究を批判されたらどうする？', [['Check the method', '方法を確認する'], ['Ask for specifics', '具体的に聞く'], ['Make a dry joke and revise', '淡々と冗談を言って修正する']]],
  ['What would you study with unlimited time?', '時間が無限にあれば何を研究する？', [['Everyday ancient lives', '古代の日常生活'], ['Migration routes', '移動の経路'], ['How memory changes a site', '記憶が遺跡をどう変えるか']]],
  ['What promise is difficult for you?', 'どんな約束が難しい？', [['I will rest', '休む'], ['I will ask for help', '助けを求める'], ['I will not turn worry into control', '心配を支配に変えない']]],
  ['What do you hide behind “I’m fine”?', '「大丈夫」の裏に隠すものは？', [['Exhaustion', '疲れ切っていること'], ['A fear of disappointing people', '人を失望させる恐れ'], ['The need for reassurance', '安心させてほしい気持ち']]],
  ['What kind of encouragement works on you?', 'どんな励ましが効く？', [['A clear plan', '明確な計画'], ['An honest compliment', '正直な褒め言葉'], ['Someone staying calm', '誰かが落ち着いていること']]],
  ['How can a friend support an overworked professor?', '働きすぎの教授を友だちはどう支えられる？', [['Bring food', '食べ物を持ってくる'], ['Challenge my schedule', '予定に異議を唱える'], ['Sit nearby without fixing it', '解決せずそばにいる']]],
  ['What makes trust grow?', '信頼はどう育つ？', [['Accurate records', '正確な記録'], ['Keeping confidence', '秘密を守ること'], ['Respecting a no', 'ノーを尊重すること']]],
  ['What would you say on a difficult day?', 'つらい日にどんな言葉をかける？', [['Let’s examine one fact', '事実を一つ確認しよう'], ['You are not a failed hypothesis', '君は失敗した仮説ではない'], ['We can stop for today', '今日はここで止められる']]],
  ['How do you show affection?', '愛情をどう表す？', [['Remembering details', '細部を覚えている'], ['Making a careful plan', '慎重に計画する'], ['Sharing the best discovery', '最高の発見を共有する']]],
  ['What would you share with someone you trust?', '信頼する人と何を分かち合う？', [['An unfinished argument', '未完成の議論'], ['A family story', '家族の話'], ['The key to my field notes', '調査ノートの鍵']]],
  ['What does home mean now?', '今のあなたにとって家とは？', [['A well-stocked bookshelf', '本のそろった本棚'], ['A safe conversation', '安心できる会話'], ['A place where I can unpack', '荷物をほどける場所']]],
  ['What companion improves an expedition?', 'どんな同行者が探検をよくする？', [['Someone observant', '観察力のある人'], ['Someone cautious without fear', '恐れず慎重な人'], ['Someone who questions my assumptions', '前提に疑問を投げる人']]],
  ['What should I remember about you?', 'あなたについて何を覚えていてほしい？', [['I checked the evidence', '証拠を確認したこと'], ['I tried to leave things better', '少しでもよく残そうとしたこと'], ['I learned to come home', '帰ることを学んだこと']]],
  ['Which shared ritual should we keep?', 'どんな二人の習慣を続けたい？', [['Compare one observation', '観察を一つ比べる'], ['A weekly museum hour', '毎週一時間の博物館'], ['Tea before difficult decisions', '難しい決断の前のお茶']]],
  ['What is your favourite kind of silence?', '一番好きな沈黙は？', [['In a reading room', '閲覧室の中'], ['After a useful discovery', '有用な発見の後'], ['Beside someone trustworthy', '信頼できる人のそば']]],
  ['If we had one free day, where would we go?', '自由な一日があればどこへ行く？', [['A coastal fort', '海岸の砦'], ['A small regional museum', '小さな地方博物館'], ['Somewhere with no signal', '電波の届かない場所']]],
  ['What has this conversation given you?', 'この会話は何をくれた？', [['A useful question', '役立つ問い'], ['Permission to pause', '立ち止まる許可'], ['A reason to be less certain', '少し不確かでいる理由']]],
  ['What would you write at the end of our field journal?', '二人の調査日誌の最後に何と書く？', [['The evidence held up', '証拠は耐えた'], ['We listened carefully', '私たちはよく聞いた'], ['Further study is recommended', 'さらなる研究を推奨する']]],
  ['What warm thought will you carry tonight?', '今夜どんな温かな思いを持っていく？', [['A shared laugh', '分かち合った笑い'], ['A safe return', '無事に帰れたこと'], ['The next question', '次の問い']]],
  ['What would you preserve from a lifetime of research?', '研究人生から何を残したい？', [['A careful record', '丁寧な記録'], ['A student’s question', '学生の問い'], ['A safe place for the next team', '次のチームのための安全な場所']]],
  ['What should our final field note say?', '私たちの最後の調査記録には何と書く？', [['The question remains open', '問いは開かれたままだ'], ['We returned with care', '私たちは大切に戻ってきた'], ['Further study is warranted', 'さらなる研究が必要だ']]],
];

export const conversationGroup4: ConversationGroup = {
  luca: makeRounds('luca', lucaBeats),
  miles: makeRounds('miles', milesBeats),
};

export default conversationGroup4;





