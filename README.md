# Cleaner
ゴミ拾いの情報投稿サイトです。
自身のしたゴミ拾いを画像・コメント付きで投稿して共有できます。
また誰かとゴミを拾うことを企画することもできます。
レスポンシブ対応しているのでスマホからでもご確認いただけます。

![image-of-Cleaner](https://user-images.githubusercontent.com/65007308/99279204-4d68dc80-2873-11eb-81bc-42e8d7dee053.png)

![Project-list-Cleaner](https://user-images.githubusercontent.com/65007308/99282796-80ad6a80-2877-11eb-9984-1d07994ead3b.png)


# URL
https://cleaner-caffc.web.app/
画面右上部のゲストログインボタンから、メールアドレスとパスワードを入力せずにログインできます。

# 使用技術
- Nuxt.js 2.14.0
- Vuetify 1.11.2
- firebase 7.24.0
  - Authentication
  - Cloud Firestore
  - Storage
  - Hosting

# DB設計図 (ER図)
![DB設計 ER図 改訂版](https://user-images.githubusercontent.com/65007308/99282274-d33a5700-2876-11eb-96e4-2a7dce4933bc.jpg)


# 機能一覧

- ユーザー登録、ログイン機能
- 投稿機能
  - 画像＆テキスト投稿
  - 投稿記事編集機能
  - 投稿記事削除機能
- ユーザー情報管理機能
  - プロフィール(画像・名前・コメント)編集機能
- いいね機能(追加予定)
- コメント機能(追加予定)
- ダイレクトメッセージ機能(追加予定)
- 投げ銭機能(追加予定)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
