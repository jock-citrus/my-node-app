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
  // Could also use findAll with WHERE conditions
  // Product.findAll({ where: { id: productId } }).then(products)
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
  Product.findByPk(productId).then(product => {
    Cart.addProduct(productId, product.price)
    res.redirect('/cart')
  });
};

exports.deleteCartItem = (req, res, next) => {
  const { productId } = req.body;
  Product.findByPk(productId).then(product => {
    Cart.deleteByProductId(productId, product.price)
    res.redirect('/cart')
  });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => cart.getProducts())
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products
      });
    })
    .catch(err => console.log('exports.getCart', err))
  // Cart.getCart(cart => {
  //   Product.findAll().then(products=> {
  //     const productData = [];
  //     cart.products.forEach(p => {
  //       const product = products.find(({ id }) => p.id === id);
  //       productData.push({
  //         product,
  //         qty: p.qty
  //       })
  //     })
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       productData
  //     });
  //   })
  // })
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
