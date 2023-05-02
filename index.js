const express=require('express');
const app=express();
const cors=require('cors');
const db = require('./config/db');
const user = require('./routes/user.route');
const loginAuth = require('./middlewares/loginAuth.middleware');
const post = require('./routes/post.route');


app.use(cors());
app.use(express.json());


// user route
app.use('/user',user);

// login auth 
app.use('/post',loginAuth);

// post route
app.use('/post',post);


app.listen(8080,async()=>{
    try {
        await db;
        console.log('db is connected');
    } catch (error) {
        console.log('failed to connected the db');
    }
    console.log('server port is 8080');
})