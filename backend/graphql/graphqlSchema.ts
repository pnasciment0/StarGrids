// graphqlSchema.ts
import { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import { fetchPopularPeople, fetchMovieCreditsForPerson } from '../tmdb/api/tmdbService';
import { createRecord, updateRecord, deleteRecord } from '../database/db';

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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPerson: {
      type: PersonType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        profile_path: { type: GraphQLString }
      },
      resolve(parent, args) {
        return createRecord('actors', {
          name: args.name,
          headshot_url: args.profile_path
        });
      },
    },
    updatePerson: {
      type: PersonType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        profile_path: { type: GraphQLString },
      },
      resolve(parent, args) {
        const updates = {
          name: args.name,
          headshot_url: args.profile_path,
        };
        return updateRecord('actors', updates, 'id=$1', [args.id]);
      },
    },
    deletePerson: {
      type: PersonType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return deleteRecord('actors', 'id=$1', [args.id]);
      },
    },
    // Add similar mutations for Movies and other entities
  },
});


export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
