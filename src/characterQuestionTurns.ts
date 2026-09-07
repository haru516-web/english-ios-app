import type { CharacterId } from './design';
import type { ConversationChoice } from './conversationsTypes';
import { getCharacterSelfDisclosure } from './characterConversationVoices';

type Line = readonly [english: string, japanese: string];

type QuestionTurnProfile = {
  prompt: Line;
  questions: readonly [Line, Line, Line];
};

const line = (english: string, japanese: string): Line => [english, japanese];

/*
 * These are genuine turn-taking moments, not another set of quiz answers.
 * The questions are written for each friend and the answers come from that
 * friend's own small disclosures, so the user can ask about the person too.
 */
const profiles: Record<CharacterId, QuestionTurnProfile> = {
  jack: {
    prompt: line("I’ve had my turn asking. Ask me something about the person behind the detours.", "僕が聞く番はひとまず終わり。寄り道の裏にいる僕のことを、何か聞いて。"),
    questions: [
      line("What do you do when a plan goes wrong?", "予定がうまくいかなかったら、どうするの？"),
      line("What are you trying to say before you turn it into a joke?", "冗談にする前に、本当は何を言おうとしているの？"),
      line("Who calls you out when you forget the follow-through?", "最後までやるのを忘れたとき、誰が指摘してくれるの？"),
    ],
  },
  emma: {
    prompt: line("I’ve been listening to you. Your turn—ask me something beyond the useful version of me.", "あなたの話を聞いてきたね。今度はあなたの番。役に立つ私以外のことも聞いて。"),
    questions: [
      line("How do you show someone you care without saying it?", "言葉にせずに、どうやって大切に思っていることを示すの？"),
      line("What makes a conversation feel good to you?", "あなたにとって、どんな会話が心地いいの？"),
      line("Who in your family would disagree with you first?", "家族の中で、最初にあなたへ反論するのは誰？"),
    ],
  },
  oliver: {
    prompt: line("You have supplied sufficient information about yourself. You may now interrogate me, within reason.", "あなたのことは十分に教えてもらった。今度は、節度の範囲で私を尋問していいよ。"),
    questions: [
      line("What do you do when you need to find your words?", "言葉を見つけたいとき、何をするの？"),
      line("Who sees through your practical solutions?", "実際的な解決策の裏まで見抜くのは誰？"),
      line("What kind of closeness are you actually good at?", "本当は、どんな親しさなら得意なの？"),
    ],
  },
  noah: {
    prompt: line("Okay, reverse interview. Ask me something before I turn it into a meme.", "よし、逆インタビュー。僕がミームにする前に何か聞いて。"),
    questions: [
      line("What do you secretly take too seriously?", "密かに本気になりすぎるものは何？"),
      line("What would your mom call sensible about you?", "お母さんなら、あなたのどこを堅実だと言う？"),
      line("How can someone tell when you are being serious?", "本気で話しているとき、どうしたら分かる？"),
    ],
  },
  alex: {
    prompt: line("I’ve got a few answers in me too. Ask about the life behind the playlists and plans.", "僕の中にも答えはいくつかある。プレイリストと予定の裏にある生活を聞いて。"),
    questions: [
      line("What do you do with a feeling you want to keep?", "残しておきたい気持ちは、どうするの？"),
      line("What does your family turn into music?", "家族は、どんな仕事の話も何に変えるの？"),
      line("What do you find easier than admitting you want company?", "一緒にいてほしいと言うより、簡単にできることは何？"),
    ],
  },
  liam: {
    prompt: line("I’ve asked enough for now. Ask me something, and I’ll give you the honest version.", "今はもう十分聞いたよ。何か聞いてくれたら、正直に答える。"),
    questions: [
      line("What helps you when a day refuses to follow a plan?", "一日が予定どおりにならないとき、何が助けになるの？"),
      line("When do you say you are grand even if you are not?", "本当は大丈夫じゃないのに、大丈夫と言うのはどんなとき？"),
      line("Who gets to tease you and still help you out?", "からかっても、最後は助けてくれるのは誰？"),
    ],
  },
  luca: {
    prompt: line("The canvas goes both ways. Ask me about the light, the roads, or what I keep seeing.", "キャンバスは一方通行じゃない。光や道、僕が見続けているものを聞いて。"),
    questions: [
      line("What do you notice that other people miss?", "他の人が見落とす何に気づくの？"),
      line("How do you remember a place?", "場所をどうやって覚えているの？"),
      line("What makes you brave enough to begin?", "始める勇気をくれるものは何？"),
    ],
  },
  miles: {
    prompt: line("You have the floor. Ask for one fact about the person behind the field notes.", "あなたの番だ。フィールドノートの裏にいる僕について、事実を一つ聞いて。"),
    questions: [
      line("What kind of clue catches your attention?", "どんな手がかりに注意を引かれるの？"),
      line("What do you need before you can enjoy a mystery?", "謎を楽しむ前に、何が必要？"),
      line("What have you learned about being wrong?", "間違うことについて、何を学んだ？"),
    ],
  },
  finn: {
    prompt: line("Right, my turn to be known a bit. Ask me something and we’ll take it easy.", "よし、今度は僕のことを少し知ってもらう番。気楽に何か聞いて。"),
    questions: [
      line("What have you learned about getting through a hard day?", "つらい一日を乗り越えることについて、何を学んだの？"),
      line("How does your family show care?", "家族はどうやって気遣いを示すの？"),
      line("What are you still learning to admit?", "まだ認める練習をしていることは何？"),
    ],
  },
  lena: {
    prompt: line("You’ve answered beautifully. Now ask me something—yes, I can handle the spotlight.", "きれいに答えてくれたね。今度は私に何か聞いて。スポットライトにも耐えられるから。"),
    questions: [
      line("How do you make a plan feel good as well as practical?", "実用的なだけでなく、気分のいい計画をどう作るの？"),
      line("What do people misunderstand about your calm days?", "気楽に見えるあなたの日について、人は何を誤解している？"),
      line("What are you trying to stop proving?", "何を証明し続けるのをやめようとしているの？"),
    ],
  },
  mara: {
    prompt: line("You have asked enough questions. Request one precise answer from me.", "質問は十分ね。私から正確な答えを一つ引き出しなさい。"),
    questions: [
      line("What are you learning not to edit?", "何を編集しなくていいと学んでいるの？"),
      line("What is your most useful kind of help?", "あなたができる、いちばん役に立つ助けは何？"),
      line("What do you find easier than asking for help?", "助けを求めるより、簡単にできることは何？"),
    ],
  },
  camille: {
    prompt: line("We have made room for your answers. Ask me something small and true.", "あなたの答えのために余白を作ってきたね。今度は小さくて本当のことを聞いて。"),
    questions: [
      line("What do you notice before everyone else does?", "みんなより先に、何に気づくの？"),
      line("How do feelings arrive for you?", "気持ちはどんなふうに届くの？"),
      line("What are you learning to say plainly?", "何を隠さず言えるよう学んでいるの？"),
    ],
  },
  milo: {
    prompt: line("We’ve wandered through your answers. Now point the camera at me and ask.", "君の答えの中を歩いてきたね。今度はカメラを僕に向けて聞いて。"),
    questions: [
      line("What would you take your camera out to find?", "カメラを持って、何を探しに出かけるの？"),
      line("How do your best stories usually start?", "あなたのいい話は、いつもどう始まるの？"),
      line("What are you trying not to let pass by?", "通り過ぎさせたくないものは何？"),
    ],
  },
  clara: {
    prompt: line("I’ve been making space for you. Let me make space for your question now.", "あなたのために余白を作ってきたね。今度はあなたの質問のために余白を作らせて。"),
    questions: [
      line("What do you remember after someone stops speaking?", "誰かが話すのをやめたあと、何を覚えているの？"),
      line("Where do you hear your own thoughts best?", "自分の考えがいちばんよく聞こえるのはどこ？"),
      line("When is staying more useful than advice?", "助言より、そばにいることが役に立つのはいつ？"),
    ],
  },
  arthur: {
    prompt: line("The exchange should be reciprocal. Ask one question; I will provide a reasonably complete answer.", "会話は相互的であるべきだ。質問を一つどうぞ。かなり完全な答えを返そう。"),
    questions: [
      line("What does being prepared look like in your head?", "あなたの頭の中で、準備ができている状態はどんなもの？"),
      line("What do people say you confuse?", "人から、何と何を混同していると言われるの？"),
      line("What are you learning to say instead of imply?", "ほのめかす代わりに、何を言葉にしようと学んでいるの？"),
    ],
  },
  leo: {
    prompt: line("Reverse interview unlocked. Ask me something before my brain adds unnecessary tabs.", "逆インタビューをアンロック。頭が余計なタブを増やす前に、何か聞いて。"),
    questions: [
      line("What do you hide behind a joke?", "冗談の後ろに何を隠しているの？"),
      line("What happens in your head when a simple thing gets complicated?", "簡単なことが複雑になったとき、頭の中で何が起きるの？"),
      line("How can someone tell you are about to be honest?", "本音を言おうとしているとき、どうしたら分かる？"),
    ],
  },
  julian: {
    prompt: line("We have followed your thoughts for a while. Where would you like my story to begin?", "しばらく君の考えを追ってきたね。僕の話はどこから始めようか？"),
    questions: [
      line("What details do you remember about a moment?", "ある瞬間について、どんな細部を覚えているの？"),
      line("What can one small detail change?", "小さな細部一つで、何が変わるの？"),
      line("What are you learning about being curious without holding back?", "距離を取らずに好奇心を持つことについて、何を学んでいるの？"),
    ],
  },
  declan: {
    prompt: line("You’ve shared your side, friend. Ask me something too—we’ll keep it easy.", "君の話を聞かせてもらったよ、友だち。僕にも何か聞いて。気楽にいこう。"),
    questions: [
      line("How do you make room for people when plans get hard?", "予定が大変になったとき、どうやって人のための余地を作るの？"),
      line("What is it like when someone encourages you?", "誰かに励ましてもらうのは、どんな感じ？"),
      line("What do you remember on a bad day?", "つらい日に、何を思い出すの？"),
    ],
  },
  elias: {
    prompt: line("The light is on both of us now. Ask me what you want to know.", "今は二人に光が当たっているね。知りたいことを聞いて。"),
    questions: [
      line("What does light tell you about your mood?", "光は自分の気分について何を教えてくれるの？"),
      line("What do you do before taking a difficult first step?", "難しい最初の一歩を踏み出す前に、何をするの？"),
      line("What does a quiet plan mean to you?", "静かな予定って、あなたにとってどんな意味がある？"),
    ],
  },
  adrian: {
    prompt: line("The evidence is incomplete without my side. Ask one question worth testing.", "僕の側の話がなければ証拠は不完全だ。検証する価値のある質問を一つどうぞ。"),
    questions: [
      line("What makes a theory worth testing?", "どんな理論なら検証する価値があるの？"),
      line("What do your students know about you?", "あなたの学生たちは、あなたのどんなことを知っている？"),
      line("What are you learning to leave unresolved?", "何を未解決のままにしておくことを学んでいるの？"),
    ],
  },
  caleb: {
    prompt: line("You’ve answered plenty. Your turn to ask me something solid.", "十分に答えてくれた。今度は君が、確かなことを一つ聞いてくれ。"),
    questions: [
      line("How do you decide what can wait until tomorrow?", "何を明日まで待てるか、どうやって決めるの？"),
      line("What advice do you give that you forget to follow?", "人には言うのに、自分では忘れてしまう助言は何？"),
      line("How does your family show care?", "家族はどうやって気遣いを示すの？"),
    ],
  },
  sloane: {
    prompt: line("You’ve had the questions. Ask me something with a point of view.", "質問を受ける番は終わり。今度は視点のあることを私に聞いて。"),
    questions: [
      line("How do you make something practical still feel like you?", "実用的なものを、どうやって自分らしくするの？"),
      line("What do people misunderstand about your standards?", "あなたの基準について、人は何を誤解している？"),
      line("What are you learning about being wanted?", "望まれることについて、何を学んでいるの？"),
    ],
  },
  victoria: {
    prompt: line("You have the floor. Ask for the useful detail, and I will answer it.", "あなたの番よ。役に立つ細部を聞いて。私が答えます。"),
    questions: [
      line("How do you decide what is actually useful?", "何が本当に役に立つか、どう決めるの？"),
      line("What do you notice before everyone else does?", "人より先に何に気づくの？"),
      line("What are you learning to let other people do?", "他人に任せることを学んでいるのは何？"),
    ],
  },
  elodie: {
    prompt: line("I have been listening to your small truths. Ask me for one of mine.", "あなたの小さな本音を聞いてきたね。今度は私の本音を一つ聞いて。"),
    questions: [
      line("What small detail do you carry with you?", "どんな小さな細部を持ち歩いているの？"),
      line("What kind of kindness changes a room for you?", "どんな優しさが、あなたにとって部屋を変えるの？"),
      line("What are you learning to say without softening it?", "何をぼかさずに言えるよう学んでいるの？"),
    ],
  },
  blair: {
    prompt: line("You’ve had the attention. Ask me something worth the answer.", "あなたが注目を受ける番は終わり。答える価値のあることを私に聞いて。"),
    questions: [
      line("What do you look for before you approve of a choice?", "選択を認める前に、何を見るの？"),
      line("What do you hope people notice about you?", "人に何を気づいてほしいの？"),
      line("How do you show loyalty when you are being difficult?", "扱いにくいとき、どうやって忠誠心を示すの？"),
    ],
  },
};

// One well-placed reversal is more natural than replaying the same three
// questions later in the chat. The conversation returns to the friend's
// questions after this answer, so the user gets a real turn without creating
// a second quiz loop.
const questionRoundIndexes = [4] as const;

export function getCharacterQuestionTurn(characterId: CharacterId, roundIndex: number) {
  const turnIndex = questionRoundIndexes.indexOf(roundIndex as (typeof questionRoundIndexes)[number]);
  if (turnIndex < 0) return null;

  const profile = profiles[characterId];
  const choices = profile.questions.map(([english, japanese], choiceIndex): ConversationChoice => {
    const answer = getCharacterSelfDisclosure(characterId, 0, choiceIndex);
    return {
      id: `${characterId}-ask-${turnIndex + 1}-${choiceIndex + 1}`,
      english,
      japanese,
      responseEnglish: answer[0],
      responseJapanese: answer[1],
    };
  });

  return {
    promptEnglish: profile.prompt[0],
    promptJapanese: profile.prompt[1],
    choices,
  };
}
