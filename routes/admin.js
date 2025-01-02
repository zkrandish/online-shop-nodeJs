const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin')
const { title } = require('process');

const router = express.Router();

// /admin/add-product =>GET
router.get('/add-product',adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.post('/add-product',adminController.postAddProduct);

module.exports = router;