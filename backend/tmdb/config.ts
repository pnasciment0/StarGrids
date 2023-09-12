// config.ts

interface TmdbConfig {
  apiKey: string;
  baseUrl: string;
}

interface DbConfig {
  host: string;
  port: string;
  database: string;
  user: string;
  password: string;
  url: string;
}

interface ServerConfig {
  port: number | string;
}

require('dotenv').config({ path: '../../.env' });

const config = {
  tmdb: {
    apiKey: process.env.TMDB_API_KEY as string,
    baseUrl: 'https://api.themoviedb.org/3',
  },
  db: {
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT as string,
    database: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    url: process.env.DB_URL as string,
  },
  server: {
    port: process.env.SERVER_PORT || 4000,
  },
};

export default config as { tmdb: TmdbConfig, db: DbConfig, server: ServerConfig };
