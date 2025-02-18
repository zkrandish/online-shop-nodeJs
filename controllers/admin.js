const fileHelper = require('../util/file');
const {validationResult} = require('express-validator');
const Product = require('../models/product');
const path = require('path');
const fs = require('fs');


exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      hasError: false,
      errorMessage: null,
      validationErrors: []
    });
  };
  
  exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;
    console.log(image);
    if(!image){
      return res.status(422).render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        hasError: true,
        product: {
          title:title,
          price:price,
          description:description
        },
        errorMessage: 'Attached file is not an image.',
        validationErrors: []
      });
      
    }
    const imageUrl = image.path;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(422).render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        hasError: true,
        product: {
          title:title,
          imageUrl:imageUrl,
          price:price,
          description:description
        },
        errorMessage: errors.array()[0].msg,
        validationErrors: errors.array()
      });
    }
   
    const product = new Product({title: title, price:price, description: description, imageUrl:imageUrl, userId: req.user});
    product
      .save()
      .then(result => {
        // console.log(result);
        console.log('Created Product');
        res.redirect('/admin/products');
      })
      .catch(err => {
        // console.log(err);

        // return res.status(422).render('admin/edit-product', {
        //   pageTitle: 'Add Product',
        //   path: '/admin/add-product',
        //   editing: false,
        //   hasError: true,
        //   product: {
        //     title:title,
        //     imageUrl:imageUrl,
        //     price:price,
        //     description:description
        //   },
        //   errorMessage: 'Database conection failed, please try again',
        //   validationErrors: []
        // });
         //res.redirect('/500');
         const error = new Error(err);
         error.httpStatusCode = 500;
         return next(error);
      });
  };
  
  exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
     return res.redirect('/');
    }
    const prodId= req.params.productId;
    Product.findById(prodId)
    .then(product=>{
      if(!product){
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err=>{
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    })
  };

  exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const image = req.file;
    const updatedDesc = req.body.description;
  
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: true,
        hasError: true,
        product: {
          title: updatedTitle,
          price: updatedPrice,
          description: updatedDesc,
          _id: prodId
        },
        errorMessage: errors.array()[0].msg,
        validationErrors: errors.array()
      });
    }
  
    Product.findById(prodId)
      .then(product => {
        if (product.userId.toString() !== req.user._id.toString()) {
          return res.redirect('/');
        }
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDesc;
        if(image){
          fileHelper.deleteFile(product.imageUrl);
          product.imageUrl = image.path;
        }
        
        return product.save().then(result => {
          console.log('UPDATED PRODUCT!');
          res.redirect('/admin/products');
        });
      })
      .catch(err=>{
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      })
  };
  

  exports.getProducts = (req, res, next) => {
    Product.find({userId: req.user._id})
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err=>{
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    })
   
  };


exports.deleteProduct = (req, res, next) => {
    const prodId = req.params.productId;

    console.log("Received delete request for:", prodId);

    Product.findById(prodId)
    .then(product => {
        if (!product) {
            console.log('Product not found:', prodId);
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('Found product:', product);

        // Check if file exists before trying to delete it
        const imagePath = path.join(__dirname, '..', product.imageUrl.replace(/\\/g, "/")); // Fix for Windows paths

        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (!err) {
                console.log('Deleting image:', imagePath);
                fileHelper.deleteFile(imagePath);
            } else {
                console.warn('Image file not found, skipping delete:', imagePath);
            }
        });

        return Product.deleteOne({ _id: prodId, userId: req.user._id });
    })
    .then(result => {
        console.log('Deleted product:', result);
        res.status(200).json({ message: 'Success!' });
    })
    .catch(err => {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Deleting product failed!' });
    });
};
