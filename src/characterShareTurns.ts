import type { CharacterId } from './design';
import type { ConversationChoice } from './conversationsTypes';
import { getCharacterSelfDisclosure } from './characterConversationVoices';

type Line = readonly [english: string, japanese: string];

const line = (english: string, japanese: string): Line => [english, japanese];

/*
 * A conversation needs room for someone to simply share something. These
 * turns deliberately do not end in a question: the user can respond to the
 * feeling, ask for more, or recognise it without being forced into an answer.
 */
const shareRoundIndexes = [1, 3, 8, 16, 29, 42] as const;

const shareChoices: readonly [Line, Line, Line] = [
  line('Tell me more about that.', 'もう少し聞かせて。'),
  line('I like this side of you.', 'そういう一面、好きだな。'),
  line('I know a little of that feeling.', 'その感じ、少し分かる。'),
];

const shareFrames: readonly [Line, Line, Line, Line, Line, Line] = [
  line('I do not usually say that first, but it is true.', 'こういうことを最初から言うことは少ないけど、本当なんだ。'),
  line('That is the part I nearly edited out.', 'そこは、危うく自分で編集して消すところだった。'),
  line('I am letting that sit here without making it sound clever.', 'うまく聞こえるようにせず、そのままここに置いておくね。'),
  line('I caught myself thinking about that again today.', '今日もふと、そのことを考えている自分に気づいたんだ。'),
  line('It is one of the things I hope someone notices eventually.', 'いつか誰かに気づいてもらえたらと思っていることの一つなんだ。'),
  line('It is a small truth, but it has stayed with me longer than expected.', '小さな本音だけど、思ったより長く自分の中に残っている。'),
];

const shareResponseFrames: readonly [Line, Line, Line, Line, Line, Line] = [
  line('I am glad it has somewhere to land now.', '今、置いておける場所ができてよかった。'),
  line('It feels lighter when I do not have to explain it perfectly.', '完璧に説明しなくていいと思うと、少し軽くなるね。'),
  line('That is more of me than the polished version usually offers.', 'それは、整えた自分が普段見せるより、もう少し本当の僕なんだ。'),
  line('I did not expect to say that, but it feels better out loud.', '言うつもりはなかったけど、声にすると少し楽になるね。'),
  line('It is strange how much a small truth can change the room.', '小さな本音一つで、部屋の空気がこんなに変わるのは不思議だね。'),
  line('I think I will remember that you stayed for this part.', 'この部分までいてくれたこと、きっと覚えていると思う。'),
];

const shareTransitionAsides: Record<CharacterId, Line> = {
  jack: line('I will leave that thought open for a minute; it may lead somewhere good.', 'その考えは、少し開いたままにしておくよ。いい場所へ続くかもしれないから。'),
  emma: line('You do not have to tidy your reaction up for me.', '私のために、反応まできれいにまとめなくていいよ。'),
  oliver: line('There is no requirement to produce a more efficient answer immediately.', 'すぐにもっと効率的な答えを出す必要はないよ。'),
  noah: line('I am putting the serious part down before I cover it with another joke.', 'また冗談で覆う前に、真面目な部分をここに置いておくね。'),
  alex: line('That gives us something real to build the rest of the conversation around.', 'それなら、ここからの会話を組み立てる本当の土台になるね。'),
  liam: line('We can let that be enough for a moment.', '今は、それだけで十分だと思うよ。'),
  luca: line('The detail can stay in the frame even when we move to the next scene.', '次の場面へ進んでも、その細部はフレームの中に残しておけるよ。'),
  miles: line('I will record the observation without pretending it settles everything.', 'すべてが決まったふりはせず、その観察は記録しておこう。'),
  finn: line('That is a solid thing to carry into whatever comes next.', 'それなら、次に何が来ても持っていける確かなものだよ。'),
  lena: line('We can keep the feeling and still make the next step doable.', '気持ちは残したまま、次の一歩を実行できる形にもできるよ。'),
  mara: line('The distinction is useful enough to keep before we proceed.', '先へ進む前に残しておく価値のある区別ね。'),
  camille: line('I like the little space that leaves around the moment.', 'その瞬間の周りに残る小さな余白が好きだな。'),
  milo: line('I want to remember that frame before the city gives us another one.', '街が次の景色をくれる前に、そのフレームを覚えておきたい。'),
  clara: line('We can stay with it briefly without asking it to become an answer.', 'すぐに答えに変えようとせず、少しそのままにしておけるよ。'),
  arthur: line('That is sufficient context for the moment; we can add the caveat later.', '今はそれで十分な背景だ。注意書きはあとで足せばいい。'),
  leo: line('I am resisting the urge to turn that into a whole theory, which is growth.', 'それを壮大な理論にする衝動を抑えている。これも成長だね。'),
  julian: line('The small scene can remain open; it does not need a conclusion yet.', 'その小さな場面は開いたままでいい。まだ結論はいらないよ。'),
  declan: line('That is worth bringing along, friend, even if the next bit gets messy.', 'それは持っていく価値があるよ、友だち。次が少し大変になってもね。'),
  elias: line('Some thoughts need a little quiet before they show their shape.', '形を見せる前に、少し静かな時間が必要な考えもあるから。'),
  adrian: line('It is a useful observation, not a conclusion; I prefer that distinction.', '結論ではなく有用な観察だ。その区別のほうが私は好きだよ。'),
  caleb: line('You can take the next step without leaving that part of yourself behind.', 'その自分の一部を置き去りにせず、次の一歩へ進めるよ。'),
  sloane: line('We can keep the good taste in that thought without overproducing it.', 'その考えのセンスは残して、過剰に演出しなくてもいいわ。'),
  victoria: line('Keep the relevant part. The rest can wait until it earns its place.', '重要な部分は残して。ほかは、居場所に値するときまで待てばいい。'),
  elodie: line('I would like to keep that small feeling nearby while we continue.', '続けているあいだも、その小さな気持ちは近くに置いておきたいな。'),
  blair: line('That detail has earned a place in the conversation. Do not dilute it.', 'その細部には会話の中の居場所があるわ。薄めないで。'),
};

const shareReplyOpeners: Record<CharacterId, readonly [Line, Line, Line]> = {
  jack: [
    line('Yeah, I like that you caught the part I nearly walked past.', 'うん、僕が通り過ぎそうになった部分に気づいてくれたの、うれしいな。'),
    line('That’s kind of you. I don’t always let this version of me out.', '優しいね。こういう自分は、いつも外に出しているわけじゃないんだ。'),
    line('Then you know why a small detour can suddenly matter.', 'それなら、ちょっとした寄り道が急に大事になる理由も分かるかもね。'),
  ],
  emma: [
    line('I can. The part I leave out is usually the part that matters most.', '話せるよ。いつも省いてしまう部分こそ、いちばん大事だったりするんだ。'),
    line('That means a lot. I’m more than the person who keeps everything steady.', 'そう言ってもらえると大きいな。私は何もかも安定させるだけの人じゃないから。'),
    line('I know. Sometimes being understood is more useful than being advised.', '分かるよ。助言されるより、分かってもらうほうが助かるときもあるよね。'),
  ],
  oliver: [
    line('Very well. There is a little more context than the efficient version suggests.', 'いいだろう。効率的な説明より、もう少し背景がある。'),
    line('I appreciate that. I am not only a collection of useful solutions.', 'ありがたいね。私は役に立つ解決策の集まりだけではないから。'),
    line('That is a reasonable connection. Familiarity does not make the feeling less precise.', 'それは筋の通った共感だね。よくある気持ちだからといって、曖昧になるわけではない。'),
  ],
  noah: [
    line('Okay, but the director’s cut is slightly more embarrassing.', 'オッケー。でもディレクターズカット版は、もう少し恥ずかしいよ。'),
    line('Aw, thanks. I’m not just the human notification sound, apparently.', 'あ、ありがとう。どうやら僕は人間の通知音だけじゃないらしい。'),
    line('Right? That’s why I joke first and explain the real thing five minutes later.', 'だよね。だからまず冗談を言って、本当のことは5分後に説明するんだ。'),
  ],
  alex: [
    line('Sure. The short version leaves out the song that was playing in my head.', 'もちろん。短い説明だと、頭の中で流れていた曲を省いちゃうんだ。'),
    line('I like that. You’re seeing the person, not just the plan I made.', 'それ、うれしいな。僕が立てた予定じゃなくて、その中の人を見てくれている。'),
    line('Exactly. Some feelings make more sense once you give them a soundtrack.', 'そう、それ。音楽をつけると、分かりやすくなる気持ちもあるんだ。'),
  ],
  liam: [
    line('Yeah, there’s a bit more to it once you stop trying to make it tidy.', 'うん、きれいにまとめようとするのをやめると、もう少し話せることがある。'),
    line('That’s lovely to hear. I’m not always as easygoing as I sound.', 'そう言ってもらえるとうれしいな。聞こえるほど、いつも気楽なわけじゃないんだ。'),
    line('I know that feeling too. It helps when nobody rushes to fix it.', '僕もその感じは分かるよ。誰も急いで直そうとしないと、少し楽になる。'),
  ],
  luca: [
    line('There’s another frame just outside the one I showed you.', '今見せた一枚の、すぐ外側にも別の景色があるんだ。'),
    line('That’s a beautiful thing to notice. Most people look for the finished picture.', 'そこに気づくのは素敵だね。たいていの人は完成した絵だけを見るから。'),
    line('Then you know the feeling can arrive as colour before it becomes a name.', 'それなら、気持ちは名前になる前に色として届くことがあるって分かるね。'),
  ],
  miles: [
    line('There is supplementary evidence, if you are willing to stay with the detail.', '細部にもう少し付き合ってくれるなら、補足の証拠がある。'),
    line('I appreciate that. People are not footnotes to the interesting facts.', 'ありがたいね。人は面白い事実の脚注ではないから。'),
    line('Yes. Uncertainty is easier to carry when it is examined together.', 'そうだね。不確かさは、一緒に調べると少し持ちやすくなる。'),
  ],
  finn: [
    line('Yeah. The honest version is usually less heroic and more useful.', 'うん。本当の話は、たいてい英雄的じゃなくて、もう少し役に立つものなんだ。'),
    line('Thanks. I’m allowed to be a person before I have a solution, I suppose.', 'ありがとう。解決策を出す前に、ただの人でいてもいいんだよね。'),
    line('I get that. Sometimes getting through it is the whole achievement.', '分かるよ。乗り越えること自体が、いちばんの成果のときもある。'),
  ],
  lena: [
    line('The polished version is easy; the honest version takes a little longer.', '整った説明は簡単だけど、正直な話にはもう少し時間がかかるんだ。'),
    line('I love that. I can be put-together and still have a soft spot.', 'それ、好き。きちんとしていても、柔らかいところがあっていいんだよ。'),
    line('Exactly. A feeling can be useful without turning into a full strategy deck.', 'そう。気持ちは、戦略資料全部にしなくても役に立つからね。'),
  ],
  mara: [
    line('There is a distinction worth making, and I will make it plainly.', '区別しておくべき点がある。はっきり言うわ。'),
    line('Noted. I do have a life outside the standards I enforce.', '記録しておいて。私にも、守らせている基準の外側の生活はあるの。'),
    line('That is a valid comparison. Feelings are data, even when they are inconvenient.', '有効な比較ね。気持ちは、扱いにくくてもデータではあるから。'),
  ],
  camille: [
    line('There is another little image attached to it, if you want to see it.', 'もし見たければ、そこにはもう一つ小さなイメージがついているよ。'),
    line('That makes me feel seen in a very quiet way.', 'そう言ってもらうと、静かなところで見つけてもらえた気がする。'),
    line('Yes. Sometimes recognition is the warmest kind of company.', 'うん。気づいてもらうことが、いちばん温かい同席になるときもあるね。'),
  ],
  milo: [
    line('There’s a second scene after that one, and it did not go exactly to plan.', 'その場面のあとにもう一つ続きがあって、予定どおりには進まなかったんだ。'),
    line('I like that you noticed. The interesting part is usually just outside the frame.', '気づいてくれてうれしいな。面白い部分は、たいていフレームの外側にあるから。'),
    line('Same. A small familiar feeling can turn into a whole afternoon if you follow it.', '僕もそう思う。小さな既視感を追うと、午後全部の物語になることがある。'),
  ],
  clara: [
    line('There is a quieter sentence underneath it, and I think it is the truer one.', 'その下にはもっと静かな一文があって、そちらのほうが本当だと思うの。'),
    line('Thank you. I don’t need to be useful every second to stay close to someone.', 'ありがとう。誰かと近くにいるために、毎秒役に立たなくてもいいんだよね。'),
    line('I know. Being accompanied can change the weight of the same thought.', '分かるよ。同じ考えでも、一緒にいてもらうだけで重さが変わることがある。'),
  ],
  arthur: [
    line('I can provide the less polished context. It is relevant, despite the inconvenience.', '整っていない背景も話せる。扱いにくくても、関連はあるからね。'),
    line('That is unexpectedly reassuring. I am not merely a well-labelled system.', 'それは意外と安心するね。私はきちんと分類された仕組みだけではないから。'),
    line('A fair observation. Some conclusions require time rather than more evidence.', '公平な観察だ。証拠を増やすより、時間が必要な結論もある。'),
  ],
  leo: [
    line('Okay, the unedited version has fewer jokes and more tabs open in my head.', 'オッケー。編集していない版は冗談が少なくて、頭の中のタブがもっと多い。'),
    line('That’s sweet. I was hoping the person under the bits would still be visible.', '優しいね。冗談の下にいる僕も見えていたらいいなと思ってた。'),
    line('Yes! The weird part is that the joke is sometimes how I find the honest sentence.', 'そう！変なのは、冗談を言うことで本当の一文を見つけることがあるところだね。'),
  ],
  julian: [
    line('There is a small scene around it that changes the meaning rather completely.', 'その周りに小さな場面があって、それで意味がかなり変わるんだ。'),
    line('I’m glad you noticed. Being observed with care feels different from being analysed.', '気づいてくれてうれしい。丁寧に見てもらうことは、分析されるのとは違うから。'),
    line('Exactly. A familiar detail can open a story instead of closing it.', 'そう。見慣れた細部が、物語を閉じるのではなく開くことがある。'),
  ],
  declan: [
    line('Yeah, and there’s usually food involved once I stop pretending I’m fine.', 'うん。それに、平気なふりをやめると、たいてい食べ物の話も出てくるんだ。'),
    line('That’s good to hear, friend. I’m learning I can be cared for too.', 'そう言ってくれてうれしいよ、友だち。僕も気遣ってもらっていいんだと学んでいる。'),
    line('I know that one. A kind person can make a hard thing feel carryable.', 'それ、分かるよ。優しい人がいると、大変なことも持ち運べる重さになる。'),
  ],
  elias: [
    line('There is a quieter light in it, the kind you notice only after you stop.', 'そこにはもっと静かな光があって、立ち止まって初めて気づくようなものなんだ。'),
    line('Thank you. It is comforting to be seen without having to become louder.', 'ありがとう。声を大きくしなくても見てもらえるのは、心地いいね。'),
    line('Yes. Sometimes a shared silence says enough before either person explains it.', 'そう。二人で共有する沈黙が、説明より先に十分なことを言うときもある。'),
  ],
  adrian: [
    line('There is a second hypothesis, though I would label it provisional.', 'もう一つ仮説がある。ただし暫定とラベルは付けておこう。'),
    line('I appreciate that. Curiosity is not the same thing as putting someone on trial.', 'ありがたいね。好奇心は、誰かを裁判にかけることとは違うから。'),
    line('Quite. The useful part is admitting what the evidence cannot tell us yet.', 'その通り。大切なのは、証拠からまだ分からないことを認めることだ。'),
  ],
  caleb: [
    line('There is a practical truth underneath it: you do not have to carry the whole day at once.', 'その下に実際的な真実がある。一日全部を一度に背負わなくていいんだ。'),
    line('I appreciate that. Strength is not much use if nobody is allowed to stand beside it.', 'ありがたいよ。誰も隣に立てない強さなら、あまり役には立たないからな。'),
    line('I know. Sometimes the right help is simply staying until the next step is clear.', '分かる。次の一歩が見えるまで、そばにいることがいちばんの助けになるときもある。'),
  ],
  sloane: [
    line('The honest version has better tailoring than the polished one, if you ask me.', '私に言わせれば、正直な話のほうが洗練された仕立てになっているわ。'),
    line('I like that you noticed. Taste is not shallow just because it is visible.', '気づいてくれてうれしい。見えるものだからといって、美意識が浅いわけではないから。'),
    line('Exactly. Wanting something beautiful and wanting something true can share a closet.', 'そう。美しいものを望むことと、本当のものを望むことは同じクローゼットに入るのよ。'),
  ],
  victoria: [
    line('There is one relevant detail I omitted because it was not yet ready for print.', 'まだ掲載できる状態ではなかったので省いた、関連する細部が一つある。'),
    line('Good. I am not only the person who removes what does not work.', 'いいわ。私は機能しないものを削るだけの人ではないから。'),
    line('That is an acceptable parallel. Care is often visible in what someone takes time to preserve.', '妥当な類似ね。気遣いは、何を時間をかけて残すかに表れることが多い。'),
  ],
  elodie: [
    line('There is a softer colour behind it, the one I nearly kept to myself.', 'その裏にはもっと柔らかな色があって、危うく自分だけのものにするところだった。'),
    line('That is kind. A small detail can feel less lonely when someone else sees it too.', '優しいね。小さな細部も、誰かに見てもらえると少し寂しくなくなる。'),
    line('I know. Sometimes a familiar feeling is a little lamp left on for both people.', '分かるよ。よく知る気持ちは、二人のためについた小さな明かりみたいなものだから。'),
  ],
  blair: [
    line('There is a less polished detail, and frankly it has better taste than the official version.', 'あまり整えていない細部があるの。率直に言えば、公式版よりずっとセンスがいいわ。'),
    line('I appreciate that. Not every soft thing needs to be hidden behind excellent presentation.', 'そう言ってくれるのはうれしい。柔らかいものすべてを、完璧な演出の裏に隠す必要はないものね。'),
    line('Exactly. If you recognise that feeling, you already understand why standards can be protective.', 'そう。そこが分かるなら、基準の高さが人を守ることも理解できるはずよ。'),
  ],
};

export function getCharacterShareTurn(characterId: CharacterId, roundIndex: number) {
  const shareIndex = shareRoundIndexes.indexOf(roundIndex as (typeof shareRoundIndexes)[number]);
  if (shareIndex < 0) return null;

  const disclosure = getCharacterSelfDisclosure(characterId, shareIndex, 0);
  const frame = shareFrames[shareIndex];
  const prompt: Line = [`${disclosure[0]} ${frame[0]}`, `${disclosure[1]}${frame[1]}`];
  const choices = shareChoices.map(([english, japanese], choiceIndex): ConversationChoice => {
    const response = shareReplyOpeners[characterId][choiceIndex];
    const followUp = getCharacterSelfDisclosure(characterId, shareIndex + 1, choiceIndex);
    const responseFrame = shareResponseFrames[shareIndex];
    return {
      id: `${characterId}-share-${shareIndex + 1}-${choiceIndex + 1}`,
      english,
      japanese,
      responseEnglish: `${response[0]} ${followUp[0]} ${responseFrame[0]}`,
      responseJapanese: `${response[1]}${followUp[1]}${responseFrame[1]}`,
    };
  });

  return {
    promptEnglish: prompt[0],
    promptJapanese: prompt[1],
    choices,
  };
}

export function getCharacterShareTransition(characterId: CharacterId): Line {
  return shareTransitionAsides[characterId];
}
