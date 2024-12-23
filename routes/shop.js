const express = require('express');

const router = express.Router();


router.get('/',(req, res, next)=>{
    //console.log('in another middleware');
    res.send('<h1>heloo express</h1>');
});

module.exports= router;