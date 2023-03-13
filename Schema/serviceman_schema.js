const mongoose = require("mongoose");

const serviceManSchema = mongoose.Schema({
    WorkType:{
        type:String
    },
    district:{
        type:String
    },
    FirstName:{
        type:String
    },
    LastName:{
        type:String
    },
    MobilePhoneNumber:{
        type:Number
    },
    StreetAddress:{
        type:String
    },
    PostalCode:{
        type:Number
    },
    Email:{
        type:String
    },
    IdentityType:{
        type:String
    },
    IdentityNumber:{
        type:String
    },
    originalname:{
        type:String
    },
    mimetype:{
        type:String
    },
    filename:{
        type:String
    },
    path:{
        type:String
    },
    size:{
        type:Number
    }
})

module.exports = mongoose.model("serviceManScheme", serviceManSchema)