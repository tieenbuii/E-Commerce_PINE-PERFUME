const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var toneSchema = new mongoose.Schema({
    title: {
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
module.exports = mongoose.model('Tone', toneSchema);