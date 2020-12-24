const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// variables accepted in de role
let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not valid'
}

let Schema = mongoose.Schema;

// MONGO Schema database
let userSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    email:{
        type: String,
        unique: true, // unique field in database
        required: [true, 'Email is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    img:{
        type: String,
        required: false
    },
    role:{
        type: String,
        default:'USER_ROLE',
        enum: validRoles
    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

// not view password action
userSchema.methods.toJSON = function() {

    const user = this;
    const userObject =  user.toObject();
    delete userObject.password;

    return userObject;

}


// validator key unique
userSchema.plugin( uniqueValidator, { message: '{PATH} must be unique ' } )

module.exports = mongoose.model( 'User', userSchema); 