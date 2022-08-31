const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1).then(user => {
    req.user = user;
    next();
  }).catch(err => console.log('app.js', err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Define associations between models

// CASCADE means if we delete a User, the we also want to delete all
// Products related to that User.
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// could define either belongsTo, or the inverse hasMany. We are
// doing both here to be explicit.
User.hasMany(Product);


// Don't need to define both but have below to be explicit.
User.hasOne(Cart);
Cart.belongsTo(User);

// A Cart has multiple Products and a Product can be in
// multiple Carts. Defining here that these relationships
// should be stored in the CartItem model.
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// A single Order belongs to a single user
Order.belongsTo(User);
// OR a user can have many orders
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });

// sync will sync JS definitions e.g Product with Database by creating
// tables that do not exist for any defined models e.g. Product
sequelize
  // Use below if want to override DB tables
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then(user => {
    if(!user) {
      return User.create({ name: 'Jock', email: 'test@gmail.com'})
    }
    return user
  })
  .then(user => user.createCart())
  .then(() => app.listen(3000))
  .catch(err => {
    console.log('sequelize.sync()', err)
  });

