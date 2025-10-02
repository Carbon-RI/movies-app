// app.config.js
import "dotenv/config";

export default {
  // --- 【必須追加項目】ここから ---
  name: "MovieExplorer", // アプリ名
  slug: "movie-explorer", // アプリのURLスラッグ
  version: "1.0.0", // バージョン
  orientation: "portrait", // 画面の向きを縦に固定

  // Linking Warningを解消するための設定
  scheme: "movieexplorer",

  // アイコンやスプラッシュスクリーンなどのアセットパス
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  // --- 【必須追加項目】ここまで ---

  extra: {
    tmdbApiKey: process.env.TMDB_API_KEY,
  },
};
