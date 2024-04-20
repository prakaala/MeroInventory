const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        enum: ['admin','salesManager','warehouseManager','employee'],
        default: 'employee'
    },
    image: {
        type: String,
    },
    phone: {
        type: String,
    }

})

module.exports = mongoose.model('Employee',employeeSchema);