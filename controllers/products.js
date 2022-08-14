const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', { docTitle: 'Add Product', path: '/admin/add-product' });
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  res.render('shop', {
    docTitle: 'Shop',
    path: '/admin/shop',
    prods: Product.fetchAll()
  })
}