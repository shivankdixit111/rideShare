const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blackListTokenSchema = new Schema({
    token: {
        type: String,
        required: true, 
    },
    ttl: {  //time to live
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

const BlackListToken = mongoose.model('BlackListToken', blackListTokenSchema);

module.exports = BlackListToken;