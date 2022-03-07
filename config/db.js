const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in Connecting database! "));
db.once("open", function () {
  console.log("Database Connected successfully!");
});

module.exports = db;