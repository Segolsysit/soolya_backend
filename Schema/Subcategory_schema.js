const mongoose = require("mongoose");

const Subcategory_schema = mongoose.Schema({
//     _id: {
//     type: mongoose.Types.ObjectId,
//     default: mongoose.Types.ObjectId
//   },
  Category:{
        type:String
    },
    Subcategory:{
        type:String
    },
    Discription:{
        type:String
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
});

module.exports = mongoose.model("Subcategory_schema" , Subcategory_schema)