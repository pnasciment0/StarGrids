"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// graphqlSchema.ts
const graphql_1 = require("graphql");
const tmdbService_1 = require("../tmdb/api/tmdbService");
const MovieCreditType = new graphql_1.GraphQLObjectType({
    name: 'MovieCredit',
    fields: () => ({
        id: { type: graphql_1.GraphQLInt },
        title: { type: graphql_1.GraphQLString },
        poster_path: { type: graphql_1.GraphQLString }
        // add other fields
    }),
});
const PersonType = new graphql_1.GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        id: { type: graphql_1.GraphQLInt },
        name: { type: graphql_1.GraphQLString },
        profile_path: { type: graphql_1.GraphQLString },
        filmography: {
            type: new graphql_1.GraphQLList(MovieCreditType),
            resolve(parent, args) {
                return (0, tmdbService_1.fetchMovieCreditsForPerson)(parent.id); // Assuming `parent.id` has the person's ID
            },
        },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        popularPeople: {
            type: new graphql_1.GraphQLList(PersonType),
            resolve(parent, args) {
                return (0, tmdbService_1.fetchPopularPeople)();
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
});
