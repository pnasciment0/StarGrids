import { graphql, parse } from 'graphql';
import schema from '../graphql/graphqlSchema';
import * as fs from 'fs';
import * as path from 'path';

const query = `
  {
    popularPeople {
      id
      name
      profile_path
      filmography {
        id
        title
        poster_path
      }
    }
  }
`;

const executeQuery = async () => {
  try {
    console.time('GraphQL Query Execution Time');
    const result = await graphql({
      schema,
      source: query,
    });

    if (process.argv.length >= 3) {

      const filePath = path.join(__dirname, 'data.json');  // Defining path for the JSON file

      fs.writeFile(filePath, JSON.stringify(result, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log(`Results written to ${filePath}`);
        }
      });
    } else {
      console.log(JSON.stringify(result, null, 2));
    }
    console.timeEnd('GraphQL Query Execution Time');
  } catch (error) {
    console.timeEnd('GraphQL Query Execution Time');
    console.error('Error executing query:', error);
  }
};

executeQuery();
