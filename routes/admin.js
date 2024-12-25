const path = require('path');
const express = require('express');
const productsController = require('../controllers/products')
const { title } = require('process');

const router = express.Router();

const products= [];

router.get('/add-product',productsController.getAddProduct);

router.post('/add-product',(req, res, next)=>{
    // console.log('product middleware');
   products.push({title: req.body.title});
    res.redirect('/');
});

exports.routes= router;
exports.products= products;