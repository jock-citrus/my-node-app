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
  
  // Method on Product
  // Product.findByPk(productId)

  // Magic Association Method on User
  req.user.getProducts({ where: { id: productId }})
    .then(products => {
      if (!products.length) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing,
        product: products[0]
      });
    }).catch(err => console.log('Product.findById', err))
};

exports.postAddProduct = (req, res, next) => {
  const {title, imageUrl, price, description} = req.body;
  // When we defined associations in app.js, sequelize added
  // createProduct method to the userModel, as we defined a
  // User has many products and a Product belongs to a
  // User. Notice, no userId defined. These are known as Magic
  // Association Methods.
  req.user.createProduct({
    title,
    price,
    imageUrl,
    description
  }).then(() => res.redirect('/')).catch(err => console.log('exports.postAddProduct', err));

  /**
   * Alternatively could do
   * 
   * Product.create({
   *  title,
   *  price,
   *  imageUrl,
   *  description,
   *  userId: req.user.id
   * })
   * 
  */
  
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
  // General method, will return all products
  // Product.findAll()

  // Magic Association Method on the User will
  // return only products belonging to that user.
  req.user.getProducts().then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
