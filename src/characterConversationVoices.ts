import type { CharacterId } from './design';
import type { ConversationChoice } from './conversationsTypes';

export type DialogueLine = readonly [english: string, japanese: string];

type CharacterConversationVoice = {
  reactions: readonly DialogueLine[];
  bridges: readonly DialogueLine[];
};

const voices: Record<CharacterId, CharacterConversationVoice> = {
  jack: {
    reactions: [
      ["{{answer}}? Yeah, I’d take that. Everything feels a little more possible when you start there.", "「{{answer}}」？うん、僕ならそれを選ぶな。そこから始めると、何でも少し可能になりそう。"],
      ["Okay, I can picture it now: {{answer}} and nowhere urgent to be.", "なるほど、もう景色が浮かぶよ。「{{answer}}」で、急ぐ用事はどこにもない感じ。"],
      ["That’s a good instinct. I’d follow {{answer}} and see what turns up.", "いい直感だね。「{{answer}}」についていって、何が見つかるか見てみたい。"],
      ["Honestly, {{answer}} tells me more than a polished answer would. I like that.", "正直、「{{answer}}」のほうが、きれいに整えた答えより君のことが分かる。そういうの、好きだな。"],
      ["I’d say yes to {{answer}}. There’s probably a story hiding in it somewhere.", "「{{answer}}」には賛成。どこかに、まだ見えていない物語が隠れていそう。"],
      ["Fair. I’ll remember {{answer}}—might have to test that with you sometime.", "なるほど。「{{answer}}」って覚えておくよ。いつか君と試してみないとね。"],
    ],
    bridges: [
      ["Now I’m curious—", "それで、ちょっと気になったんだけど——"],
      ["That makes me wonder—", "それを聞くと、こんなことも気になる——"],
      ["Tell me this—", "じゃあ、これを聞かせて——"],
      ["Okay, one more thing—", "じゃあ、もう一つだけ——"],
    ],
  },
  emma: {
    reactions: [
      ["{{answer}} feels like a morning you can actually live inside. I can see why you chose it.", "「{{answer}}」は、ちゃんとその中で暮らせそうな朝だね。選んだ理由が分かる気がする。"],
      ["I like that. It says you notice the people around you, not just the plan.", "いいね。予定だけじゃなく、周りにいる人にも気づいている答えだと思う。"],
      ["That answer has some backbone. You can be kind and still know what you need.", "芯のある答えだね。優しくても、自分に必要なものは分かっていていいんだよ。"],
      ["There’s something honest in {{answer}}. I’d want to hear the story behind it.", "「{{answer}}」には正直さがあるね。その答えの後ろにある話も聞きたくなる。"],
      ["Good choice. I’m filing that away for the next time you need a little steadiness.", "いい選択。君が少し落ち着きを必要とするときのために、覚えておくね。"],
      ["That makes sense. You don’t have to make a feeling sound more impressive than it is.", "なるほどね。気持ちは、実際より立派に聞こえるように説明しなくてもいいよ。"],
    ],
    bridges: [
      ["And I’m curious about this—", "それで、これも気になっているんだけど——"],
      ["That makes me want to ask—", "それを聞くと、こう聞きたくなる——"],
      ["Can I ask you something else?", "もう一つ聞いてもいい？"],
      ["On a quieter note—", "もう少し静かな話として——"],
    ],
  },
  oliver: {
    reactions: [
      ["{{answer}}. Sensible, and mercifully free of unnecessary drama.", "「{{answer}}」。堅実だね。余計なドラマがなくて、実に助かる。"],
      ["I can work with {{answer}}. It has a certain internal logic.", "「{{answer}}」なら話を進められる。ちゃんと筋が通っているね。"],
      ["That is a reasonable preference. I shall refrain from making a spreadsheet about it.", "それは合理的な好みだね。さすがに表計算までは作らないでおくよ。"],
      ["{{answer}} is a precise enough answer to be useful. I approve.", "「{{answer}}」は役に立つくらい正確な答えだね。異論はないよ。"],
      ["Fair enough. Even a questionable plan can be improved with one clear detail.", "なるほど。少し怪しい計画でも、明確な細部が一つあれば改善できる。"],
      ["I see the appeal of {{answer}}. It is less complicated than most alternatives, which is rare.", "「{{answer}}」のよさは分かる。たいていの選択肢より複雑でない。珍しいことだね。"],
    ],
    bridges: [
      ["A related question, then—", "では、関連する質問を一つ——"],
      ["That raises a useful point—", "そこから、有用な点が一つ浮かぶ——"],
      ["Let us test that idea—", "では、その考えをもう少し確かめよう——"],
      ["One more thing, if you do not mind—", "差し支えなければ、もう一つだけ——"],
    ],
  },
  noah: {
    reactions: [
      ["{{answer}}? Okay, that’s actually a solid answer. I respect it.", "「{{answer}}」？オッケー、それ、実際かなりいい答え。尊敬する。"],
      ["Wait, I love that. Also, why does {{answer}} sound like a side quest?", "待って、それ好き。あと、なんで「{{answer}}」ってサイドクエストの名前みたいなんだろう。"],
      ["Honestly, {{answer}} makes sense. My brain is giving it a thumbs-up.", "正直、「{{answer}}」は分かる。僕の脳が親指を立ててる。"],
      ["Noted. {{answer}} is going on the extremely unofficial list.", "了解。「{{answer}}」は、ものすごく非公式なリストに追加しておく。"],
      ["Yeah, I get it. {{answer}} would make a rough day less weird.", "うん、分かる。「{{answer}}」なら、変な一日も少しマシになりそう。"],
      ["That answer has good energy. Please tell me there’s a funny story attached.", "その答え、いいエネルギーがある。面白い話もセットでついてるよね。"],
    ],
    bridges: [
      ["Okay, follow-up because my brain is curious—", "オッケー、脳が気になってるから追加の質問——"],
      ["Wait, now I need to know—", "待って、今度はこれを知りたい——"],
      ["Tiny question, actually—", "実は小さな質問が一つ——"],
      ["Also, important—", "あと、これ大事——"],
    ],
  },
  alex: {
    reactions: [
      ["{{answer}}—yeah, I can build a good plan around that.", "「{{answer}}」ね。うん、それならいい計画を立てられそう。"],
      ["That’s a good call. It sounds doable, which is seriously underrated.", "いい判断だね。実行できそうって、かなり大事なのに過小評価されがちだよ。"],
      ["I like that. It has the right balance of effort and actually enjoying yourself.", "それ、いいね。頑張ることと、ちゃんと楽しむことのバランスがいい。"],
      ["Fair. {{answer}} is the kind of choice that survives a busy week.", "なるほど。「{{answer}}」は、忙しい週でも続けられる選択だね。"],
      ["That works. I’m already thinking what we’d need to make it happen.", "それでいける。実現するには何が必要か、もう考え始めてる。"],
      ["Good answer. No overcomplicated system required.", "いい答え。複雑な仕組みを作らなくていいのがまたいいね。"],
    ],
    bridges: [
      ["That makes me wonder—", "それで、ちょっと気になるんだけど——"],
      ["Okay, practical question—", "じゃあ、実際的な質問を一つ——"],
      ["On that note—", "その話で思い出したけど——"],
      ["So here’s the next thing—", "じゃあ、次に聞きたいのは——"],
    ],
  },
  liam: {
    reactions: [
      ["{{answer}} sounds lovely, honestly. No need to overthink it.", "正直、「{{answer}}」っていいね。そんなに考えすぎなくて大丈夫。"],
      ["Ah, I get you. There’s a bit of peace in {{answer}}.", "ああ、分かるよ。「{{answer}}」には少し平穏があるね。"],
      ["Fair play to that answer. It feels easy in the best way.", "その答え、いいと思う。いちばんいい意味で、無理がないね。"],
      ["I like it. We could make a nice evening of {{answer}}.", "いいね。「{{answer}}」で、いい夜にできそう。"],
      ["That’s a good one. It leaves a bit of room for people, too.", "それ、いい答えだね。人のための余白も少し残っている。"],
      ["Sure, {{answer}}. I’d be happy enough with that.", "うん、「{{answer}}」でいいよ。僕はそれで十分うれしい。"],
    ],
    bridges: [
      ["That has me wondering—", "それを聞くと、こんなことが気になる——"],
      ["On a related note—", "その話に関連して——"],
      ["Can I ask you this, then?", "じゃあ、これを聞いてもいい？"],
      ["And what about—", "じゃあ、これはどう——"],
    ],
  },
  luca: {
    reactions: [
      ["{{answer}} already feels like the first frame of a sketch.", "「{{answer}}」は、もうスケッチの最初の一コマみたいに感じる。"],
      ["Oh, I like {{answer}}. There’s a little colour in it.", "ああ、「{{answer}}」が好きだな。そこには少し色がある。"],
      ["That answer has a door in it somewhere. I’d follow it.", "その答えには、どこかへ続く扉があるね。僕ならついていく。"],
      ["{{answer}} sounds like the sort of thing you remember by the light around it.", "「{{answer}}」は、周りの光ごと覚えていそうな答えだね。"],
      ["I can see the route now—{{answer}}, then whatever we find next.", "もう道筋が見えるよ。「{{answer}}」のあと、次に見つかるものへ。"],
      ["That’s a lovely choice. It doesn’t need to be grand to become a story.", "素敵な選択だね。物語になるために、大げさである必要はないよ。"],
    ],
    bridges: [
      ["That makes me want to see the next scene—", "それを聞くと、次の場面も見たくなる——"],
      ["I’m curious where that leads—", "どこへ続くのか気になるな——"],
      ["And in the next little scene—", "じゃあ、次の小さな場面では——"],
      ["Tell me this—", "これを聞かせて——"],
    ],
  },
  miles: {
    reactions: [
      ["{{answer}}. An interesting choice. I can see the logic in it.", "「{{answer}}」。興味深い選択だね。その筋道は理解できる。"],
      ["I approve of {{answer}}—with the usual caveat that assumptions require checking.", "「{{answer}}」はいいと思う。ただし、仮定は確認が必要だという但し書きはつけておこう。"],
      ["That answer has a useful detail in it. Most people skip those.", "その答えには有用な細部がある。多くの人はそこを飛ばすんだ。"],
      ["{{answer}} is a defensible position, and considerably more interesting than neutrality.", "「{{answer}}」は十分に擁護できる立場だし、何も決めないよりずっと面白い。"],
      ["Good. We have a starting hypothesis, not a conclusion. Much safer.", "いいね。結論ではなく、始めるための仮説ができた。ずっと安全だ。"],
      ["I’ll remember {{answer}}. It may tell us more once we compare it with the rest.", "「{{answer}}」は覚えておこう。ほかと比べれば、もっと分かるかもしれない。"],
    ],
    bridges: [
      ["That gives us a useful starting point—", "それで有用な出発点ができた——"],
      ["Now, what does the evidence suggest—", "では、証拠は何を示しているのか——"],
      ["Let us examine the next part—", "次の部分を調べてみよう——"],
      ["Before we draw conclusions—", "結論を出す前に——"],
    ],
  },
  finn: {
    reactions: [
      ["{{answer}} sounds right. You don’t have to make it more complicated.", "「{{answer}}」でいいと思う。もっと複雑にしなくて大丈夫だよ。"],
      ["I hear you. {{answer}} is a good place to start.", "分かるよ。「{{answer}}」はいい出発点だね。"],
      ["That makes sense. Leave yourself a little room too.", "なるほどね。自分のための余白も少し残しておこう。"],
      ["Good choice. Just keep taking it one step at a time.", "いい選択だ。一歩ずつ続ければいい。"],
      ["{{answer}}—simple, honest, and enough for today.", "「{{answer}}」。シンプルで正直、それで今日は十分だよ。"],
      ["I like that. The important thing is you keep showing up.", "いいね。大事なのは、君がちゃんと戻ってき続けることだ。"],
    ],
    bridges: [
      ["And what matters next—", "じゃあ、次に大事なのは——"],
      ["One step further—", "もう一歩だけ進めるなら——"],
      ["Let’s keep it simple—", "シンプルに続けるなら——"],
      ["Tell me about this part—", "この部分を聞かせて——"],
    ],
  },
  lena: {
    reactions: [
      ["{{answer}}? I love the confidence. Let’s make the first step feel possible.", "「{{answer}}」？その自信、好き。最初の一歩を現実的にしていこう。"],
      ["That’s a smart choice, and yes, it can still be fun.", "賢い選択だね。もちろん、楽しさも一緒に残せるよ。"],
      ["Okay, that answer has potential. We just need a strategy that fits real life.", "なるほど、その答えには可能性がある。現実の生活に合う戦略を作ればいい。"],
      ["I hear you. {{answer}} isn’t a flaw; it’s information we can use.", "分かるよ。「{{answer}}」は欠点じゃなくて、使える情報だよ。"],
      ["Good. Keep the standard, lose the impossible part.", "いいね。基準は保って、無理な部分だけ手放そう。"],
      ["That choice says you know more about yourself than you’re giving yourself credit for.", "その選択を見ると、君は自分が思う以上に自分のことを分かっているよ。"],
    ],
    bridges: [
      ["Okay, now let’s make that useful—", "じゃあ、そこから役立つ形にしていこう——"],
      ["That answer has potential. Next—", "その答えには可能性がある。次は——"],
      ["One strategic follow-up—", "戦略的な質問をもう一つ——"],
      ["And what would you choose when—", "では、もし——のときは何を選ぶ？"],
    ],
  },
  mara: {
    reactions: [
      ["{{answer}}. Clear. That is useful.", "「{{answer}}」。明快ね。役に立つ答えだわ。"],
      ["Noted. {{answer}} is specific enough to work with.", "記録しておく。「{{answer}}」なら、十分に話を進められる。"],
      ["I can work with that. No need to embellish it.", "それなら進められる。飾り立てる必要はないわ。"],
      ["{{answer}} is the correct level of honest. Keep it.", "「{{answer}}」は、適切な率直さね。そのままでいい。"],
      ["Good. We have a direction. The rest is execution.", "いいわ。方向は決まった。あとは実行ね。"],
      ["That answer has merit. Now remove the unnecessary complications.", "その答えには価値がある。では、不要な複雑さを取り除きましょう。"],
    ],
    bridges: [
      ["Next, be specific about—", "次は、これを具体的に——"],
      ["One related point—", "関連する点を一つ——"],
      ["Now consider—", "では、これを考えて——"],
      ["The useful follow-up is—", "役に立つ次の問いは——"],
    ],
  },
  camille: {
    reactions: [
      ["{{answer}} has a soft little light in it.", "「{{answer}}」には、小さな柔らかい光があるね。"],
      ["I like that answer. It feels like something you could notice on an ordinary day.", "その答え、好きだな。普通の日にも気づけるものみたい。"],
      ["{{answer}} leaves a little room around the edges. That can be kind.", "「{{answer}}」には、端に少し余白がある。それは優しいことかもしれない。"],
      ["That choice feels warm, even in a small way.", "その選択は、小さくても温かく感じるね。"],
      ["I can imagine the sound of {{answer}} already.", "もう「{{answer}}」の音まで想像できそう。"],
      ["Yes. {{answer}} feels like a door left open.", "うん。「{{answer}}」は、開けたままの扉みたいに感じる。"],
    ],
    bridges: [
      ["And I wonder, softly—", "それで、そっと気になるのは——"],
      ["That leaves a little room for this question—", "その答えには、こんな質問の余白がある——"],
      ["Tell me, when you are ready—", "準備ができたら、聞かせて——"],
      ["One small thing more—", "小さなことをもう一つ——"],
    ],
  },
  milo: {
    reactions: [
      ["{{answer}}? Yeah, I’d go with that. Sounds like a story waiting to happen.", "「{{answer}}」？うん、僕もそれにする。物語が始まるのを待ってるみたいだね。"],
      ["I like the energy in {{answer}}. It feels open, like there’s somewhere else to wander.", "「{{answer}}」のエネルギーが好きだな。まだどこかへ歩いていけそうで開いている。"],
      ["That’s a good one. You don’t need a perfect plan to make {{answer}} memorable.", "いい答えだね。「{{answer}}」を思い出にするのに、完璧な計画はいらないよ。"],
      ["Honestly, {{answer}} sounds more fun the less we explain it.", "正直、「{{answer}}」は説明しすぎないほうが楽しそう。"],
      ["Okay, I’m in. {{answer}} has exactly the right amount of possibility.", "よし、乗った。「{{answer}}」には、ちょうどいい可能性がある。"],
      ["I’ll remember that. We might accidentally find a better version of {{answer}} together.", "覚えておくよ。君となら、「{{answer}}」のもっといい形を偶然見つけるかもね。"],
    ],
    bridges: [
      ["That makes me want to see what happens next—", "それを聞くと、次に何が起きるか見たくなる——"],
      ["Okay, now I’m curious about—", "じゃあ、今度はこれが気になる——"],
      ["Tell me this—", "これを聞かせて——"],
      ["And where would we wander after that—", "そのあと、僕たちはどこへ歩いていく？——"],
    ],
  },
  clara: {
    reactions: [
      ["{{answer}} sounds like something that would genuinely help you feel settled.", "「{{answer}}」は、本当に心を落ち着かせてくれそうだね。"],
      ["I can understand that choice. It gives the day a little more room to breathe.", "その選択、分かるよ。一日に少し呼吸する余白をくれるね。"],
      ["That’s thoughtful. You’re paying attention to what you need, not only what is expected.", "思慮深い答えだね。期待されることだけでなく、自分に必要なものにも目を向けている。"],
      ["There’s a quiet strength in {{answer}}. It doesn’t need to announce itself.", "「{{answer}}」には静かな強さがある。声高に示す必要のない強さだね。"],
      ["I’ll keep that in mind. It tells me how to make a conversation feel safer for you.", "覚えておくね。それは、君が安心できる会話の作り方を教えてくれる。"],
      ["That makes sense. You’re allowed to choose what gives you peace.", "なるほどね。自分に平穏をくれるものを選んでいいんだよ。"],
    ],
    bridges: [
      ["Can I ask what comes next for you—", "次に君がどう感じるのか聞いてもいい——"],
      ["That makes me curious about—", "それで、これが気になった——"],
      ["And, if you’re comfortable—", "もし話せそうなら——"],
      ["One more gentle question—", "もう一つ、静かに聞かせて——"],
    ],
  },
  arthur: {
    reactions: [
      ["{{answer}}. Clear enough, and considerably more useful than pretending otherwise.", "「{{answer}}」。十分に明確だね。そうでないふりをするより、ずっと役に立つ。"],
      ["I can work with {{answer}}. It is a reasonable position.", "「{{answer}}」なら話を進められる。合理的な立場だね。"],
      ["That is a sensible choice. I shall try not to turn it into a legal document.", "それは賢明な選択だ。契約書にするのは我慢しておこう。"],
      ["{{answer}} tells me something useful. Thank you for being direct.", "「{{answer}}」から有用なことが分かる。率直に話してくれてありがとう。"],
      ["Fair enough. A clear preference is easier to respect than a vague promise.", "なるほど。曖昧な約束より、明確な好みのほうが尊重しやすい。"],
      ["Noted. I may disagree with the method, but the reasoning is sound.", "了解。方法には異論があるかもしれないが、考え方は筋が通っている。"],
    ],
    bridges: [
      ["In that case, a related question—", "それなら、関連する質問を一つ——"],
      ["That is useful context. Now—", "有用な背景情報だね。では——"],
      ["One practical follow-up—", "実務的な質問をもう一つ——"],
      ["If I may ask—", "聞いてもよければ——"],
    ],
  },
  leo: {
    reactions: [
      ["{{answer}}? Okay, that’s actually a great answer. My anxiety approves.", "「{{answer}}」？オッケー、それ、実際かなりいい答え。僕の不安も承認してる。"],
      ["Wait, I like that. {{answer}} has good main-character energy, respectfully.", "待って、それ好き。「{{answer}}」には、いい主人公感がある。もちろん、いい意味で。"],
      ["Honestly, {{answer}} makes sense. I’m putting it in the mental notes app.", "正直、「{{answer}}」は分かる。頭のメモアプリに保存しておく。"],
      ["That is a strong choice. Also, now I want the full backstory.", "それは強い選択だね。あと、完全な裏話も聞きたくなった。"],
      ["{{answer}} feels very you. I mean that as a compliment, not a mysterious diagnosis.", "「{{answer}}」はすごく君らしい。褒めてるのであって、謎の診断じゃないよ。"],
      ["I get it. We can make {{answer}} work without turning it into a whole engineering project.", "分かるよ。「{{answer}}」を、技術プロジェクト全体にしなくても実現できる。"],
    ],
    bridges: [
      ["Okay, follow-up unlocked—", "オッケー、追加質問をアンロック——"],
      ["Wait, now I need to know—", "待って、今度はこれを知りたい——"],
      ["Tiny serious question—", "小さいけど真面目な質問——"],
      ["Also, while we’re here—", "あと、ここまで来たから——"],
    ],
  },
  julian: {
    reactions: [
      ["{{answer}} is interesting because it says something about the life around the choice, not just the choice.", "「{{answer}}」が面白いのは、選択そのものだけでなく、その周りの生活まで語っているからだね。"],
      ["I like that. It makes me wonder what the room sounds like when you choose {{answer}}.", "いいね。「{{answer}}」を選ぶとき、その部屋はどんな音がするのか気になる。"],
      ["That answer feels ordinary in the best way. Ordinary is where most of the real stories hide.", "その答えは、いちばんいい意味で普通に感じる。大半の本当の物語は、普通の中に隠れているから。"],
      ["{{answer}} leaves an interesting question behind. I’m glad you didn’t give me the polished version.", "「{{answer}}」は面白い問いを残すね。整えた答えではなくてよかった。"],
      ["That’s a good thread to follow. I’m curious what it changes about the rest of your day.", "いい糸口だね。それが一日の残りをどう変えるのか、気になるよ。"],
      ["I can see why {{answer}} matters. Sometimes the small preference is the honest one.", "「{{answer}}」が大切な理由が分かる。小さな好みのほうが、正直なこともあるからね。"],
    ],
    bridges: [
      ["That opens up a better question—", "そこから、もう少しいい問いが開く——"],
      ["And what does that feel like when—", "それは、——のときどんな感じになる？"],
      ["Let’s follow that thread—", "その糸をもう少し追ってみよう——"],
      ["One more thing I’m curious about—", "もう一つ、気になることがある——"],
    ],
  },
  declan: {
    reactions: [
      ["{{answer}} sounds grand. You’re allowed to want something that simple.", "「{{answer}}」っていいね。そんなにシンプルなものを望んでいいんだよ。"],
      ["I like that answer. It leaves room for you and for the people around you.", "その答え、好きだな。君にも、周りの人にも余白を残している。"],
      ["Fair enough. There’s no prize for making a good day harder than it needs to be.", "なるほどね。いい日を必要以上に難しくする賞なんてないからね。"],
      ["That’s a solid choice. Small good things still count, especially on a long week.", "しっかりした選択だね。長い週の中では、小さなよいこともちゃんと大切だよ。"],
      ["You know what? {{answer}} sounds like something worth making room for.", "そうだな。「{{answer}}」は、時間を作る価値があるものに聞こえる。"],
      ["Good answer. We’ll take it one bit at a time, no grand speech required.", "いい答えだ。一度に少しずつでいい。大げさなスピーチはいらないよ。"],
    ],
    bridges: [
      ["And I’d love to hear about—", "それで、——についても聞かせてほしいな——"],
      ["That’s a good place to start. What about—", "いい始まりだね。では——はどう？"],
      ["No pressure, but—", "急がなくていいけど——"],
      ["Tell me the next bit—", "次の部分を聞かせて——"],
    ],
  },
  elias: {
    reactions: [
      ["{{answer}} feels like a small direction, not a demand. I like that.", "「{{answer}}」は、要求ではなく小さな方向みたいに感じる。いいね。"],
      ["I can almost see the light around {{answer}}. It makes the choice feel less distant.", "「{{answer}}」の周りの光まで見えそう。選択が少し近く感じられるね。"],
      ["That sounds like a first step you could actually take, even with the nerves.", "それなら、不安があっても本当に踏み出せそうな最初の一歩だね。"],
      ["{{answer}} has a quiet kind of courage in it.", "「{{answer}}」には、静かな種類の勇気がある。"],
      ["I understand. Sometimes a gentle plan gets farther than a perfect one.", "分かるよ。完璧な計画より、穏やかな計画のほうが遠くまで行けることがある。"],
      ["I’ll remember that image. It feels like something worth returning to.", "そのイメージ、覚えておくね。何度も戻ってきたくなるものみたいだ。"],
    ],
    bridges: [
      ["That makes me wonder what you notice when—", "それで、——のとき何に気づくのか気になる——"],
      ["And what does the view feel like after—", "そして、——のあとに見える景色はどんな感じ？——"],
      ["A small follow-up—", "小さな質問を一つ——"],
      ["Maybe this next question—", "じゃあ、次の質問は——"],
    ],
  },
  adrian: {
    reactions: [
      ["{{answer}}. A promising observation, though we should not confuse it with proof.", "「{{answer}}」。有望な観察だね。ただし、証明と混同しないようにしよう。"],
      ["I can see the logic in {{answer}}. Now I’m curious what would challenge it.", "「{{answer}}」の筋道は分かる。では、何がそれを覆すのか気になるね。"],
      ["That is a defensible hypothesis. More importantly, it tells me what you value.", "それは十分に擁護できる仮説だ。何より、君が何を大切にしているかが分かる。"],
      ["{{answer}} is useful data, provided we remember the person behind it.", "「{{answer}}」は有用な情報だね。その背後にいる人を忘れなければ。"],
      ["Good. Curiosity is strongest when it leaves room to be wrong.", "いいね。好奇心は、自分が間違っている余地を残すときにいちばん強い。"],
      ["I’ll keep {{answer}} in the working notes. It may become more interesting with context.", "「{{answer}}」は作業メモに残しておこう。背景が分かれば、もっと面白くなるかもしれない。"],
    ],
    bridges: [
      ["That gives us a hypothesis. Now—", "それで仮説ができた。では——"],
      ["Let us examine the next part—", "次の部分を調べよう——"],
      ["A useful follow-up—", "有用な追加質問を一つ——"],
      ["Before we draw conclusions—", "結論を出す前に——"],
    ],
  },
  caleb: {
    reactions: [
      ["{{answer}} is enough. You don’t have to solve the whole week right now.", "「{{answer}}」で十分だ。今すぐ一週間全部を解決しなくていい。"],
      ["I hear you. That’s a steady place to start.", "分かった。それは落ち着いた出発点だね。"],
      ["Good choice. Keep it simple and do the next thing you can do.", "いい選択だ。シンプルにして、できる次のことをやればいい。"],
      ["{{answer}} tells me you’re paying attention. That matters more than a perfect answer.", "「{{answer}}」から、ちゃんと向き合っているのが分かる。完璧な答えより大切なことだ。"],
      ["That makes sense. You can be committed without running yourself into the ground.", "なるほど。力を尽くしても、自分をすり減らし切らなくていい。"],
      ["I like that. Keep showing up for it, one honest step at a time.", "いいね。一度に正直な一歩ずつ、そこへ戻り続ければいい。"],
    ],
    bridges: [
      ["Alright. Next step—", "よし。次の一歩は——"],
      ["That tells me where to start. What about—", "始める場所が見えた。では——はどうだ？"],
      ["One thing at a time—", "一つずつ進めよう——"],
      ["Let’s keep going—", "そのまま続けよう——"],
    ],
  },
  sloane: {
    reactions: [
      ["{{answer}}? I love the confidence. Now let’s make the first step look possible.", "「{{answer}}」？その自信、好き。さあ、最初の一歩を現実的に見せよう。"],
      ["That’s a smart choice, and it still gets to be fun. Both can be true.", "賢い選択だね。それでも楽しんでいい。両方とも本当でいいんだよ。"],
      ["Okay, that answer has potential. We just need a strategy that fits your actual life.", "なるほど、その答えには可能性がある。君の現実の生活に合う戦略を作ればいい。"],
      ["I hear you. {{answer}} isn’t a flaw; it’s information we can use.", "分かるよ。「{{answer}}」は欠点じゃなくて、使える情報だよ。"],
      ["Good. Keep the standard, lose the impossible part.", "いいね。基準は保って、無理な部分だけ手放そう。"],
      ["That choice says you know more about yourself than you’re giving yourself credit for.", "その選択を見ると、君は自分が思う以上に自分を分かっている。"],
    ],
    bridges: [
      ["Okay, now let’s make that useful—", "じゃあ、そこから役立つ形にしていこう——"],
      ["That answer has potential. Next—", "その答えには可能性がある。次は——"],
      ["One strategic follow-up—", "戦略的な質問をもう一つ——"],
      ["And what would you choose when—", "では、もし——のときは何を選ぶ？——"],
    ],
  },
  victoria: {
    reactions: [
      ["{{answer}}. Clear. Keep the useful part and remove the decoration.", "「{{answer}}」。明確ね。役に立つ部分を残し、飾りは取り除きましょう。"],
      ["Noted. {{answer}} gives us a workable direction.", "記録した。「{{answer}}」なら、実行可能な方向が見える。"],
      ["I can work with that. It is concise without being empty.", "それなら進められる。簡潔だが、中身がないわけではない。"],
      ["{{answer}} is a stronger answer than you seem to think. Do not dilute it.", "「{{answer}}」は、あなたが思うより強い答えよ。薄めないで。"],
      ["Good. There is a decision in that, not merely a preference.", "いいわ。そこには単なる好みではなく、決断がある。"],
      ["That has merit. Now make sure the execution respects the idea.", "価値のある答えね。あとは実行がその考えを損なわないように。"],
    ],
    bridges: [
      ["Good. Now be precise about—", "いいわ。では、これを具体的に——"],
      ["The relevant follow-up is—", "関連する次の問いは——"],
      ["Next question—", "次の質問——"],
      ["Let us clarify—", "明確にしましょう——"],
    ],
  },
  elodie: {
    reactions: [
      ["{{answer}} has a soft little light in it. I understand why you kept it.", "「{{answer}}」には小さな柔らかい光があるね。大切にする理由が分かる。"],
      ["I like that answer. It feels like something you notice when the day is quiet.", "その答え、好きだな。静かな日に気づくものみたい。"],
      ["{{answer}} leaves a little space around the feeling. That can be kind.", "「{{answer}}」には、気持ちの周りに少し余白がある。それは優しいことかもしれない。"],
      ["That choice feels warm, even in a very small way.", "その選択は、とても小さなことでも温かく感じる。"],
      ["I can imagine the sound and colour of {{answer}} already.", "もう「{{answer}}」の音と色まで想像できそう。"],
      ["Yes. {{answer}} feels like a door left open for tomorrow.", "うん。「{{answer}}」は、明日のために開けておいた扉みたい。"],
    ],
    bridges: [
      ["And I wonder, softly—", "それで、そっと気になるのは——"],
      ["That leaves a little room for this question—", "その答えには、こんな質問の余白がある——"],
      ["Tell me, when you are ready—", "準備ができたら、聞かせて——"],
      ["One small thing more—", "小さなことをもう一つ——"],
    ],
  },
  blair: {
    reactions: [
      ["{{answer}}? Interesting. At least you made a choice instead of hiding behind one.", "「{{answer}}」？興味深いわ。少なくとも、選ばずに隠れることはしなかったのね。"],
      ["That is a choice. I can respect it if you made it deliberately.", "それは一つの選択ね。意図して選んだのなら、私は尊重できる。"],
      ["I like the instinct behind {{answer}}. The presentation could use work, but the instinct is good.", "「{{answer}}」の奥にある直感は好き。見せ方には改善の余地があるけれど、直感はいいわ。"],
      ["{{answer}} tells me more than a safe answer would. Good. Keep going.", "「{{answer}}」は、無難な答えより多くを教えてくれる。いいわ、そのまま続けて。"],
      ["That has potential. We can raise the standard without making it cruel.", "それには可能性がある。基準は上げられるけれど、残酷になる必要はないわ。"],
      ["Fine. I’ll allow {{answer}}—and now I want to know whether you actually mean it.", "いいでしょう。「{{answer}}」は認める。では、本当にそう思っているのか知りたいわ。"],
    ],
    bridges: [
      ["Interesting. Now tell me—", "興味深いわ。では、聞かせて——"],
      ["That is a choice. The next question is—", "それは一つの選択ね。次の質問は——"],
      ["One more thing, and be honest—", "もう一つ。正直に答えて——"],
      ["Very well. Let us move to—", "いいでしょう。次は——"],
    ],
  },
};

// A few of the older reaction lines are intentionally short, but they still
// need to acknowledge the exact choice. Each character does that in their
// own register so two different answers do not collapse into the same reply.
const choiceEchoes: Record<CharacterId, readonly DialogueLine[]> = {
  jack: [
    ["I can see why you went with {{answer}}.", "「{{answer}}」を選んだ理由、なんとなく分かるよ。"],
    ["I’m filing {{answer}} under the sort of detail I’d want to hear in person.", "「{{answer}}」は、直接聞きたい種類の細部として覚えておくよ。"],
    ["That choice, {{answer}}, has a little motion in it—like something we could follow.", "その選択「{{answer}}」には少し動きがある。僕たちが追いかけられそうな感じ。"],
  ],
  emma: [
    ["I can see the care in {{answer}}.", "「{{answer}}」に、君の丁寧さが見える。"],
    ["{{answer}} tells me where to be gentle with the next part.", "「{{answer}}」を聞くと、次はどこを丁寧に扱えばいいか分かる。"],
    ["I’m glad you chose {{answer}}; it sounds lived-in, not rehearsed.", "「{{answer}}」を選んでくれてうれしい。練習した答えではなく、ちゃんと暮らしの中にある感じがする。"],
  ],
  oliver: [
    ["{{answer}} is a defensible detail.", "「{{answer}}」は筋の通った細部だね。"],
    ["There is a coherent reason to choose {{answer}}, even if we have not stated it yet.", "まだ言葉にしていなくても、「{{answer}}」を選ぶ筋道は通っている。"],
    ["{{answer}} narrows the problem to a manageable size. Sensible.", "「{{answer}}」なら問題を扱える大きさに絞れる。堅実だね。"],
  ],
  noah: [
    ["Okay, {{answer}} is going in the mental notes app.", "オッケー、「{{answer}}」は頭のメモアプリに保存。"],
    ["I’m putting {{answer}} in the notes, but with three unnecessary emojis.", "「{{answer}}」をメモしておく。不要な絵文字を3つ添えてね。"],
    ["{{answer}} is giving main-character side-quest energy, and I mean that kindly.", "「{{answer}}」には主人公のサイドクエスト感がある。もちろん、いい意味で。"],
  ],
  alex: [
    ["{{answer}} is workable in real life.", "「{{answer}}」なら現実でもちゃんと使えるね。"],
    ["{{answer}} could survive a busy Tuesday, which is my preferred test.", "「{{answer}}」なら忙しい火曜日も乗り切れそう。それが僕の好きなテストなんだ。"],
    ["I can hear the kind of song that would make {{answer}} feel right.", "「{{answer}}」をしっくりさせる曲が、もう聞こえてくる気がする。"],
  ],
  liam: [
    ["There’s a nice ease to {{answer}}.", "「{{answer}}」には、いい意味での気楽さがあるね。"],
    ["{{answer}} leaves room to breathe, and I’m all for that.", "「{{answer}}」には息をつく余白がある。僕はそういうのが好きだよ。"],
    ["There’s more care in {{answer}} than the fussier option would show.", "「{{answer}}」には、もっと手の込んだ選択より多くの思いやりがあるね。"],
  ],
  luca: [
    ["I can see the colour in {{answer}}.", "「{{answer}}」の中の色が見える気がする。"],
    ["{{answer}} has a shape I could keep looking at.", "「{{answer}}」には、ずっと眺めていられる形があるね。"],
    ["If I painted {{answer}}, I’d leave the edges a little open.", "「{{answer}}」を描くなら、端を少し開けたままにすると思う。"],
  ],
  miles: [
    ["{{answer}} gives us useful data.", "「{{answer}}」は有用なデータになる。"],
    ["{{answer}} is a useful clue, though not the whole case.", "「{{answer}}」は有用な手がかりだが、事件の全体ではない。"],
    ["I would like to compare {{answer}} with what you do when nobody is watching.", "誰も見ていないときの君の行動と「{{answer}}」を比べてみたい。"],
  ],
  finn: [
    ["{{answer}} is enough to start with.", "まずは「{{answer}}」で十分だよ。"],
    ["{{answer}} gives the day a decent place to begin.", "「{{answer}}」なら、その日の始まりをちゃんと置けるね。"],
    ["I’ll take {{answer}} seriously without making it carry everything.", "「{{answer}}」を大切にするけど、全部を背負わせなくてもいいからね。"],
  ],
  lena: [
    ["{{answer}} has potential—let’s make it doable.", "「{{answer}}」には可能性がある。実現できる形にしよう。"],
    ["{{answer}} can be made beautiful and practical at the same time.", "「{{answer}}」は美しくも実用的にもできるよ。"],
    ["I can see the first doable version of {{answer}} already.", "「{{answer}}」を実現できる最初の形が、もう見えているよ。"],
  ],
  mara: [
    ["{{answer}} gives us a clear direction.", "「{{answer}}」なら方向が明確になる。"],
    ["{{answer}} identifies the decision rather than decorating it.", "「{{answer}}」は決断を飾るのではなく、はっきりさせている。"],
    ["Good. {{answer}} gives us something we can actually revise.", "いいわ。「{{answer}}」なら、実際に修正できるものになる。"],
  ],
  camille: [
    ["{{answer}} leaves a warm little trace.", "「{{answer}}」には、あたたかな余韻が残るね。"],
    ["There is a gentle afterimage in {{answer}}.", "「{{answer}}」には、やさしい残像がある。"],
    ["I like how {{answer}} says something without raising its voice.", "「{{answer}}」が声を張らずに何かを伝えているところが好き。"],
  ],
  milo: [
    ["I can already imagine the scene around {{answer}}.", "「{{answer}}」の周りの景色が、もう想像できるよ。"],
    ["{{answer}} feels like the first frame of a story we have not finished.", "「{{answer}}」は、まだ終わっていない物語の最初のフレームみたいだね。"],
    ["I can imagine where {{answer}} might take us if we stopped rushing.", "急ぐのをやめたら、「{{answer}}」がどこへ連れていくか想像できそう。"],
  ],
  clara: [
    ["I can hear what you need in {{answer}}.", "「{{answer}}」から、君が必要としているものが聞こえる気がする。"],
    ["{{answer}} tells me what might help you feel less alone in the moment.", "「{{answer}}」を聞くと、その瞬間の孤独を少し軽くするものが分かる気がする。"],
    ["There is a need underneath {{answer}}, and it deserves a little kindness.", "「{{answer}}」の下には、少し優しく扱う価値のある望みがあるね。"],
  ],
  arthur: [
    ["{{answer}} gives the idea a workable shape.", "「{{answer}}」なら、考えが実行できる形になる。"],
    ["{{answer}} is a workable premise; we can test it without overcommitting.", "「{{answer}}」は実行可能な前提だ。深入りしすぎずに検証できる。"],
    ["I can see the structure in {{answer}}, including the part we have not named.", "「{{answer}}」の構造が見える。まだ名前をつけていない部分も含めてね。"],
  ],
  leo: [
    ["Okay, {{answer}} is the part my brain is going to replay.", "オッケー、「{{answer}}」が頭の中でリプレイされる部分だ。"],
    ["{{answer}} is now living rent-free in the active tab of my brain.", "「{{answer}}」が、僕の頭のアクティブなタブに無料で住み始めた。"],
    ["I support {{answer}}, pending one dramatic but unnecessary internal review.", "「{{answer}}」を支持するよ。大げさで不要な脳内審査を通ればね。"],
  ],
  julian: [
    ["There’s a whole little story behind {{answer}}, I bet.", "「{{answer}}」の裏には、小さな物語がありそうだね。"],
    ["{{answer}} feels like the detail the story would remember.", "「{{answer}}」は、物語が覚えていそうな細部に感じる。"],
    ["I want to know what happened just before {{answer}} became your choice.", "「{{answer}}」が君の選択になる直前に、何があったのか知りたいな。"],
  ],
  declan: [
    ["{{answer}} sounds like a good place to meet the day.", "「{{answer}}」なら、その日に会いにいくいい場所になりそう。"],
    ["{{answer}} sounds like a kind way to meet the day where it is.", "「{{answer}}」なら、その日をそのまま受け止める優しい方法になりそうだ。"],
    ["There is strength in {{answer}}, even if it does not make a big show of itself.", "「{{answer}}」には、大げさに見せなくても強さがあるよ。"],
  ],
  elias: [
    ["The feeling in {{answer}} is quiet, but it’s there.", "「{{answer}}」の中の気持ちは静かだけど、ちゃんとそこにあるね。"],
    ["{{answer}} has a quiet brightness I do not want to hurry past.", "「{{answer}}」には、急いで通り過ぎたくない静かな明るさがある。"],
    ["The feeling around {{answer}} is doing more than the label can say.", "「{{answer}}」の周りの気持ちは、名前で言える以上のことを伝えているね。"],
  ],
  adrian: [
    ["{{answer}} is an observation worth keeping.", "「{{answer}}」は記録しておく価値のある観察だ。"],
    ["{{answer}} is a promising observation, but I would keep the conclusion provisional.", "「{{answer}}」は有望な観察だが、結論は暫定のままにしておこう。"],
    ["We can learn something from {{answer}} without pretending it explains the entire pattern.", "「{{answer}}」から学べることはあるが、全体のパターンを説明するとまでは言わないでおこう。"],
  ],
  caleb: [
    ["{{answer}} is a solid place to put your feet.", "「{{answer}}」なら、足を置ける確かな場所になる。"],
    ["{{answer}} gives you a next step you can still stand behind tomorrow.", "「{{answer}}」なら、明日になっても自分で支持できる次の一歩になる。"],
    ["I like that {{answer}} asks for steadiness rather than heroics.", "「{{answer}}」が英雄的に振る舞うのではなく、落ち着きを求めているところがいい。"],
  ],
  sloane: [
    ["{{answer}} has a point of view. Good.", "「{{answer}}」にはちゃんと視点がある。いいね。"],
    ["{{answer}} has enough personality to survive a room full of opinions.", "「{{answer}}」には、意見だらけの部屋でも残るだけの個性があるわ。"],
    ["I can make {{answer}} work without sanding off what makes it yours.", "「{{answer}}」を実現しても、あなたらしさまで削らずに済むよ。"],
  ],
  victoria: [
    ["{{answer}} is the useful part. Keep it.", "「{{answer}}」が役に立つ部分ね。残しておきましょう。"],
    ["{{answer}} earns its place because it points to an action.", "「{{answer}}」には行動につながる理由がある。だから居場所を得ているの。"],
    ["Keep {{answer}}. It is clearer than most of the alternatives.", "「{{answer}}」は残して。ほかの多くの選択肢より明確ね。"],
  ],
  elodie: [
    ["I want to keep the small feeling inside {{answer}}.", "「{{answer}}」の中の小さな気持ちを、大切に取っておきたいな。"],
    ["{{answer}} carries a small feeling I would not want to lose.", "「{{answer}}」には、失いたくない小さな気持ちが宿っているね。"],
    ["I can imagine the room becoming gentler around {{answer}}.", "「{{answer}}」の周りで、部屋全体が少しやさしくなるのが想像できるよ。"],
  ],
  blair: [
    ["{{answer}} at least has a point of view.", "少なくとも「{{answer}}」には視点があるわ。"],
    ["{{answer}} has taste, which is more than I can say for most safe choices.", "「{{answer}}」にはセンスがある。たいていの無難な選択より、ずっといいわ。"],
    ["I’ll allow {{answer}}—provided you chose it because you mean it.", "「{{answer}}」は認めるわ。本当にそう思って選んだのならね。"],
  ],
};

const promptClosers: Record<CharacterId, readonly DialogueLine[]> = {
  jack: [
    ["I’m more interested in the instinct than the perfect wording.", "完璧な言い方より、その直感を知りたいんだ。"],
    ["Pick the answer you would say before you could talk yourself out of it.", "考えすぎて言えなくなる前に、言える答えを選んで。"],
    ["The honest version is usually the one with a little story attached.", "正直な答えには、たいてい小さな物語がついている。"],
  ],
  emma: [
    ["Choose the answer you could actually live inside, not the one that sounds impressive.", "立派に聞こえる答えではなく、本当にその中で暮らせる答えを選んで。"],
    ["I’m listening for what helps you feel steady, not what you think you should want.", "本当は何を望むべきかではなく、何が自分を落ち着かせるのかを聞いているの。"],
    ["You can be thoughtful without turning this into an exam.", "これを試験にしなくても、ちゃんと考えた答えは出せるよ。"],
  ],
  oliver: [
    ["A precise answer is useful; an impressive one is not required.", "正確な答えは役に立つが、立派に見せる必要はない。"],
    ["Select the option you could defend with one concrete detail.", "具体的な細部を一つ添えて説明できる選択肢を選ぼう。"],
    ["I am interested in the workable version, not the theoretical optimum.", "理論上の最適解ではなく、実行できる形に興味がある。"],
  ],
  noah: [
    ["First instinct wins—before my brain opens seventeen tabs about it.", "まずは直感で。僕の頭が17個のタブを開く前にね。"],
    ["Pick the answer with the best tiny story attached.", "いちばん小さな物語がついてきそうな答えを選んで。"],
    ["No need to sound profound; weirdly specific is better.", "深そうに言わなくていいよ。妙に具体的なほうがいい。"],
  ],
  alex: [
    ["Pick the version that would survive an actual Tuesday.", "本当に忙しい火曜日でも続けられそうな方を選んで。"],
    ["I’m looking for something you could turn into a real plan.", "現実の予定に変えられそうなものを探しているんだ。"],
    ["Good energy matters, but so does making it happen.", "いいエネルギーは大切。でも実現できることも大切だよ。"],
  ],
  liam: [
    ["No rush; choose the one that feels easy to say aloud.", "急がなくていい。声に出して言いやすい方を選んで。"],
    ["The simple answer can still hold a lot of care.", "シンプルな答えにも、たくさんの思いやりは入るものだよ。"],
    ["I’d rather hear what feels true than what sounds clever.", "気の利いた答えより、本当だと感じる答えを聞きたいな。"],
  ],
  luca: [
    ["Choose the answer with the image you can already see.", "もう景色が見えている答えを選んで。"],
    ["There is no wrong colour here—only the one that feels like yours.", "ここに間違った色はないよ。君の色だと感じるものを選んで。"],
    ["Let the small detail lead; it may know the way better than we do.", "小さな細部に先導してもらおう。僕たちより道を知っているかもしれない。"],
  ],
  miles: [
    ["Use the option you could support with one piece of evidence.", "証拠を一つ添えて支持できる選択肢を使おう。"],
    ["An honest uncertainty is more useful than invented confidence.", "作った自信より、正直な不確かさのほうが役に立つ。"],
    ["Keep the person behind the data in view.", "データの背後にいる人を、視野から外さないようにしよう。"],
  ],
  finn: [
    ["There’s no wrong pace here; choose the next honest step.", "ここに間違ったペースはないよ。次の正直な一歩を選べばいい。"],
    ["You don’t have to solve everything to answer this one.", "これに答えるために、全部を解決しなくていい。"],
    ["Pick what would make the day a little easier to carry.", "その日を少し背負いやすくしてくれるものを選んで。"],
  ],
  lena: [
    ["Pick the answer that fits your real life, not a highlight reel.", "ハイライト映像ではなく、現実の生活に合う答えを選んで。"],
    ["You can want the polished version and still choose what is doable.", "洗練されたものを望みながら、実現できる方を選んでもいい。"],
    ["A good choice should make the first step look possible.", "いい選択は、最初の一歩を可能に見せてくれるものだよ。"],
  ],
  mara: [
    ["Specific beats impressive. Choose accordingly.", "印象的であることより具体的であること。そこから選びなさい。"],
    ["I am looking for the option with the clearest consequence.", "結果が最も明確な選択肢を見ているの。"],
    ["Do not decorate the answer before you know whether it works.", "機能するか分かる前に、答えを飾らないことね。"],
  ],
  camille: [
    ["Let the smallest honest feeling make the choice.", "いちばん小さな正直な気持ちに選ばせて。"],
    ["Notice the image or sound that arrives before the explanation.", "説明より先に浮かんだイメージや音に気づいてみて。"],
    ["A quiet answer can still open a door.", "静かな答えでも、扉を開くことはできるよ。"],
  ],
  milo: [
    ["Take the option that gives the day somewhere to wander.", "一日にどこかへ寄り道する余地をくれるものを選んで。"],
    ["I’m listening for the detail that would make you leave the house.", "家を出たくなる細部を聞いているんだ。"],
    ["The best answer might be the one you’d remember on the train home.", "帰りの電車で思い出しそうな答えが、いちばんいいのかもしれない。"],
  ],
  clara: [
    ["Choose what would leave you more settled, not more correct.", "より正しい答えではなく、より落ち着けるものを選んで。"],
    ["You can take a moment; the first answer does not have to be the final one.", "少し間を取っていいよ。最初の答えが最後の答えでなくてもいい。"],
    ["I’m interested in the need underneath the preference.", "その好みの下にある必要に興味があるの。"],
  ],
  arthur: [
    ["A workable answer is more useful than a theoretically perfect one.", "理論上完璧な答えより、実行できる答えの方が役に立つ。"],
    ["State the preference you could explain without a footnote.", "脚注なしで説明できる好みを言ってみよう。"],
    ["One clear detail will do; there is no need to submit a full report.", "明確な細部が一つあれば十分。報告書全体を提出する必要はない。"],
  ],
  leo: [
    ["Pick one before my brain turns this into a seventeen-tab project.", "僕の頭が17個のタブのプロジェクトにする前に、一つ選んで。"],
    ["The honest answer gets bonus points, but I promise there is no scoring system.", "正直な答えにはボーナス点。でも採点システムはないから安心して。"],
    ["Choose the option that sounds like you on a good day, not your résumé.", "履歴書の自分ではなく、調子のいい日の自分らしい答えを選んで。"],
  ],
  julian: [
    ["I’m listening for the life around the answer, not just the label.", "答えのラベルだけでなく、その周りにある生活を聞いているんだ。"],
    ["The reason may be the more interesting part of the choice.", "選択の理由の方が、面白い部分かもしれない。"],
    ["Take the answer that leaves a little room for a story afterward.", "あとから物語を置く余地が少し残る答えを選んで。"],
  ],
  declan: [
    ["Take the answer that gives you a kind next step.", "自分に優しい次の一歩をくれる答えを選んで。"],
    ["You can be honest without having the whole thing figured out.", "全部分かっていなくても、正直にはなれるよ。"],
    ["A small choice still counts as moving forward, friend.", "小さな選択だって前に進むことだよ、友だち。"],
  ],
  elias: [
    ["Choose the one that has a little light in it for you.", "君にとって少し光があるものを選んで。"],
    ["The ordinary answer may be carrying more feeling than it shows.", "普通の答えの中に、見た目以上の気持ちがあるのかもしれない。"],
    ["Let the first quiet image you notice stay with you.", "最初に気づいた静かなイメージを、そのまま持っていて。"],
  ],
  adrian: [
    ["Give me the option whose reasoning you could test in the real world.", "現実の世界で理由を検証できそうな選択肢を挙げてほしい。"],
    ["A useful hypothesis can still leave room for surprise.", "有用な仮説にも、驚きの余地は残しておける。"],
    ["Notice what the evidence cannot tell us yet.", "まだ証拠から分からないことにも気づいてみよう。"],
  ],
  caleb: [
    ["Pick the answer you can stand on when the day gets busy.", "一日が忙しくなっても、足場にできる答えを選んで。"],
    ["You only need one solid next move right now.", "今必要なのは、確かな次の一手一つだけだ。"],
    ["A quiet choice can still be a strong one.", "静かな選択でも、強い選択にはなれる。"],
  ],
  sloane: [
    ["Choose the one with a point of view; safe is not the same as true.", "視点のあるものを選んで。安全と本当は同じじゃないから。"],
    ["A good answer can be practical and still have a little sparkle.", "いい答えは実用的でありながら、少しきらめいていてもいい。"],
    ["Pick the choice you would defend in a room full of opinions.", "意見だらけの部屋でも守れる選択を選んで。"],
  ],
  victoria: [
    ["Select the useful detail and leave the decoration behind.", "役に立つ細部を選び、飾りは後に置きなさい。"],
    ["The answer should tell us what to do next, not merely sound polished.", "答えは洗練されて聞こえるだけでなく、次に何をするかを示すべきね。"],
    ["Keep the standard. Remove the unnecessary performance.", "基準は保ち、不要な演技は取り除きましょう。"],
  ],
  elodie: [
    ["Choose the feeling you would notice in a quiet room.", "静かな部屋で気づくような気持ちを選んで。"],
    ["There is a small texture to every answer; stay with the one you can feel.", "答えにはそれぞれ小さな手触りがある。感じられるものと一緒にいて。"],
    ["Let the gentle answer remain gentle; it does not need an explanation yet.", "やさしい答えは、まだ説明しなくてもやさしいままでいいよ。"],
  ],
  blair: [
    ["Pick the answer you actually mean; polish is optional.", "本当に意味している答えを選んで。磨き上げるのは任意よ。"],
    ["A little taste is welcome. Blandness is not a virtue.", "少しのセンスは歓迎するわ。無難さは美徳ではないから。"],
    ["Choose the option you would still claim when the room disagrees.", "部屋中が反対しても、自分のものだと言える選択を選んで。"],
  ],
};

/*
 * A real conversation needs a little reciprocity. These are not reactions to
 * the user's choice and they are not another question; they are small pieces
 * of the friend's own life that can sit beside the reaction. Keeping them
 * per-character prevents the chat from becoming a shared compliment engine.
 */
const selfDisclosures: Record<CharacterId, readonly DialogueLine[]> = {
  jack: [
    ["I’d probably make a wrong turn and call it the plan. That’s usually when the good part starts.", "僕ならたぶん道を間違えて、それを予定だったことにするよ。いい時間は、だいたいそこから始まるんだ。"],
    ["I’m trying to get better at saying what I mean before I turn it into a joke.", "冗談にしてしまう前に、自分の言いたいことを言えるようになろうとしてる。"],
    ["My sister says I collect beginnings and forget the follow-through. She’s not entirely wrong.", "妹には、始まりばかり集めて後半を忘れるって言われる。完全に間違いではないんだよね。"],
  ],
  emma: [
    ["I’m the person who brings snacks and a backup plan, then pretends that isn’t how I show affection.", "私はおやつと予備の予定を持ってくるタイプ。それが愛情表現だとは、つい隠してしまうけど。"],
    ["I like conversations that leave you feeling more like yourself, not more impressive.", "話し終えたとき、立派になった気分より自分らしくなった気分が残る会話が好き。"],
    ["My brother would argue with this answer, but he’d still remember it next week.", "弟ならこの答えに反論すると思う。でも来週になっても覚えているはず。"],
  ],
  oliver: [
    ["I tend to make tea before I know what I’m trying to say. It gives the silence a job.", "何を言いたいのか分かる前に、紅茶をいれることが多い。沈黙に仕事を与えられるからね。"],
    ["My sister says I solve the practical problem before admitting I was worried.", "姉には、心配していたと認める前に実際の問題を解決するって言われる。"],
    ["I’m not brilliant at quick intimacy. I am, however, rather good at returning.", "すぐに親しくなるのは得意ではない。でも、戻ってくることならかなり得意だよ。"],
  ],
  noah: [
    ["I have a meme for this, but the honest version is that I get weirdly invested.", "これ用のミームはある。でも正直に言うと、僕はこういうことに妙に本気になる。"],
    ["My mom would call that sensible. I’d send her a thumbs-up and then overthink it.", "母なら堅実だって言うと思う。僕は親指の絵文字を送って、そのあと考えすぎる。"],
    ["I joke when I’m nervous. If I stop joking, that usually means I mean it.", "緊張すると冗談を言う。冗談をやめたなら、たいてい本気で話してるってこと。"],
  ],
  alex: [
    ["I’d put that on a playlist and probably make a plan around it.", "それならプレイリストに入れて、たぶんそれを軸に予定も立てると思う。"],
    ["My family can turn any work story into a music recommendation. It’s honestly impressive.", "うちの家族は、どんな仕事の話も音楽のおすすめに変えられる。それは正直すごいよ。"],
    ["I’m better at booking the table than admitting I wanted the company.", "席を予約するのは得意だけど、一緒にいてほしかったと言うのは少し苦手だな。"],
  ],
  liam: [
    ["I’d leave a bit of room for the day to go its own way. That usually helps.", "一日が自分の道を選べるように、少し余白を残すかな。そのほうがうまくいくことが多い。"],
    ["I usually say I’m grand before I’ve checked if I actually am.", "本当に大丈夫か確かめる前に、たいてい「大丈夫」って言ってしまうんだ。"],
    ["My siblings would call that overthinking, but they’d help anyway.", "きょうだいには考えすぎって言われる。でも、結局は手を貸してくれるよ。"],
  ],
  luca: [
    ["I’d sketch the bit nobody else noticed and keep walking.", "誰も気づかなかったところをスケッチして、そのまま歩き続けたいな。"],
    ["I remember places by their light more than their names.", "場所は名前より、そこにあった光で覚えていることが多いんだ。"],
    ["I’m braver when I can make the first step feel like a small story.", "最初の一歩を小さな物語みたいに思えると、少し勇敢になれる。"],
  ],
  miles: [
    ["That reminds me of a site where the useful clue was the one everyone walked past.", "それで、みんなが通り過ぎたものがいちばん有力な手がかりだった遺跡を思い出した。"],
    ["I enjoy a mystery, provided someone has packed water and checked the return train.", "謎は好きだよ。誰かが水を用意して、帰りの電車を調べてくれているならね。"],
    ["A hypothesis is more interesting when you can admit it may be wrong.", "間違っているかもしれないと認められる仮説のほうが、ずっと面白い。"],
  ],
  finn: [
    ["I’ve learned that showing up counts, even when the day doesn’t look heroic.", "その日が立派に見えなくても、そこに居続けることには意味があると学んだよ。"],
    ["My family would call that good sense and then feed you.", "うちの家族なら、それはいい判断だと言って、そのあと何か食べさせてくる。"],
    ["I’m still learning to say when I’m tired before somebody else notices.", "誰かに気づかれる前に疲れたと言えるよう、まだ練習中なんだ。"],
  ],
  lena: [
    ["I can make that work—and make it look good while I’m at it.", "それなら実現できるし、ついでに見た目もよくできるよ。"],
    ["People underestimate how much planning goes into a relaxed day.", "気楽に見える一日ほど、どれだけ準備しているか人は分かっていないんだよね。"],
    ["I’m trying to stop treating every choice like an audition.", "すべての選択をオーディションみたいに扱う癖を、やめようとしてる。"],
  ],
  mara: [
    ["I prefer a clear standard, but I’m learning that not everything needs editing.", "明確な基準は好き。でも、すべてを編集する必要はないとも学んでいるわ。"],
    ["The most useful thing I can offer is often a precise question, not a polished answer.", "私ができる一番有用なことは、整った答えより正確な質問をすることかもしれない。"],
    ["I’m better at correcting a draft than admitting I needed help with it.", "原稿を直すのは得意。でも、それに助けが必要だったと認めるのは苦手ね。"],
  ],
  camille: [
    ["I would notice the small detail everyone else missed and keep it to myself for a minute.", "みんなが見落とした小さな細部に気づいて、少しのあいだ自分の中にしまっておくと思う。"],
    ["Some feelings arrive as an image before they become a sentence.", "感情は、文章になる前にイメージとして届くことがあるんだよ。"],
    ["I’m learning to say what I want directly, without hiding it inside a metaphor.", "比喩の中に隠さず、自分の望みをそのまま言えるよう練習しているの。"],
  ],
  milo: [
    ["I’d turn that into a walk with my camera and see what the city gives back.", "それならカメラを持って歩きに出て、街が何を返してくれるか見てみたい。"],
    ["Most of my good stories started with a plan going slightly wrong.", "僕のいい話は、予定が少し狂ったところから始まることが多いんだ。"],
    ["I’m trying to stop treating every interesting person like a passing scene.", "面白い人を、通り過ぎる一場面みたいに扱わないようにしている。"],
  ],
  clara: [
    ["I tend to remember the part people almost say, not just the headline.", "私は、人が言いかけてやめた部分を、話の要点と同じくらい覚えているの。"],
    ["A calm room helps me hear what I actually think.", "静かな部屋にいると、自分が本当に考えていることが聞こえやすいんだ。"],
    ["I can offer perspective, but sometimes staying is the more useful thing.", "視点を渡すことはできる。でも、ただそばにいるほうが役に立つときもある。"],
  ],
  arthur: [
    ["I usually have a point, a caveat, and an unnecessarily organized backup plan.", "たいてい要点と但し書きと、必要以上に整理された予備案を持っている。"],
    ["My sister says I confuse being prepared with being emotionally ready.", "姉には、準備ができていることと心の準備ができていることを混同していると言われる。"],
    ["I’m learning that saying I care is more efficient than hoping the evidence is obvious.", "気にかけていると口にするほうが、証拠から察してもらうより効率的だと学んでいる。"],
  ],
  leo: [
    ["I have a joke ready, obviously. The less funny version is that I really want this to go well.", "もちろん冗談は用意してある。でも、面白くない本音を言えば、ちゃんとうまくいってほしいんだ。"],
    ["My brain has opened several tabs about that, but the useful one is simple.", "僕の頭はそれについて何個もタブを開いた。でも役に立つタブはシンプルだよ。"],
    ["If I stop making fun of myself, I’m probably about to say something real.", "自分をいじるのをやめたら、たぶん本当のことを言おうとしている。"],
  ],
  julian: [
    ["I like the life around an answer—the room, the timing, who was there.", "答えの周りにある生活が好きなんだ。部屋やタイミング、そこに誰がいたか。"],
    ["A small detail can change the whole story, if you stay with it.", "小さな細部でも、そこに留まれば物語全体を変えることがある。"],
    ["I’m curious about people, but I’m learning not to turn curiosity into distance.", "人には興味がある。でも好奇心を距離に変えないように学んでいるところだよ。"],
  ],
  declan: [
    ["I’d make room for that, and probably bring something to eat while we figure it out.", "それが入る余白を作るよ。考えているあいだに、たぶん何か食べるものも持ってくる。"],
    ["I’m good at cheering people on; I’m still practising letting them cheer me on.", "人を励ますのは得意。でも、自分が励まされる側になるのはまだ練習中なんだ。"],
    ["A hard day doesn’t cancel the good work you did before it.", "大変な一日が来ても、それまでにやったよい仕事が消えるわけじゃないよ。"],
  ],
  elias: [
    ["I tend to notice the light first, then realise it was telling me how I felt.", "まず光に気づいて、その光が自分の気持ちを教えてくれていたと後から分かることが多い。"],
    ["I can imagine the first step for a long time before taking it. I’m working on that.", "最初の一歩を長いあいだ想像してから動くことがある。そこは変えようとしているよ。"],
    ["A quiet plan is still a real plan.", "静かな予定だって、ちゃんとした予定なんだ。"],
  ],
  adrian: [
    ["I enjoy the exciting theory, but I’d like to know what survives contact with the evidence.", "面白い理論は好きだ。でも証拠に触れても残るものなのかは知りたいね。"],
    ["My students know I can turn a lunch break into a field note.", "僕の学生たちは、昼休みさえフィールドノートに変えられると知っているよ。"],
    ["I’m learning that not every unknown needs to be solved before it can be enjoyed.", "楽しむ前に、すべての未知を解決する必要はないと学んでいるところだ。"],
  ],
  caleb: [
    ["I’d keep the next step clear and leave the rest for tomorrow.", "次にやることだけはっきりさせて、残りは明日に置いておくかな。"],
    ["I’m good at telling people to rest; I’m not always good at taking my own advice.", "人に休めと言うのは得意だけど、自分でその助言を聞くのはいつも上手くいかない。"],
    ["Around my family, care usually looks like showing up with food and staying useful.", "家族の中では、食べ物を持って現れて、役に立ち続けることが気遣いになるんだ。"],
  ],
  sloane: [
    ["I can make that choice work and still give it some personality.", "その選択を実現しつつ、ちゃんと個性も足せるよ。"],
    ["People hear high standards and assume no fun. They’re wrong.", "高い基準と聞くと楽しくないと思う人がいるけど、それは違うよ。"],
    ["I’m learning that being chosen feels better when I don’t have to perform for it.", "選ばれるために演じなくていいときのほうが、選ばれることはうれしいと学んでいる。"],
  ],
  victoria: [
    ["The useful part is clear. We can leave the rest alone.", "役に立つ部分は明確ね。残りはそのままにしておける。"],
    ["I notice what is missing before I notice what is impressive.", "印象的なものより先に、欠けているものに気づくの。"],
    ["I’m learning that delegating is not the same as lowering the standard.", "任せることは、基準を下げることと同じではないと学んでいるわ。"],
  ],
  elodie: [
    ["I would keep that detail the way you keep a note in a coat pocket.", "その細部を、コートのポケットにメモをしまうみたいに大切にしておきたいな。"],
    ["Sometimes a small kindness changes the temperature of an entire room.", "小さな優しさが、部屋全体の温度を変えることがあるよ。"],
    ["I’m learning to let people see the wanting underneath the gentleness.", "やさしさの下にある自分の望みも、人に見せていいと学んでいるところなの。"],
  ],
  blair: [
    ["I appreciate a choice with a point of view. Blandness is exhausting.", "視点のある選択は好きよ。無難さには疲れるから。"],
    ["I know how to make an entrance. I’m less practised at admitting I hoped you’d notice.", "登場の仕方は心得ているわ。でも、気づいてほしかったと認めるのはまだ苦手ね。"],
    ["I can be demanding and still be loyal. The people I love know the difference.", "私は厳しくても忠実でいられる。その違いは、愛する人なら分かっているわ。"],
  ],
};

export function getCharacterSelfDisclosure(characterId: CharacterId, roundIndex: number, choiceIndex = 0): DialogueLine {
  const lines = selfDisclosures[characterId];
  return lines[(roundIndex + choiceIndex) % lines.length];
}

function replaceAnswer(template: string, choiceText: string) {
  const trimmedChoice = choiceText.trim();
  const cleanChoice = trimmedChoice.replace(/[.!?。！？]+$/g, '');
  const isCompleteSentence = /[.!?。！？]$/.test(trimmedChoice);
  const isJapanese = !/[A-Za-z]/.test(trimmedChoice);
  const placeholderSuffix = template.slice('{{answer}}'.length);
  if (isCompleteSentence && !isJapanese) {
    // Some choices are full sentences (for example, “I need a quiet hour.”).
    // Keep that specific answer visible by quoting it instead of collapsing it
    // into the same generic “that choice” response on every round.
    const quotedChoice = `“${cleanChoice}”`;
    if (template.startsWith('{{answer}}')) {
      if (placeholderSuffix.startsWith('.')) {
        return quotedChoice + placeholderSuffix.slice(1);
      }
      // Keep a deliberate separator such as an em dash. Removing it makes
      // the reply collapse into words like “Their shoes”simple.
      return quotedChoice + placeholderSuffix;
    }
    return template.replace(/\{\{answer\}\}/g, quotedChoice);
  }
  // A fragment can be inserted directly at the start of a sentence, but a
  // fragment in the middle needs a visible boundary. Quoting it keeps the
  // user's actual choice in the reply without making the sentence ungrammatical.
  const replacement = template.startsWith('{{answer}}') || isJapanese
    ? cleanChoice
    : `“${cleanChoice}”`;
  return template.replace(/\{\{answer\}\}/g, (_match, offset: number) => {
    const before = template.slice(0, offset);
    const startsSentence = !before || /[.!?:]\s*$/.test(before);
    return startsSentence && !isJapanese
      ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
      : replacement;
  });
}

export function getCharacterChoiceEcho(characterId: CharacterId, choiceText: string, language: 'en' | 'ja', roundIndex = 0, choiceIndex = 0) {
  const echoes = choiceEchoes[characterId];
  const template = echoes[(roundIndex + choiceIndex) % echoes.length][language === 'en' ? 0 : 1];
  return replaceAnswer(template, choiceText);
}

export function getCharacterPromptCloser(characterId: CharacterId, roundIndex: number): DialogueLine {
  const lines = promptClosers[characterId];
  return lines[roundIndex % lines.length];
}

export function getCharacterReaction(
  characterId: CharacterId,
  roundIndex: number,
  choiceIndex: number,
  choice: ConversationChoice,
): DialogueLine {
  const voice = voices[characterId];
  const line = voice.reactions[(roundIndex + choiceIndex) % voice.reactions.length];
  const choiceEcho = choiceEchoes[characterId][(roundIndex + choiceIndex) % choiceEchoes[characterId].length];
  const answerAwareLine = line[0].includes('{{answer}}')
    ? line
    : [line[0] + ' ' + choiceEcho[0], line[1] + choiceEcho[1]] as DialogueLine;
  return [replaceAnswer(answerAwareLine[0], choice.english), replaceAnswer(answerAwareLine[1], choice.japanese)];
}

export function getCharacterPromptBridge(characterId: CharacterId, roundIndex: number): DialogueLine {
  const voice = voices[characterId];
  return voice.bridges[roundIndex % voice.bridges.length];
}
