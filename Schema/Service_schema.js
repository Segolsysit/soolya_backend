const mongoose = require("mongoose");

const Service_schem = mongoose.Schema({
    Service:{
        type:String
    },
    Category:{
        type:String
    },
    Subcategory:{
        type:String
    },
    Discription:{
        type:String
    },
    price:{
        type:Number
    },
    originalname: {
        type: String,

    },
    mimetype: {
        type: String,

    },
    filename: {
        type: String,

    },
    path: {
        type: String,

    },
    size: {
        type: Number,

    }
})

module.exports = mongoose.model("Service_schem" , Service_schem)
