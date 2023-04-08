const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB using Mongoose
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.w0muto1.mongodb.net/?retryWrites=true&w=majority`);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connected');
});

module.exports = db;