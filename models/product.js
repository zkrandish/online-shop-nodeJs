const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = (cb)=> {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        try {
            cb(JSON.parse(fileContent));
        } catch {
            cb([]);
        }
    });
}
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile(products =>{
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            } 
        });
    });
}

static fetchAll(cb) {
    getProductsFromFile(cb);
}

};
