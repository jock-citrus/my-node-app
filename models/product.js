const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      const updatedProducts = [...products];
      // Editing existing
      if (this.id) {
        const existingProductIndex = products.findIndex(p => p.id === this.id)
        updatedProducts[existingProductIndex] = this
      // Adding new
      } else {
        this.id = Math.random().toString();
        updatedProducts.push(this);
      }
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.error('Product.save =>', err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const updatedProducts = products.filter(p => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          // delete from cart also
          Cart.deleteByProductId(id);
        }
      });
    });
  }
};
