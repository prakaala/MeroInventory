const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add category name"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "please add category description"],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);
