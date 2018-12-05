const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/music';

mongoose.connect(process.env MONGODB_URI || connectionString, { useNewUrlParser: true});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected at ', connectionString);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected ');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose error ', err);
});
