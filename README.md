# Knowledge DB - Web Frontend

Next.js + Tailwind CSS で構築された Knowledge DB の検索フロントエンド。

## 機能

- 🔍 **Full Text Search** - PostgreSQL の Full Text Search で高速検索
- 📊 **統計情報表示** - 登録文書数、データソース数など
- 📱 **レスポンシブデザイン** - モバイル対応
- ⚡ **高速検索** - 平均応答時間 < 100ms

## セットアップ

### 環境変数設定

```bash
cp .env.example .env.local
# .env.local を編集して NEXT_PUBLIC_API_URL を設定
```

開発環境:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### インストール & 実行

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## ビルド & デプロイ

### 本番ビルド

```bash
npm run build
npm start
```

### Vercel へのデプロイ

```bash
vercel
```

## 構成

```
app/
├── page.tsx              # メイン検索ページ
├── components/
│   ├── SearchForm.tsx    # 検索入力フォーム
│   └── SearchResults.tsx # 検索結果表示
└── globals.css           # グローバルスタイル
```
