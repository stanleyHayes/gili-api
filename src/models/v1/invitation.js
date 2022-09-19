const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
    invitee: {
        type: String,
        unique: true
    },
    inviter: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Member'],
        default: 'Member'
    },
    status: {
        type: String,
        enum: ['Pending', 'Used', 'Expired', 'Verified'],
        default: 'Pending'
    }
}, {
    timestamps: {createdAt: true, updatedAt: true},
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
