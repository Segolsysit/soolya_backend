const mongoose = require("mongoose");


const bookingdetai_schema =new mongoose.Schema({
    address:{
        type:String
    },
    street:{
        type:String
    },
    city:{
        type:String
    },
    zip:{
        type:Number
    },
    person:{
        type:String
    },
    number:{
        type:Number
    },
    Service:{
        type:String
    },
    Category:{
        type:String
    },
    price:{
        type:Number
    }
})

module.exports = mongoose.model("bookingdetails_schema", bookingdetai_schema)