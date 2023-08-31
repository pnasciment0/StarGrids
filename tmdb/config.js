require('dotenv').config();

// console.log(process.env.DB_HOST);

module.exports = {
  tmdb: {
    apiKey: process.env.TMDB_API_KEY,
    baseUrl: 'https://api.themoviedb.org/3',
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    url: process.env.DB_URL
  },
  server: {
    port: process.env.SERVER_PORT || 4000,
  },
};
