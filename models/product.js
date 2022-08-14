const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    const p = Product.getPath()
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent)
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log('err', err)
      })
    });
  }

  static getPath() {
    return path.join(rootDir, 'data', 'products.json');
  }

  static fetchAll(callback) {
    fs.readFile(Product.getPath(), (err, fileContent) => {
      callback(err ? [] : JSON.parse(fileContent));
    });
  }
}