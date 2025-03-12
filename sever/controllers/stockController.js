const Stock = require('../models/stockModel');
const asyncHandler = require('express-async-handler');

const createStock = asyncHandler(async(req, res) => {
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newStock = await Stock.create(req.body)
    return res.status(200).json({
        success: newStock ? true : false,
        createStock: newStock ? newStock : 'Cannot create new stock'
    })
})

const getStock = asyncHandler(async (req, res) =>{
    const { sid } = req.params
    const stock = await Stock.findById(sid)
        return res.status(200).json({
            success: stock ? true : false,
            stockData: stock ? stock : 'Cannot get stock'
    })
})

const getAllStock = asyncHandler(async (req, res) =>{
    const stocks = await Stock.find()
        return res.status(200).json({
            success: stocks ? true : false,
            stocks: stocks ? stocks : 'Cannot get stock'
    })
})

//Update stock
const updateStock = asyncHandler(async (req, res) =>{
    const { sid } = req.params
    const updateStock = await Product.findByIdAndUpdate(sid, req.body, {new: true})
        return res.status(200).json({
            success: updateStock ? true : false,
            updateStock: updateStock ? updateStock : 'Cannot update stock'
    })
})

//Delete stock
const deleteStock = asyncHandler(async (req, res) =>{
    const { sid } = req.params
    const deleteStock = await Product.findByIdAndDelete(sid)
        return res.status(200).json({
            success: deleteStock ? true : false,
            deleteStock: deleteStock ? deleteStock : 'Cannot delete stock'
    })
})


module.exports = {
    createStock,
    getStock,
    getAllStock, 
    updateStock, 
    deleteStock
}