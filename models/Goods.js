const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    goodsname: String,
    description: String,
    price: Number,
    images: Array,
    count: Number,
    seller: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'seller'
    } 
});

module.exports = mongoose.model('goods',schema);