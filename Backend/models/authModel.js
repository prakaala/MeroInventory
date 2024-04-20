const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
})

// to use this keyword it should be normal function not arrow function
UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPasswrod = await bcrypt.hash(this.password, salt);
        this.password = hashPasswrod;
        next();
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error;
    }
}

UserSchema.post('save', async function (next) {
    try {
        console.log("Called after saving user")
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('authuser', UserSchema)
module.exports = User