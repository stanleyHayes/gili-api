const mongoose = require("mongoose");

const collectibleSchema = new mongoose.Schema({
    nft: {
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

const Collectible = mongoose.model('Collectible', collectibleSchema);

module.exports = Collectible;
