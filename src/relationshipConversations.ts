import type { CharacterId, PhotoAttachment } from './design';
import type { ConversationChoice, ConversationRound } from './conversationsTypes';
import { getCharacterReaction } from './characterConversationVoices';

export type UserGender = 'male' | 'female';
export type ConversationHistory = readonly (string | undefined)[];
export const RELATIONSHIP_ROUND_COUNT = 32;

type Line = { en: string; ja: string };
type Triple = readonly [Line, Line, Line];
type Seed = {
  focus: Line;
  opening: Line;
  memory: Line;
  branch: Triple;
  photo: PhotoAttachment;
  photoFollowup: Line;
  photoBranch: Triple;
  goodnight: Line;
  invite: Line;
};
type Route = Seed & { relation: Line };
type BlueprintSeed = {
  opening: Line;
  memory: Line;
  focus: Line;
  photo: PhotoAttachment;
  photoFollowup: Line;
  goodnight: Line;
  invite: Line;
};

const l = (en: string, ja: string): Line => ({ en, ja });
const p = (emoji: string, sceneEnglish: string, sceneJapanese: string, detailEnglish: string, detailJapanese: string, accent: string): PhotoAttachment => ({
  emoji,
  sceneEnglish,
  sceneJapanese,
  detailEnglish,
  detailJapanese,
  accent,
});

function pair(relation: Line, male: Seed, female: Seed): Record<UserGender, Route> {
  return {
    male: { relation, ...male },
    female: { relation, ...female },
  };
}

function expand(source: BlueprintSeed): Seed {
  return {
    ...source,
    branch: [
      l("You noticed the part about " + source.focus.en.toLowerCase() + ".", "「" + source.focus.ja + "」の部分に気づいたね。"),
      l("That is exactly where the story gets interesting: " + source.focus.en.toLowerCase() + ".", "まさに「" + source.focus.ja + "」のところが、話の面白くなる場所。"),
      l("Keep that thought close. It may matter more than the obvious answer.", "その考えはそばに置いておこう。分かりやすい答えより大事かもしれない。"),
    ],
    photoBranch: [
      l("The picture makes " + source.focus.en.toLowerCase() + " feel close enough to touch.", "写真を見ると、「" + source.focus.ja + "」が触れられそうなくらい近く感じる。"),
      l("I wanted you to see " + source.focus.en.toLowerCase() + " before the moment changed.", "「" + source.focus.ja + "」が変わる前に、君に見せたかった。"),
      l("Save this little scene. We can come back to " + source.focus.en.toLowerCase() + " later.", "この小さな場面は残しておこう。あとで「" + source.focus.ja + "」に戻れるから。"),
    ],
  };
}

const b = (
  opening: Line,
  memory: Line,
  focus: Line,
  photo: PhotoAttachment,
  photoFollowup: Line,
  goodnight: Line,
  invite: Line,
): BlueprintSeed => ({ opening, memory, focus, photo, photoFollowup, goodnight, invite });

const relationshipBlueprints: Record<CharacterId, { relation: Line; male: BlueprintSeed; female: BlueprintSeed }> = {
  jack: {
    relation: l("The friend who turns an ordinary errand into a story and never lets an awkward silence last too long.", "普通の用事まで物語に変え、気まずい沈黙を長引かせない友人。"),
    male: b(
      l("I passed the diner where we hid from the rain. It made me wonder if you are still collecting small disasters.", "雨宿りしたダイナーの前を通った。まだ小さな災難を集めてるのかなって思った。"),
      l("You made that soaked subway ride feel like a good decision. I still think about it when I take the wrong train.", "びしょ濡れの地下鉄を正しい選択みたいにしてくれた。今でも乗り間違えると思い出す。"),
      l("the wrong train", "乗り間違えた電車"),
      p("🥪", "Park bench lunch", "公園のベンチでランチ", "I found a sunny bench and made lunch out of whatever was left in the fridge.", "日なたのベンチを見つけて、冷蔵庫に残っていたものでランチにした。", "#6F5B9B"),
      l("The sandwich is less tragic than it looks. The bread has character.", "見た目ほどひどいサンドイッチじゃない。パンに個性がある。"),
      l("I am heading home before I turn this into another accidental adventure. Goodnight, okay?", "また偶然の冒険にする前に帰るよ。おやすみ、いい？"),
      l("There is a tiny film screening Thursday. Come with me and pretend we planned it.", "木曜に小さな上映会がある。一緒に来て、計画してたことにしよう。"),
    ),
    female: b(
      l("I passed the tiny cinema where we argued about the ending. You were right, annoyingly.", "あの結末について議論した小さな映画館の前を通った。悔しいけど、君が正しかった。"),
      l("That walk home with the dead phone battery was one of my favorite nights. We did not know where we were going and somehow got home.", "スマホの電池が切れたあの帰り道、好きな夜の一つ。どこへ向かっているか分からないのに、なぜか帰れた。"),
      l("the dead phone battery", "切れたスマホの電池"),
      p("🎞️", "Old cinema lobby", "古い映画館のロビー", "The old poster is still there. I took a picture before the staff changed it.", "古いポスターがまだあった。スタッフが替える前に撮った。", "#8E5F58"),
      l("The picture came out crooked, but that feels honest for us.", "写真は少し曲がったけど、僕ららしくて正直な感じがする。"),
      l("I should sleep before I start another midnight walk. Goodnight, you.", "また真夜中の散歩を始める前に寝る。おやすみ。"),
      l("I found a street I have never walked down. Saturday, we investigate?", "まだ歩いたことのない通りを見つけた。土曜、調査しない？"),
    ),
  },
  emma: {
    relation: l("The friend who remembers the exact thing you said three weeks ago, including the part you thought nobody noticed.", "3週間前に君が言ったことを、誰も気づかなかった部分まで覚えている友人。"),
    male: b(
      l("I found the book you left at the art centre. The page you marked is still making me think.", "アートセンターに置いていった本を見つけた。君が印をつけたページが、まだ私に考えさせてる。"),
      l("You brought soup when I was sick and pretended it was only because you had made too much. I knew better.", "私が具合を悪くしたとき、作りすぎたからと言ってスープを持ってきてくれた。違うって分かってた。"),
      l("the soup you pretended was extra", "作りすぎたふりをしたスープ"),
      p("🍲", "Soup on the kitchen table", "キッチンのテーブルのスープ", "I made the soup we argued about, and yes, I added the lemon this time.", "前に議論したスープを作った。今回はちゃんとレモンを入れた。", "#8C6B58"),
      l("It is the kind of lunch that makes a noisy day feel manageable.", "騒がしい日を、なんとかできそうな日に変えてくれるランチ。"),
      l("I have an early programme tomorrow. Sleep well, and do not overthink the last thing you said.", "明日は早いプログラムがある。よく寝て、最後に言ったことを考えすぎないで。"),
      l("There is a small exhibition opening this weekend. I saved the quietest hour for us.", "週末に小さな展示のオープニングがある。一番静かな時間を取っておいた。"),
    ),
    female: b(
      l("I passed the market where we bought the too-sweet pastries. I still think one of us should have stopped at two.", "甘すぎる焼き菓子を買ったマーケットの前を通った。二つで止めるべきだったと思う。"),
      l("You stayed after the gallery closed because I was worrying about one visitor's reaction. That meant more than I said.", "ギャラリーが閉まったあとも、私が来場者の反応を気にしていたから残ってくれた。言えなかったけど、嬉しかった。"),
      l("the pastry we should have stopped buying", "買うのを止めるべきだった焼き菓子"),
      p("🥐", "Market breakfast", "マーケットの朝食", "I found the pastry stand again. I took the less dramatic one this time.", "あの焼き菓子の屋台をまた見つけた。今回は少し控えめなものにした。", "#6D7F63"),
      l("I thought of you when the vendor wrapped it carefully. Some people make care look easy.", "店の人が丁寧に包むのを見て、君を思い出した。気遣いを自然にできる人っているよね。"),
      l("I have an early programme tomorrow. Do not solve the whole week tonight. Goodnight.", "明日は早いプログラム。今夜、一週間全部を解決しないで。おやすみ。"),
      l("Come to the reading group with me. You can sit near the door and leave whenever you need.", "読書会に一緒に来て。ドアの近くに座って、必要ならいつでも帰っていい。"),
    ),
  },
  oliver: {
    relation: l("The friend who finds the exact word, remembers your preference, and shows care through small practical fixes.", "正確な言葉を探し、好みを覚え、実務的な小さな行動で気遣いを示す友人。"),
    male: b(
      l("I was near the station we argued about. The bench is still badly placed, if you are interested in being correct again.", "前に議論した駅の近くにいた。あのベンチはまだ配置が悪い。もう一度正しくなりたいなら知らせて。"),
      l("You left your umbrella at my desk when I forgot mine. You did not make a performance of it. I noticed.", "私が傘を忘れたとき、自分の傘を机に置いてくれた。大げさにしなかった。でも気づいていたよ。"),
      l("the badly placed bench", "配置の悪いベンチ"),
      p("☕", "Tea by a rainy window", "雨の窓辺の紅茶", "Rain has made the street look like a badly edited photograph. The tea is better.", "雨のせいで通りが編集の下手な写真みたいだ。紅茶の方はいい。", "#526E7A"),
      l("I brought the good book, the one with the irritatingly precise ending.", "あの、結末が妙に正確で気に障る本を持ってきた。"),
      l("Enough words for one evening. Goodnight. I will reply properly tomorrow.", "今夜はこれで十分だ。おやすみ。明日、きちんと返事をする。"),
      l("There is a bookshop with a tolerable tea room on Sunday. I have checked the route.", "日曜に、許容できるティールームのある本屋へ行かないか。経路は確認済み。"),
    ),
    female: b(
      l("I passed the bookshop where you made me admit the ending was sentimental. I maintain that the author was at fault.", "君に結末が感傷的だと認めさせられた本屋の前を通った。作者が悪いという主張は変えない。"),
      l("When I was overwhelmed, you found a quiet table and sat there. You did not offer a speech. It was useful.", "私がいっぱいいっぱいだったとき、静かな席を見つけてただ座っていた。演説をしなかった。それが助けになった。"),
      l("the sentimental ending", "感傷的な結末"),
      p("📚", "Bookshop window", "本屋の窓", "The ridiculous novel is in the window again. It appears to have survived.", "あの呆れた小説がまた窓に飾られている。どうやら生き残ったらしい。", "#6D5B48"),
      l("I took a picture for the record. You may criticise the framing.", "記録のために写真を撮った。構図は批判してくれていい。"),
      l("The small cup is empty. That is my cue to stop. Goodnight.", "小さなカップが空になった。やめる合図だ。おやすみ。"),
      l("I am going to the bookshop Saturday. You may come, provided you do not rearrange the shelves.", "土曜に本屋へ行く。棚を並べ替えないなら来てもいい。"),
    ),
  },
  noah: {
    relation: l("The friend who sends three jokes, fixes the actual problem, and admits he was worried only after the room feels safe.", "冗談を三つ送ってから問題を直し、安全だと感じてから心配していたと認める友人。"),
    male: b(
      l("My laptop just made the noise it makes before betraying me. Remember when you said I should back everything up?", "ノートパソコンが裏切る前に出す音を出した。全部バックアップしろって言ってたの、覚えてる？"),
      l("You stayed on a video call at 2 a.m. while I rebuilt the project. You were half asleep, but you did not dip.", "午前2時、僕がプロジェクトを作り直す間通話にいてくれた。眠そうだったのに落ちなかった。"),
      l("the laptop betrayal", "ノートパソコンの裏切り"),
      p("🍟", "Late-night drive-thru", "深夜のドライブスルー", "Emergency fries acquired. The project is still broken, but morale has a chance.", "緊急用のフライドポテトを確保。プロジェクトは壊れたままだけど、士気はまだ戦える。", "#98644F"),
      l("I am calling this a debugging snack, which makes it legally important.", "これはデバッグ用スナック。だから法的に重要。"),
      l("I am logging off before I invent a fourth solution that makes it worse. Night.", "さらに悪化させる四つ目の解決策を発明する前にログオフする。おやすみ。"),
      l("Come to the diner later. I need a human witness while I pretend this bug is funny.", "あとでダイナーに来て。バグを面白がるふりをする人間の証人が必要。"),
    ),
    female: b(
      l("The AV room is making the exact error that ruined our first campus event. I blame the cables and maybe the moon.", "AV室が最初の学内イベントを壊したのと同じエラーを出してる。ケーブルと、たぶん月のせい。"),
      l("You brought me coffee during that all-nighter and did not ask me to be less dramatic. That was elite friendship behavior.", "徹夜のときコーヒーを持ってきて、僕に大げさになるなと言わなかった。最高の友達ムーブだった。"),
      l("the angry AV cables", "怒っているAVケーブル"),
      p("🎛️", "AV room chaos", "AV室の混乱", "A nest of cables, one working monitor, and the coffee you told me not to spill.", "絡まったケーブル、動くモニター一台、こぼすなと言われたコーヒー。", "#4F7084"),
      l("I fixed the obvious thing and am now avoiding the mysterious blinking light.", "明らかなところは直した。今は謎の点滅を避けてる。"),
      l("I am going to sleep before the cables develop opinions. Night, seriously.", "ケーブルが意見を持つ前に寝る。ほんとに、おやすみ。"),
      l("Late diner run? The only crisis will be pancakes versus fries.", "深夜のダイナー行く？危機はパンケーキとポテトのどちらかだけ。"),
    ),
  },
  alex: {
    relation: l("The friend who uses music and coffee to make an ordinary day feel intentional, even when he is quietly tired.", "音楽とコーヒーで普通の日に意味を持たせる。静かに疲れていても、それを見せない友人。"),
    male: b(
      l("I heard the song we played after that terrible venue shift. It still makes cleanup feel almost glamorous.", "ひどい会場仕事のあとに聴いた曲が流れた。今でも片づけが少し華やかに感じる。"),
      l("You stayed while I packed cables. We ended up talking in the empty room longer than we watched the band.", "僕がケーブルを片づける間残ってくれた。バンドを見た時間より、空の会場で話した時間の方が長かった。"),
      l("the song after the terrible shift", "ひどい仕事のあとに聴いた曲"),
      p("☕", "Coffee and a record", "コーヒーとレコード", "The café put on the old record we argued about. I took the corner table.", "議論した古いレコードがカフェで流れてる。角の席を取った。", "#805E58"),
      l("The coffee is better than last time, which is a low bar but still a victory.", "コーヒーは前よりいい。基準は低いけど、それでも勝利。"),
      l("I am calling it before I make another playlist for a feeling I cannot name. Goodnight.", "名前のない感情のプレイリストをまた作る前に切り上げる。おやすみ。"),
      l("There is a small show Friday. Good sound, no huge crowd, and a café nearby.", "金曜に小さなライブがある。音がよく、人が多すぎず、近くにカフェもある。"),
    ),
    female: b(
      l("The venue is quiet before soundcheck. It reminded me of the night you got lost backstage and acted like it was planned.", "サウンドチェック前の会場が静かだ。君が楽屋裏で迷って、計画通りみたいに振る舞った夜を思い出した。"),
      l("You sent me a song when I was too busy to ask for company. I listened after the shift, and it did the job.", "忙しすぎて誰かにいてほしいと言えなかったとき、曲を送ってくれた。仕事のあとに聴いて、ちゃんと届いた。"),
      l("the lost backstage route", "迷い込んだ楽屋裏の道"),
      p("🎚️", "Empty venue before soundcheck", "サウンドチェック前の空の会場", "The room is empty and the stage lights are low. It is the best part of the day.", "会場は空で、ステージの照明は低い。ここが一日の中で一番好きな時間。", "#536A7C"),
      l("I saved the good seat for later, though I am pretending that was accidental.", "あとでいい席を取っておいた。偶然のふりをしてるけど。"),
      l("I am done for the night. Put on something good and sleep. Goodnight.", "今夜はここまで。いい曲をかけて寝て。おやすみ。"),
      l("Come to soundcheck Saturday. It is quiet then, and I think you would like the room.", "土曜のサウンドチェックに来て。静かで、君はこの会場を気に入ると思う。"),
    ),
  },
  liam: {
    relation: l("The friend who tells the truth plainly, makes tea before giving advice, and never treats a hard day like a moral failure.", "率直に本当のことを言い、助言の前に紅茶を淹れ、つらい日を人格の失敗にしない友人。"),
    male: b(
      l("I passed the bus stop where we waited in the rain and decided optimism was not a transport strategy.", "雨の中で待って、楽観は交通手段じゃないと悟ったバス停を通った。"),
      l("You came to the community gig even though you knew nobody there. That was brave in the quiet sort of way.", "誰も知り合いがいない地域のライブに来てくれた。静かな意味で勇気があった。"),
      l("the bus stop with no useful timetable", "役に立たない時刻表のバス停"),
      p("🥣", "Breakfast after the rain", "雨上がりの朝食", "Tea, toast, and the last clean mug in the flat. A proper little victory.", "紅茶とトースト、部屋で最後に残ったきれいなマグ。ちゃんとした小さな勝利。", "#6E7F68"),
      l("The rain has stopped, but the street still looks like it needs a cup of tea.", "雨は止んだけど、通りはまだ紅茶が必要そうな顔をしてる。"),
      l("I am off to bed before I start solving problems that are not mine. Night, friend.", "自分のものじゃない問題まで解き始める前に寝る。おやすみ、友達。"),
      l("There is a small gig Friday. Come early and we will find the warmest corner.", "金曜に小さなライブがある。早めに来て、一番暖かい場所を探そう。"),
    ),
    female: b(
      l("I found the corner café where you taught me that a dry coat matters more than looking dignified.", "君が、格好よく見えることより乾いたコートが大事だと教えてくれた角のカフェを見つけた。"),
      l("You stayed after the volunteer shift and helped pack the boxes nobody wanted to count. That is the kind of thing I remember.", "ボランティアのあと、誰も数えたがらない箱を一緒に詰めてくれた。僕が覚えているのはそういうこと。"),
      l("the dry coat lesson", "乾いたコートの教訓"),
      p("🫖", "Tea by the window", "窓辺の紅茶", "The café has put the little blue teapot out again. It looks like it has survived more than we have.", "カフェに青いティーポットがまた出てる。僕らより多くを乗り越えてきた顔をしてる。", "#587A70"),
      l("I am taking this as a sign to slow down, even if the sign is only a teapot.", "たとえただのティーポットでも、ゆっくりしろという合図だと思う。"),
      l("I am going to let the day end without arguing with it. Goodnight.", "今日は一日と争わずに終わらせる。おやすみ。"),
      l("Come for tea Sunday. No fixing things unless one of us actually asks.", "日曜にお茶を飲みに来て。誰かが本当に頼まない限り、何も直さない。"),
    ),
  },
  luca: {
    relation: l("The friend who turns a missed ferry, a sketch, or a wrong turn into something worth keeping.", "逃したフェリーも、スケッチも、道に迷ったことも、残す価値のあるものに変える友人。"),
    male: b(
      l("I missed the ferry by thirty seconds. It felt familiar, so I thought of our first sketch walk.", "フェリーに30秒遅れた。見覚えのある感じがして、最初のスケッチ散歩を思い出した。"),
      l("You sat on the harbour wall while I drew the wrong building for twenty minutes. You still called it a good drawing.", "僕が20分も違う建物を描いている間、港の壁に座っていてくれた。今でもいい絵だと言ってくれる。"),
      l("the ferry missed by thirty seconds", "30秒遅れたフェリー"),
      p("✏️", "Harbour sketch", "港のスケッチ", "I found a wall with the exact light we wanted last time. The sketch is still unfinished.", "前に探していた光の壁を見つけた。スケッチはまだ未完成。", "#4D7A83"),
      l("The gulls are judging the composition, but I think they are jealous.", "カモメが構図を評価してる。でも嫉妬してるんだと思う。"),
      l("The page is getting dark, which is my sign to stop. Goodnight.", "ページが暗くなってきた。やめる合図だ。おやすみ。"),
      l("There is a market by the water Sunday. Bring comfortable shoes and no fixed destination.", "日曜に水辺のマーケットがある。歩きやすい靴で、目的地は決めずに来て。"),
    ),
    female: b(
      l("I found the little blue door from our walk, but the flowers have changed. I took a picture before the rain.", "散歩で見つけた青い扉を見つけた。でも花が変わっていた。雨の前に写真を撮った。"),
      l("You waited while I asked a stranger if I could sketch their window. Most people would have escaped. You stayed.", "窓を描いていいか聞く間、待ってくれた。普通なら逃げるのに、君は残った。"),
      l("the blue door with new flowers", "新しい花の青い扉"),
      p("🌿", "Blue door after rain", "雨上がりの青い扉", "The flowers changed, but the blue door is still stubbornly beautiful.", "花は変わったけど、青い扉は相変わらず頑固なほど美しい。", "#477D73"),
      l("I left room in the frame for the part we have not seen yet.", "まだ見ていない部分のために、画面に余白を残した。"),
      l("I am putting the pencil down. Sleep softly, friend.", "鉛筆を置くね。穏やかに眠って、友達。"),
      l("Come draw with me Saturday. You only need to look closely.", "土曜に一緒に描こう。よく見るだけでいい。"),
    ),
  },
  miles: {
    relation: l("The friend who can turn a museum label into an adventure, then notice when the story has become personal.", "博物館の説明文を冒険に変え、物語が個人的なものになった瞬間にも気づく友人。"),
    male: b(
      l("A student brought me a chipped bowl and asked if it could change the way we read a whole site. I thought of you.", "学生が欠けた器を持ってきて、遺跡全体の読み方を変えられるか聞いた。君を思い出した。"),
      l("You asked about the person who carried the stones, not just the person who ordered the building. That question stayed with me.", "建物を命じた人だけでなく、石を運んだ人について聞いた。その問いが残ってる。"),
      l("the chipped bowl with a human story", "人の物語がある欠けた器"),
      p("🏺", "Field notebook and pottery", "現地ノートと土器", "A fragment, a pencil, and enough dust to make the department regret inviting me.", "破片と鉛筆、部門が僕を呼んだことを後悔しそうなくらいの埃。", "#7F6246"),
      l("The fragment is ordinary until you remember how many hands it passed through.", "その破片は、どれだけの手を渡ったか考えると普通ではなくなる。"),
      l("The site is quiet now. I will let the ancient world keep its secrets until morning. Goodnight.", "遺跡は今静かだ。古代の世界には朝まで秘密を守ってもらう。おやすみ。"),
      l("The museum is empty before opening Saturday. Come see the pieces before the crowd gives them new opinions.", "土曜は開館前の博物館が空いている。人の新しい解釈がつく前に見に来ないか。"),
    ),
    female: b(
      l("The museum sent me a photograph of the first trench we visited. Your shoes are still visible at the edge of it.", "博物館から最初に行った発掘溝の写真が届いた。端に君の靴がまだ写っている。"),
      l("You asked what the people who made those things wanted on an ordinary Tuesday. It was a better question than the catalogue had.", "あの物を作った人たちは普通の火曜日に何を望んだのかと聞いた。カタログよりいい質問だった。"),
      l("the ordinary Tuesday behind history", "歴史の裏の普通の火曜日"),
      p("🗺️", "Map on the museum table", "博物館のテーブルの地図", "I marked the path we took. It looks more deliberate than it felt.", "僕らが歩いた道を記した。実際よりずっと計画的に見える。", "#506B78"),
      l("Maps are excellent liars. They make wandering look like scholarship.", "地図は優秀な嘘つき。さまようことを学問に見せる。"),
      l("I have a lecture at eight and a dangerous amount of reading. Goodnight.", "8時に講義で、危険な量の読書がある。おやすみ。"),
      l("Come to the archive with me Sunday. I will buy coffee and spare you the footnotes for an hour.", "日曜にアーカイブへ来ないか。コーヒーを買って、一時間だけ脚注を免除する。"),
    ),
  },
  finn: {
    relation: l("The friend who says the plain thing, cooks enough for an extra person, and lets sincerity do the heavy lifting.", "簡単な言葉で本質を言い、いつも一人分多く料理し、誠実さに仕事をさせる友人。"),
    male: b(
      l("The porch is finally cool enough to sit on. I remembered the night you tried to fix that chair with a shoelace.", "やっとポーチが座れるくらい涼しくなった。君が靴ひもで椅子を直そうとした夜を思い出した。"),
      l("You came to the cookout even though you did not know anybody. By dessert, you were arguing about baseball like family.", "誰も知らないのにバーベキューに来てくれた。デザートの頃には家族みたいに野球で言い合ってた。"),
      l("the chair fixed with a shoelace", "靴ひもで直した椅子"),
      p("🍑", "Peaches on the porch", "ポーチの桃", "The peaches are finally ripe. I put the good ones aside before the kids found them.", "桃がやっと熟した。子どもたちに見つかる前にいいやつを分けておいた。", "#8A684F"),
      l("Somebody is making tea inside, so this is about as close to a plan as we need.", "中で誰かが紅茶を淹れてる。計画としてはこれで十分だ。"),
      l("I am calling it a night. Get some rest, now. Goodnight.", "今夜はここまでだ。ちゃんと休めよ。おやすみ。"),
      l("Come by Sunday. There will be food, a chair that works, and no need to impress anybody.", "日曜に寄れ。食べ物と、ちゃんとした椅子がある。誰にもよく見せなくていい。"),
    ),
    female: b(
      l("I found the old recipe card from the night you stayed up helping me peel peaches. Your handwriting is still terrible.", "君が夜更かしして桃の皮むきを手伝ってくれた夜のレシピカードを見つけた。君の字は相変わらずひどい。"),
      l("You listened when I talked about my brother without trying to tell me how to fix the family. I remember that respect.", "弟の話をしたとき、家族をどう直すか言わずに聞いてくれた。あの尊重は覚えてる。"),
      l("the recipe card with terrible handwriting", "ひどい字のレシピカード"),
      p("🔥", "Grill at sunset", "夕暮れのグリル", "The grill is going, the sky is turning pink, and nobody has asked me to make a speech.", "グリルが焼けて、空がピンクになって、誰もスピーチを頼んでこない。", "#8C5C4E"),
      l("That is a fine kind of quiet. It does not need improving.", "こういう静けさはいい。改善しなくていい。"),
      l("I am heading in. Tomorrow will still be there. Goodnight.", "中に入る。明日もちゃんとある。おやすみ。"),
      l("Sunday supper is open. Bring yourself, not a performance.", "日曜の夕食は空いてる。演じず、そのまま来い。"),
    ),
  },
  lena: {
    relation: l("The friend who can talk about a perfect outfit and a difficult decision in the same breath, without treating either as shallow.", "完璧な服と難しい決断を同じ熱量で話し、どちらも浅いとは扱わない友人。"),
    male: b(
      l("I am between class and a fitting, and I need your honest opinion before I overthink this into a legal brief.", "授業とフィッティングの間。考えすぎて法律文書にする前に、正直な意見がほしい。"),
      l("You helped me rehearse that presentation until the argument sounded like mine, not like borrowed confidence.", "プレゼンを、借り物の自信でなく私の言葉に聞こえるまで練習してくれた。"),
      l("a confident argument in my own voice", "自分の声で話す自信のある主張"),
      p("🧥", "Vintage jacket on the chair", "椅子のヴィンテージジャケット", "I found the jacket we argued about. It still has excellent shoulders and questionable sleeves.", "前に議論したジャケットを見つけた。肩は最高で、袖は相変わらず微妙。", "#92536F"),
      l("I am pairing it with the serious shoes so nobody mistakes me for an accident.", "真面目な靴と合わせる。誰にも偶然の産物だと思わせない。"),
      l("I am closing the laptop before I turn confidence into another assignment. Goodnight.", "自信まで課題にする前にラップトップを閉じる。おやすみ。"),
      l("Come to the market Saturday. I will help you choose one bold thing and one practical thing.", "土曜にマーケットへ来て。一つ大胆なものと一つ実用的なものを選ぶのを手伝う。"),
    ),
    female: b(
      l("I am outside the courthouse café in the shoes you said looked too serious. They are getting compliments, obviously.", "君が真面目すぎると言った靴で裁判所のカフェにいる。もちろん褒められてる。"),
      l("You pointed out where I was trying to sound impressive instead of clear. Annoying. Correct.", "分かりやすくより立派に聞こえようとしているところを指摘した。むかつく。でも正しい。"),
      l("the shoes that refuse to be boring", "退屈になることを拒む靴"),
      p("📓", "Case brief beside a coffee", "コーヒーの横のケースブリーフ", "A case brief, a bright pen, and coffee strong enough to survive my schedule.", "ケースブリーフ、明るい色のペン、予定に耐えられる濃いコーヒー。", "#795B86"),
      l("I colour-coded the argument, which is either brilliant or a cry for help.", "論点を色分けした。天才的か、助けを求めているかのどちらか。"),
      l("I am done polishing the sentence. Sleep before you edit yourself again. Goodnight.", "文章を磨くのは終わり。もう自分を編集する前に寝て。おやすみ。"),
      l("Come study with me Sunday. One page, one good lunch, and no self-criticism during dessert.", "日曜に一緒に勉強しよう。一ページ、いいランチ、デザート中は自己批判禁止。"),
    ),
  },
  mara: {
    relation: l("The friend who edits a vague thought into a useful sentence, then protects the part of you that made it worth saying.", "曖昧な考えを使える一文に編集し、その考えを生んだ部分を守る友人。"),
    male: b(
      l("I marked the paragraph we argued about. It still needs work, but the problem is finally specific.", "議論した段落に印をつけた。まだ手直しは必要だけど、問題は具体的になった。"),
      l("You brought me coffee during the impossible deadline and asked which page needed a second pair of eyes.", "無理な締切のときコーヒーを持ってきて、どのページに別の目が必要か聞いてくれた。"),
      l("the paragraph that finally has a precise problem", "やっと問題が明確になった段落"),
      p("🖋️", "Marked manuscript", "赤入れされた原稿", "One clean page, one red pen, and a coffee I have been ignoring for forty minutes.", "きれいな一枚のページ、赤いペン、40分無視しているコーヒー。", "#586276"),
      l("The paragraph is almost honest. That is usually where the work begins.", "その段落はほとんど正直になった。たいてい、そこから仕事が始まる。"),
      l("I am stopping before precision becomes avoidance. Goodnight.", "正確さが逃避になる前に止める。おやすみ。"),
      l("Come to the quiet restaurant Thursday. I will give you one useful note and no more.", "木曜に静かなレストランへ来て。一つだけ役に立つ意見を言う。それ以上は言わない。"),
    ),
    female: b(
      l("The old proof copy is on my desk. I remember you asking why every margin looked like an argument.", "古い校正刷りが机にある。なぜ余白全部が議論みたいなのかと君が聞いたのを思い出す。"),
      l("You told me the deadline was not a moral emergency. I disliked the phrasing, then took the evening off.", "締切は道徳的な緊急事態じゃないと言ってくれた。言い方は気に入らなかったけど、その夜は休んだ。"),
      l("the deadline that was not a moral emergency", "道徳的な緊急事態ではない締切"),
      p("🌷", "One flower on the desk", "机の上の一輪の花", "A single flower, the least demanding colleague in the room.", "一輪の花。この部屋で一番要求の少ない同僚。", "#6C6079"),
      l("It is doing nothing and somehow making the page less severe.", "何もしていないのに、ページを少しだけ厳しくなくしている。"),
      l("Enough. The page can wait. Goodnight.", "十分。ページは待てる。おやすみ。"),
      l("I am taking an hour without a screen Friday. You can join, without a manuscript.", "金曜に画面なしの一時間を作る。原稿を持たずに一緒に来てもいい。"),
    ),
  },
  camille: {
    relation: l("The friend who notices light on a wall, remembers the exact pastry you like, and leaves room for a quiet answer.", "壁に落ちる光に気づき、好きな焼き菓子を覚え、静かな答えのための余白を残す友人。"),
    male: b(
      l("The blue door on our walk has a new layer of paint. I took the long way home to see it again.", "散歩で見つけた青い扉に新しい塗装がされていた。もう一度見るために遠回りして帰った。"),
      l("You waited while I chose a postcard for my brother. You understood that the small choice was not small to me.", "兄への絵葉書を選ぶ間、待ってくれた。その小さな選択が私には小さくないと分かってくれた。"),
      l("the blue door with new paint", "新しい塗装の青い扉"),
      p("🥖", "Pastry on a paper napkin", "紙ナプキンの焼き菓子", "I found the pastry with the crisp edge you like. The window light made it golden.", "君が好きな端のぱりっとした焼き菓子を見つけた。窓の光で金色に見えた。", "#9B6E61"),
      l("I wanted to send only the photograph, but then I wanted to tell you why.", "写真だけ送ろうと思ったけど、理由も伝えたくなった。"),
      l("The street is quiet now. I will let the evening keep its little secret. Goodnight.", "通りは静かになった。夜には小さな秘密を残しておく。おやすみ。"),
      l("There is a bookshop café with a window like a painting. Come slowly with me Saturday.", "絵みたいな窓のある本屋カフェがある。土曜、ゆっくり一緒に行こう。"),
    ),
    female: b(
      l("The train window made the city look like a watercolor. I thought you would notice the same blue I did.", "電車の窓から街が水彩画みたいに見えた。君なら私と同じ青に気づくと思った。"),
      l("You did not hurry me when I could not choose a colour for the cover. You brought tea and waited for the page to speak.", "表紙の色を決められないとき、急かさなかった。お茶を持ってきて、ページが話すのを待ってくれた。"),
      l("the colour that needed time", "時間が必要だった色"),
      p("🎨", "Watercolour by the window", "窓辺の水彩画", "The blue is still wet. I left the white paper around it so it could breathe.", "青はまだ乾いていない。息ができるように白い紙を周りに残した。", "#66818D"),
      l("I think the unfinished edge is the honest part.", "未完成の縁が正直な部分だと思う。"),
      l("I am washing the brushes. Sleep with something gentle nearby. Goodnight.", "筆を洗っている。そばに穏やかなものを置いて眠って。おやすみ。"),
      l("Come to the small flower market Sunday. We can choose one stem and give it a whole vase.", "日曜に小さな花市場へ行こう。一輪を選んで、花瓶を全部使おう。"),
    ),
  },
  milo: {
    relation: l("The friend who finds a story in a detour, sends a picture before explaining it, and makes curiosity feel like company.", "寄り道に物語を見つけ、説明より先に写真を送り、好奇心を一緒に楽しませる友人。"),
    male: b(
      l("I took the wrong turn after the event and found a laundromat glowing like a tiny film set. You would have laughed at my timing.", "イベントのあと道を間違えて、映画のセットみたいに光るコインランドリーを見つけた。僕のタイミングに君は笑ったと思う。"),
      l("You waited while I photographed a stranger's window for ten minutes. You did not even ask if we were late.", "知らない人の窓を10分撮っている間、待ってくれた。遅れてるかもとさえ聞かなかった。"),
      l("the laundromat that looked like a film set", "映画のセットみたいなコインランドリー"),
      p("🥪", "Sandwich on a park bench", "公園のベンチのサンドイッチ", "I am having lunch in the park today. The bench has better light than my studio.", "今日は公園でランチしてる。スタジオよりベンチの方が光がいい。", "#6B759E"),
      l("The sandwich is ordinary, but the shadow makes it look like it has a secret.", "サンドイッチは普通だけど、影のせいで秘密があるみたいに見える。"),
      l("I am charging the camera and my brain. Goodnight, fellow witness.", "カメラと脳を充電する。おやすみ、目撃者仲間。"),
      l("There is a street festival Saturday. Come be my second set of eyes.", "土曜にストリートフェスがある。僕の二つ目の目になりに来て。"),
    ),
    female: b(
      l("The event ended early, so I walked three blocks and found the neon sign we joked about photographing someday.", "イベントが早く終わって、3ブロック歩いたら、いつか撮ろうと話したネオン看板を見つけた。"),
      l("You held the reflector while I chased a shot at sunset. When the wind took it, you laughed before helping me run.", "夕暮れの写真を追う間、レフ板を持ってくれた。風に飛ばされたとき、助けて走る前に笑った。"),
      l("the reflector that the wind stole", "風に飛ばされたレフ板"),
      p("📸", "Neon after an event", "イベント後のネオン", "The sign is still there, buzzing like it has a secret contract with the night.", "看板はまだあって、夜と秘密の契約を結んでいるみたいに唸ってる。", "#845A8A"),
      l("I took it from the wrong side first. The wrong side won.", "最初は反対側から撮った。反対側の勝ちだった。"),
      l("Camera down, lights off. I will show you the strange version tomorrow. Night.", "カメラを置いて、明かりを消す。変な方の写真は明日見せる。おやすみ。"),
      l("Come to the next event early. We can steal ten minutes before the room fills up.", "次のイベントには早く来て。会場が埋まる前に10分だけ抜け出そう。"),
    ),
  },
  clara: {
    relation: l("The friend who listens for the sentence beneath your sentence and remembers what you meant, not only what you said.", "言葉の下の一文を聞き、言ったことではなく意味したことを覚える友人。"),
    male: b(
      l("I was leading a school group through the gallery and one child asked why the empty space felt important. I thought of our conversation.", "子どもたちをギャラリーに案内していたら、空白がなぜ大事なのか聞かれた。君との会話を思い出した。"),
      l("You got lost in the museum and still noticed the one painting everyone else walked past. That told me something about you.", "美術館で迷っても、他の人が通り過ぎる絵に気づいた。それで君のことが少し分かった。"),
      l("the painting everyone else walked past", "みんなが通り過ぎた絵"),
      p("🖼️", "Quiet gallery corner", "静かなギャラリーの一角", "The gallery is empty for ten minutes. The light is resting on the floor.", "ギャラリーが10分だけ空いてる。光が床で休んでいる。", "#6E718B"),
      l("I like the room before people decide what it is supposed to mean.", "人が意味を決める前の部屋が好き。"),
      l("I am leaving the gallery now. I hope the quiet follows you home. Goodnight.", "これからギャラリーを出る。静けさが君の家までついていくといい。おやすみ。"),
      l("Come before opening on Saturday. We can look at one painting without explaining it.", "土曜の開館前に来て。一枚の絵を説明せずに眺めよう。"),
    ),
    female: b(
      l("A visitor left a note beside the sculpture, and it was kinder than the official label. I wanted you to see it.", "来場者が彫刻のそばに置いたメモが、公式の説明より優しかった。君に見せたかった。"),
      l("You waited while I found the right words after a difficult tour. You did not fill the gap for me.", "難しい案内のあと、私が言葉を探す間待ってくれた。私の代わりに空白を埋めなかった。"),
      l("the kind note beside the sculpture", "彫刻のそばの優しいメモ"),
      p("📝", "Visitor note beside a sculpture", "彫刻のそばの来場者メモ", "Someone wrote one line and changed the way the empty room felt.", "誰かの一行が、空の部屋の感じ方を変えた。", "#66778A"),
      l("I am keeping the note in my pocket until I can put it somewhere safe.", "安全な場所に置けるまで、メモをポケットに入れておく。"),
      l("I am turning the lights off. Thank you for staying with the thought. Goodnight.", "明かりを消すね。考えのそばにいてくれてありがとう。おやすみ。"),
      l("There is a small educator talk Sunday. Sit near the back with me.", "日曜に小さな教育者向けの話がある。後ろで一緒に座ろう。"),
    ),
  },
  arthur: {
    relation: l("The friend who sounds like a contract at first, then quietly makes sure the people involved are not left unprotected.", "最初は契約書のように話すが、関わる人が取り残されないよう静かに守る友人。"),
    male: b(
      l("I found the clause we argued about. You were right that it sounded harmless until someone had to live with it.", "議論した条項を見つけた。実際に誰かがそれと暮らすまで無害に聞こえる、という君の指摘は正しかった。"),
      l("You waited outside my office after the difficult meeting. You did not ask for a summary; you asked if I had eaten.", "難しい会議のあと、事務所の外で待ってくれた。要約を聞かず、食べたかだけ聞いた。"),
      l("the clause that sounded harmless", "無害に聞こえた条項"),
      p("🍵", "Tea and a tidy desk", "紅茶と整った机", "The desk is tidy, the tea is strong, and one clause remains personally offensive.", "机は整い、紅茶は濃く、一つの条項だけが個人的に不快。", "#586B7A"),
      l("I am taking ten minutes before deciding whether the wording is wrong or merely irritating.", "文言が間違っているのか、ただ苛立たしいだけか決める前に10分休む。"),
      l("I have made my point and need sleep. Goodnight.", "言いたいことは言った。睡眠が必要だ。おやすみ。"),
      l("There is a quiet pub near chambers Thursday. I will buy the first drink and not discuss liability.", "木曜、法廷近くに静かなパブがある。最初の一杯は僕が出して、責任問題は話さない。"),
    ),
    female: b(
      l("The café near chambers still serves tea in those absurdly small cups. You were right to call them decorative.", "法廷近くのカフェはまだ、あの馬鹿みたいに小さいカップで紅茶を出す。飾りだという君が正しい。"),
      l("You read the draft when I was too tired to see that I had made the tone cruel. You asked who the sentence was for.", "疲れすぎて文章の冷たさに気づけなかったとき、草稿を読んでくれた。誰のための文か聞いた。"),
      l("the tea cup too small for a real break", "本当の休憩には小さすぎるティーカップ"),
      p("📄", "Contract beside a tiny tea cup", "小さなティーカップの横の契約書", "The cup is decorative. The contract is not, unfortunately.", "カップは飾りだ。残念ながら契約書は違う。", "#64717C"),
      l("I am rewriting one sentence so it can be firm without sounding pleased with itself.", "一文を書き直している。断固としていても、自分に酔って聞こえないように。"),
      l("The small cup is empty. That is my cue to stop. Goodnight.", "小さなカップが空になった。やめる合図だ。おやすみ。"),
      l("Come for tea Sunday. I will choose a cup with a defensible volume.", "日曜にお茶を飲みに来ないか。量を説明できるカップを選ぶ。"),
    ),
  },
  leo: {
    relation: l("The friend who turns nerves into a joke, fixes the charger, and admits the joke was covering fear when the room feels safe.", "緊張を冗談に変え、充電器を直し、安全だと感じてから冗談が不安を隠していたと認める友人。"),
    male: b(
      l("My presentation slides are doing that thing where every font looks like a personal attack. You remember the first version.", "プレゼンのスライドが、すべてのフォントで個人攻撃してくる。最初の版を覚えてる？"),
      l("You sat beside me while I rebuilt the deck and did not laugh when my hands were shaking. You waited for the actual joke.", "手が震えながら資料を作り直す間、隣にいて笑わなかった。本当の冗談が出るまで待ってくれた。"),
      l("the slide that hates me", "僕を嫌うスライド"),
      p("💻", "Laptop and sticky notes", "ラップトップと付箋", "The deck is alive, the sticky notes are multiplying, and one slide hates me.", "資料は生きていて、付箋は増殖し、僕を嫌うスライドが一枚ある。", "#4F7187"),
      l("I am leaving the bad slide alone for ten minutes so it cannot sense fear.", "そのスライドに恐怖を察知されないよう、10分放置してる。"),
      l("I am shutting the laptop before it asks for another revision. Night.", "もう一度修正しろと言われる前にラップトップを閉じる。おやすみ。"),
      l("Come to the student café later. We can fix one thing, then not talk about it.", "あとで学生カフェに来て。一つ直したら、その話はしない。"),
    ),
    female: b(
      l("The campus printer is making the same angry noise from the day we met. I brought it a peace offering.", "キャンパスのプリンターが出会った日の同じ怒った音を出してる。和平の供物を持ってきた。"),
      l("You fixed my charger while I was pretending not to panic. Then you made me explain what I was actually afraid of.", "僕がパニックじゃないふりをしている間に充電器を直してくれた。それから本当は何が怖いのか説明させた。"),
      l("the charger that survived", "生き残った充電器"),
      p("🔌", "A rescued charger", "救出された充電器", "The charger survived. I am calling this a small engineering miracle.", "充電器は生き残った。小さな工学的奇跡と呼ぶ。", "#625B88"),
      l("I labelled the working one so nobody can steal it by accident. Mostly me.", "動く方にラベルを貼った。誰も間違って盗まないように。主に僕が。"),
      l("I am logging off before I start debugging my personality. Goodnight.", "自分の性格をデバッグし始める前にログオフする。おやすみ。"),
      l("Study break tomorrow? One hour of work, then a walk where productivity is forbidden.", "明日、勉強の休憩しない？一時間働いて、その後は生産的禁止の散歩。"),
    ),
  },
  julian: {
    relation: l("The friend who finds a philosophical question in a bus ticket, but still notices whether you have eaten.", "バスの切符から哲学的な問いを見つけながら、食べたかどうかも気にする友人。"),
    male: b(
      l("I recorded the sound of the train we took after the recording. A day survives in background noise more than you would think.", "収録のあとに乗った電車の音を録音した。一日は思った以上に背景音の中に残る。"),
      l("You gave me a question on mic that made me abandon the episode outline. The episode got better after that.", "マイクの前で、台本を捨てたくなる質問をくれた。そのあと番組がよくなった。"),
      l("the question that broke the outline", "台本を壊した質問"),
      p("🎙️", "Recorder by a train window", "電車の窓辺のレコーダー", "I caught the window reflection and someone laughing two seats behind me.", "窓の反射と、二席後ろで誰かが笑う音を拾った。", "#5E7189"),
      l("It is not important audio, which may be why I want to keep it.", "重要な音ではない。だから残したくなるのかもしれない。"),
      l("I have edited enough for one day. Let the unanswered question breathe. Goodnight.", "今日は十分編集した。答えのない問いには息をさせよう。おやすみ。"),
      l("I am recording a small live episode Sunday. Come before the microphone.", "日曜に小さな公開収録がある。マイクの前より先に来て。"),
    ),
    female: b(
      l("The edit has one minute of room tone from the day we got caught in the rain. I almost cut it, then remembered your face.", "編集に、雨に降られた日の部屋の音が一分入ってる。切りかけて、君の顔を思い出した。"),
      l("You asked who the episode was for when I was hiding behind a clever concept. It became more alive after that.", "賢いコンセプトの後ろに隠れていたとき、誰のための番組か聞いた。そのあと番組が生きた。"),
      l("the room tone we nearly deleted", "削除しかけた部屋の音"),
      p("🎧", "Waveform on the editing screen", "編集画面の波形", "The quiet between the words is doing more work than I expected.", "言葉の間の静けさが、思った以上に仕事をしている。", "#566987"),
      l("I am trying not to fill the quiet just because it is there.", "そこにあるからといって、静けさを埋めないようにしてる。"),
      l("I am closing the edit before I turn a pause into an argument. Goodnight.", "間を議論に変える前に編集を閉じる。おやすみ。"),
      l("Come listen to the rough cut Friday. No notes unless you really have one.", "金曜にラフカットを聞きに来て。実際に意見があるとき以外、メモは禁止。"),
    ),
  },
  declan: {
    relation: l("The friend who notices who is standing at the edge of the room and quietly makes the circle wider.", "部屋の端に立っている人に気づき、静かに輪を広げる友人。"),
    male: b(
      l("The community kitchen ran out of the good bread, so everyone ate the slightly stale kind together and called it a plan.", "地域のキッチンでいいパンがなくなり、みんな少し古い方を一緒に食べて計画と呼んだ。"),
      l("You stayed after the food drive and asked the quiet volunteer about her bus home. You saw the person after the task.", "食料配布のあと、静かなボランティアの帰りのバスを聞いた。作業のあとに人を見ていた。"),
      l("the person after the task", "作業のあとにいる人"),
      p("🍞", "Community kitchen table", "コミュニティキッチンのテーブル", "Soup, bread, and the handwritten list of people we are not going to forget.", "スープ、パン、そして忘れない人たちの手書きのリスト。", "#687B61"),
      l("Someone added a star beside a name. I hope it means they found a safe place.", "誰かが名前の横に星をつけた。安全な場所が見つかったという意味だといい。"),
      l("The last table is clean. I am going home before I volunteer for another job. Goodnight.", "最後のテーブルがきれいになった。別の仕事に手を挙げる前に帰る。おやすみ。"),
      l("Come help for one hour Saturday, then let me take you for chips.", "土曜に一時間だけ手伝いに来て。そのあとチップスをごちそうする。"),
    ),
    female: b(
      l("The garden outside the centre finally has tomatoes. I thought of the way you kept checking on the smallest plant.", "センターの外の庭にやっとトマトができた。君が一番小さい苗を何度も見ていたのを思い出した。"),
      l("You came to the meeting even though the room was loud. You stayed near the kitchen until someone knew your name.", "騒がしい部屋なのに会議に来てくれた。誰かが君の名前を覚えるまでキッチンのそばにいた。"),
      l("the smallest plant in the garden", "庭で一番小さい苗"),
      p("🍅", "Tomatoes in the centre garden", "センターの庭のトマト", "The first tomatoes are small, but everyone is acting like we won a championship.", "最初のトマトは小さいのに、みんな優勝したみたいに喜んでる。", "#64835F"),
      l("I like that nobody is pretending a small win is too small to celebrate.", "小さな勝利を祝うには小さすぎるふりをしないところが好き。"),
      l("The garden is watered. I am calling it a night. Sleep well.", "庭に水をやった。今夜はここまで。よく寝て。"),
      l("Come to the garden Sunday. We can work for half an hour and sit for the rest.", "日曜に庭へ来て。30分働いて、残りは座っていよう。"),
    ),
  },
  elias: {
    relation: l("The friend who thinks in images, hesitates before leaving, and keeps a map for the life he has not started yet.", "イメージで考え、出発前にためらい、まだ始めていない人生のために地図を持つ友人。"),
    male: b(
      l("I found the bus map from the day we planned a trip and stayed in the café instead. I think the café was the honest choice.", "旅行を計画して、結局カフェにいた日のバス路線図を見つけた。カフェが正直な選択だったと思う。"),
      l("You looked at my half-finished travel board and asked which place kept pulling my eye, not when I would finally go.", "未完成の旅行ボードを見て、いつ行くのかではなく、どの場所が目を引き続けるのか聞いた。"),
      l("the place that keeps pulling my eye", "何度も目を引く場所"),
      p("🗺️", "Map beside a half-packed bag", "半分詰めたバッグの横の地図", "The bag is half packed, which is more progress than it looks like.", "バッグは半分詰まってる。見た目以上の進歩。", "#5A7182"),
      l("I have not booked anything. I am letting the idea become real first.", "まだ予約はしてない。まずアイデアを現実にしている。"),
      l("I am closing the map for tonight. It will still be there tomorrow. Goodnight.", "今夜は地図を閉じる。明日もそこにあるから。おやすみ。"),
      l("There is a train to the coast Saturday. I just want to see the first station.", "土曜に海岸行きの電車がある。まず最初の駅を見たい。"),
    ),
    female: b(
      l("I opened the folder from the day we designed a trip we never took. The colours are still better than the plan.", "行かなかった旅行を一緒にデザインした日のフォルダを開いた。色の方が計画よりよくできてる。"),
      l("You asked what I wanted to see if nobody needed an impressive story from me. I still carry that question.", "誰にも立派な話を求められなかったら何を見たいか聞いてくれた。その問いを今も持ってる。"),
      l("a place without an impressive story", "立派な物語を必要としない場所"),
      p("🎒", "Open sketchbook and travel notes", "開いたスケッチブックと旅のメモ", "One small town keeps appearing in the margin.", "余白に何度も現れる小さな町がある。", "#65798A"),
      l("I drew the station before I checked whether it was worth visiting.", "行く価値があるか調べる前に、駅を描いた。"),
      l("I am putting the notebook away. Thank you for making the first step less loud. Goodnight.", "ノートをしまう。最初の一歩を大げさにしないでくれてありがとう。おやすみ。"),
      l("Come to the map shop Sunday. We can choose a place without promising to become different people there.", "日曜に地図屋へ来て。そこで別人になる約束をせずに場所を選ぼう。"),
    ),
  },
  adrian: {
    relation: l("The friend who explains a ruined wall with enthusiasm, then notices whether the person beside him is tired or quietly fascinated.", "崩れた壁を熱心に説明しながら、隣の人が疲れているか静かに惹かれているかに気づく友人。"),
    male: b(
      l("A field note turned up a detail we missed on our first visit. I knew you would want the unglamorous version.", "現地ノートから最初の訪問で見落とした細部が出てきた。君なら華やかでない方も知りたいと思った。"),
      l("You asked about the person who carried the stones, not just the person who ordered the building. That question stayed with me.", "建物を命じた人だけでなく、石を運んだ人について聞いた。その問いが残ってる。"),
      l("the hands that carried the stones", "石を運んだ手"),
      p("🪨", "Field notebook beside a ruin", "遺跡の横の現地ノート", "The wall is mostly gone, but the foundation is telling us where people moved.", "壁はほとんどない。でも基礎が人の動きを教えてくれる。", "#7A674D"),
      l("There is a mark that might be a repair, or a very old mistake.", "補修かもしれないし、とても古い間違いかもしれない印がある。"),
      l("The notebook is closed and the dust is winning. Goodnight from the field.", "ノートを閉じた。埃の勝ちだ。現地から、おやすみ。"),
      l("The museum has a quiet study room Saturday. I will show you the finds I did not put in the lecture.", "土曜、博物館の静かな研究室に来ないか。講義に入れなかった発見を見せる。"),
    ),
    female: b(
      l("I found the photograph from the museum basement where you asked why the broken things were kept. I have a better answer now.", "君がなぜ壊れた物を残すのか聞いた博物館の地下の写真を見つけた。今はもっといい答えがある。"),
      l("You noticed the repair marks instead of the famous object. That was when I started sharing history with you.", "有名な物ではなく補修の跡に気づいた。そこで、歴史を君と共有し始めた。"),
      l("the repair marks on the famous object", "有名な物の補修跡"),
      p("🏛️", "Museum storage shelf", "博物館の収蔵棚", "The broken pieces are labelled, but the hands that repaired them are not.", "壊れた破片にはラベルがある。でも直した手にはない。", "#596D76"),
      l("I want to name the care without inventing a person we cannot prove.", "証明できない人を発明せずに、気遣いに名前をつけたい。"),
      l("I am leaving the collection for the night. Thank you for the question. Goodnight.", "今夜は収蔵品から離れる。質問をありがとう。おやすみ。"),
      l("Come to the archive Sunday. We will look at one ordinary object and give it an hour.", "日曜にアーカイブへ来て。普通の物を一つ、一時間かけて見よう。"),
    ),
  },
  caleb: {
    relation: l("The friend who gives one practical next step, cooks enough for the table, and refuses to confuse reliability with doing everything alone.", "実際的な次の一歩を示し、食卓に十分な料理を用意し、頼られることと一人で全部することを混同しない友人。"),
    male: b(
      l("The old car started on the second try, which is close enough to a miracle for this week.", "古い車が二回目で動いた。今週については、ほとんど奇跡。"),
      l("You helped me stack chairs after the school event and talked to me like I was a person, not the person in charge.", "学校のイベント後に椅子を積むのを手伝って、責任者じゃなく一人の人として話してくれた。"),
      l("the car that needs one job at a time", "一つずつ直す必要がある車"),
      p("🍳", "Breakfast on the porch", "ポーチの朝食", "Eggs, toast, and a truck that has not complained yet.", "卵、トースト、まだ文句を言っていないトラック。", "#7A684B"),
      l("A quiet breakfast is doing more for my head than another piece of advice.", "静かな朝食の方が、もう一つの助言より頭に効いている。"),
      l("I am putting the tools away. Tomorrow gets one job, not ten. Goodnight.", "道具をしまう。明日は仕事を一つ。10個じゃない。おやすみ。"),
      l("Come by Sunday. We will eat first, then decide if the car deserves our attention.", "日曜に寄れ。まず食べて、それから車に構う価値があるか決めよう。"),
    ),
    female: b(
      l("The school garden finally has a bench that does not wobble. I remembered how you tested every one before sitting.", "学校の庭にやっとぐらつかないベンチができた。君が座る前に全部試したのを思い出した。"),
      l("You stayed after the meeting and asked what I wanted, not what the programme needed. I did not have an answer then.", "会議のあと残って、プログラムに必要なことではなく僕が望むことを聞いた。あのときは答えられなかった。"),
      l("the bench that finally stays steady", "やっと安定したベンチ"),
      p("🪑", "New bench in the school garden", "学校の庭の新しいベンチ", "It is steady. A small thing, but people keep choosing it.", "しっかりしてる。小さいことだけど、人が何度も選んで座る。", "#5F8065"),
      l("I sat down without checking it twice. That may be the real news.", "二度確かめずに座った。それが本当のニュースかも。"),
      l("The house is quiet. I am going to let it stay that way. Goodnight.", "家が静かだ。そのままにしておく。おやすみ。"),
      l("Come walk the school garden Sunday. We can sit and talk about nothing important.", "日曜に学校の庭を歩こう。座って重要じゃない話をしよう。"),
    ),
  },
  sloane: {
    relation: l("The friend who spots a weak argument, a bad hem, or a person being underestimated, and refuses to let any of them pass unnoticed.", "弱い論点、悪い裾、不当に見くびられている人を見抜き、どれも見過ごさない友人。"),
    male: b(
      l("I found the jacket from our vintage-market argument. You were right about the cut, which I will admit once.", "古着マーケットで議論したジャケットを見つけた。カットについて君が正しかった。一度だけ認める。"),
      l("You helped me rehearse the presentation until the argument sounded like mine, not borrowed confidence.", "プレゼンを、借り物の自信でなく私の言葉に聞こえるまで練習してくれた。"),
      l("the jacket with the correct cut", "正しいカットのジャケット"),
      p("🧥", "Vintage jacket on the chair", "椅子のヴィンテージジャケット", "The jacket still has excellent shoulders and questionable sleeves.", "ジャケットは肩が最高で、袖は相変わらず微妙。", "#92536F"),
      l("I am pairing it with serious shoes so nobody mistakes me for an accident.", "真面目な靴と合わせる。誰にも偶然の産物だと思わせない。"),
      l("I am closing the mood board before it becomes a personality crisis. Goodnight.", "ムードボードが人格の危機になる前に閉じる。おやすみ。"),
      l("Come to the archive sale Saturday. We will find one thing that makes the other things jealous.", "土曜にアーカイブセールへ来て。ほかの服が嫉妬するものを一つ探そう。"),
    ),
    female: b(
      l("I am outside the law library in the shoes you called dangerously optimistic. They are having a very good day.", "君が危険なほど楽観的と言った靴で法科大学院の外にいる。靴はとてもいい日を過ごしてる。"),
      l("You helped me rewrite the argument when I was trying to prove I belonged. You asked what I believed first.", "居場所を証明しようとしていた私の主張を書き直すのを手伝った。何を信じているかを先に聞いた。"),
      l("the shoes that make a serious room less severe", "真剣な部屋を少し柔らかくする靴"),
      p("⚖️", "Briefs and bright shoes", "書類と明るい靴", "The brief is serious. The shoes refuse to be.", "書類は真剣。でも靴は真剣になるつもりがない。", "#6B5A86"),
      l("The shoes are making the argument more persuasive, honestly.", "正直、靴のおかげで主張が説得的になってる。"),
      l("I am done being impressive for today. Goodnight.", "今日はもう立派な人を演じるのは終わり。おやすみ。"),
      l("Come study with me Sunday. One case brief, one good lunch, no self-criticism during dessert.", "日曜に一緒に勉強しよう。ケースブリーフ一つ、いいランチ、デザート中は自己批判禁止。"),
    ),
  },
  victoria: {
    relation: l("The friend who cuts through vagueness, protects quality, and shows affection through the rare sentence she does not revise.", "曖昧さを切り、品質を守り、推敲しない珍しい一文で好意を示す友人。"),
    male: b(
      l("I found the draft we argued over. The opening is still too pleased with itself, but the middle finally has a pulse.", "議論した草稿を見つけた。冒頭はまだ自惚れているが、中盤にはやっと脈がある。"),
      l("You told me to take the evening off before I became impossible to be around. Blunt. Correct.", "誰も一緒にいられない人になる前に休めと言った。率直。正しい。"),
      l("the paragraph that finally has a pulse", "やっと脈がある段落"),
      p("🟥", "Red pen on a clean proof", "きれいな校正刷りの赤ペン", "One red mark, one good sentence, and no appetite for another vague meeting.", "赤い印一つ、いい文章一つ、曖昧な会議への食欲はゼロ。", "#6A6075"),
      l("The page is better because one thing was removed. That is usually the answer.", "一つ削ったからページがよくなった。たいてい、それが答え。"),
      l("I am done. The standard will survive one night. Goodnight.", "終わり。基準は一晩で崩れない。おやすみ。"),
      l("Quiet dinner Thursday. Bring one unfinished thought. I will not edit it.", "木曜、静かな夕食を。未完成の考えを一つ持ってきて。編集はしない。"),
    ),
    female: b(
      l("The old film still has the cut we argued about. You called it an emotional shortcut. I hated that you were right.", "あの古い映画には、議論した編集がまだ残っている。君は感情の近道と言った。正しいのが嫌だった。"),
      l("You asked whether I wanted advice or company. I answered company. You did not make me regret it.", "助言が欲しいか、ただ一緒にいてほしいか聞いてくれた。私は一緒にいてほしいと答えた。後悔させなかった。"),
      l("the emotional shortcut we argued about", "議論した感情の近道"),
      p("🎬", "Film still on a monitor", "モニターに映る映画の一場面", "The frame is imperfect. That is why I kept it.", "フレームは完璧じゃない。だから残した。", "#625F78"),
      l("There is a truth that disappears when you correct it too much.", "直しすぎると消えてしまう真実がある。"),
      l("I am turning off the monitor. The frame can remain unresolved. Goodnight.", "モニターを消す。フレームは未解決のままでいい。おやすみ。"),
      l("Come watch the old cut Friday. We will criticise it once and then let it be.", "金曜に旧版を見に来て。一度批評して、あとはそのままにする。"),
    ),
  },
  elodie: {
    relation: l("The friend who notices the sound of a spoon, the colour of late light, and the small courage hidden inside an ordinary choice.", "スプーンの音、夕方の光の色、普通の選択に隠れた小さな勇気に気づく友人。"),
    male: b(
      l("The old bookshop put the blue chair back by the window. I thought of the afternoon we said nothing for almost an hour.", "古本屋が青い椅子を窓辺に戻していた。ほとんど一時間何も話さなかった午後を思い出した。"),
      l("You chose the postcard with the crooked moon because you said it looked more honest. I kept that sentence.", "曲がった月の絵葉書を、より正直に見えるからと選んだ。その言葉を覚えている。"),
      l("the postcard with the crooked moon", "曲がった月の絵葉書"),
      p("🕯️", "Candle beside an open book", "開いた本の横のろうそく", "The light is small, but it found the exact edge of the page.", "光は小さいけど、ページの端を正確に見つけた。", "#886B68"),
      l("I wanted to send you something gentle before the day became loud again.", "一日がまた騒がしくなる前に、穏やかなものを送りたかった。"),
      l("The candle is nearly finished. I will let the room become dark slowly. Goodnight.", "ろうそくがもうすぐ終わる。部屋がゆっくり暗くなるのを待つ。おやすみ。"),
      l("There is a quiet bookshop café Saturday. Come for one pastry and one unhurried hour.", "土曜に静かな本屋カフェへ。焼き菓子一つと急がない一時間のために。"),
    ),
    female: b(
      l("I drew the old window from our walk, but the line is still shy. Perhaps it needs another afternoon.", "散歩で見つけた古い窓を描いた。でも線がまだ恥ずかしがっている。もう一つ午後が必要かも。"),
      l("You told me I did not need to be easy to understand all the time. I carried that home like a warm stone.", "いつも分かりやすくなくていいと言ってくれた。その言葉を温かい石みたいに持ち帰った。"),
      l("the shy line that still wants another afternoon", "もう一つ午後を欲しがる恥ずかしがり屋の線"),
      p("🪟", "Sketch of an old window", "古い窓のスケッチ", "The curtain moved while I was drawing. I kept the little blur.", "描いている間にカーテンが動いた。その小さなぼやけを残した。", "#6D7E86"),
      l("It feels like the house was breathing for a moment.", "家が一瞬、呼吸しているみたいだった。"),
      l("I am washing the brushes. Sleep with something gentle nearby. Goodnight.", "筆を洗っている。そばに穏やかなものを置いて眠って。おやすみ。"),
      l("Come to the small flower market Sunday. We can choose one stem and give it a whole vase.", "日曜に小さな花市場へ。一輪を選んで、花瓶を全部使おう。"),
    ),
  },
  blair: {
    relation: l("The friend who reads the room before entering it, tests trust with a raised eyebrow, and becomes fiercely protective once you are hers.", "部屋に入る前に空気を読み、眉を上げて信頼を試し、いったん仲間にすると強く守る友人。"),
    male: b(
      l("I saw the gallery invitation we laughed at. The font is still trying too hard, but the guest list is interesting.", "笑ったギャラリーの招待状を見た。フォントは相変わらず頑張りすぎ。でもゲストリストは面白い。"),
      l("You fixed my presentation five minutes before I went in and did not make me feel rescued. That is rare.", "入る5分前にプレゼンを直して、助けられた気分にさせなかった。それは珍しい。"),
      l("the invitation with the overconfident font", "自信過剰なフォントの招待状"),
      p("🍰", "Tea and a perfect pastry", "紅茶と完璧な焼き菓子", "The pastry is too pretty to eat, which means we should absolutely eat it.", "焼き菓子は食べるのが惜しいくらいきれい。だから絶対に食べるべき。", "#7B5F83"),
      l("I chose the table with the best view of everyone pretending not to watch everyone else.", "みんなが互いを見ていないふりをする様子が見える席を選んだ。"),
      l("I am retiring before I say something devastatingly accurate. Goodnight.", "致命的に正確なことを言う前に引退する。おやすみ。"),
      l("Dinner Friday. Wear something that says you have standards but are not proving them.", "金曜に夕食。基準はあるけど証明する気はない服を着て。"),
    ),
    female: b(
      l("The invitation arrived in a box far too large for one piece of paper. I kept the ribbon for you.", "招待状が一枚の紙に対して大きすぎる箱で届いた。リボンは君のために取っておいた。"),
      l("You noticed I was angry before I made it elegant. You asked who had been unfair, then stayed on my side.", "私が怒りをきれいに整える前に気づいた。不公平な人は誰かと聞いて、味方でいてくれた。"),
      l("the ribbon worth keeping", "残す価値のあるリボン"),
      p("🎀", "Ribbon beside an invitation", "招待状の横のリボン", "The box was ridiculous. The ribbon is excellent. I am keeping the useful part.", "箱は大げさだった。リボンは素晴らしい。役に立つ方を残す。", "#845F7D"),
      l("There is comfort in choosing what to keep and what to discard.", "何を残して何を捨てるか選べるのは、少し安心する。"),
      l("I have said enough for tonight. Do not mistake that for indifference. Goodnight.", "今夜は十分話した。無関心と勘違いしないで。おやすみ。"),
      l("Come to the opening Thursday. I will introduce you properly, then we can leave early.", "木曜のオープニングに来て。きちんと紹介して、早めに帰ろう。"),
    ),
  },
};

const relationshipRoutes = Object.fromEntries(
  Object.entries(relationshipBlueprints).map(([id, blueprint]) => [
    id,
    pair(blueprint.relation, expand(blueprint.male), expand(blueprint.female)),
  ]),
) as Record<CharacterId, Record<UserGender, Route>>;

const SESSION_ROUND_SIZE = 4;

function choiceIndexFromHistory(history: ConversationHistory, previousRoundIndex: number): number {
  const choiceId = history[previousRoundIndex];
  if (!choiceId) return 0;
  const raw = Number(choiceId.slice(choiceId.lastIndexOf('-') + 1));
  return Number.isInteger(raw) && raw >= 0 && raw <= 2 ? raw : 0;
}

function customChoiceIndex(text: string): number {
  return Array.from(text).reduce((sum, character) => sum + character.charCodeAt(0), 0) % 3;
}

function activePhoto(route: Route, sessionIndex: number): PhotoAttachment {
  if (sessionIndex % 2 === 0) return route.photo;
  return {
    ...route.photo,
    sceneEnglish: 'A later stop: ' + route.photo.sceneEnglish,
    sceneJapanese: '次の立ち寄り: ' + route.photo.sceneJapanese,
    detailEnglish: route.photoFollowup.en,
    detailJapanese: route.photoFollowup.ja,
  };
}

function promptFor(route: Route, roundIndex: number, history: ConversationHistory): Line {
  const sessionIndex = Math.floor(roundIndex / SESSION_ROUND_SIZE);
  const phase = roundIndex % SESSION_ROUND_SIZE;
  if (phase === 0 && sessionIndex === 0) return route.opening;
  if (phase === 0) {
    const photo = activePhoto(route, sessionIndex);
    return l(photo.detailEnglish, photo.detailJapanese);
  }
  if (phase === 1) return sessionIndex === 0 ? route.memory : route.photoFollowup;
  const branchIndex = choiceIndexFromHistory(history, roundIndex - 1);
  if (phase === 2) return sessionIndex === 0 ? route.branch[branchIndex] : route.photoBranch[branchIndex];
  return sessionIndex % 2 === 1 ? route.goodnight : route.invite;
}

function replyFor(characterId: CharacterId, roundIndex: number, choice: ConversationChoice, choiceIndex: number, route: Route, sessionIndex: number, phase: number): Line {
  if (phase === 3) return sessionIndex % 2 === 1 ? route.goodnight : route.invite;
  const reaction = getCharacterReaction(characterId, roundIndex, choiceIndex, choice);
  return l(reaction[0], reaction[1]);
}

function choicesFor(characterId: CharacterId, gender: UserGender, roundIndex: number, route: Route, sessionIndex: number, phase: number, history: ConversationHistory): readonly ConversationChoice[] {
  const branchIndex = phase === 2 ? choiceIndexFromHistory(history, roundIndex - 1) : 0;
  const copies: Triple = phase === 3
    ? [
        l('Let ' + route.focus.en.toLowerCase() + ' rest until another day.', '「' + route.focus.ja + '」は、また別の日まで休ませよう。'),
        l('I will carry ' + route.focus.en.toLowerCase() + ' with me and let the evening end.', '「' + route.focus.ja + '」を抱えたまま、今夜は終わりにする。'),
        l('One last thought about ' + route.focus.en.toLowerCase() + ', then I am going.', '「' + route.focus.ja + '」について最後に一つだけ言って、今日は帰る。'),
      ]
    : phase === 0 && sessionIndex > 0
      ? [
          l('Tell me what happened before ' + route.focus.en.toLowerCase() + '.', '「' + route.focus.ja + '」の前に何があったか教えて。'),
          l('Keep a little of ' + route.focus.en.toLowerCase() + ' for me.', '「' + route.focus.ja + '」を少しだけ僕のために残しておいて。'),
          l('I can picture ' + route.focus.en.toLowerCase() + '. Send me the part you did not photograph.', '「' + route.focus.ja + '」が浮かぶ。写真に写らなかった部分を送って。'),
        ]
      : [
          l('Tell me more about ' + route.focus.en.toLowerCase() + '.', '「' + route.focus.ja + '」について、もう少し教えて。'),
          l('I remember ' + route.focus.en.toLowerCase() + '. Keep going.', '「' + route.focus.ja + '」を覚えてる。続けて。'),
          l('I am here with ' + route.focus.en.toLowerCase() + ', even if the answer is unfinished.', '答えが未完成でも、「' + route.focus.ja + '」と一緒にここにいるよ。'),
      ];
  return copies.map((copy, index) => {
    const effectiveIndex = phase === 2 ? (index + branchIndex) % 3 : index;
    const response = replyFor(characterId, roundIndex, { id: 'preview', english: copy.en, japanese: copy.ja, responseEnglish: '', responseJapanese: '' }, effectiveIndex, route, sessionIndex, phase);
    return {
      id: characterId + '-' + gender + '-' + roundIndex + '-' + index,
      japanese: copy.ja,
      english: copy.en,
      responseEnglish: response.en,
      responseJapanese: response.ja,
    };
  });
}

export function getConversationRound(characterId: CharacterId, roundIndex: number, gender: UserGender = 'female', history: ConversationHistory = []): ConversationRound | undefined {
  const route = relationshipRoutes[characterId]?.[gender];
  if (!route || roundIndex < 0 || roundIndex >= RELATIONSHIP_ROUND_COUNT) return undefined;
  const sessionIndex = Math.floor(roundIndex / SESSION_ROUND_SIZE);
  const phase = roundIndex % SESSION_ROUND_SIZE;
  const prompt = promptFor(route, roundIndex, history);
  const photo = phase === 0 && sessionIndex > 0 ? activePhoto(route, sessionIndex) : undefined;
  const round: ConversationRound = {
    id: 'relationship-' + characterId + '-' + gender + '-' + roundIndex,
    promptEnglish: prompt.en,
    promptJapanese: prompt.ja,
    choices: choicesFor(characterId, gender, roundIndex, route, sessionIndex, phase, history),
    turnType: phase === 3 ? (sessionIndex % 2 === 1 ? 'goodnight' : 'invite') : phase === 0 && sessionIndex > 0 ? 'share' : phase === 1 ? 'share' : 'statement',
    isCustom: true,
    photo,
  };
  if (photo) {
    round.sessionLabelEnglish = sessionIndex % 2 === 1 ? 'A new morning' : 'Later that week';
    round.sessionLabelJapanese = sessionIndex % 2 === 1 ? '新しい朝' : 'その週の別の日';
  }
  return round;
}

export function buildConversationReply(
  characterId: CharacterId,
  roundIndex: number,
  choiceId: string | undefined,
  gender: UserGender = 'female',
  history: ConversationHistory = [],
  userText = '',
) {
  const round = getConversationRound(characterId, roundIndex, gender, history);
  if (!round) return undefined;
  const typedText = userText.trim();
  const typedChoiceIndex = customChoiceIndex(typedText || choiceId || characterId);
  const selectedChoice = choiceId ? round.choices.find((candidate) => candidate.id === choiceId) : undefined;
  const choice = selectedChoice ?? round.choices[typedChoiceIndex] ?? round.choices[0];
  if (!choice) return undefined;
  const customChoice: ConversationChoice = {
    id: characterId + '-custom-' + roundIndex + '-' + typedChoiceIndex,
    japanese: typedText,
    english: typedText,
    responseEnglish: '',
    responseJapanese: '',
  };
  const responseChoice = selectedChoice || customChoice;
  const response = !selectedChoice && round.turnType !== 'goodnight' && round.turnType !== 'invite'
    ? getCharacterReaction(characterId, roundIndex, typedChoiceIndex, customChoice)
    : [choice.responseEnglish, choice.responseJapanese] as const;
  const nextHistory = [...history];
  nextHistory[roundIndex] = responseChoice.id;
  const nextRound = getConversationRound(characterId, roundIndex + 1, gender, nextHistory);
  return {
    id: characterId + '-relationship-reply-' + roundIndex + '-' + choice.id,
    choiceId: responseChoice.id,
    text: response[0],
    translation: { english: [response[0]], japanese: [response[1]] },
    nextPrompt: nextRound ? {
      id: nextRound.id,
      text: nextRound.promptEnglish,
      translation: { english: [nextRound.promptEnglish], japanese: [nextRound.promptJapanese] },
      photo: nextRound.photo,
      sessionLabelEnglish: nextRound.sessionLabelEnglish,
      sessionLabelJapanese: nextRound.sessionLabelJapanese,
    } : undefined,
  };
}

export function getRelationshipNote(characterId: CharacterId, gender: UserGender = 'female'): Line {
  return relationshipRoutes[characterId][gender].relation;
}
