const express = require('express');

const app = express();

//add a middleware function
app.use((req, res, next)=>{
    console.log('in middleware');
    next(); //allows the requiest to continue to the next middleware in line
});

app.use((req, res, next)=>{
    console.log('in another middleware');
    res.send('<h1>heloo express</h1>');
});


app.listen(3000);