const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Expense', 'Income'],
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    toJSON: { virtuals: true }
});

categorySchema.pre('deleteOne', { document: true }, async function () {
    await this.model('Transaction').deleteMany({ category: this._id });
});

categorySchema.virtual('numTransactions', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'category',
    count: true
});

module.exports = mongoose.model('Category', categorySchema);