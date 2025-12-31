const mongoose = require('mongoose'); 

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },

    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'fooditem',
        required:true,
    },
  },
    {
      timestamps:true
    }
);

const likemodel = mongoose.model('like', likeSchema);
module.exports = likemodel;