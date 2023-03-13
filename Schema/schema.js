const mongoose = require("mongoose");

const schema = mongoose.Schema({
    catagorySetup: {
        type: String,

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

module.exports = mongoose.model("schema" , schema)