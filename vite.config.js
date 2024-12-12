import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // ローカルネットワークアクセスを許可
    port: 3000, // 必要ならポートを変更
  },
  base: '/<reponame>/', // GitHub Pagesでのリポジトリ名に合わせて設定
});
