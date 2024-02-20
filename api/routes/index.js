const { middlewareHere, middlewareNonStore } = require('../middleware/index.js');

module.exports = (app) => {
    const users = require('../controllers/user.js');
    const categories = require('../controllers/categories.js');
    const product = require('../controllers/product.js');
    const payment = require('../controllers/payment.js');
    const stock = require('../controllers/stock.js');
    const transaction = require('../controllers/transaction.js');
    const detail_transaction = require('../controllers/detail_transaction.js');
    const store = require('../controllers/store.js');
    const domain = require('../controllers/domain.js');

    // Users
    app.get('/users', middlewareNonStore, users.list);
    app.post('/user', users.create);
    app.post('/user/auth', users.login);
    app.patch('/user', middlewareNonStore, users.update);
    app.delete('/user', middlewareNonStore, users.delete);
    app.post('/user/logout', middlewareNonStore, users.logout);

    // Categories
    app.get('/categories', middlewareHere, categories.list);
    app.post('/category', middlewareHere, categories.create);
    app.patch('/category', middlewareHere, categories.update);
    app.delete('/category', middlewareHere, categories.delete);

    // Payment
    app.get('/payments', middlewareHere, payment.list);
    app.post('/payment', middlewareHere, payment.create);
    app.patch('/payment', middlewareHere, payment.update);
    app.delete('/payment', middlewareHere, payment.delete);

    // Product
    app.get('/products', middlewareHere, product.list);
    app.post('/product', middlewareHere, product.create);
    app.patch('/product', middlewareHere, product.update);
    app.delete('/product', middlewareHere, product.delete);

    // Stock
    app.get('/stocks', middlewareHere, stock.list);
    app.post('/stock', middlewareHere, stock.create);
    app.patch('/stock', middlewareHere, stock.update);
    app.delete('/stock', middlewareHere, stock.delete);

    // Transaction
    app.get('/transactions', middlewareHere, transaction.list);
    app.post('/transaction', middlewareHere, transaction.create);
    app.patch('/transaction', middlewareHere, transaction.update);
    app.delete('/transaction', middlewareHere, transaction.delete);

    // Detail Transaction
    app.get('/detail/transactions', middlewareHere, detail_transaction.list);
    app.post('/detail/transaction', middlewareHere, detail_transaction.create);
    app.patch('/detail/transaction', middlewareHere, detail_transaction.update);
    app.delete('/detail/transaction', middlewareHere, detail_transaction.delete);

    // Store
    app.get('/stores', middlewareNonStore, store.list);
    app.post('/store', middlewareNonStore, store.create);
    app.patch('/store', middlewareNonStore, store.update);
    app.delete('/store', middlewareNonStore, store.delete);

    // Domain
    app.get('/domains', middlewareHere, domain.list);
    app.post('/domain', middlewareHere, domain.create);
    app.patch('/domain', middlewareHere, domain.update);
    app.delete('/domain', middlewareHere, domain.delete);


}