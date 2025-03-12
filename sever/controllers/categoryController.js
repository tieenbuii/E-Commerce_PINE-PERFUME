const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');

const createCategory = asyncHandler(async(req, res) => {
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newCategory = await Category.create(req.body)
    return res.status(200).json({
        success: newCategory ? true : false,
        createBrand: newCategory ? newCategory : 'Cannot create new category'
    })
})

const getCategory = asyncHandler(async (req, res) =>{
    const { cid } = req.params
    const category = await Category.findById(cid)
        return res.status(200).json({
            success: category ? true : false,
            categoryData: category ? category : 'Cannot get category'
    })
})

const getAllCategory = asyncHandler(async (req, res) =>{
    const categories = await Category.find()
        return res.status(200).json({
            success: categories ? true : false,
            categories: categories ? categories : 'Cannot get categories'
    })
})

//Update stock
const updateCategory = asyncHandler(async (req, res) =>{
    const { cid } = req.params
    const updateCategory = await Category.findByIdAndUpdate(cid, req.body, {new: true})
        return res.status(200).json({
            success: updateCategory ? true : false,
            updateCategory: updateCategory ? updateCategory : 'Cannot update category'
    })
})

//Delete stock
const deleteCategory = asyncHandler(async (req, res) =>{
    const { cid } = req.params
    const deleteCategory = await Category.findByIdAndDelete(cid)
        return res.status(200).json({
            success: deleteCategory ? true : false,
            deleteCategory: deleteCategory ? deleteCategory : 'Cannot delete category'
    })
})


module.exports = {
    createCategory,
    getCategory,
    getAllCategory, 
    updateCategory, 
    deleteCategory
}