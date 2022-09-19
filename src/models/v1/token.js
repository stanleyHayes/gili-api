const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    balance: {
        amount: {
            type: Number,
            min: 0,
            required: true
        },
        currency: {
            type: String,
            required: true
        }
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
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true,
        toObject: {virtuals: true},
        toJSON: {virtuals: true}
    }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
