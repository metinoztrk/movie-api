const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const DirectorSchema=new Schema({
    name: {
        type:String,
        maxlength:20,
        minlength:3
    },
    surname:{
        type:String,
        maxlength:20,
        minlength:3
    },
    bio:{
        type:String,
        maxlength:500,
        minlength:50
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('director',DirectorSchema);