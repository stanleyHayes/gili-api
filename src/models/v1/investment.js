const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
    investment: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        amount: {
            type: Number,
            min: 0,
            required: true
        },
        currency: {
            type: String,
            required: true
        }
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;
