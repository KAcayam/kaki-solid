# Oyster(Solid JS)

## 🛠 技術スタック

- **Framework**: [Solid Start](https://start.solidjs.com/) (Vinxi)
- **UI Logic**: [Ark UI](https://ark-ui.com/) (Headless UI)
- **Styling**: [Panda CSS](https://panda-css.com/) (with [Park UI](https://park-ui.com/) Preset)
- **Icons**: [Lucide Solid](https://lucide.dev/guide/packages/lucide-solid)

### 1. 依存関係のインストール
ignore scriptsをしないとBun,tsupという不要なビルドツールを求められてエラーになる

```bash
npm install --ignore-scripts
```

### 2. 開発サーバーの起動
package.jsonのscriptsにPanda CSS の型生成（codegen）監視も並行してrunできるように記述済み
これをしておかないとレシピなどを変更するたびにcodegen/cssgenが必要になる

```bash
npm run dev
```

### 3. ビルド

```bash
npm run build
```

## 📝 ポイント

- **A11y**: Ark UI のステートマシンを利用し、WAI-ARIA 準拠の挙動を担保しています