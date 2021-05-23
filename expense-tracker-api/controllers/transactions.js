const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const Transaction = require('../models/Transaction');

exports.createTransaction = asyncHandler(async (req, res, next) => {
    req.body.createdBy = req.userId;
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
});

exports.getTransactions = asyncHandler(async (req, res, next) => {
    const transactions = await Transaction
        .find({ createdBy: req.userId })
        .populate('category');
    res.status(200).json(transactions);
});

exports.getTransaction = asyncHandler(async (req, res, next) => {
    const transaction = await Transaction
        .findById(req.params.id)
        .populate('category');
    res.status(200).json(transaction);
});

exports.updateTransaction = asyncHandler(async (req, res, next) => {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction.createdBy.equals(req.userId)) {
        return next(createError(403, 'You cannot update this transaction'));
    }
    await transaction.updateOne(req.body);
    res.status(200).json(transaction);
});

exports.deleteTransaction = asyncHandler(async (req, res, next) => {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction.createdBy.equals(req.userId)) {
        return next(createError(403, 'You cannot delete this transaction'));
    }
    await transaction.deleteOne();
    res.status(200).json(transaction);
});