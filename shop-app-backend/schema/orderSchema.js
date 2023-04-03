const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    _id: String,
    userId: String,
    items: [
        {
            item: {
                title: String,
                price: Number,
                desc: String,
            },
            quantity: Number,
        }
    ],
    total: Number,
}, { timestamps: true });
const OrderModel = mongoose.model('orders', OrderSchema);

module.exports = OrderModel;