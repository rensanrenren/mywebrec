# mywebrec_nodejs_202412

## 1. プロジェクト概要

ユーザーが**タップで静止画を撮影**し、**長押しで動画を録画**できる機能を提供します。録画中はリアルタイムで経過時間を表示し、**円形プログレスインジケーター**で録画状況を視覚的に示します。撮影後は**プレビュー画面**で静止画や動画を確認でき、**シェア機能**を通じて他のユーザーと共有できます。


### 技術選定

- **フロントエンド**:
  - HTML, CSS, JavaScript
  - フレームワーク（必要に応じて）: React, Vue.js など
- **バックエンド**:
  - Node.js（既存のAR機能との統合）
- **ライブラリ**:
  - プログレスインジケーター: [ProgressBar.js](https://kimmobrunfeldt.github.io/progressbar.js/), [Mermaid](https://mermaid-js.github.io/)
  - 録画処理: [MediaRecorder API](https://developer.mozilla.org/ja/docs/Web/API/MediaRecorder)
  - AR統合: [Snapchat CameraKit](https://developers.snap.com/docs/camerakit/)
- **ドキュメンテーション**:
  - Markdown（GitHub README.md）
  - 図表作成: [Mermaid](https://mermaid-js.github.io/)（Markdown内での図表作成に利用）

---

## 3. システムアーキテクチャ

### 全体図

以下の図は、システム全体のアーキテクチャを示しています。新たに追加された機能を含めています。

```mermaid
graph TD
    A[ユーザーインターフェース] --> B[録画ボタンコンポーネント]
    B --> C{タップ vs 長押し操作}
    C -->|タップ| D[静止画撮影]
    C -->|長押し| E[動画録画]
    E --> F[MediaRecorder API]
    F --> G[録画データの保存]
    D --> G
    B --> H[リアルタイムタイマー]
    B --> I[円形プログレスインジケーター]
    G --> J[プレビューコンポーネント]
    J --> K[シェアコンポーネント]
    A --> L[AR統合コンポーネント]
    L --> M[Snapchat CameraKit]
    M --> N[Node.js ARサーバー]
```



