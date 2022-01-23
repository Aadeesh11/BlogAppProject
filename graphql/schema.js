const { GraphQLSchema, GraphQLObjectType } = require("graphql");

//importing stuff
const { users, user, post, posts } = require('./queries');

const {register, login, addPost } = require('./mutation');

const QueryType = new GraphQLObjectType({
    name: 'QueryType', 
    description: "Queries",
    fields: {users, user, post, posts},
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: {register, login, addPost},
})


module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});