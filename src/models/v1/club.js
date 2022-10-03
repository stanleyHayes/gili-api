const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: String,
        required: true
    },
    goal: {
        type: Number,
        min: 0,
        required: true
    },
    duration: {
        amount: {
            type: Number,
            required: true,
            min: 1
        },
        unit: {
            type: String,
            enum: ['week', 'day', 'year', 'month']
        }
    },
    currency: {
        type: String,
        required: true,
        enum: ['Matic', 'Ethereum']
    },
    maximumMemberCount: {
        type: Number,
        required: true,
        default: 0
    },
    treasury: {
        type: Number,
        min: 0,
        default: 0
    },
    minted: {
        type: Number,
        min: 0,
        default: 0
    },
    safeAddress: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['Active'],
        default: 'Active'
    },
    network: {
        type: String,
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true},
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

clubSchema.virtual('members', {
    localField: '_id',
    foreignField: 'club',
    justOne: false,
    ref: 'Member'
})

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;
