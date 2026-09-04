# between

「英語を勉強する場所」ではなく、「英語で人間関係を持つ場所」を目指す、iOSメッセンジャー風のExpo SDK 54プロトタイプです。

## ローカル確認

```powershell
npm install
npm run start:web
```

ブラウザで表示されたURLを開いてください。ローカルWebは **5173** を使用し、8082は使用しません。デスクトップでは中央のiPhoneフレーム、幅390px前後ではiPhone相当の密度で確認できます。

## iOS確認

```powershell
npm run start:ios
```

Expo GoまたはiOSシミュレータから確認できます。iOS実機ビルド時は、`app.json` の `bundleIdentifier` をリリース用の値へ変更してください。

## 触れる導線

- Chats：会話一覧からJackを開く
- チャット詳細：受信メッセージをタップして英語／日本語表示を循環
- 返信：日本語の意図を選び、表示された英文を入力して送信
- People：Meetで新しい人をContactsへ追加
- Me：通知、外観、Face IDなどの設定行を確認

## 画面方針

学習アプリらしいXP、Lesson、単語帳、正答率、連続学習表示は置かず、通知・英文受信・意思決定・英文入力・関係性の変化を普通のメッセンジャー体験として見せます。
