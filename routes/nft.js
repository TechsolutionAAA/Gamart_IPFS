const express = require('express');
const router = express.Router();

const nftModel = require('../models/nft');
router.post('/updateNft', async(req,res)=>{
    try {
        // const {address, name, description} = req.body
        console.log("updateNft--->>", req.body)
        // await userModel.create(...req.body);
        const query = {'tokenId': req.body.tokenId};
        nftModel.findOneAndUpdate(query, req.body, {upsert: true}, function(err, doc) {
            if (err) {
                console.log(err)
                return res.send(500, {error: err});
            }
            console.log(doc)
            return res.json({
                success:true
            });
        });
       
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/getMarket', async(req,res)=>{
    try {
        // const {address, name, description} = req.body
        console.log("getMarket--->>", req.body)
        const page = req.body.page;
        console.log("page",page)
        const market = await nftModel.find({'sellOf':true}).skip(page*9).limit(9);
        return res.json({market:market});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/getCollections', async(req,res)=>{
    try {
        // const {address, name, description} = req.body
        console.log("getMarket--->>", req.body, typeof(req.body));

        const page = req.body.page;
        const owner = req.body.owner;
        console.log("page",page)
        const q = await nftModel.find({'owner':owner}).skip(page*9).limit(9);
        res.json({collections:q});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
module.exports = router;