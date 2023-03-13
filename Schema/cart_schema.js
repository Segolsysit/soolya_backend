const mongoose = require("mongoose");

    const cart_schema = mongoose.Schema({
  
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

module.exports = mongoose.model("cart_schema" , cart_schema)

