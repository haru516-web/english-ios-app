import type { ConversationGroup, ConversationRound } from './conversationsTypes';

type NewCharacterId =
  | 'milo'
  | 'clara'
  | 'arthur'
  | 'leo'
  | 'julian'
  | 'declan'
  | 'elias'
  | 'adrian'
  | 'caleb'
  | 'sloane'
  | 'victoria'
  | 'elodie'
  | 'blair';

type Line = readonly [string, string];
type ChoiceSet = readonly [Line, Line, Line];
type Topic = readonly [Line, ChoiceSet];

type VoiceProfile = {
  id: NewCharacterId;
  openers: readonly Line[];
  promptTails: readonly Line[];
  replies: readonly ChoiceSet[];
};

const line = (english: string, japanese: string): Line => [english, japanese];

/*
 * These are conversation anchors rather than generic grammar drills. The
 * voice profile below changes the lens, pacing, and emotional response around
 * every anchor so the same user choice does not sound like the same person.
 */
const topics: readonly Topic[] = [
  [line('What kind of day feels instantly good to you?', 'どんな日だと、すぐに気分がよくなる？'), [
    line('A bright morning', '明るい朝'),
    line('A quiet hour', '静かな1時間'),
    line('Good company', 'いい人と一緒にいること'),
  ]],
  [line('What is your easiest way to say hello?', 'いちばん気軽なあいさつは？'), [
    line('A quick “hey” and a real follow-up', '軽い「やあ」と本気のひとこと'),
    line('Ask what kind of day they are having', 'どんな一日か聞く'),
    line('Invite them to do something small together', '小さなことに一緒に誘う'),
  ]],
  [line('What small thing can still make you laugh?', '今でも笑ってしまう小さなことは？'), [
    line('A ridiculous mistake', 'ばかばかしい失敗'),
    line('A clever joke', '気の利いた冗談'),
    line('Someone being wonderfully strange', '誰かの妙に変なところ'),
  ]],
  [line('When a plan changes at the last minute, what do you do?', '直前に予定が変わったら、どうする？'), [
    line('Follow the new energy', '新しい流れに乗る'),
    line('Make a clearer plan', 'もっと明確な予定を立てる'),
    line('Take a moment before deciding', '決める前に少し間を置く'),
  ]],
  [line('What kind of place lets you exhale?', 'どんな場所だと、ほっと息がつける？'), [
    line('A small café', '小さなカフェ'),
    line('A familiar room', '慣れた部屋'),
    line('Somewhere with a view', '眺めのある場所'),
  ]],
  [line('What do you almost always carry with you?', 'ほとんどいつも持ち歩くものは？'), [
    line('A camera or notebook', 'カメラやノート'),
    line('Something practical', '実用的なもの'),
    line('A small reminder of home', '故郷を思い出す小さなもの'),
  ]],
  [line('Which compliment stays with you?', 'どんなほめ言葉が心に残る？'), [
    line('You made me feel welcome', 'あなたのおかげで安心できた'),
    line('You handled that well', 'うまく対処していたね'),
    line('You notice what others miss', '人が見落とすものに気づくね'),
  ]],
  [line('If an unexpected hour appeared, how would you use it?', '思いがけず1時間空いたら、どう使う？'), [
    line('Go somewhere I have not seen', 'まだ知らない場所へ行く'),
    line('Make something', '何かを作る'),
    line('Sit with someone and talk', '誰かと座って話す'),
  ]],
  [line('What does your first hour of the day usually need?', '朝の最初の1時間に必要なものは？'), [
    line('Movement', '体を動かすこと'),
    line('Quiet', '静けさ'),
    line('A proper drink', 'ちゃんとした飲み物'),
  ]],
  [line('What breakfast feels like a good decision?', 'いい選択をした気分になる朝食は？'), [
    line('Toast and eggs', 'トーストと卵'),
    line('Fruit and yogurt', 'フルーツとヨーグルト'),
    line('Whatever I can share', '誰かと分けられるもの'),
  ]],
  [line('How do you prefer to cross a city?', '街を移動するなら、どれが好き？'), [
    line('On foot', '歩いて'),
    line('By train', '電車で'),
    line('By bike or bus', '自転車やバスで'),
  ]],
  [line('What sound belongs in the background of a good day?', 'いい日の背景にあってほしい音は？'), [
    line('Live music', '生演奏'),
    line('A familiar voice', '聞き慣れた声'),
    line('Rain or a train', '雨や電車の音'),
  ]],
  [line('How do you choose a place to eat?', '食事をする場所はどう選ぶ？'), [
    line('Follow the smell', '香りについていく'),
    line('Read the menu carefully', 'メニューをよく読む'),
    line('Ask someone who knows', '詳しい人に聞く'),
  ]],
  [line('What could you eat on a tired day?', '疲れた日に食べたいものは？'), [
    line('Something warm', '温かいもの'),
    line('Something familiar', '慣れ親しんだもの'),
    line('Something I have never tried', 'まだ食べたことのないもの'),
  ]],
  [line('What actually restores you after a long day?', '長い一日のあと、本当に回復するものは？'), [
    line('Sleep', '睡眠'),
    line('A walk outside', '外を歩くこと'),
    line('A conversation', '会話'),
  ]],
  [line('Are you more comfortable with an early start or a late finish?', '早く始める方と遅く終える方、どちらが楽？'), [
    line('An early start', '早く始める方'),
    line('A late finish', '遅く終える方'),
    line('Neither without coffee', 'コーヒーなしではどちらも無理'),
  ]],
  [line('What weather makes you want to leave the house?', 'どんな天気だと外へ出たくなる？'), [
    line('Clear and cool', '晴れて涼しい日'),
    line('Warm with a little wind', '暖かく少し風がある日'),
    line('A little rain', '少し雨の日'),
  ]],
  [line('What makes an unfamiliar place feel safe?', '知らない場所が安心できる場所になるのはなぜ？'), [
    line('A familiar ritual', '慣れた習慣'),
    line('One kind person', '親切な人がひとりいること'),
    line('A place to sit and observe', '座って眺められる場所'),
  ]],
  [line('What would you like to learn this year?', '今年、何を学びたい？'), [
    line('A practical skill', '実用的なスキル'),
    line('A creative skill', '創作のスキル'),
    line('Something about people', '人についてのこと'),
  ]],
  [line('What did you make or collect as a child?', '子どものころ、何を作ったり集めたりした？'), [
    line('Little worlds', '小さな世界'),
    line('Pictures and notes', '写真やメモ'),
    line('Things from outside', '外で見つけたもの'),
  ]],
  [line('Who taught you something you still use?', '今も役立つことを教えてくれた人は？'), [
    line('A parent', '親'),
    line('A teacher', '先生'),
    line('A friend', '友人'),
  ]],
  [line('Which mistake changed how you act?', '行動の仕方を変えた失敗は？'), [
    line('I rushed', '急ぎすぎた'),
    line('I stayed quiet', '黙ったままだった'),
    line('I tried to do everything alone', '全部ひとりでやろうとした'),
  ]],
  [line('What does freedom feel like in ordinary life?', '日常の中で、自由はどんな感じ？'), [
    line('Choosing my direction', '自分の方向を選ぶこと'),
    line('Having room to pause', '立ち止まる余白があること'),
    line('Being honest about what I want', '望みを正直に言うこと'),
  ]],
  [line('What makes someone trustworthy to you?', 'あなたにとって、信頼できる人とは？'), [
    line('They keep their word', '約束を守る人'),
    line('They listen without performing', '取り繕わずに聞く人'),
    line('They can admit a mistake', '間違いを認められる人'),
  ]],
  [line('Which family habit do you remember warmly?', '温かく思い出す家族の習慣は？'), [
    line('A weekly meal', '週に一度の食事'),
    line('Long voice messages', '長い音声メッセージ'),
    line('A walk after dinner', '夕食後の散歩'),
  ]],
  [line('Where from your past would you quietly return?', '過去にいた場所で、静かに戻りたいのは？'), [
    line('An old neighborhood', '昔住んでいた近所'),
    line('A station or road', '駅や道'),
    line('A room where I felt understood', '理解してもらえた部屋'),
  ]],
  [line('When did you first feel proud of your own choice?', '初めて自分の選択を誇りに思ったのはいつ？'), [
    line('When I finished something difficult', '難しいことを終えたとき'),
    line('When I helped someone', '誰かを助けたとき'),
    line('When I tried again', 'もう一度挑戦したとき'),
  ]],
  [line('What carries you through a difficult day?', '大変な日を乗り越えさせるものは？'), [
    line('One clear task', 'ひとつの明確な作業'),
    line('A kind message', '優しいメッセージ'),
    line('A reason to laugh', '笑える理由'),
  ]],
  [line('What should your future self remember?', '未来の自分に覚えていてほしいことは？'), [
    line('Stay curious', '好奇心を忘れないで'),
    line('Protect your people', '大切な人を守って'),
    line('Do not miss the day itself', 'その日そのものを見逃さないで'),
  ]],
  [line('Which dream is exciting precisely because it is scary?', '怖いからこそわくわくする夢は？'), [
    line('Start something of my own', '自分のものを始める'),
    line('Go somewhere new', '新しい場所へ行く'),
    line('Stand up for someone', '誰かのために立ち上がる'),
  ]],
  [line('What do you rarely say out loud?', 'あまり口に出さないことは？'), [
    line('I need help sometimes', 'ときどき助けが必要'),
    line('I care more than I show', '見せる以上に大切に思っている'),
    line('I am still figuring it out', 'まだ模索中'),
  ]],
  [line('What helps when you feel nervous?', '緊張したとき、何が助けになる？'), [
    line('Make a small joke', '小さな冗談を言う'),
    line('Take one slow breath', 'ゆっくり一度息をする'),
    line('Focus on the next step', '次の一歩に集中する'),
  ]],
  [line('What kind of gift means the most to you?', 'どんな贈り物がいちばんうれしい？'), [
    line('Something handmade', '手作りのもの'),
    line('Something I mentioned once', '一度話したもの'),
    line('Time together', '一緒に過ごす時間'),
  ]],
  [line('What is a perfect ordinary moment?', '完璧な普通の瞬間って、どんなもの？'), [
    line('Light across a table', 'テーブルに差す光'),
    line('A good meal at the right time', 'ちょうどいい時間のいい食事'),
    line('Someone laughing nearby', '近くで誰かが笑っていること'),
  ]],
  [line('How do you show someone you care?', '大切に思っていることを、どう示す？'), [
    line('I make time', '時間を作る'),
    line('I remember details', '細部を覚えている'),
    line('I help with the practical part', '実務的なことを手伝う'),
  ]],
  [line('What boundary took you too long to learn?', '学ぶのに時間がかかった境界線は？'), [
    line('I can say no', '断っていい'),
    line('I do not owe a full explanation', '全部説明する義務はない'),
    line('Rest is not a reward', '休息はごほうびではない'),
  ]],
  [line('When you disagree, what do you try to protect?', '意見が違うとき、何を守ろうとする？'), [
    line('The relationship', '関係性'),
    line('The truth of the issue', '問題の真実'),
    line('The other person’s dignity', '相手の尊厳'),
  ]],
  [line('What makes an apology feel real?', '本当の謝罪だと感じるのは？'), [
    line('Naming what happened', '起きたことを言葉にする'),
    line('Changing the behavior', '行動を変える'),
    line('Giving the other person room', '相手に余白を渡す'),
  ]],
  [line('How do you feel about waiting for something important?', '大事なものを待つのは、どんな感じ？'), [
    line('It gives me time to notice things', '気づく時間になる'),
    line('I make a plan for it', '予定を立てて待つ'),
    line('I pretend I am not waiting', '待っていないふりをする'),
  ]],
  [line('What kind of change do you welcome?', 'どんな変化なら歓迎する？'), [
    line('A new route', '新しい道'),
    line('A better habit', 'よりよい習慣'),
    line('A braver conversation', '勇気のある会話'),
  ]],
  [line('When do you feel that you belong?', 'どんなときに、居場所があると感じる？'), [
    line('When someone saves me a seat', '誰かが席を取っておいてくれたとき'),
    line('When I can be useful', '役に立てたとき'),
    line('When I do not have to explain myself', '自分を説明しなくていいとき'),
  ]],
  [line('What kind of work makes you forget the time?', 'どんな仕事だと時間を忘れる？'), [
    line('Solving a real problem', '現実の問題を解くこと'),
    line('Making an idea clearer', '考えを明確にすること'),
    line('Helping a person move forward', '誰かを前へ進めること'),
  ]],
  [line('Where does your creativity show up first?', '創造性は、まずどこに現れる？'), [
    line('In images', 'イメージの中'),
    line('In words', '言葉の中'),
    line('In the way I arrange things', 'ものの配置の仕方'),
  ]],
  [line('What detail do you notice before most people do?', '人より先に気づく細部は？'), [
    line('Light and color', '光と色'),
    line('A change in someone’s voice', '誰かの声の変化'),
    line('What is out of place', '場違いなもの'),
  ]],
  [line('How do you make a tense room lighter?', '張りつめた場をどう和らげる？'), [
    line('A well-timed joke', 'タイミングのいい冗談'),
    line('A clear next step', '明確な次の一歩'),
    line('A small act of kindness', '小さな親切'),
  ]],
  [line('What makes asking for help difficult?', '助けを求めにくくするものは？'), [
    line('I want to stay capable', 'できる人でいたい気持ち'),
    line('I do not want to burden anyone', '誰かの負担になりたくない気持ち'),
    line('I do not know how to ask', '頼み方が分からないこと'),
  ]],
  [line('What has made you braver lately?', '最近、何があなたを勇敢にした？'), [
    line('A small risk that worked', 'うまくいった小さなリスク'),
    line('Someone’s trust', '誰かの信頼'),
    line('Being tired of hiding', '隠すことに疲れたこと'),
  ]],
  [line('What would you leave behind if you could?', 'できるなら、何を置いていきたい？'), [
    line('The need to impress', 'よく見せたい気持ち'),
    line('An old fear', '昔からの恐れ'),
    line('A role I have outgrown', 'もう合わなくなった役割'),
  ]],
  [line('What promise matters even when nobody is watching?', '誰も見ていなくても大切な約束は？'), [
    line('I will come back', '戻ってくる'),
    line('I will tell the truth', '本当のことを言う'),
    line('I will keep trying', '挑戦し続ける'),
  ]],
  [line('After a good first conversation, what do you hope for?', 'いい最初の会話のあと、何を望む？'), [
    line('A reason to meet again', 'また会う理由'),
    line('A question worth carrying', '持ち帰る価値のある質問'),
    line('A little more honesty next time', '次はもう少し正直になること'),
  ]],
];

const voiceProfiles: Record<NewCharacterId, VoiceProfile> = {
  milo: {
    id: 'milo',
    openers: [
      line("The light was good on the way here. It made me wonder—", "ここに来る途中の光がきれいで、ふと思ったんだ——"),
      line("I saw some great light on the way here and thought of you.", "ここに来る途中でいい光を見つけて、君のことを思い出した。"),
      line("This feels like a good question for a walk.", "これは散歩しながら話したくなる質問だね。"),
      line("Give me the honest version.", "飾らない答えを聞かせて。"),
      line("I was wondering about this.", "これ、ちょっと気になってた。"),
    ],
    promptTails: [
      line("I’m curious what makes you choose it.", "何がそう思わせるのか気になる。"),
      line("The small details are usually the part I remember.", "小さな細部こそ、僕が覚えている部分なんだ。"),
      line("You do not have to make it sound clever.", "気の利いた答えにしなくていいよ。"),
      line("I’m always looking for a reason to go see the world.", "世界を見に行く理由を、いつも探しているんだ。"),
      line("I might steal that for a photo walk.", "それ、写真を撮りながら歩くときに借りるかも。"),
    ],
    replies: [
      [
        line("That sounds like a good way to start. I would bring a camera and see where the day goes.", "それ、いい始まり方だね。カメラを持って、その日の流れを見てみたいな。"),
        line("A slow plan can still turn into a story. I’d want one detail that made leaving the house worth it.", "ゆっくりした予定だって物語になるよ。家を出てよかったと思える細部が一つあればいい。"),
        line("Good people are a pretty reliable map. I would follow that.", "いい人たちがいるなら、それはかなり頼れる地図だよ。僕ならそっちへ行く。"),
      ],
      [
        line("A simple hello can open a surprising door.", "シンプルな「やあ」って、意外な扉を開けるんだ。"),
        line("A question tells me you are actually curious. I like that.", "質問から入るって、本当に興味があるってことだよね。そういうの好きだな。"),
        line("An invitation? Now we are getting somewhere.", "誘いから？ それはもう、話が始まってるね。"),
      ],
      [
        line("That is the kind of detail I would want to photograph before it disappears.", "消えてしまう前に、写真に残したくなるような答えだね。"),
        line("A clever joke is good, but I want to know what made you laugh for real.", "気の利いた冗談もいいけど、本当に笑った理由を聞きたいな。"),
        line("Perfectly strange is usually where the best stories start.", "ちょっと変なくらいが、いちばん面白い話の始まりだよ。"),
      ],
      [
        line("That sounds like permission to take the interesting turn.", "それなら、面白そうな方へ曲がっていいってことだね。"),
        line("A clearer plan is useful. I just hope it leaves one window open for surprise.", "明確な予定は役立つよね。でも、驚きの入る窓はひとつ残しておきたいな。"),
        line("Taking a breath first is not running away. It might help us see the next scene.", "先に息をつくのは逃げることじゃないよ。次の場面が見えやすくなるかも。"),
      ],
      [
        line("I like places that make room for a person to become someone new.", "人が少し新しい自分になれる場所って、いいよね。"),
        line("Familiar is good. It gives you somewhere to put the parts of the day you cannot explain yet.", "慣れた場所はいいよね。まだ説明できない一日を置いておけるから。"),
        line("A view can change the size of a problem. Not solve it, just change its size.", "眺めは問題の大きさを変えてくれるよ。解決じゃなくても、大きさが変わるだけで違うから。"),
      ],
      [
        line("You sound ready to follow a good accident. That is usually how the night improves.", "いい偶然についていく準備ができている感じだね。夜はそうやって面白くなることが多いよ。"),
        line("I like that you leave room for the day to surprise you.", "一日に驚かされる余白を残しているの、いいな。"),
        line("If good people are involved, I am already looking for the nearest train.", "いい人たちが関わるなら、もう一番近い電車を探してるよ。"),
      ],
      [
        line("That answer has a little motion in it. I can work with that.", "その答えには少し動きがあるね。僕はそういうの好きだよ。"),
        line("You do not need a polished version; the honest one has better light.", "磨いた答えじゃなくていいよ。正直な答えの方が光がきれいだから。"),
        line("That is the sort of thing I would write down before I forgot it.", "忘れる前に書き留めておきたくなる答えだね。"),
      ],
      [
        line("I would rather hear a true small story than a perfect big one.", "完璧な大きな話より、本当の小さな話を聞きたいな。"),
        line("You found the interesting corner of the question.", "質問の中の面白い角を見つけたね。"),
        line("That sounds like a reason to send a postcard and actually keep the promise.", "絵はがきを送って、その約束をちゃんと守る理由になりそう。"),
      ],
      [
        line("A detour is only a bad plan if it gives you nothing to remember.", "寄り道は、何も覚えて帰れないときだけ悪い予定なんだよ。"),
        line("A careful choice can still lead somewhere unexpected.", "慎重な選択でも、思いがけない場所へ行けるよ。"),
        line("I like that you know when to pause instead of pretending you are fearless.", "怖くないふりをせず、立ち止まるタイミングを知っているのがいいね。"),
      ],
      [
        line("Some places make it easier to tell the truth. I would like to find yours.", "本当のことを話しやすくする場所ってあるよね。君の場所も見つけたいな。"),
        line("That feels like an invitation, even if you did not mean it as one.", "そういう答えは、誘いのつもりがなくても誘いみたいに感じるよ。"),
        line("Now I want to see the face you make when the plan finally works.", "予定がうまくいったとき、君がどんな顔をするのか見たくなった。"),
      ],
    ],
  },
  clara: {
    id: 'clara',
    openers: [
      line("I’ve been thinking about what makes a day feel easy.", "どんな日なら楽に感じられるのか、ずっと考えていたの。"),
      line("I want to understand rather than judge:", "判断するより理解したくて聞くんだけど、"),
      line("Take your time with this one:", "これは急がずに答えてね。"),
      line("I noticed something in your last answer:", "さっきの答えで、少し気になったことがあって、"),
      line("Before I offer an opinion, I want to ask:", "意見を言う前に、聞いておきたいの。"),
    ],
    promptTails: [
      line("I am interested in what makes a day feel manageable.", "何が一日を無理なく過ごせるものにするのか、気になっているの。"),
      line("You can answer the feeling, not just the facts.", "事実だけじゃなく、感じたことを答えていいよ。"),
      line("I tend to remember the details people pass over.", "私は、人が通り過ぎる細部を覚えていることが多いの。"),
      line("There is no need to make this sound more certain than it is.", "実際より確かなことのように言わなくて大丈夫。"),
      line("I want to understand what you need, not what you should need.", "必要なはずのものではなく、あなたが必要なものを知りたいの。"),
    ],
    replies: [
      [
        line("That sounds restorative, not selfish. There is a difference.", "それは自分勝手ではなく、回復するための時間だと思う。そこは違うよ。"),
        line("A quiet hour can hold more feeling than people expect.", "静かな1時間には、思っている以上にたくさんの気持ちが入ることがあるよね。"),
        line("Good company matters because you do not have to perform around the right people.", "いい人といることが大切なのは、相手の前では取り繕わなくていいからだね。"),
      ],
      [
        line("That gives the other person room to answer honestly.", "それなら相手も、正直に答える余地を持てるね。"),
        line("I like a question when it comes with genuine attention.", "本当に相手を見ている質問って、いいと思う。"),
        line("An invitation can be a quiet way of saying, you are welcome here.", "誘うことって、「ここにいていいよ」と静かに伝える方法でもあるよね。"),
      ],
      [
        line("Humor can be kind when it does not ask anyone to hide their hurt.", "誰かに痛みを隠させないユーモアなら、優しさになれると思う。"),
        line("A clever joke is lovely, especially when it leaves everyone included.", "気の利いた冗談は素敵だね。そこにいる人を置いていかないなら、なおさら。"),
        line("There is something generous about letting a person be unusual without correcting them.", "人の変わったところを直そうとせず、そのままにしておくのは優しさだと思う。"),
      ],
      [
        line("Following the new energy can be brave, as long as you still check in with yourself.", "新しい流れに乗るのは勇気がいるね。ただ、自分の気持ちも確認しながらがいいと思う。"),
        line("A plan can be a form of care, not a way to control everything.", "予定を立てることは、すべてを支配するためではなく、自分をいたわる方法にもなるよ。"),
        line("A pause gives feelings time to become information.", "少し間を置くと、気持ちが判断のための情報に変わることがあるよね。"),
      ],
      [
        line("That answer sounds like you know what helps you feel safe.", "その答えから、自分が安心できるものを分かっている感じがする。"),
        line("One kind person can make an unfamiliar room feel possible.", "親切な人がひとりいるだけで、知らない部屋にもいられる気がするよね。"),
        line("Observing first is not distance. Sometimes it is how trust begins.", "まず眺めることは、距離を置くこととは限らないよ。そこから信頼が始まることもある。"),
      ],
      [
        line("That sounds like a need worth taking seriously, not explaining away.", "それは言い訳せず、大切に扱う価値のある必要だと思う。"),
        line("I appreciate how carefully you are listening to yourself.", "自分の声を丁寧に聞いているところが素敵だと思う。"),
        line("A welcoming person does not have to solve the whole room.", "人を迎え入れる人が、その場のすべてを解決しなくてもいいんだよ。"),
      ],
      [
        line("There is a difference between being available and being responsible for everyone.", "誰かのためにいることと、全員に責任を負うことは違うよ。"),
        line("You can ask for clarity without making the other person wrong.", "相手を否定せずに、明確さを求めることはできるよ。"),
        line("That kind of patience is a form of respect, including toward yourself.", "その忍耐強さは、自分自身にも向ける尊重の形だと思う。"),
      ],
      [
        line("I would rather have a small honest answer than a reassuring performance.", "安心させるための演技より、小さくても正直な答えの方がいいな。"),
        line("You are allowed to change your mind after you understand more.", "もっと分かったあとで、考えを変えてもいいんだよ。"),
        line("It sounds as though you are making space for both people.", "二人分の余白を作ろうとしているように聞こえる。"),
      ],
      [
        line("A boundary can be kind and still be firm.", "境界線は優しくても、しっかりしていていいんだよ。"),
        line("I hear the feeling underneath the practical answer.", "実務的な答えの下にある気持ちも聞こえているよ。"),
        line("When you say that, I wonder what support would feel safe.", "そう言われると、どんな支えなら安心できるのか考えたくなる。"),
      ],
      [
        line("You do not need to carry the calm for everyone in the room.", "その場にいる全員の平静を、あなたひとりが背負わなくていい。"),
        line("That is a careful hope, and careful does not mean small.", "それは丁寧な希望だね。丁寧であることは、小さいことじゃないよ。"),
        line("I will remember the part of this answer that you almost left unsaid.", "言わずに置きそうになった部分も、私は覚えておくね。"),
      ],
    ],
  },
  arthur: {
    id: 'arthur',
    openers: [
      line("I was thinking about something practical.", "実際的なことを少し考えていた。"),
      line("For the sake of clarity:", "話を明確にするために聞くけれど、"),
      line("I am curious, despite appearances:", "こう見えて、少し気になっている。"),
      line("No need to make a speech:", "長いスピーチは不要だよ。"),
      line("One precise question:", "正確にひとつだけ聞こう。"),
    ],
    promptTails: [
      line("A clear answer is preferable, but honesty will do.", "明確な答えが望ましいが、正直であれば十分だ。"),
      line("I am interested in the principle behind the preference.", "その好みの背後にある原則に興味がある。"),
      line("No elaborate justification is required.", "手の込んだ正当化は必要ないよ。"),
      line("Consistency is useful; exceptions are allowed.", "一貫性は有用だが、例外も認めよう。"),
      line("I suspect the practical answer is not always the dull one.", "実用的な答えが、いつも退屈とは限らないと思っている。"),
    ],
    replies: [
      [
        line("Sensible. I shall file that under good decisions.", "賢明だね。良い判断として記録しておこう。"),
        line("A quiet hour is a perfectly legitimate use of time. I have checked.", "静かな1時間は、時間の正当な使い方だよ。確認済みだ。"),
        line("Good company is difficult to improve upon. Even legally.", "いい人といる時間は、なかなか上回れない。法律的に見てもね。"),
      ],
      [
        line("Efficient. It leaves very little room for misunderstanding.", "効率的だね。誤解の余地がほとんどない。"),
        line("A question is usually more useful than a performance. A rare advantage.", "取り繕うより質問の方が役に立つ。珍しく有利な方法だね。"),
        line("An invitation is a commitment of sorts. I respect that.", "誘いは、ある種の約束だからね。そこは評価する。"),
      ],
      [
        line("A ridiculous mistake is often the most honest kind of comedy.", "ばかばかしい失敗は、いちばん正直な笑いになることがある。"),
        line("Clever is useful. Cruel is merely lazy.", "賢い冗談は役に立つ。意地悪は、ただの怠慢だよ。"),
        line("Unusual is not the same as objectionable. People confuse the two.", "変わっていることと、問題があることは別だ。混同する人が多いけれど。"),
      ],
      [
        line("Following the new plan is acceptable, provided it exists.", "新しい予定に乗るのは構わない。予定が存在するならね。"),
        line("A clearer plan reduces preventable disasters. I am fond of that.", "明確な予定は、避けられる災難を減らす。私はそれを好む。"),
        line("A pause is not indecision. It is often sound risk management.", "間を置くことは優柔不断ではない。健全なリスク管理の場合が多い。"),
      ],
      [
        line("Small cafés offer useful data: light, noise, and whether the tea is tolerable.", "小さなカフェは有益な情報をくれる。光、音、そして紅茶が許容範囲かどうか。"),
        line("Familiar rooms have the advantage of requiring no explanation.", "慣れた部屋には、説明を要しないという利点がある。"),
        line("A view is useful. It reminds you that the immediate problem is not the entire world.", "眺めは役に立つ。目の前の問題が世界全体ではないと思い出せるからね。"),
      ],
      [
        line("That is a defensible preference. I see no need to litigate it further.", "それは十分に擁護できる好みだね。これ以上争う必要はなさそうだ。"),
        line("Rest is not idleness. It is a sensible allocation of resources.", "休息は怠惰ではない。資源の賢明な配分だよ。"),
        line("Good company is a rare luxury, though I dislike calling it luxury.", "いい人との時間は珍しいぜいたくだが、ぜいたくと呼ぶのは少し違う気がする。"),
      ],
      [
        line("State the purpose and ask the question. It is remarkably effective.", "目的を明らかにして質問すればいい。驚くほど効果的だよ。"),
        line("Clarity is kinder than leaving someone to infer the terms.", "条件を推測させるより、明確にする方が親切だ。"),
        line("An invitation without a date is merely a vague proposal.", "日付のない誘いは、ただの曖昧な提案にすぎない。"),
      ],
      [
        line("Review the mistake before assigning blame. The sequence matters.", "責任を問う前に失敗を検証しよう。順番が重要だからね。"),
        line("Humor should survive a second reading.", "ユーモアは二度目に読んでも成立するべきだ。"),
        line("An eccentric detail may be worth preserving.", "風変わりな細部には、残す価値があるかもしれない。"),
      ],
      [
        line("A change of route is acceptable if the destination improves.", "目的地がよくなるなら、道を変えるのは構わない。"),
        line("Plan for the likely, then leave room for the inconvenient.", "起こりそうなことに備え、それから厄介なことの余地を残そう。"),
        line("Pause when the facts are insufficient. That is judgment.", "事実が足りないなら止まる。それが判断というものだ。"),
      ],
      [
        line("Coffee and a chair solve more temporary problems than one might expect.", "コーヒーと椅子は、思う以上に多くの一時的な問題を解決する。"),
        line("Familiarity is efficient, but it should not become an excuse.", "慣れは効率的だが、言い訳になってはいけない。"),
        line("Distance clarifies; it also exposes whether the argument has substance.", "距離は物事を明確にする。それに、議論に中身があるかも明らかにする。"),
      ],
    ],
  },
  leo: {
    id: 'leo',
    openers: [
      line("Okay, I need to know this before I overthink it.", "考えすぎる前に、これだけ知りたい。"),
      line("My brain has produced a follow-up, sorry in advance:", "頭が勝手に追加質問を作った。先に謝っておくね。"),
      line("This may be a terrible segue, but:", "ひどい話題転換かもしれないけど、"),
      line("Quick poll before I overthink it:", "考えすぎる前に、簡単な投票を、"),
      line("Real talk for three seconds:", "3秒だけ本音で話すと、"),
    ],
    promptTails: [
      line("Please answer before my brain invents a worse option.", "僕の脳がもっと変な選択肢を作る前に答えて。"),
      line("I promise not to turn it into a personality quiz.", "性格診断にはしないって約束する。"),
      line("This is where I would add a meme, if this were a group chat.", "グループチャットなら、ここでミームを貼るところ。"),
      line("I am asking for totally normal and not nervous reasons.", "完全に普通の、緊張していない理由で聞いているよ。"),
      line("There is a correct answer, and it is probably not mine.", "正解はある。たぶん僕の答えではないけど。"),
    ],
    replies: [
      [
        line("That sounds good. Possibly suspiciously healthy, but good.", "それ、いいね。ちょっと健康的すぎて怪しいけど、いい。"),
        line("A quiet hour? My brain would immediately open seventeen tabs.", "静かな1時間？ 僕の脳なら即17個くらいタブを開くよ。"),
        line("Good company is basically emotional Wi-Fi. I want that too.", "いい人といるのって、感情のWi-Fiみたいなものだよね。僕も欲しい。"),
      ],
      [
        line("A simple hey is underrated. Tiny message, huge plot potential.", "シンプルな「やあ」は過小評価されてる。短いメッセージなのに、物語の可能性がすごい。"),
        line("Questions are good. I ask three, then panic about asking three.", "質問はいいよね。僕は3つ聞いて、3つ聞いたことに慌てるけど。"),
        line("An invitation is bold. I respect the courage and the calendar risk.", "誘いは大胆だね。その勇気と、カレンダー上のリスクを評価する。"),
      ],
      [
        line("Ridiculous mistakes are my brand, apparently. Excellent choice.", "ばかばかしい失敗は、どうやら僕のブランドらしい。すばらしい選択。"),
        line("A clever joke is great until I explain it and destroy it. I have done this.", "気の利いた冗談は、説明した瞬間に壊れるんだ。僕は経験済み。"),
        line("Wonderful strange people are the reason group chats survive.", "妙に変で素敵な人たちがいるから、グループチャットは生き残れるんだよ。"),
      ],
      [
        line("Following the new energy sounds brave. Also slightly dangerous. I am in.", "新しい流れに乗るの、勇気がいるね。少し危険でもある。僕は乗る。"),
        line("A plan is great. I support plans, especially when someone else made the spreadsheet.", "予定はいいよ。特に誰かが表計算を作ってくれた場合、僕は予定を支持する。"),
        line("A pause is smart. My version is staring at the wall while pretending it is strategy.", "間を置くのは賢いね。僕の場合は、戦略のふりをして壁を見つめることだけど。"),
      ],
      [
        line("A café is a safe zone with snacks. Honestly, excellent infrastructure.", "カフェはおやつ付きの安全地帯だよ。正直、すばらしいインフラ。"),
        line("Familiar rooms are useful when your brain is running outdated software.", "脳が古いソフトで動いている日は、慣れた部屋が役に立つよね。"),
        line("A view can shrink a problem. Not delete it, but maybe move it to a smaller window.", "眺めは問題を小さくできる。消せなくても、少し小さいウィンドウに移せるんだ。"),
      ],
      [
        line("That answer is suspiciously functional. I respect it.", "その答え、怪しいくらい実用的だね。僕は好き。"),
        line("Okay, that is a whole personality in three words. Noted.", "その3語だけで、もう性格が見える。メモした。"),
        line("Good company beats good Wi-Fi, which is a serious claim from me.", "いい人といる方が、いいWi-Fiより強い。僕が言うなら本気の主張だよ。"),
      ],
      [
        line("I would absolutely make a video about that and then forget to export it.", "それ、絶対動画にする。でも書き出しを忘れるところまで想像できる。"),
        line("That is a better answer than the one my nervous brain suggested.", "緊張した僕の脳が出した答えより、ずっといい答えだね。"),
        line("Excellent. Strange is just interesting before the group chat agrees.", "最高。変わっているって、グループチャットが面白いと認める前の段階だから。"),
      ],
      [
        line("New plan accepted. I reserve the right to add snacks.", "新しい予定、採用。おやつを追加する権利は残しておくね。"),
        line("A plan is useful until reality installs an update.", "現実がアップデートを入れるまでは、予定は役に立つよ。"),
        line("Taking a pause is smart. My usual method is less scientifically supported.", "立ち止まるのは賢い。僕のいつもの方法は、科学的な裏付けが薄いけど。"),
      ],
      [
        line("That sounds like a place where my brain could stop buffering.", "そこなら、僕の脳もバッファリングを止められそう。"),
        line("Familiar rooms are underrated. They do not ask for a password every five minutes.", "慣れた部屋は過小評価されてる。5分ごとにパスワードを聞いてこないからね。"),
        line("A view is basically a reset button for the human operating system.", "眺めって、人間のOSのリセットボタンみたいなものだよ。"),
      ],
      [
        line("You answered like a person who has survived at least one deadline.", "少なくとも一つの締切を生き延びた人の答えだね。"),
        line("I like that. It is honest without making a whole dramatic trailer.", "いいね。大げさな予告編を作らずに正直だ。"),
        line("That is the kind of answer I would send to a friend at 1 a.m.", "夜中の1時に友だちへ送りたくなる答えだよ。"),
      ],
    ],
  },
  julian: {
    id: 'julian',
    openers: [
      line("I keep coming back to this.", "このことが、何度も頭に戻ってくるんだ。"),
      line("There is something interesting about this:", "これって、少し面白いと思うんだけど、"),
      line("Let us stay with that thought for a moment:", "その考えを、もう少しだけ一緒に眺めてみると、"),
      line("I am curious where your mind goes:", "君の考えがどこへ向かうのか気になって、"),
      line("Maybe the ordinary version is the honest one:", "もしかしたら、普通の答えの方が正直なのかもしれなくて、"),
    ],
    promptTails: [
      line("The answer might say more about belonging than preference.", "その答えは、好みより居場所について語っているのかもしれない。"),
      line("I like the small stories hidden inside questions like this.", "こういう質問に隠れている小さな物語が好きなんだ。"),
      line("Maybe the reason matters more than the choice.", "もしかしたら、選択より理由の方が大切なのかもしれない。"),
      line("Tell me where the answer takes you.", "その答えが君をどこへ連れていくのか、教えて。"),
      line("I am listening for the part you almost leave out.", "君が言いかけて省きそうな部分を聞いている。"),
    ],
    replies: [
      [
        line("A bright day changes what we notice, but good company changes what the day means.", "明るい日は見えるものを変えるけど、いい人はその日の意味を変えるんだね。"),
        line("A quiet hour can feel like a conversation with the version of you that is usually interrupted.", "静かな1時間って、いつも遮られている自分との会話みたいに感じることがあるよね。"),
        line("Good company is not only being understood. It is becoming more yourself beside someone.", "いい人といることは、理解されるだけじゃなく、その人のそばで自分らしくなることでもあると思う。"),
      ],
      [
        line("A hello is small, but it changes the relationship from possible to present.", "「やあ」は小さい言葉だけど、関係を可能性から現在に変えるんだね。"),
        line("Questions create a little space where another person can become more specific.", "質問は、相手が自分のことをもう少し具体的にできる余白を作るよね。"),
        line("An invitation is a hypothesis: maybe there is a good hour waiting for both of us.", "誘いは仮説なんだ。二人を待っているいい1時間があるかもしれない、という。"),
      ],
      [
        line("Mistakes are funny when they reveal the human shape beneath the polished version.", "失敗って、整えた姿の下にある人間らしさを見せてくれるとき、面白いよね。"),
        line("A clever joke gives the mind somewhere new to stand.", "気の利いた冗談は、心が別の場所に立つための足場をくれる。"),
        line("Strangeness is often just a detail we have not learned how to appreciate yet.", "変わっているというのは、まだ味わい方を学んでいない細部なのかもしれない。"),
      ],
      [
        line("Following the new energy can make a familiar day feel briefly unrepeatable.", "新しい流れに乗ると、いつもの日が一度きりのものに感じられることがある。"),
        line("A plan gives the future a shape. It does not have to become a cage.", "予定は未来に形を与えるけど、檻になる必要はないんだよね。"),
        line("A pause lets you hear which part of the change is fear and which part is desire.", "間を置くと、変化のどこが恐れで、どこが望みなのか聞き分けやすくなるよ。"),
      ],
      [
        line("A small café can become home for an hour because nobody asks you to be finished.", "小さなカフェが1時間だけ家になるのは、完成した人でいなくていいからかもしれない。"),
        line("A familiar room remembers your silence without making it a problem.", "慣れた部屋は、沈黙を問題にせず覚えていてくれるんだね。"),
        line("A view gives the mind a wider sentence to finish.", "眺めは、心が続きを書ける少し長い文をくれる気がする。"),
      ],
      [
        line("That answer has a rhythm to it. I can almost hear the city changing around it.", "その答えにはリズムがあるね。街がその周りで変わっていく音まで聞こえそう。"),
        line("I like the reason you gave it; reasons are where the real conversation starts.", "その理由が好きだな。理由のところから、本当の会話が始まるんだと思う。"),
        line("Good company is not a destination. It is a way of moving through the day.", "いい人といることは目的地じゃなくて、一日を歩く方法なんだね。"),
      ],
      [
        line("The honest answer rarely arrives wearing a dramatic costume.", "正直な答えは、派手な衣装を着て現れることはあまりない。"),
        line("That detail opens another question, which is usually a good sign.", "その細部から別の質問が開く。それはたいてい、いい兆候だよ。"),
        line("I would remember that answer the way I remember a song heard once in a station.", "駅で一度だけ聞いた曲を覚えているみたいに、その答えを覚えていたいな。"),
      ],
      [
        line("A change of route can be a change in the story you tell about the day.", "道を変えると、その日の語り方まで変わることがあるね。"),
        line("Planning can make freedom possible, as long as it stays revisable.", "予定は、修正できるままなら自由を可能にしてくれる。"),
        line("The pause matters because it gives the feeling a voice.", "間が大事なのは、気持ちに声を与えてくれるからだね。"),
      ],
      [
        line("A place becomes intimate when you are allowed to be unfinished there.", "未完成のままでいられる場所は、親密な場所になるんだね。"),
        line("There is a kind of care in choosing what does not ask anything from you.", "何も求めてこないものを選ぶことにも、ひとつの思いやりがあると思う。"),
        line("A view does not answer the question. It gives the question more air.", "眺めは質問に答えない。でも、質問にもっと空気を与えてくれる。"),
      ],
      [
        line("I like that you did not make the answer smaller to make it easy.", "簡単にするために、答えを小さくしなかったところが好きだよ。"),
        line("That is a thought I would want to follow past midnight.", "その考えなら、夜中を過ぎても追いかけていたくなる。"),
        line("Maybe that is what conversation is for: making a little more room around a feeling.", "たぶん会話は、気持ちの周りにもう少し余白を作るためにあるのかもしれないね。"),
      ],
    ],
  },
  declan: {
    id: 'declan',
    openers: [
      line("Let’s start with an easy one, friend.", "友だち、まずは簡単なところから始めよう。"),
      line("No rush, but I would love to know:", "急がなくていいけど、知りたいな。"),
      line("You can answer honestly here:", "ここでは正直に答えて大丈夫だよ。"),
      line("Let us make this one easy:", "これは簡単な質問にしよう。"),
      line("I am cheering for the answer already:", "もう答えを応援する気満々で、"),
    ],
    promptTails: [
      line("There is no wrong answer, only a chance to know you better.", "間違った答えなんてないよ。君をもっと知るきっかけがあるだけ。"),
      line("Small things count for more than people give them credit for.", "小さなことは、みんなが思う以上に大切なんだ。"),
      line("You do not have to carry the answer alone.", "答えをひとりで抱えなくていいよ。"),
      line("I am glad you are here for this one.", "この質問に一緒にいてくれてうれしいよ。"),
      line("We can make room for whatever the answer brings.", "答えが何を連れてきても、受け入れる余白を作れるからね。"),
    ],
    replies: [
      [
        line("That sounds like a good way to look after yourself. You earned the hour.", "自分をいたわる、いい方法だね。その1時間は君が受け取っていいよ。"),
        line("A quiet hour counts as progress too. Not every win needs an audience.", "静かな1時間も、ちゃんと前進だよ。すべての勝利に観客はいらないからね。"),
        line("Good company can carry a person farther than a brilliant plan.", "いい人と一緒なら、すばらしい予定より遠くへ行けることがあるよ。"),
      ],
      [
        line("A simple hello says there is room for a conversation. That is a lovely start.", "シンプルな「やあ」には、会話の余地があるって意味がある。いい始まりだよ。"),
        line("A question says you are willing to meet the real person, not just the polite version.", "質問することは、礼儀正しい表面じゃなく、本当の相手に会おうとしていることだね。"),
        line("An invitation can be a wee bit of courage in sentence form.", "誘いって、文章の形をした小さな勇気みたいなものだよ。"),
      ],
      [
        line("A ridiculous mistake is easier to carry when nobody turns it into a verdict.", "ばかばかしい失敗も、誰も判決にしなければ持ち運びやすいよね。"),
        line("A good joke gives everyone a seat at the table.", "いい冗談は、そこにいる全員に席を用意してくれるんだ。"),
        line("Letting people be wonderfully strange is a fine way to make them feel at home.", "人が妙に変なままでいられるようにするのは、居場所を渡すいい方法だよ。"),
      ],
      [
        line("Following the new energy can be a grand little adventure. Bring a coat, perhaps.", "新しい流れに乗るのは、小さくてすばらしい冒険だね。コートは持っていこうか。"),
        line("A plan can help, but it should leave enough room for a person to breathe.", "予定は助けになるけど、人が息をつける余白は残しておきたいね。"),
        line("A pause is allowed. We do not have to win the whole week today.", "立ち止まってもいいんだよ。今日だけで一週間全部に勝たなくていいからね。"),
      ],
      [
        line("A small café can make a lonely day feel less official.", "小さなカフェがあると、寂しい日も少しだけ深刻ではなくなるね。"),
        line("A familiar room is a good place to put down the brave face for a minute.", "慣れた部屋では、勇敢な顔を少しだけ置いておけるよ。"),
        line("A view reminds us that a hard moment is still only one moment.", "眺めは、つらい瞬間もまだ一瞬にすぎないと思い出させてくれるね。"),
      ],
      [
        line("That is a fair thing to need. You are not asking for too much by saying it.", "それは必要としていいことだよ。それを言っても、求めすぎじゃない。"),
        line("A quiet hour can be the bit of kindness that gets you through the next one.", "静かな1時間が、次の1時間を乗り越えるための優しさになることもあるよ。"),
        line("Good company does not make you earn your seat. It saves one for you.", "いい人たちは、席を得るために頑張らせない。君のために席を取っておいてくれるんだ。"),
      ],
      [
        line("A greeting is small, but it can tell a person they have not been forgotten.", "挨拶は小さいけど、忘れられていないと伝えられるよ。"),
        line("Asking a question is a fine way to make room for someone else’s story.", "質問するのは、相手の物語のために余白を作るいい方法だね。"),
        line("An invitation says, come as you are. That is a brave thing to offer.", "誘いには、そのままで来ていいよという意味がある。勇気のいる贈り物だよ。"),
      ],
      [
        line("A mistake does not cancel the good you did before it.", "失敗したからといって、それまでのいいことが消えるわけじゃないよ。"),
        line("A laugh is welcome when it brings people closer rather than putting someone below them.", "笑いは、誰かを下に置かず、みんなを近づけるなら大歓迎だよ。"),
        line("Letting a person be different is one of the quiet ways we say they belong.", "人の違いをそのままにするのは、居場所があると伝える静かな方法だね。"),
      ],
      [
        line("You can change direction and still be a person who keeps their word.", "方向を変えても、約束を守る人でいられるよ。"),
        line("A plan should help you breathe, not make you prove yourself.", "予定は自分を証明させるものじゃなく、息をしやすくするものだよ。"),
        line("Taking a minute is still taking care of the team, including yourself.", "1分立ち止まるのも、自分を含めたチームを大切にすることだよ。"),
      ],
      [
        line("A safe place does not have to be grand. A chair and a kind word can do a lot.", "安全な場所は立派じゃなくていい。椅子と優しい言葉だけでも、できることは多いよ。"),
        line("Familiar rooms are where we remember we are people, not just responsibilities.", "慣れた部屋では、責任だけじゃなく人間でもあると思い出せるね。"),
        line("A wider view can help a hard day loosen its grip.", "広い眺めがあると、つらい日が少し手をゆるめてくれることがあるよ。"),
      ],
    ],
  },
  elias: {
    id: 'elias',
    openers: [
      line("The light made me think of this.", "光を見て、このことを思ったんだ。"),
      line("I keep picturing a road that starts here:", "ここから始まる道を、ずっと思い浮かべていて、"),
      line("A small question, before I lose the thought:", "考えを失う前に、小さな質問をひとつ。"),
      line("I am trying to be brave enough to ask:", "聞く勇気を少し出して、"),
      line("Maybe this is a first direction:", "もしかしたら、これは最初の方向で、"),
    ],
    promptTails: [
      line("Sometimes the first direction is enough.", "ときどき、最初の方向だけで十分なんだ。"),
      line("I am curious about the image that appears in your mind.", "君の心に浮かぶイメージが気になる。"),
      line("You can describe it badly; I will still understand the shape.", "うまく説明できなくても、その形はきっと分かるよ。"),
      line("A small answer can still open a door.", "小さな答えでも、扉を開くことがある。"),
      line("I am learning to notice where I want to go.", "自分がどこへ行きたいのか、気づく練習をしているんだ。"),
    ],
    replies: [
      [
        line("That sounds like the kind of morning that makes a photograph feel necessary.", "それは、写真に残したくなるような朝だね。"),
        line("A quiet hour has its own weather. You can feel it before you name it.", "静かな1時間には、それだけの天気があるみたい。名前をつける前に感じられるんだ。"),
        line("Good company changes the color of a place. I think that is why we remember people in landscapes.", "いい人といると、場所の色が変わるよね。だから人を風景と一緒に覚えるのかもしれない。"),
      ],
      [
        line("A simple hello is like opening a curtain just a little.", "シンプルな「やあ」は、カーテンを少しだけ開けるみたいだね。"),
        line("A question gives the other person a path to walk down.", "質問は、相手が歩いていける道を一本渡すんだね。"),
        line("An invitation makes the future less foggy. There is suddenly somewhere to go.", "誘いがあると、未来の霧が少し晴れる。行く場所ができるから。"),
      ],
      [
        line("A ridiculous mistake can make an ordinary room feel alive.", "ばかばかしい失敗で、普通の部屋が生き生きすることがあるね。"),
        line("A clever joke is a small flash of light. It is gone quickly, but you saw it.", "気の利いた冗談は、小さな光みたい。すぐ消えるけど、見えたことは残る。"),
        line("Wonderful strangeness is often the first interesting thing in a person.", "妙に変で素敵なところは、その人の最初の面白さかもしれないね。"),
      ],
      [
        line("Following the new energy sounds frightening and good. Those can be the same thing.", "新しい流れに乗るのは怖くて、いいことにも聞こえる。その二つは同じこともあるよ。"),
        line("A plan can point you toward the horizon without deciding every step.", "予定は地平線を指し示せるけど、一歩一歩を全部決めなくてもいいよね。"),
        line("A pause is where the next direction sometimes appears.", "立ち止まった場所に、次の方向が現れることもあるよ。"),
      ],
      [
        line("A small café has the right kind of light for beginning again.", "小さなカフェには、もう一度始めるのにちょうどいい光があるね。"),
        line("A familiar room can hold you while you decide whether you are ready to leave it.", "慣れた部屋は、出る準備ができたか決めるあいだ、支えてくれる。"),
        line("A view gives the mind somewhere to travel, even before the train arrives.", "電車が来る前でも、眺めがあれば心はどこかへ旅できるよ。"),
      ],
      [
        line("The road does not need to be dramatic to be worth taking.", "進む道は、劇的でなくても進む価値があるよ。"),
        line("A quiet hour can be the place where a future trip first becomes real.", "静かな1時間の中で、未来の旅が初めて現実になることもあるね。"),
        line("Good company makes the distance feel less like a test.", "いい人と一緒なら、距離は試験のように感じにくくなるね。"),
      ],
      [
        line("A hello is a small opening. You can decide later how far to walk through it.", "「やあ」は小さな開口部だね。そこをどこまで歩くかは、あとで決めていい。"),
        line("A question can be a path, especially when it does not demand a perfect answer.", "質問は道になれる。完璧な答えを求めないなら、なおさら。"),
        line("An invitation makes a distant place look a little closer.", "誘いがあると、遠い場所が少し近く見えるね。"),
      ],
      [
        line("A mistake can be an ugly frame around a beautiful lesson.", "失敗は、美しい学びを囲む少し不格好な額縁みたいなものかもしれない。"),
        line("A clever joke is a flash. I like the afterimage it leaves.", "気の利いた冗談は閃光みたい。その残像が好きなんだ。"),
        line("Strange details are often the ones that make a place worth remembering.", "変わった細部が、その場所を覚えておく価値のあるものにすることが多いね。"),
      ],
      [
        line("A new route can feel like a door you had been walking past every day.", "新しい道は、毎日通り過ぎていた扉みたいに感じることがある。"),
        line("A plan gives courage a small shape it can step into.", "予定は、勇気が踏み出せる小さな形を与えてくれる。"),
        line("Pausing does not erase the road. It lets you see where it begins.", "立ち止まっても道は消えない。どこから始まるか見えるようになるんだ。"),
      ],
      [
        line("A café can be a waiting room for a braver version of yourself.", "カフェは、少し勇敢な自分を待つ待合室になれるね。"),
        line("A familiar room can hold the maps until you are ready to unfold one.", "慣れた部屋は、地図を開く準備ができるまで預かってくれる。"),
        line("A view gives your thoughts somewhere to go while your feet stay still.", "眺めがあれば、足を止めたままでも考えを旅に出せるよ。"),
      ],
    ],
  },
  adrian: {
    id: 'adrian',
    openers: [
      line("I’m curious whether the ordinary answer is the useful one.", "普通の答えが役に立つものなのか、少し気になっている。"),
      line("I have a working hypothesis:", "仮説がひとつある。"),
      line("Before we turn it into a story:", "物語にする前に、"),
      line("The evidence may be in the ordinary details:", "証拠は普通の細部にあるかもしれない。"),
      line("A useful question, I think:", "有用な質問だと思うが、"),
    ],
    promptTails: [
      line("The interesting part is what evidence you would point to.", "興味深いのは、どの証拠を指すかという点だ。"),
      line("Separate the instinct from the conclusion.", "直感と結論は分けて考えよう。"),
      line("A preference is not proof, but it is useful data.", "好みは証明ではないが、有用なデータではある。"),
      line("We can revise the theory later.", "仮説はあとで修正できる。"),
      line("The responsible answer may be less dramatic.", "責任ある答えは、少し地味かもしれない。"),
    ],
    replies: [
      [
        line("A bright day is pleasant evidence, but good company has a stronger effect over time.", "明るい日は好ましい証拠だが、長期的にはいい人との時間の方が影響は強い。"),
        line("A quiet hour is not an absence of activity. It is a form of maintenance.", "静かな1時間は活動がない状態ではない。維持管理の一種だよ。"),
        line("Good company is a reliable field condition. People reveal more when they feel safe.", "いい人との関係は、信頼できる現場条件だ。安心できると、人は多くを見せる。"),
      ],
      [
        line("A simple greeting establishes contact with minimal risk. Efficient.", "シンプルな挨拶は、リスクを最小限にして接触を作る。効率的だ。"),
        line("A question is an invitation to provide evidence. I approve.", "質問は、証拠を提示してもらうための招待だ。賛成だね。"),
        line("An invitation creates an observable next step. That is useful.", "誘いは、観察可能な次の一歩を作る。役に立つよ。"),
      ],
      [
        line("A ridiculous mistake is valuable if it reveals the process rather than just the outcome.", "ばかばかしい失敗も、結果だけでなく過程を見せるなら価値がある。"),
        line("A clever joke can change the angle of an argument without falsifying it.", "気の利いた冗談は、事実を曲げずに議論の角度を変えられる。"),
        line("Strangeness is not a flaw in the data. It may be the most informative part.", "変わっていることはデータの欠陥ではない。最も情報量が多い部分かもしれない。"),
      ],
      [
        line("Following the new energy is reasonable, if you first identify the actual risk.", "新しい流れに乗るのは合理的だ。ただし、まず実際のリスクを特定すること。"),
        line("A plan is a tool, not a prophecy. Revise it when the evidence changes.", "予定は道具であって予言ではない。証拠が変われば修正すればいい。"),
        line("A pause improves observation. It is not a failure to act.", "間を置くと観察の質が上がる。行動の失敗ではないよ。"),
      ],
      [
        line("A small café provides useful shelter and occasionally excellent field notes.", "小さなカフェは有用な避難所で、ときどきすばらしいフィールドノートもくれる。"),
        line("A familiar room is a controlled environment. There is merit in that.", "慣れた部屋は管理された環境だ。そこには利点がある。"),
        line("A view supplies scale. Many urgent problems become less absolute from a distance.", "眺めは尺度を与えてくれる。距離を置くと、緊急の問題も絶対的ではなくなる。"),
      ],
      [
        line("Your answer identifies a condition, not merely a preference. Useful distinction.", "君の答えは単なる好みではなく、条件を特定している。有用な区別だ。"),
        line("A quiet hour preserves judgment. That is a practical benefit, not indulgence.", "静かな1時間は判断力を保つ。ぜいたくではなく、実務的な利点だよ。"),
        line("Good company improves the quality of observation. People notice more when they feel safe.", "いい人との関係は観察の質を上げる。安心できると、人は多くに気づく。"),
      ],
      [
        line("A greeting establishes a relationship before it establishes a conclusion.", "挨拶は結論を出す前に、関係を作る。"),
        line("A question gathers information without pretending to know the answer.", "質問は、答えを知っているふりをせず情報を集められる。"),
        line("An invitation is a controlled risk with a potentially worthwhile outcome.", "誘いは管理可能なリスクで、価値ある結果になる可能性がある。"),
      ],
      [
        line("A mistake is evidence about the method. Examine that before judging the person.", "失敗は方法についての証拠だ。人を判断する前に、方法を検証しよう。"),
        line("Humor is effective when it changes the pressure without falsifying the facts.", "ユーモアは事実を曲げずに圧力を変えるなら有効だ。"),
        line("An unusual detail may be the most reliable part of the record.", "変わった細部が、記録の中で最も信頼できる部分かもしれない。"),
      ],
      [
        line("A change is acceptable when the new evidence justifies it.", "新しい証拠が正当化するなら、変更は受け入れられる。"),
        line("A plan should include contingencies. Reality has a poor record of cooperation.", "予定には代替案を含めるべきだ。現実は協力の実績が乏しいからね。"),
        line("A pause can be the responsible action when the variables are unclear.", "変数が不明確なとき、間を置くのは責任ある行動になり得る。"),
      ],
      [
        line("A familiar place reduces noise. That makes careful thinking easier.", "慣れた場所はノイズを減らす。慎重に考えやすくなる。"),
        line("Comfort is a condition, not a conclusion. It gives the work a better chance.", "快適さは結論ではなく条件だ。仕事がうまくいく可能性を上げてくれる。"),
        line("Distance is useful only if it improves the question, not if it avoids it.", "距離は質問をよくするなら有用で、避けるためだけなら意味がない。"),
      ],
    ],
  },
  caleb: {
    id: 'caleb',
    openers: [
      line("Tell me straight:", "率直に聞かせてくれ。"),
      line("One thing at a time:", "ひとつずついこう。"),
      line("Here is what matters to me:", "俺が大事だと思うのは、"),
      line("You do not need a perfect answer:", "完璧な答えじゃなくていい。"),
      line("Let us talk about the next step:", "次の一歩について話そう。"),
    ],
    promptTails: [
      line("Keep it simple. Tell me what holds up on a hard day.", "簡単でいい。きつい日に何が自分を支えるか、教えてくれ。"),
      line("That tells me what you are willing to put your name behind.", "それは、何に責任を持ちたいかを教えてくれる。"),
      line("We are looking for the next honest answer.", "ここでは、次の正直な答えを探せばいい。"),
      line("No one needs a speech here.", "ここでスピーチをする必要はない。"),
      line("The small choice is still a choice.", "小さな選択も、ちゃんと選択だ。"),
    ],
    replies: [
      [
        line("That is a good day. You do not have to make it bigger than that.", "それでいい日だ。これ以上、大きく見せなくていい。"),
        line("A quiet hour counts. Rest is part of the work.", "静かな1時間も意味がある。休むのも仕事の一部だ。"),
        line("Good people help you keep going. That matters more than a fancy plan.", "いい人は、進み続ける力をくれる。立派な予定より大事なことだ。"),
      ],
      [
        line("A simple hello gets the job started. That is enough.", "シンプルな挨拶で始めればいい。それで十分だ。"),
        line("Ask the question. You will learn more than you will lose.", "質問すればいい。失うものより、分かることの方が多い。"),
        line("An invitation takes some nerve. Good. Use it.", "誘うには少し度胸がいる。いいことだ。その度胸を使え。"),
      ],
      [
        line("A mistake is a mistake. It does not get to become your whole identity.", "失敗は失敗だ。それが君の人格全部になるわけじゃない。"),
        line("A good joke can give a tired room a little oxygen.", "いい冗談は、疲れた場に少し酸素を入れられる。"),
        line("Let people be different. The work gets better when everyone can show up.", "人には人の違いがある。それを出せる方が、仕事はうまくいく。"),
      ],
      [
        line("Take the new route if it gets you moving. You can adjust after.", "新しい道で進めるなら、まず行け。あとで調整すればいい。"),
        line("Make the plan, then do the next part. Not all ten parts tonight.", "予定を立てて、次の部分をやれ。今夜、10個全部やらなくていい。"),
        line("Take the pause. Then come back with one thing you can do.", "一度止まれ。そのあと、できることをひとつ持って戻ればいい。"),
      ],
      [
        line("A small café can be enough shelter for a hard day.", "小さなカフェで、きつい日をしのぐには十分なことがある。"),
        line("A familiar room lets you put your guard down. You need that sometimes.", "慣れた部屋では警戒を解ける。そういう時間も必要だ。"),
        line("A view gives you perspective. Keep the problem in its proper size.", "眺めは視野をくれる。問題を本来の大きさに戻せ。"),
      ],
      [
        line("You know what helps you stay in the fight. That is useful to know.", "自分がどうすれば踏ん張れるか、分かっている。それを知っておくのは大事だ。"),
        line("You do not need to earn rest by breaking yourself first.", "自分を壊すまで頑張らないと休めない、なんてことはない。"),
        line("Good people make hard work lighter. That is not weakness.", "いい人がいると厳しい仕事も軽くなる。それは弱さじゃない。"),
      ],
      [
        line("A place that lets you reset is worth protecting.", "自分を立て直せる場所は、守る価値がある。"),
        line("Home is where you can lower your shoulders.", "家は、肩の力を抜ける場所だ。"),
        line("Perspective helps. The problem still matters, but it does not own you.", "視野が助けになる。問題は大切でも、君を支配するものじゃない。"),
      ],
      [
        line("Say the hello and let the conversation do the rest.", "まず挨拶をしろ。あとは会話に任せればいい。"),
        line("Ask directly. Clear beats clever when something matters.", "まっすぐ聞け。大事なことでは、気の利いた言い方より明確さが勝つ。"),
        line("An invitation is a way to show up. Follow through.", "誘いは、そこに行く意思を見せることだ。最後までやれ。"),
      ],
      [
        line("You learned something. That puts the mistake to work.", "何かを学んだ。それなら、その失敗を役立てられる。"),
        line("Keep the joke if it helps people breathe. Drop it if it puts someone down.", "みんなが息をつける冗談なら残せ。誰かを下げるならやめろ。"),
        line("The person who stands out may be the one the team needs.", "目立つ人が、チームに必要な人かもしれない。"),
      ],
      [
        line("Change the route if it gets you closer to the goal.", "目標に近づくなら、道を変えろ。"),
        line("Make a plan you can actually carry. That is the plan that counts.", "実際に背負える予定を立てろ。それが意味のある予定だ。"),
        line("Take the minute. Then take the next step.", "1分止まれ。それから次の一歩を踏み出せ。"),
      ],
    ],
  },
  sloane: {
    id: 'sloane',
    openers: [
      line("Okay, first impression.", "よし、まずは第一印象から。"),
      line("Honest answer, good lighting optional:", "正直な答えで。照明はなくても大丈夫。"),
      line("I have a theory, but you get to correct me:", "私には仮説があるけど、訂正する権利はあなたにある。"),
      line("Let us put the pressure in its place:", "プレッシャーは、あるべき場所に置いて、"),
      line("Tell me what you actually want:", "本当は何が欲しいのか、教えて。"),
    ],
    promptTails: [
      line("The answer should fit your life, not someone else’s expectations.", "答えは誰かの期待ではなく、あなたの生活に合うべきだよ。"),
      line("There is a difference between being nice and abandoning your standards.", "優しくあることと、基準を捨てることは違うからね。"),
      line("I am interested in what makes you feel confident.", "何があなたに自信を与えるのか、気になっているの。"),
      line("We can make the honest option look possible.", "正直な選択を、できそうなものにしていけるよ。"),
      line("You do not have to shrink the answer to make it acceptable.", "受け入れてもらうために、答えを小さくしなくていい。"),
    ],
    replies: [
      [
        line("That is a strong choice. Rest can be very well styled, by the way.", "それは強い選択だね。ちなみに、休むこともとても素敵にできるよ。"),
        line("A quiet hour is not a blank space. It is room to choose your next move.", "静かな1時間は空白じゃない。次の一手を選ぶための余白だよ。"),
        line("Good company is the kind that makes you feel more capable, not smaller.", "いい人といると、自分が小さくなるのではなく、できることが増える感じがするよね。"),
      ],
      [
        line("A simple hello is clean, confident, and impossible to over-accessorize.", "シンプルな「やあ」は潔くて自信があって、飾りすぎようがない。"),
        line("A question shows attention. Attention is a much better accessory than approval.", "質問は相手を見ている証拠。承認より、注意深さの方がずっといいアクセサリーだよ。"),
        line("An invitation is a decision. I like people who make those on purpose.", "誘いは決断だよ。意識して決断できる人、好きだな。"),
      ],
      [
        line("A ridiculous mistake is just information in an unflattering outfit.", "ばかばかしい失敗は、似合わない服を着た情報にすぎないよ。"),
        line("A clever joke is good when it makes the room smarter, not crueler.", "気の利いた冗談は、場を意地悪にせず、賢くしてくれるならいいよね。"),
        line("Being wonderfully strange is often the beginning of being memorable.", "妙に変であることは、記憶に残ることの始まりだったりするよ。"),
      ],
      [
        line("Follow the new energy, then give it a deadline. Spontaneous can still be organized.", "新しい流れに乗って、それから期限を決めよう。自発的でも整理はできるからね。"),
        line("A plan is a strategy, not a personality test. Revise it without apologizing.", "予定は戦略であって、人格診断じゃない。謝らずに修正していいよ。"),
        line("A pause is a choice. Do not let anyone sell it to you as failure.", "立ち止まるのも選択。誰かに失敗だと売りつけさせないで。"),
      ],
      [
        line("A small café has atmosphere, snacks, and usually a flattering mirror. Strong option.", "小さなカフェには雰囲気とおやつ、それにたいてい映える鏡がある。かなり強い選択。"),
        line("A familiar room lets you stop auditioning. You do not need to perform all day.", "慣れた部屋では、オーディションをやめられる。ずっと演じなくていいんだよ。"),
        line("A view gives the problem better composition. Sometimes that is where the answer starts.", "眺めは問題の構図を整えてくれる。答えはそこから始まることもあるよ。"),
      ],
      [
        line("Wanting a good day is not high maintenance. It is useful data.", "いい日を望むのは面倒なことじゃないよ。自分に必要なものが分かる、大事なデータだから。"),
        line("A quiet hour can be a reset, not a retreat.", "静かな1時間は、逃げることじゃなくてリセットになるよ。"),
        line("Choose people who celebrate your momentum instead of managing it.", "あなたの勢いを管理しようとせず、一緒に喜んでくれる人を選んでね。"),
      ],
      [
        line("Send the message with a clear point. Mystery is not a communication strategy.", "要点をはっきりさせてメッセージを送ろう。曖昧さはコミュニケーション戦略じゃないから。"),
        line("If you want an invitation, make it specific enough to say yes to.", "誘いたいなら、相手が「うん」と言えるくらい具体的にして。"),
        line("Attention is earned by presence, not performance.", "注目は演技じゃなく、そこにいることで得るものだよ。"),
      ],
      [
        line("Failure is feedback, but please do not turn it into a brand identity.", "失敗はフィードバック。でも、それを自分のブランドにしないでね。"),
        line("Humor works best when everyone leaves the room a little taller.", "ユーモアは、そこにいる全員が少し自信を持って帰れるときにいちばん効くよ。"),
        line("Different is an advantage if you know how to frame it.", "違いは、見せ方を知っていれば強みになるから。"),
      ],
      [
        line("Change the plan when the evidence changes. That is strategy, not inconsistency.", "状況が変わったら予定も変えよう。それは気まぐれじゃなくて戦略だよ。"),
        line("Make the calendar serve your life, not replace it.", "カレンダーを人生の代わりにしないで。人生のために使うものだから。"),
        line("Protect the pause before someone else fills it for you.", "誰かに埋められる前に、立ち止まる時間を守ってね。"),
      ],
      [
        line("A good café has ambience and an exit plan. I support both.", "いいカフェには雰囲気と、帰る計画の両方がある。私はどっちも支持するよ。"),
        line("Home is where the standards can relax without disappearing.", "家は、基準をなくさずに少しだけ力を抜ける場所だよ。"),
        line("Perspective is the fastest way to make an overdramatic problem behave.", "視点を変えると、大げさになった問題もいちばん早く落ち着くから。"),
      ],
    ],
  },
  victoria: {
    id: 'victoria',
    openers: [
      line("Start with the useful detail.", "役に立つ細部から始めましょう。"),
      line("Let us remove the unnecessary drama:", "不要なドラマは省きましょう。"),
      line("I want the useful answer:", "役に立つ答えが欲しいわ。"),
      line("A concise question:", "簡潔に聞くわ。"),
      line("The distinction matters here:", "ここでは、その違いが重要よ。"),
    ],
    promptTails: [
      line("The useful distinction is what you actually want.", "役に立つ区別は、あなたが実際に何を望むかよ。"),
      line("Do not confuse a familiar answer with a good one.", "慣れた答えと、よい答えを混同しないで。"),
      line("We can work with a precise answer.", "正確な答えがあれば、こちらで扱えるわ。"),
      line("There is no prize for unnecessary explanation.", "不要な説明に賞は出ないわ。"),
      line("The choice should serve the outcome.", "選択は結果のためにあるべきよ。"),
    ],
    replies: [
      [
        line("Good. You identified what actually restores you.", "いいわ。本当に回復させるものを把握している。"),
        line("A quiet hour is productive if it keeps you functional tomorrow.", "明日も機能できるなら、静かな1時間は十分に生産的よ。"),
        line("Good company is valuable. Choose it carefully.", "いい人といる時間は価値がある。選びなさい。"),
      ],
      [
        line("Clear. No unnecessary ornament.", "明確ね。余計な装飾がない。"),
        line("A question moves the conversation forward. That is the point.", "質問は会話を前へ進める。それが要点よ。"),
        line("An invitation creates an obligation to be present. Do not make it casually.", "誘いには、その場にいる責任が生まれる。軽く扱わないことね。"),
      ],
      [
        line("A mistake can be useful. Only if you examine it instead of decorating it.", "失敗は役に立つ。ただし、飾らず検証するならね。"),
        line("Clever is acceptable. Cruel is inefficient.", "賢さは結構。意地悪は非効率よ。"),
        line("Unusual is often where the value is. Do not edit it out too quickly.", "変わった部分に価値があることは多い。早々に削らないことね。"),
      ],
      [
        line("Take the new route if it improves the outcome.", "結果がよくなるなら、新しい道を選びなさい。"),
        line("Make a plan. Then revise it when reality provides better information.", "予定を立てて。現実がよりよい情報をくれたら修正するの。"),
        line("Pause. A decision made while depleted is rarely a good one.", "止まりなさい。消耗した状態の決断は、たいてい良くない。"),
      ],
      [
        line("A small café can be useful. It has boundaries, a chair, and usually coffee.", "小さなカフェは有用ね。境界線と椅子、それにたいていコーヒーがある。"),
        line("Familiarity reduces unnecessary cognitive work. Keep it.", "慣れは余計な認知負荷を減らす。残しておきなさい。"),
        line("A view provides scale. Use it before declaring a crisis.", "眺めは尺度をくれる。危機だと決める前に使いなさい。"),
      ],
      [
        line("Good. That is sustainable, not indulgent.", "いいわ。持続できる選択であって、ぜいたくではない。"),
        line("Rest is an input. Without it, your judgment deteriorates.", "休息は入力よ。それがなければ判断力が落ちる。"),
        line("The right people reduce noise. Keep them close.", "適切な人間関係は雑音を減らす。近くに置きなさい。"),
      ],
      [
        line("Begin plainly. Precision earns attention.", "簡潔に始めなさい。正確さが注意を引く。"),
        line("Ask for the information you need. Guessing is inefficient.", "必要な情報を尋ねなさい。推測は非効率よ。"),
        line("An invitation should have a time, a place, and a reason.", "誘いには、時間と場所と理由が必要よ。"),
      ],
      [
        line("Record the error. Correct the process. Continue.", "誤りを記録しなさい。手順を直して、続けるの。"),
        line("Humor is useful when it clarifies the room, not when it creates casualties.", "ユーモアは場を明るくするなら有用。犠牲者を出すなら不要よ。"),
        line("Difference is not a defect. It is information.", "違いは欠陥ではない。情報よ。"),
      ],
      [
        line("Change course when the facts warrant it. That is not a failure.", "事実がそう求めるなら進路を変えなさい。それは失敗ではない。"),
        line("Prioritize the few actions that materially change the outcome.", "結果を実際に変える行動を、少数に絞りなさい。"),
        line("Stop before exhaustion compromises the decision.", "消耗が判断を損なう前に、止まりなさい。"),
      ],
      [
        line("A café is a bounded environment. That is one of its advantages.", "カフェは範囲の決まった環境よ。そこが利点のひとつね。"),
        line("Home should reduce friction. If it does not, revise the arrangement.", "家は摩擦を減らす場所であるべき。そうでないなら配置を見直しなさい。"),
        line("Scale prevents melodrama. Establish it before reacting.", "尺度があれば、話を大げさにせずに済む。反応する前に確かめなさい。"),
      ],
    ],
  },
  elodie: {
    id: 'elodie',
    openers: [
      line("Tell me, softly:", "そっと教えて。"),
      line("I was noticing the light on a window and thought of this:", "窓に落ちる光を見ていて、これを思ったの。"),
      line("A small question can open a large room:", "小さな質問が、大きな部屋を開くことがあるから、"),
      line("No hurry. I am listening:", "急がなくていいよ。聞いているから、"),
      line("Perhaps the gentle answer is:", "もしかすると、やさしい答えは、"),
    ],
    promptTails: [
      line("I wonder what color the answer has in your mind.", "あなたの心の中で、その答えは何色をしているのかな。"),
      line("Small preferences often keep the memory of a day.", "小さな好みが、一日の記憶を守ってくれることがあるね。"),
      line("You may answer with a feeling, if that is clearer.", "その方が分かりやすければ、気持ちで答えてもいいよ。"),
      line("I like the details that arrive quietly.", "静かに届く細部が好きなの。"),
      line("Perhaps the answer is holding a little light.", "もしかすると、その答えは小さな光を抱えているのかもしれないね。"),
    ],
    replies: [
      [
        line("That kind of day has a soft color. I understand why you would keep it.", "そういう日は、やわらかな色をしているね。大切にしたくなるのが分かるよ。"),
        line("A quiet hour is not empty. It is where small thoughts can breathe.", "静かな1時間は空っぽじゃない。小さな考えが息をできる場所だよ。"),
        line("Good company makes even an ordinary table feel warm.", "いい人といると、普通のテーブルまで温かく感じるね。"),
      ],
      [
        line("A simple hello is a little light left on for someone.", "シンプルな「やあ」は、誰かのために小さな明かりをつけておくことみたい。"),
        line("A question is a way of placing a chair beside another person.", "質問は、誰かの隣に椅子を置くようなものだね。"),
        line("An invitation gives the day a door handle.", "誘いがあると、その日にドアノブがつくみたい。"),
      ],
      [
        line("A ridiculous mistake can become a tiny story you carry with affection.", "ばかばかしい失敗も、愛着を持って運べる小さな物語になるね。"),
        line("A clever joke changes the air for a moment. That is a small kindness.", "気の利いた冗談は、一瞬だけ空気を変える。それは小さな親切だよ。"),
        line("Someone wonderfully strange leaves a different shape in the room.", "妙に変で素敵な人は、部屋に違う形の記憶を残していくね。"),
      ],
      [
        line("The new energy may be a breeze. You do not have to know where it ends to follow it.", "新しい流れは風かもしれない。どこで終わるか知らなくても、乗っていいんだよ。"),
        line("A plan can be a little envelope for a hope. It need not be sealed forever.", "予定は希望を入れる小さな封筒みたい。永遠に封をする必要はないよ。"),
        line("A pause lets the heart catch up with the day.", "間を置くと、心が一日に追いつけることがあるね。"),
      ],
      [
        line("A small café can hold a whole afternoon in the smell of coffee.", "小さなカフェは、コーヒーの香りの中に午後全体を入れておけるね。"),
        line("A familiar room knows where your quiet belongs.", "慣れた部屋は、あなたの静けさがどこにあるか知っている。"),
        line("A view lets a thought travel without asking you to leave yet.", "眺めがあれば、まだ出発しなくても考えを旅させられるよ。"),
      ],
      [
        line("Perhaps a good day is the one with warmth at its edges.", "もしかすると、いい日は縁に温かさがある日なのかもしれないね。"),
        line("Rest is a little garden where the heart can grow quiet again.", "休息は、心がもう一度静かに育つ小さな庭みたい。"),
        line("Good company leaves a warm place in the room after it goes.", "いい人と過ごしたあとは、その人が帰っても部屋に温かい場所が残るね。"),
      ],
      [
        line("Say hello as if opening a window.", "窓を開けるみたいに、「こんにちは」と言ってみて。"),
        line("A question is a small bridge placed gently between two people.", "質問は、二人のあいだにそっと置く小さな橋みたい。"),
        line("An invitation gives the day a little handle to hold.", "誘いがあると、その日にそっとつかめる取っ手がつくね。"),
      ],
      [
        line("A mistake can become a story you carry with tenderness.", "失敗も、やさしさを持って運べる物語になることがあるよ。"),
        line("A joke can be a small lantern if it leaves the air kinder.", "冗談は、空気をやさしくするなら小さなランタンになれるね。"),
        line("Strange people leave windows where ordinary walls used to be.", "妙に変な人は、普通の壁があった場所に窓を残していくね。"),
      ],
      [
        line("Follow the breeze. You do not need to know its whole journey.", "風に乗ってみて。その旅の全部を知らなくてもいいんだよ。"),
        line("Plans should have soft corners, so hope can fit inside them.", "予定には柔らかな角があるといいね。そうすれば希望が中に入れるから。"),
        line("A pause lets the sounds of the day settle into their places.", "間を置くと、一日の音がそれぞれの場所に落ち着いていくよ。"),
      ],
      [
        line("A café gathers little sounds and makes them feel like a day.", "カフェは小さな音を集めて、それを一日のように感じさせてくれるね。"),
        line("Home is the room that remembers your unhurried face.", "家は、急いでいないあなたの顔を覚えている部屋だよ。"),
        line("Perspective is a window that lets a difficult thought breathe.", "視点は、難しい考えに息をさせる窓みたいなものだね。"),
      ],
    ],
  },
  blair: {
    id: 'blair',
    openers: [
      line("I want the honest version.", "正直な答えが欲しいの。"),
      line("I need the honest version, not the polished one:", "磨き上げた答えではなく、正直な方が欲しいの。"),
      line("Before you say it does not matter:", "「どうでもいい」と言う前に、"),
      line("We can make this better:", "これはもっとよくできる。だから、"),
      line("Tell me what you intended:", "何を意図していたのか、教えて。"),
    ],
    promptTails: [
      line("I am interested in the intention behind the choice.", "その選択の背後にある意図に興味があるの。"),
      line("Do not give me the answer that sounds most impressive.", "いちばん立派に聞こえる答えを出さなくていい。"),
      line("A preference can reveal a standard.", "好みは、基準を明らかにすることがある。"),
      line("We can be honest without being careless.", "雑にならずに、正直でいられるから。"),
      line("The best answer is the one you can defend to yourself.", "いちばんよい答えは、自分自身に説明できる答えよ。"),
    ],
    replies: [
      [
        line("Good. You know what makes a day feel worth having.", "いいわ。どんな日なら価値があるか、分かっているのね。"),
        line("A quiet hour is not a failure of ambition. It is maintenance for the person with the ambition.", "静かな1時間は野心の失敗ではない。野心を持つ人のメンテナンスよ。"),
        line("Good company should make you feel chosen, not merely included.", "いい人間関係は、ただ含まれるのではなく、選ばれていると感じさせるものよ。"),
      ],
      [
        line("A simple hello is elegant. It does not beg for attention.", "シンプルな「やあ」は洗練されている。注目を乞わないから。"),
        line("A question reveals intention. I prefer people who have one.", "質問は意図を見せる。意図のある人の方が好きね。"),
        line("An invitation is a small risk. Make it worth accepting.", "誘いは小さなリスクよ。受ける価値のあるものにして。"),
      ],
      [
        line("A ridiculous mistake is forgivable. Pretending it was deliberate is less charming.", "ばかばかしい失敗は許せる。意図していたふりをする方が、魅力的ではないわ。"),
        line("A clever joke should have precision, not casualties.", "気の利いた冗談には正確さが必要で、犠牲者は要らない。"),
        line("Wonderful strangeness is memorable. Blandness is much harder to defend.", "妙に変で素敵なところは記憶に残る。無難さの方が、よほど擁護しにくいわ。"),
      ],
      [
        line("Follow the new energy, but do not surrender your standards at the door.", "新しい流れには乗って。でも、玄関で基準を置いてこないで。"),
        line("A plan is useful when it serves you. It is not a moral obligation.", "予定はあなたの役に立つなら有用。守ること自体が道徳的義務ではないわ。"),
        line("A pause is strategic. Anyone calling it weakness is revealing their own insecurity.", "立ち止まるのは戦略よ。弱さと呼ぶ人は、自分の不安を見せているだけ。"),
      ],
      [
        line("A small café can be perfectly composed and still feel alive. That is the standard.", "小さなカフェは整っていて、それでも生きていられる。基準はそこね。"),
        line("A familiar room is where you can stop auditioning for affection.", "慣れた部屋では、愛されるためのオーディションをやめられる。"),
        line("A view gives a problem better perspective. Even a difficult scene needs composition.", "眺めは問題によりよい視点を与える。難しい場面にも構図は必要よ。"),
      ],
      [
        line("That is a very defensible choice. I would make it look intentional.", "それは十分に擁護できる選択ね。意図したものに見せればいいわ。"),
        line("Rest is part of maintaining standards. Exhaustion is not a personality.", "休むのは基準を保つための一部。疲労は個性ではないわ。"),
        line("The right friends do not compete with your light. They know how to stand beside it.", "本当の友人はあなたの光と競わない。その隣に立つ方法を知っているの。"),
      ],
      [
        line("Say hello. Make the intention obvious; confusion is terribly unflattering.", "挨拶して。意図は明確にね。混乱はひどく格好が悪いから。"),
        line("Ask the question you came to ask. Evasion is not sophistication.", "聞きたかったことを聞きなさい。はぐらかすのは洗練ではないわ。"),
        line("If you are inviting someone, give them a reason to want the evening.", "誰かを誘うなら、その夜を楽しみたくなる理由を用意して。"),
      ],
      [
        line("Own the mistake before someone else gives it a worse storyline.", "誰かがもっと悪い物語にする前に、その失敗は自分のものだと認めなさい。"),
        line("Humor should land cleanly. If it needs a victim, it needs editing.", "ユーモアはきれいに着地させて。犠牲者が必要なら、編集が必要よ。"),
        line("Being unusual is an asset. Wasting it to appear agreeable is not.", "人と違うことは資産よ。好かれようとして無駄にするのは違うわ。"),
      ],
      [
        line("Change the plan when the room changes. Adaptation can still be elegant.", "場が変わったら予定も変えなさい。適応だって優雅にできるわ。"),
        line("Keep a plan, but leave one graceful exit for reality.", "予定は持って。でも、現実のために優雅な出口をひとつ残しておくの。"),
        line("Pausing lets you choose the next move instead of performing a reaction.", "立ち止まれば、反応を演じるのではなく次の一手を選べるわ。"),
      ],
      [
        line("A café needs a point of view. Otherwise it is only furniture and coffee.", "カフェには視点が必要よ。そうでなければ家具とコーヒーがあるだけ。"),
        line("Home is where the performance ends and the real standards remain.", "家は演技が終わり、本当の基準だけが残る場所ね。"),
        line("Perspective keeps a difficult scene from becoming your entire identity.", "視点があれば、難しい場面があなたの人格全部にはならないわ。"),
      ],
    ],
  },
};

const joinPromptParts = (...parts: Line[]): Line => [
  parts.map(([english]) => english.trim()).filter(Boolean).join(' ').replace(/—\s+/g, '—'),
  parts.map(([, japanese]) => japanese.trim()).filter(Boolean).join(' ').replace(/—\s+/g, '—'),
];

const makeRounds = (voice: VoiceProfile): ConversationRound[] => topics.map(([question, choices], index) => {
  const opener = voice.openers[index % voice.openers.length];
  const promptTail = voice.promptTails[index % voice.promptTails.length];
  const responseSet = voice.replies[index % voice.replies.length];
  const promptParts: Line[] = [];
  if (index === 0) promptParts.push(opener);
  if (index > 0) promptParts.push(promptTail);
  promptParts.push(question);
  const prompt = joinPromptParts(...promptParts);
  const roundId = voice.id + '-' + String(index + 1).padStart(2, '0');

  return {
    id: roundId,
    promptEnglish: prompt[0],
    promptJapanese: prompt[1],
    isCustom: true,
    choices: choices.map((choice, choiceIndex) => ({
      id: roundId + '-' + String(choiceIndex + 1),
      english: choice[0],
      japanese: choice[1],
      responseEnglish: responseSet[choiceIndex][0],
      responseJapanese: responseSet[choiceIndex][1],
    })),
  };
});

export const conversationGroup7: ConversationGroup = {
  milo: makeRounds(voiceProfiles.milo),
  clara: makeRounds(voiceProfiles.clara),
  arthur: makeRounds(voiceProfiles.arthur),
  leo: makeRounds(voiceProfiles.leo),
  julian: makeRounds(voiceProfiles.julian),
  declan: makeRounds(voiceProfiles.declan),
  elias: makeRounds(voiceProfiles.elias),
  adrian: makeRounds(voiceProfiles.adrian),
  caleb: makeRounds(voiceProfiles.caleb),
  sloane: makeRounds(voiceProfiles.sloane),
  victoria: makeRounds(voiceProfiles.victoria),
  elodie: makeRounds(voiceProfiles.elodie),
  blair: makeRounds(voiceProfiles.blair),
};
