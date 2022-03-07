const { text } = require('body-parser');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    address: String,
    name : String,
    description : String,
    instagram : String,
    telegram : String,
    twitter : String,
    picUrl : String
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;