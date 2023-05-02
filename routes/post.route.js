const express=require('express');
const PostModel = require('../models/post.model');
const post=express.Router();

// read
post.get('/',async(req,res)=>{
    if(req.query.device){
        try {
            const data=await PostModel.find({userId:req.body.userId}).where('device').equals(req.query.device);
            res.status(200).send(data);
        } catch (error) {
            res.status(501).send({"error":"failed to get the data"});
        }
    }else if(req.query.device1 && req.query.device2){
        try {
            const {device1,device2}=req.query;
            const data=await PostModel.find({userId:req.body.userId}).where('device').equals(device1);
            const data1=await PostModel.find({userId:req.body.userId}).where('device').equals(device2);
            const mainData=[...data,data1];
            res.status(200).send(mainData);
        } catch (error) {
            res.status(501).send({"error":"failed to get the data"});
        }
    }else{
        try {
            const data=await PostModel.find({userId:req.body.userId});
            res.status(200).send(data);
        } catch (error) {
            res.status(501).send({"error":"failed to get the data"});
        }
    }
});


// add
post.post('/create',async(req,res)=>{
    try {
        const post=new PostModel(req.body);
        await post.save();
        res.status(201).send({"success":"new post has been created"});
    } catch (error) {
        res.status(501).send({"error":"failed to create the post"});
    }

});

// update
post.patch('/update/:id',async(req,res)=>{
    try {
        await PostModel.findByIdAndUpdate({_id:req.params.id},req.body);
        res.status(200).send({"success":"post is updated"});
    } catch (error) {
        res.status(501).send({"error":"failed to update the post"});
    }
});

// delete
post.delete('/delete/:id',async(req,res)=>{
    try {
        await PostModel.findByIdAndDelete({_id:req.params.id});
        res.status(200).send({"success":"post is deleted"});
    } catch (error) {
        res.status(501).send({"error":"failed to delete the post"});
    }
});


module.exports=post;