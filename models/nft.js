const { text } = require('body-parser');
const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
    owner: String,
    tokenId: Number,
    tokenURI: String,
    image: String,
    title: String,
    price : Number,
    sellOf: Boolean,
    description : String,
})

const nftModel = mongoose.model('Nft', nftSchema);
module.exports = nftModel;