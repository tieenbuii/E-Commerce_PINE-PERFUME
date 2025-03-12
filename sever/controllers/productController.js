const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const { options } = require('../routes/userRoutes');
const { response } = require('express');

const createProduct = asyncHandler(async(req, res) => {
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createProduct: newProduct ? newProduct : 'Cannot create new product'
    })
})

const getProduct = asyncHandler(async (req, res) =>{
    const { pid } = req.params
    const product = await Product.findById(pid)
        return res.status(200).json({
            success: product ? true : false,
            productData: product ? product : 'Cannot get product'
    })
})
// Filtering, sorting & pagination
const getAllProduct = asyncHandler(async (req, res) =>{
    const queries = {...req.query}
    // tách các trường đặt biệt ra khỏi query 
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach(el => delete queries[el])

    // Format lại các operators cho đúng cú pháp mongose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    const formatedQueries = JSON.parse(queryString)

    //Filtering
    if(queries?.title) formatedQueries.title = {$regex: queries.title, $options: 'i'}
    let queryCommand = Product.find(formatedQueries)

    //Sorting 

    // abc, efg => [abc, efg] => abc efg
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join('')
        queryCommand = queryCommand.sort(sortBy)
    }

    //Fields limiting
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields);

    }
    //Pagination
    // limit: số object lấy về 1 lần gọi api
    // skip: 2 
    // 1 2 3 ... 10
    // +2 => 2
    // +dsdsad => NaN
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS 
    const skip = (page -1) * limit  
    queryCommand.skip(skip).limit(limit)
    //Execute query
    // Số lượng sản phẩm thoả mãn điều kiện !== số lượng sp trả về 1  lần gọi API
    try {
        // Lấy danh sách sản phẩm thoả mãn điều kiện
        const response = await queryCommand;

        // Lấy tổng số sản phẩm thoả mãn điều kiện
        const counts = await Product.find(formatedQueries).countDocuments();

        // Trả về kết quả
        return res.status(200).json({
            success: response ? true : false,
            products: response ? response : 'Cannot get all product',
            counts
        });
    } catch (err) {
        // Nếu có lỗi, trả về lỗi
        throw new Error(err.message);
    }
})

//Update product
const updateProduct = asyncHandler(async (req, res) =>{
    const { pid } = req.params
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updateProduct = await Product.findByIdAndUpdate(pid, req.body, {new: true})
        return res.status(200).json({
            success: updateProduct ? true : false,
            updateProduct: updateProduct ? updateProduct : 'Cannot update product'
    })
})

//Delete product
const deleteProduct = asyncHandler(async (req, res) =>{
    const { pid } = req.params
    const deleteProduct = await Product.findByIdAndDelete(pid)
        return res.status(200).json({
            success: deleteProduct ? true : false,
            deleteProduct: deleteProduct ? deleteProduct : 'Cannot delete product'
    })
})




module.exports = {
    createProduct,
    getProduct,
    getAllProduct, 
    updateProduct, 
    deleteProduct
}