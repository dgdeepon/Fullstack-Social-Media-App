const mongoose=require('mongoose');

const PostSchema=mongoose.Schema({
    title:{type:String,require:true},
    body:{type:String,require:true},
    device:{type:String,require:true},
    userId:{type:String,require:true}
});

const PostModel=mongoose.model("post",PostSchema);



module.exports=PostModel;