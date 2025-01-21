# test-sveltekit-monorepo
sveltekitでモノレポのテスト


## やったこと

- `apps/*` で npx sv create
- common は ライブラリ として npx sv create
- package.json の private が true じゃなければ true に設定
- svelte.config.js に common の lib 等の alias を登録
- jsconfig.json の include に common の lib の path を追加し、一度devコマンド叩いたあとに出てくる .svelte-kit/tsconfig.json の include をコピペする
- yarn workspaces として、 `apps/*` と common を設定
- commands は `vite dev` や デプロイなどのコマンドを楽にできるもの

## やったけどやらなくていいこと

- imports#internal の設定