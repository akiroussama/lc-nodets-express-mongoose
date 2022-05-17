export function connectDatabase() {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/wildapi2', {autoIndex: true});
    mongoose.connection.on('error', (err: any) => {
        console.log(err);
    });
    mongoose.connection.once('open', () => {
        console.log('Connected to mongodb');
    });
}