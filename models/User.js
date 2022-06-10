const {Schema, model, default: mongoose} = require('mongoose');


const User = new Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 20
    },
    lastname:{
        type: String,
        required: true,
        maxlength: 20
    },
    role:{
        type: String,
        required: true,
        immutable: true,
        enum: ['Client', 'Staff', 'Administrator']
    },
    login:{
        type: String,
        required: true,
        maxlength: 20,
        immutable: true,
        unique: true,

    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        minlength: 10,
        maxlength: 50
    },
    listOfProducts: [ mongoose.SchemaTypes.ObjectId ],
    capacity: {
        type: Number,
        min: 0,
        max: 5000
    }, 

}, { timestamps: true })


module.exports = model('User', User);