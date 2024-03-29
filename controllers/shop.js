const Product = require('../models/product');

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
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId }})
    })
    .then(products => {
      const existingProduct = products[0];
      if (existingProduct) {
        return { product: existingProduct, quantity: existingProduct.cartItem.quantity + 1 }
      }

      return Product
        .findByPk(productId)
        .then(product => ({ product, quantity: 1 }))

    })
    .then(({ product, quantity }) => fetchedCart.addProduct(product, { through: { quantity } }))
    .then(() => res.redirect('/cart'))
    .catch(err => console.log('exports.addToCart', err))
};

exports.deleteCartItem = (req, res, next) => {
  const { productId } = req.body;
  req.user
    .getCart()
    .then(cart => cart.getProducts({ where: { id: productId }}))
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect('/cart')  
    })
    .catch(err => console.log('exports.deleteCartItem', err))
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

exports.postCreateOrder = (req, res, next) => {
  let fetchedCart
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user.createOrder().then(order => {
        const productsExt = products.map(product => {
          product.orderItem = {
            quantity: product.cartItem.quantity
          };
          return product;
        })
        return order.addProducts(productsExt)
      }).catch(err => console.log('exports.postCreateOrder, createOrder', err))
    })
    .then(() => {
      fetchedCart.setProducts(null);
    })
    .then(() => {
      res.redirect('/orders')
    })
    .catch(err => console.log('exports.postCreateOrder', err))
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products']})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders
      });
    })
    .catch(err => console.log('exports.getOrders', err))
};
