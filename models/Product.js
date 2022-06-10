const {Schema, model, default: mongoose} = require('mongoose');

//data validator
//получать сегодняшнюю дату
//парсить в строку
//подставлять в валидатор

// let now = new Date();

// let month = now.getMonth() < 9 ? "0"+ now.getMonth().toString() : now.getMonth().toString();
// let day = now.getDate() < 9 ? "0"+ now.getDate().toString() : now.getDate().toString();
// let date = `${now.getFullYear().toString()}-${month}-${day}`;

// console.log(now.getFullYear());
// console.log(now.getMonth());
// console.log(now.getDate());
// console.log(date);

// validator ??
const Product = new Schema({
    name: {
        type: String, 
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        maxlength: 2000
    },
    status: {
        type: String,
        required: true,
        enum: ['In processing', 'Confirmed', 'Accepted by delivery person', 'Executed', 'Cancelled', 'Refused']
    },
    price: {
        type:Number,
        min: 0,
    },
    weight:{
        type:Number,
        min: 0,
    },
    departureDate:{  
        type: Date,
        required: true,
        min: new Date(new Date().setDate(new Date().getDate()-1))     //  () => Date.now()
        },
    deliveryDate:{
        type: Date,
        required: true,
        min: new Date(new Date().setDate(new Date().getDate()-1))
    },
    departurePoint:{
        type: String,
        required: true
    },
    deliveryPoint:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    deliveryMan: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Staff",
    }
}, { timestamps: true })



module.exports = model('Product', Product);