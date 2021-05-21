const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    note: String
});

module.exports = mongoose.model('Transaction', transactionSchema);