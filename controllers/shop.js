const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products => {
    res.render('shop/product-list', {
      docTitle: 'All Products',
      path: '/products',
      prods: products
    })
  }))
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products => {
    res.render('shop/index', {
      docTitle: 'Shop',
      path: '/',
      prods: products
    })
  }))
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', { docTitle: 'Cart', path: '/cart' });
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { docTitle: 'Orders', path: '/orders' });
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { docTitle: 'Checkout', path: '/checkout' });
}