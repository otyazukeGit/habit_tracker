# Habit Tracker

## 概要
* 習慣の実行有無をチェック！

## デモ
![DEMO](https://user-images.githubusercontent.com/31443408/89024334-e2e16e80-d35f-11ea-9e5c-e3286e97d2b9.gif)

## 機能
* 習慣の追加/削除
* 習慣名の編集
* ドラッグ&ドロップで習慣の順番を入れ替える
* 習慣の実行結果を残す yes/no
* 曜日単位で習慣の実行結果を残す yes/no
* 全習慣の実行結果をクリア

## 実装するにあたって試みたこと・感じたこと
### 基本
* Reactを中心にモダンなライブラリを触ろう！
### [Electron](https://www.electronjs.org/)
* せっかくだからアプリが完成したら配布してみよう、と思うてElectron導入
** ビルドが上手くいっていないので実現できていないです..
### React
* 何よりもReactに触ってみようで始めたプロジェクト
* 当初クラスコンポーネントで組みました.
* React v16.8.0よりReact Hooksが始まり、関数コンポーネントでの実装に書き換えました.
* 途中Reduxを組み込みましたけど、useReducer()で事足りたので一旦Reduxを消しました.
* ですが、StoreだったりReducerなどの概念は勉強になりました.
### [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
* React + Drag n Dropの為のモジュール
* サンプルなどドキュメントがガッツリありまして大変勉強になりました。
### [TypeScript](https://www.typescriptlang.org/)
* TypeScript触ってみようで導入
* 型定義をすることで確かに後からの改修や把握が捗りそうです
### Javascript
* 単純に配列操作の練習になりました。
### [NeDB](https://github.com/louischatriot/nedb)
* 習慣情報をテキストファイルに保存
* ちょいちょい上手く動かなくてNeDB実装に割と時間が取られた印象です.
### デザイン
* [styled-components](https://styled-components.com/) や [Material-UI](https://material-ui.com/)をとりあえず入れてみました.
### 他
* Reactは色々ライブラリを持ち寄ってアプリ作っていくので、ライブラリを短い時間で把握する能力が要るなぁ、と感じました.

## 課題・改善点
* [electron-builder](https://www.electron.build/) でのビルドができていない.
** webpackを通しているからかindex.htmlのパスが上手く設定できない.
* ユーザアクションの度にデータ更新の構成にしてしまったので、Store更新とDB更新の二重な感じになってしまった.
* テキストボックス入力時、onBlur(フォーカスアウト)を効かせたいが、今はonChangeでしかイベント発火できていない.
* TypeScriptの型定義を次回はちゃんと書きたい.
* class名などの命名規約をきちんと決めなかったので、途中自分で実装しづらくなっていた.
* ESLintもちゃんと使いたい.
* デザインに時間を使わなかったので見栄えを意識したい.


