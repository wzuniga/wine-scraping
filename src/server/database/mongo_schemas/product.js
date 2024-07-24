const mongoose = require('../mongo');
const productSchema= require("../../../database/mongo_schemas/product.cjs");

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product
