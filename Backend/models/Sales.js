const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sale_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Sales', salesSchema);