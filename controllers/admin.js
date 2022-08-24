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
  
  Product.findById(productId)
    .then(([rowData]) => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing,
        product: rowData[0]
      });
    }).catch(err => console.log('Product.findById', err))
};

exports.postAddProduct = (req, res, next) => {
  const {title, imageUrl, price, description} = req.body;
  const product = new Product(null, title, imageUrl, description, price);
  product.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log('exports.postAddProduct', err));
};

exports.postEditProduct = (req, res, next) => {
  const {productId, title, imageUrl, price, description} = req.body;
  const product = new Product(productId, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.deleteById(productId);
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows]) => {
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
