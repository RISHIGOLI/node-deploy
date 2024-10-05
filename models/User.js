const { default: mongoose, Schema } = require("mongoose");

const User = new Schema({
    firstName: {type:String, required:true,max: [16,'max 16 allowed']},
    lastName: {type:String, max:[16,'max 16 chars allowed']},
    age: {type:Number,min:12,max: 100},
    email: {type:String,validate:{
        validator: function(value){
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email format'
    }}
})