const express=require('express');
const UserModel = require('../models/user.model');
const user=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { reset } = require('nodemon');


user.post('/register',async(req,res)=>{
    try {
        bcrypt.hash(req.body.password,5,async(err,hash)=>{
            if(hash){
                const user=new UserModel({name:req.body.name,email:req.body.email,gender:req.body.gender,password:hash});
                await user.save();
                res.status(201).send({"success":"new user has been created"});
            }else{
                res.status(501).send({"Error":"failed to hash the password"});
            }
        })
    } catch (error) {
        res.status(501).send({"error":"failed to create the user"});
    }
});

user.post('/login',async(req,res)=>{
    try {
        const user=await UserModel.findOne({email:req.body.email});
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if(result){
                const token=jwt.sign({userId:user._id,userName:user.name},'ActiveUser');
                res.status(200).send({"success":"login successful","token":token});
            }else{
                res.status(401).send({"error":"wrong password"});
            }
        })
    } catch (error) {
        res.status(501).send({"error":"user doesn't exit"});
    }
});


module.exports=user;