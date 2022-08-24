const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => console.log('Product.getProducts()', err));
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findByPk(productId).then(product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => console.log('Product.fetchAll()', err));
};

exports.addToCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId).then(([rowData]) => {
    Cart.addProduct(productId, rowData[0].price)
    res.redirect('/cart')
  });
};

exports.deleteCartItem = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId).then(([rowData]) => {
    Cart.deleteByProductId(productId, rowData[0].price)
    res.redirect('/cart')
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll().then(([rowData]) => {
      const productData = [];
      cart.products.forEach(p => {
        const product = rowData.find(({ id }) => p.id === id);
        productData.push({
          product,
          qty: p.qty
        })
      })
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        productData
      });
    })
  })
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
