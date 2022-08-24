const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getEditProduct = (req, res, next) => {
  const editing = Boolean(req.query.edit);
  if (!editing) {
    return res.redirect('/');
  }

  const {productId} = req.params;
  
  Product.findByPk(productId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing,
        product
      });
    }).catch(err => console.log('Product.findById', err))
};

exports.postAddProduct = (req, res, next) => {
  const {title, imageUrl, price, description} = req.body;
  Product.create({
    title,
    price,
    imageUrl,
    description
  }).then(() => res.redirect('/')).catch(err => console.log('exports.postAddProduct', err));
};

exports.postEditProduct = (req, res, next) => {
  const {productId, title, price, imageUrl, description} = req.body;
  Product.findByPk(productId).then(product => {
    product.title = title;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;
    return product.save();
  })
  .then(() => res.redirect('/'))
  .catch(err => console.log('exports.postEditProduct', err));
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product
    .findByPk(productId)
    .then(product => product.destroy())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err => 'exports.postDeleteProduct', err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
