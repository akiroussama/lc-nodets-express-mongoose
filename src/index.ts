import express from 'express';
import mongoose from 'mongoose';
import WildersController from './controllers/Wilders';

const { ApolloServer, gql } = require('apollo-server-express');

const app = express();


mongoose.connect('mongodb://localhost:27017/wildapi2', {
    autoIndex: true
})
    .then(() => {
        console.log("Connected");
    })
    .catch(() => {
        console.log("Not connected");
    });


app.listen(4000, function () {
    console.log("Server started on port 4000!");
});

