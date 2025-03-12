const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var stockSchema = new mongoose.Schema({
    tone:[{
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Tone' 
    }],
    tone_main:{
        type:String,
        required:true,
        unique:true,
    },
    tone_first:{
        type:String,
        required:true,
        unique:true,
    },
    tone_second:{
        type:String,
        required:true,
        unique:true,
    },
    tone_third:{
        type:String,
        required:true,
        unique:true,
    },
    status: { // Trạng thái
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Stock', stockSchema);