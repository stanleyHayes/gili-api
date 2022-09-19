const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Club'
    },
    amount: {
        value: {
            type: Number,
            min: 0,
            required: true
        },
        currency: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    }
}, {
    timestamps: {createdAt: true, updatedAt: true},
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
})
