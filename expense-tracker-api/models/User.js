const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.post('save', async function () {
    this.model('Category').create({ name: 'Bills', type: 'Expense', createdBy: this });
    this.model('Category').create({ name: 'Food', type: 'Expense', createdBy: this });
    this.model('Category').create({ name: 'Education', type: 'Expense', createdBy: this });
    this.model('Category').create({ name: 'Car', type: 'Expense', createdBy: this });
    this.model('Category').create({ name: 'Shopping', type: 'Expense', createdBy: this });
    this.model('Category').create({ name: 'Friends', type: 'Expense', createdBy: this });
    this.model('Category').create({ name: 'Retirement', type: 'Expense', createdBy: this });
    this.model('Category').create({ name: 'Other', type: 'Expense', createdBy: this });
    this.model('Category').create({ name: 'Salary', type: 'Income', createdBy: this });
    this.model('Category').create({ name: 'Side Hustle', type: 'Income', createdBy: this });
    this.model('Category').create({ name: 'Other', type: 'Income', createdBy: this });
});

module.exports = mongoose.model('User', userSchema);