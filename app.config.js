// app.config.js
import "dotenv/config";

export default {
  extra: {
    tmdbApiKey: process.env.TMDB_API_KEY,
  },
};
