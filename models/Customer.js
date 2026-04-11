const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    studentStatus: {
        type: String,
        enum: ['yes', 'no'],
        required: true
    },
    favoriteItems: [{
        type: String
    }],
    notifications: {
        type: String,
        enum: ['all', 'specials', 'none'],
        default: 'all'
    },
    loyaltyPoints: {
        type: Number,
        default: 0
    },
    registeredAt: {
        type: Date,
        default: Date.now
    },
    aiProcessed: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Customer', customerSchema);
