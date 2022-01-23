const { GraphQLString, GraphQLList, GraphQLID } = require('graphql');
const { UserType, PostType } = require("./types");
const {User} = require("../models");
const Post = require('../models/Post');

const users = {
    type: new GraphQLList(UserType),
    description: "All registered users list",
    resolve(parent, args){
        return User.find();
    }
};

const user = {
    type: UserType,
    description: "user with id= id",
    args: {id: {type: GraphQLID}},
    resolve(parent, args){
        return User.findById(args.id);
    }
}; 

const posts = {
    type: new GraphQLList(PostType),
    resolve() {
        return Post.find();
    }
}

const post = {
    type: PostType,
    args: {id: {type: GraphQLID}},
    resolve(_, args) {
        return Post.findById(args.id);
    }
}

module.exports = { users, user, posts, post };
