const mongoose = require("mongoose")

const RejectedListSchema = mongoose.Schema({
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
    }
})

module.exports = mongoose.model("RejectedListSchema",RejectedListSchema)