const connection=require('mongoose');
require('dotenv').config();

const db=connection.connect(process.env.atlasUrl);


module.exports=db;