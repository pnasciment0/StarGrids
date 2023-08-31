const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Pool } = require('pg');
const config = require('../../config');
const api = require('../api/api');

// const pool = new Pool({
//   host: config.db.host,
//   port: config.db.port,
//   database: config.db.database,
//   user: config.db.user,
//   password: config.db.password,
// });

const pool = new Pool({
    connectionString: config.db.url,
    ssl: { rejectUnauthorized: false }
});

const test_movie = {
    title: 'Test',
    was_marvel: false,
    was_nominated: false,

}

const getActors = api.getActors;

const insertMovie = async (movie) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
  
      const insertMovieText = 'INSERT INTO Movie (title, was_marvel, was_nominated) VALUES($1, $2, $3) RETURNING movie_id';
      const insertMovieValues = [movie.title, movie.was_marvel, movie.was_nominated]; // Adjust these values based on TMDB data
      const movieResult = await client.query(insertMovieText, insertMovieValues);
      const movieId = movieResult.rows[0].movie_id;
  
      const actors = await getActors(movie.id);
  
      for (let actor of actors) {
        const insertActorText = 'INSERT INTO Actor (name, photo_url) VALUES($1, $2) ON CONFLICT (name) DO NOTHING RETURNING actor_id';
        const insertActorValues = [actor.name, actor.profile_path];
        const actorResult = await client.query(insertActorText, insertActorValues);
        const actorId = actorResult.rows[0]?.actor_id;
  
        if (actorId) {
          const insertMovieActorText = 'INSERT INTO Movie_Actor (movie_id, actor_id, rarity_score) VALUES($1, $2, $3)';
          const insertMovieActorValues = [movieId, actorId, actor.rarity_score]; // Adjust rarity_score based on your logic
          await client.query(insertMovieActorText, insertMovieActorValues);
        }
      }
  
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  };

insertMovie(test_movie)//.catch(console.error);