const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema({
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

const savemodel = mongoose.model('save', saveSchema);
module.exports = savemodel;