const path = require('path');
const express = require('express');

const rootDir = require('../util/path');
const { title } = require('process');

const router = express.Router();

const products= [];

router.get('/add-product',(req, res, next)=>{
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    //pug
    res.render('add-product',{pageTitle: 'Add product', path: '/admin/add-product'})
});

router.post('/add-product',(req, res, next)=>{
    // console.log('product middleware');
   products.push({title: req.body.title});
    res.redirect('/');
});

exports.routes= router;
exports.products= products;