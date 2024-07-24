var express = require("express");
var router = express.Router();
const logger = require('../../logger.cjs');
const Product = require("../database/mongo_schemas/product");
require("dotenv").config();

// Define your router to get a list of all unique skuIds
router.get('/', async function (req, res, next) {
  try {
    const uniqueSkus = await Product.distinct('skuId');
    return res.status(200).json(uniqueSkus);
  } catch (error) {
    console.error('Error fetching unique SKUs:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/product-information', async function (req, res, next) {
  const { skuId } = req.body;
  console.log(skuId)
  if (!skuId) {
    return res.status(400).json({ error: 'skuId is required' });
  }

  try {
    const products = await Product.find({skuId: skuId})
      .sort({ createdAt: 1 }) // Sort in ascending order based on createdAt
      .exec();
    console.log(await Product.find({skuId: skuId}))
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching product information:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;