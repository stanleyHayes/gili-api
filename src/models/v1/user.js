const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: {createdAt: true, updatedAt: true},
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
