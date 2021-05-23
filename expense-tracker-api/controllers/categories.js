const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const Category = require('../models/Category');

exports.createCategory = asyncHandler(async (req, res, next) => {
    req.body.createdBy = req.userId;
    const category = await Category.create(req.body);
    res.status(201).json(category);
});

exports.getCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({
        createdBy: req.userId,
        type: req.query.type
    });
    res.status(200).json(categories);
});

exports.getCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category.createdBy.equals(req.userId)) {
        return next(createError(403, 'You cannot update this category'));
    }
    await category.updateOne(req.body);
    res.status(200).json(category);
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category.createdBy.equals(req.userId)) {
        return next(createError(403, 'You cannot delete this category'));
    }
    await category.deleteOne();
    res.status(200).json(category);
});