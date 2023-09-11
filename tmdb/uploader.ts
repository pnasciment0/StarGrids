import * as fs from 'fs';

// Read data.json file
const rawData = fs.readFileSync('./data.json', 'utf-8');
const data = JSON.parse(rawData);

const { actors, movies } = data;

import { Pool } from 'pg';
import { connectDB, createRecord } from '../database/db';  // import from your db.ts
import { Actor, Movie } from '../server/types';

const addDataToDB = async () => {
  const db: Pool = connectDB();  // Assumes your connectDB() is exported
  
  // Begin transaction
  await db.query('BEGIN');
  
  try {
    // Add actors
    const actorPromises = actors.map(async (actor: Actor) => {
      const { id, name, headshot_url } = actor;
      return createRecord('actors', {
        id,
        name,
        headshot_url,
      });
    });
    
    // Add movies
    const moviePromises = movies.map(async (movie: Movie) => {
      const { id, name, poster_url } = movie;
      return createRecord('movies', {
        id,
        name,
        poster_url
      });
    });
    
    // Wait for all actors and movies to be added
    await Promise.all([...actorPromises, ...moviePromises]);
    
    // Add relationships for movies and actors
    for (const movie of movies) {
      for (const actorId of movie.cast) {
        await createRecord('movie_actors', {
          movie_id: movie.id,
          actor_id: actorId,
        });
        await createRecord('actor_movies', {
          actor_id: actorId,
          movie_id: movie.id,
        });
      }
    }
    
    // Commit transaction
    await db.query('COMMIT');
  } catch (e) {
    console.error('Transaction failed, rolling back', e);
    
    // Rollback transaction
    await db.query('ROLLBACK');
  }
};

// Execute the function
addDataToDB().catch((err) => console.error(err));

