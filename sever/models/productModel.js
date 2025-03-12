const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{ // Tên sản phẩm
        type:String,
        required:true,
        trim: true
    },
    slug:{ 
        type:String,
        required:true,
        unique:true,
        lowercase: true
    },
    description:{ // Mô tả sản phẩm
        type:String,
        required:true,
        unique:true,
    },
    brand:{ // Thương hiệu
        type:mongoose.Types.ObjectId,
        ref: 'Brand',
    },
    category:{ // Loại sản phẩm
        type:mongoose.Types.ObjectId,
        ref: 'Category',
    },
    stock: { // thành phần
        type:mongoose.Types.ObjectId,
        ref: 'Stock',
    },
    price:{ // Giá sản phẩm
        type:Number,
        required:true,
    },
    discount:{ // Giá sp giảm 
        type:Number,
        default: 0,

    },
    images: {
        type: Array,
    },
    volume: { // Dung tích
        type: String,
        required: true
    },
    since: { // Năm sản xuất
        type: Number,
        default: 0,

    },
    gender: { // Giới tính
        type: String,
        enum: ['male', 'female', 'unisex'],
        required: true
    },
    longevity: { // Thời gian lưu hương
        type: String,
        enum: ['3', '6', '9'],
        required: true
    },
    old: { // Độ tuổi
        type: String,
        default: 0,

    },
    spring: { // Mùa xuân
        type: Number,
        default: 0,

    },
    summer: { // Mùa hè
        type: Number,
        default: 0,

    },
    autumn: { // Mùa thu
        type: Number,
        default: 0,

    },
    winter: { // Mùa đông
        type: Number,
        default: 0,

    },
    time_day: { // Thời gian ban ngày
        type: Number,
        default: 0,

    },
    time_night: { // Thời gian ban đêm
        type: Number,
        default: 0,

    },
    quantity: { // Số lượng
        type: Number,
        default: 0,
    },
    sold: { // Số lượng đã bán
        type: Number,
        default: 0
    },
    status: { // Trạng thái
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);