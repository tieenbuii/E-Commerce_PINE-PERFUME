const Tone = require('../models/toneModel');
const asyncHandler = require('express-async-handler');

const createTone = asyncHandler(async(req, res) => {
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newTone = await Tone.create(req.body)
    return res.status(200).json({
        success: newTone ? true : false,
        createBrand: newTone ? newTone : 'Cannot create new tone'
    })
})

const getTone = asyncHandler(async (req, res) =>{
    const { tid } = req.params
    const tone = await Tone.findById(tid)
        return res.status(200).json({
            success: tone ? true : false,
            toneData: tone ? tone : 'Cannot get tone'
    })
})

const getAllTone = asyncHandler(async (req, res) =>{
    const tones = await Tone.find()
        return res.status(200).json({
            success: tones ? true : false,
            tones: tones ? tones : 'Cannot get tones'
    })
})

//Update stock
const updateTone = asyncHandler(async (req, res) =>{
    const { tid } = req.params
    const updateCategory = await Tone.findByIdAndUpdate(tid, req.body, {new: true})
        return res.status(200).json({
            success: updateTone ? true : false,
            updateTone: updateTone ? updateTone : 'Cannot update tone'
    })
})

//Delete stock
const deleteTone = asyncHandler(async (req, res) =>{
    const { tid } = req.params
    const deleteTone = await Category.findByIdAndDelete(tid)
        return res.status(200).json({
            success: deleteTone ? true : false,
            deleteTone: deleteTone ? deleteTone : 'Cannot delete tone'
    })
})


module.exports = {
    createTone,
    getTone,
    getAllTone, 
    updateTone, 
    deleteTone
}