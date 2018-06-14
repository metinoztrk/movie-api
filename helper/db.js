const mongoose=require('mongoose');

module.exports=()=>{
    mongoose.connect('mongodb://movie_user:a12345@ds121965.mlab.com:21965/movie-api');
    mongoose.connection.on('open',()=>{
        console.log('mongodb connected');
    })

    mongoose.connection.on('error',(err)=>{
        console.log('mongodb error',err);
    })

    mongoose.Promise=global.Promise;
};