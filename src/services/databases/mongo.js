import mongoose from 'mongoose';
import dotenv from "dotenv";
import productSchema from "../../database/mongo_schemas/product.cjs";


dotenv.config()
mongoose.connect(process.env.MONGO_URI);

const Product = mongoose.model('Product', productSchema, 'products');

export default Product
