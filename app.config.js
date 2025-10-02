// app.config.js
import "dotenv/config";

export default {
  name: "MovieExplorer",
  slug: "movie-explorer",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "movieexplorer",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  extra: {
    tmdbApiKey: process.env.TMDB_API_KEY,
  },
};
