const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connection to MongoDB'));

db.once('open',function(){
    console.log('Connected to DB: MongoDB');
})
