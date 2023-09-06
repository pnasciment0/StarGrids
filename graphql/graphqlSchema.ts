// graphqlSchema.ts
import { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import { fetchPopularPeople } from '../tmdb/api/tmdbService';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    profile_path: { type: GraphQLString },
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
