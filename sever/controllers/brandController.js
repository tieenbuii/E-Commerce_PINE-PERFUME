const Brand = require('../models/brandModel');
const asyncHandler = require('express-async-handler');

const createBrand = asyncHandler(async(req, res) => {
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newBrand = await Brand.create(req.body)
    return res.status(200).json({
        success: newBrand ? true : false,
        createBrand: newBrand ? newBrand : 'Cannot create new brand'
    })
})

const getBrand = asyncHandler(async (req, res) =>{
    const { bid } = req.params
    const brand = await Brand.findById(bid)
        return res.status(200).json({
            success: brand ? true : false,
            brandData: brand ? brand : 'Cannot get brand'
    })
})

const getAllBrand = asyncHandler(async (req, res) =>{
    const brands = await Brand.find()
        return res.status(200).json({
            success: brands ? true : false,
            brands: brands ? brands : 'Cannot get brands'
    })
})

//Update stock
const updateBrand = asyncHandler(async (req, res) =>{
    const { bid } = req.params
    const updateBrand = await Brand.findByIdAndUpdate(bid, req.body, {new: true})
        return res.status(200).json({
            success: updateBrand ? true : false,
            updateBrand: updateBrand ? updateBrand : 'Cannot update brand'
    })
})

//Delete stock
const deleteBrand = asyncHandler(async (req, res) =>{
    const { bid } = req.params
    const deleteBrand = await Brand.findByIdAndDelete(bid)
        return res.status(200).json({
            success: deleteBrand ? true : false,
            deleteBrand: deleteBrand ? deleteBrand : 'Cannot delete brand'
    })
})


module.exports = {
    createBrand,
    getBrand,
    getAllBrand, 
    updateBrand, 
    deleteBrand
}