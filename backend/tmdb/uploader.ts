import * as fs from 'fs';

import { Pool } from 'pg';
import { connectDB, createRecord } from '../database/db';  // import from your db.ts

const addDataToDB = async (jsonData: any) => {
  const db: Pool = connectDB();
  
  // Begin transaction
  await db.query('BEGIN');
  
  // Start timer
  console.time("Upload Time");
  
  try {
    const popularPeople = jsonData.data.popularPeople;

    // Add actors and their movies
    const actorPromises = popularPeople.map(async (person: any) => {
      const { id, name, profile_path, filmography } = person;
      
      // Add actor
      const actorRes = await createRecord('actors', {
        id,
        name,
        headshot_url: profile_path,
      });
      
      if (actorRes.rowCount > 0) {
        console.log(`Uploaded actor: ${name}, ID: ${actorRes.rows[0].id}`);
      }
      
      // Add movies for this actor
      const moviePromises = filmography.map(async (movie: any) => {
        const { id, title, poster_path } = movie;
        const movieRes = await createRecord('movies', {
          id,
          name: title,
          poster_url: poster_path,
        });

        if (movieRes.rowCount > 0) {
          console.log(`Uploaded movie: ${title}, ID: ${movieRes.rows[0].id}`);

          // Populate relational databases
          await createRecord('movie_actors', {
            movie_id: id,
            actor_id: person.id,
          });

          await createRecord('actor_movies', {
            actor_id: person.id,
            movie_id: id,
          });
        }
      });
      
      // Wait for all movies for this actor to be added
      await Promise.all(moviePromises);
    });
    
    // Wait for all actors (and their movies) to be added
    await Promise.all(actorPromises);
    
    // Commit transaction
    await db.query('COMMIT');
    
    // End timer
    console.timeEnd("Upload Time");
  } catch (e) {
    console.error('Transaction failed, rolling back', e);
    
    // Rollback transaction
    await db.query('ROLLBACK');
  }
};

// Read data.json file
const path = require('path');
const fullPath = path.join(__dirname, 'data.json');
const rawData = fs.readFileSync(fullPath, 'utf-8');
const data = JSON.parse(rawData);

// Execute the function
addDataToDB(data).catch((err) => console.error(err));
