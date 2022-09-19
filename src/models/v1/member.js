const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Member'],
        default: 'Member'
    },
    ownership: {
        type: Number,
        default: 0,
        min: 0,
        max: 1
    },
    stake: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
        required: true,
        unique: [true, 'Member already exist in group']
    },
    invitation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invitation'
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
