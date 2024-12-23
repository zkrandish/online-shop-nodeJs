const express = require('express');

const router = express.Router();

router.get('/add-product',(req, res, next)=>{
    //console.log('in another middleware');
    res.send('<form action="/product" method= "POST"><input type="text" name= "title"><button type="submit">Add Product</button></form>');
});

router.post('/product',(req, res, next)=>{
    console.log('product middleware');
    console.log(req.body);
    res.redirect('/');
});

module.exports= router;