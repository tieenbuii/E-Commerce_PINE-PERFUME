const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/.+@.+\..+/, 'Please enter a valid email']
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        role: {
            type: String,
            enum: ['customer', 'admin'],
            default: 'customer'
        }, 
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        img_User: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        }, 
        id_cart: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        }],
        wishlist: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        isBLocked: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String
        },
        passwordChangedAt: {
            type: String
        },
        passwordResetToken: {
            type: String
        },
        passwordResetExpires: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);

})
//Export the model
module.exports = mongoose.model('User', userSchema);