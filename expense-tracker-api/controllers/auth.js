const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = asyncHandler(async (req, res, next) => {
    const userExists = await User.exists({ email: req.body.email });
    if (userExists) {
        return createError(400, 'Email is already in use');
    }

    req.body.password = await bcrypt.hash(req.body.password, 6);
    const user = await User.create(req.body);

    const token = jwt.sign({ userId: user._id }, 'JWT_KEY');
    res.status(201).json(token);
});