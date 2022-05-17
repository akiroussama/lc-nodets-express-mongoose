import express from 'express';
import mongoose from 'mongoose';
import WildersController from './controllers/Wilders';
import { typeDefs } from './gql/schema';
import { resolvers } from './gql/resolvers';
import { startApolloServer } from './startApolloServer';


mongoose.connect('mongodb://localhost:27017/wildapi2', {
    autoIndex: true
})
    .then(() => {
        console.log("Connected");
    })
    .catch(() => {
        console.log("Not connected");
    });


startApolloServer(typeDefs, resolvers).then(() => {
 console.log(' Server ready at http://localhost:4000/graphql 🚀🚀🚀');   
});