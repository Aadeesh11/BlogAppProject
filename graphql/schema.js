const { GraphQLSchema, GraphQLObjectType } = require("graphql");

//importing stuff
const {users} = require('./queries');

const {register, login} = require('./mutation');

const QueryType = new GraphQLObjectType({
    name: 'QueryType', 
    description: "Queries",
    fields: {users},
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: {register, login},
})


module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});