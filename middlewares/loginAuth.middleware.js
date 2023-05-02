const jwt=require('jsonwebtoken');


const loginAuth=async(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const decode=jwt.verify(token.split(' ')[1],'ActiveUser');
        if(decode){
            req.body.userId=decode.userId;
            next();
        }else{
            res.status(401).send({"error":"invalid token"});
        }
    }else{
        res.status(501).send({"error":"please login!!"});
    }
};

module.exports=loginAuth;