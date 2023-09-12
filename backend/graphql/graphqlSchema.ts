// graphqlSchema.ts
import { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import { fetchPopularPeople, fetchMovieCreditsForPerson } from '../tmdb/api/tmdbService';

const MovieCreditType = new GraphQLObjectType({
  name: 'MovieCredit',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    poster_path: { type: GraphQLString }
    // add other fields
  }),
});

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    profile_path: { type: GraphQLString },
    filmography: {
      type: new GraphQLList(MovieCreditType),
      resolve(parent, args) {
        return fetchMovieCreditsForPerson(parent.id);  // Assuming `parent.id` has the person's ID
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    popularPeople: {
      type: new GraphQLList(PersonType),
      resolve(parent, args) {
        return fetchPopularPeople();
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
