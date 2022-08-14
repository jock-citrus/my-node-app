const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const productsDataPath = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (callback) => {
  fs.readFile(productsDataPath, (err, fileContent) => {
    callback(err ? [] : JSON.parse(fileContent));
  });
}

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile((products => {
      products.push(this);
      fs.writeFile(productsDataPath, JSON.stringify(products), (err) => {
        console.log('err', err)
      })
    }))
  }

  static fetchAll(callback) {
    getProductsFromFile(callback)
  }
}