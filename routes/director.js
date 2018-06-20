const express = require('express');
const mongoose=require('mongoose');
const router = express.Router();

const Director=require('../models/Director')

router.post('/', (req, res, next)=> {
  const director=new Director(req.body);
  const promise=director.save();

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.get('/',(req,res)=>{
  const promise =Director.aggregate([
    {
      $lookup:{
        from:'movies',//collection ismi
        localField:'_id',//director collection da eşleştireceği
        foreignField:'director_id',//movie collection da eşleştireceği
        as:'movies'//atandığı değisken
      }
    },
    {
      $unwind:{
        path:'$movies',
        preserveNullAndEmptyArrays:true
      }
    },
    {
      $group:{
        _id:{
          _id:'$_id',
          name:'$name',
          surname:'$surname',
          bio:'$bio'
        },
        movies:{
          $push:'$movies'
        }
      }
    },
    {
      $project:{
        _id:'$_id._id',
        name:'$_id.name',
        surname:'$_id.surname',
        movies:'$movies'
      }
    }
  ]);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.get('/:director_id',(req,res)=>{
  const promise =Director.aggregate([
    {
      $match:{
        '_id':mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup:{
        from:'movies',//collection ismi
        localField:'_id',//director collection da eşleştireceği
        foreignField:'director_id',//movie collection da eşleştireceği
        as:'movies'//atandığı değisken
      }
    },
    {
      $unwind:{
        path:'$movies',
        preserveNullAndEmptyArrays:true
      }
    },
    {
      $group:{
        _id:{
          _id:'$_id',
          name:'$name',
          surname:'$surname',
          bio:'$bio'
        },
        movies:{
          $push:'$movies'
        }
      }
    },
    {
      $project:{
        _id:'$_id._id',
        name:'$_id.name',
        surname:'$_id.surname',
        movies:'$movies'
      }
    }
  ]);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.put('/:director_id',(req,res,next)=>{
  const promise=Director.findByIdAndUpdate(req.params.director_id,req.body,{new:true});
  promise.then((director)=>{
    if(!director)
      next({message:'the director was not found'});
    res.json(director);
  }).catch((err)=>{
    res.json(err);
  });
});

router.delete('/:director_id',(req,res,next)=>{
  const promise=Director.findByIdAndRemove(req.params.director_id);
  promise.then((director)=>{
    if(!director)
      next({message:'the director was not found'});
    res.json({status:1});
  }).catch((err)=>{
    res.json(err);
  });
});

module.exports = router;
