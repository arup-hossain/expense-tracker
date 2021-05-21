const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const Transaction = require('../models/Transaction');

exports.createTransaction = asyncHandler(async (req, res, next) => {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
});