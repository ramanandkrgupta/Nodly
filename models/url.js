const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId : {
        type : String,
        required : true,
        unique : true,
    },
    redirectUrl: {
        type : String,
        required : true,
    },
    visitHistory: [{ timestamp: {type: Number} }],
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

},
 {timestamp: true }

);

const URl = mongoose.model("url", urlSchema); //collection name urls

module.exports = URl;