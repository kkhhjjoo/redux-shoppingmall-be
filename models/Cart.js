const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');
const Schema = mongoose.Schema;

const cartSchema = Schema({
    userId: {
        type: mongoose.ObjectId, 
        ref: 'User'  // 문자열로 수정
    },
    items: [{
        productId: {type: mongoose.ObjectId, ref: 'Product'}, // 문자열로 수정
        size: {type: String, required: true},
        qty: {type: Number, default: 1, required: true}
    }]
}, {timestamps: true});

cartSchema.methods.toJSON = function() {
    const obj = this._doc;
    delete obj.__v;
    delete obj.updatedAt;
    delete obj.createdAt;
    return obj;
}

const Cart = mongoose.model('Cart', cartSchema); // 모델명 수정: 'Product' -> 'Cart'
module.exports = Cart;