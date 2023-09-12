import * as fs from 'fs';

import axios from 'axios';

// Read data.json file
const rawData = fs.readFileSync('./data.json', 'utf-8');
const data = JSON.parse(rawData);

import { Pool } from 'pg';
import { connectDB, createRecord } from '../database/db';  // import from your db.ts
import { Actor, Movie } from '../server/types';

const addDataToDB = async (jsonData: any) => { // Assuming jsonData is your data.json
  const db: Pool = connectDB(); // Assumes your connectDB() is exported
  
  // Begin transaction
  await db.query('BEGIN');
  
  try {
    const popularPeople = jsonData.data.popularPeople;

    // Add actors and their movies
    const actorPromises = popularPeople.map(async (person: any) => {
      const { id, name, profile_path, filmography } = person;
      
      // Add actor
      await createRecord('actors', {
        id,
        name,
        headshot_url: profile_path,
      });
      
      // Add movies for this actor
      const moviePromises = filmography.map(async (movie: any) => {
        const { id, title, poster_path } = movie;
        await createRecord('movies', {
          id,
          name: title,
          poster_url: poster_path
        });
        
        // Add relationship for this movie and actor
        await createRecord('movie_actors', {
          movie_id: id,
          actor_id: person.id,
        });
        await createRecord('actor_movies', {
          actor_id: person.id,
          movie_id: id,
        });
      });
      
      // Wait for all movies for this actor to be added
      await Promise.all(moviePromises);
    });
    
    // Wait for all actors (and their movies) to be added
    await Promise.all(actorPromises);
    
    // Commit transaction
    await db.query('COMMIT');
  } catch (e) {
    console.error('Transaction failed, rolling back', e);
    
    // Rollback transaction
    await db.query('ROLLBACK');
  }
};


// Execute the function
addDataToDB(data).catch((err) => console.error(err));

