
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
      const updatedProduct = { id, qty: existingProduct ? existingProduct.qty + 1 : 1 };

      cart.products = [...cart.products];
      
      if (existingProduct) {
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        cart.products.push(updatedProduct)
      }

      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.error('Cart.addProduct =>', err);
      })
    })
  }
}