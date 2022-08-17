
const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

const getCartFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb({
        products: [],
        totalPrice: 0
      });
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Cart {
  static addProduct(id, productPrice) {
    getCartFromFile(cart => {
      const existingProductIndex = cart.products.findIndex(p => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if(existingProductIndex) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct ]
      }

      cart.totalPrice += productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.error(err)
      })
    })
  }
}