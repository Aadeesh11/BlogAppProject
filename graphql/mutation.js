const { GraphQLString } = require('graphql');
const { PostType } = require("./types");
const {User} = require("../models");
const {createJwtToken } = require("../util/auth");
const Post = require('../models/Post');

const register = {
    type: GraphQLString,
    args: {
        username: {type: GraphQLString},
        email:  {type: GraphQLString},
        password:  {type: GraphQLString},
        displayName:  {type: GraphQLString},
    },
    async resolve(parent, args){
        const {username, email, password, displayName} = args;
        const user = new User({username, email, password, displayName});
        await user.save();
        const token = createJwtToken(user);
        return token;
    }
}

const login = {
    type: GraphQLString,
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    },
    async resolve(parent, args){
        const user = await User.findOne({email: args.email}).select("+password");
        if((!user) || args.password !== user.password){
            throw new Error("Invalid credentials");
        }
        const token = createJwtToken(user);
        return token;
    }
}

const addPost = {
    type: PostType,
    args: {
        title: {type: GraphQLString},
        body: {type: GraphQLString},
    },
    resolve(parent, args, {verifiedUser}){
        console.log("verified ", verifiedUser);
        if(!verifiedUser) {
            throw new Error("authorize by using login mutation and then passing the returned value as header");
        }

        const post = new Post({
            authorId:verifiedUser._id,
            title: args.title,
            body: args.body,
        })

        return post.save();
    }
}


module.exports = {register, login, addPost};