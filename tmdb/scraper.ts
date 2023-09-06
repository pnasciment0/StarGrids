import { graphql, parse } from 'graphql';
import schema from '../graphql/graphqlSchema';

const query = `
  {
    popularPeople {
      id
      name
      profile_path
    }
  }
`;

const executeQuery = async () => {
  try {
    const result = await graphql({
      schema,
      source: query,
    });
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error executing query:', error);
  }
};

executeQuery();
