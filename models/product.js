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
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
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