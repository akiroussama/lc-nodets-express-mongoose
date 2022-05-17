import express from 'express';
import mongoose from 'mongoose';
import WildersController from './controllers/Wilders';


mongoose.connect('mongodb://localhost:27017/wildapi2', {
    autoIndex: true
})
    .then(() => {
        console.log("Connected");
    })
    .catch(() => {
        console.log("Not connected");
    });


