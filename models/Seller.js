const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    sellername: String,
    password: String,
    logo: String,
    banner: String
});

module.exports = mongoose.model('seller',schema);