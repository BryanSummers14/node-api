var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userModel = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

userModel.methods.comparePassword = function(_password) {
    return bcrypt.compareSync(_password, this.hash_password);
}

module.exports = mongoose.model('User', userModel);