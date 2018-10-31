const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    buyer:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'buyer'
    },
    goods: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'goods'
    },
    seller: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'seller'
    },
    const: Number
}); 

module.exports = mongoose.model('order',schema);