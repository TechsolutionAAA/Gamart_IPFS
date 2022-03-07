const express = require('express');
const router = express.Router();

const userModel = require('../models/user');


router.post('/check', async (req,res)=>{
    const { address } = req.body;
    console.log("address-->>", address)
    userModel.findOne ({ "address" : address },function(err, _details){
        if(err){
            console.log("eeeeee-->>", err);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }else{
            console.log(_details);
            return res.status(200).json({
                data: _details
            })
        }
    })
});

router.post('/add', async(req,res)=>{
    try {
        // const {address, name, description} = req.body
        console.log("add--->>", req.body)
        // await userModel.create(...req.body);
        const query = {'address': req.body.address};
        userModel.findOneAndUpdate(query, req.body, {upsert: true}, function(err, doc) {
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
router.post('/profilepic', async(req,res)=>{
    try {
        // const {address, name, description} = req.body
        // console.log("add--->>", req.body)
        // await userModel.create(...req.body);
        const query = {'address': req.body.address};
        userModel.findOneAndUpdate(query, req.body, {upsert: true}, function(err, doc) {
            if (err) {
                console.log(err)
                return res.send(500, {error: err});
            }
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

module.exports = router;