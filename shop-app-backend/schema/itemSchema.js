const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    _id: String,
    title: String,
    desc: String,
    price: Number,
    stock: Number,
    category: { type: String, enum: ['VEGETABLES', 'FRUITS', 'CHEESE'] },
    image: String,
  });
const ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;