const { middlewareHere } = require('../middleware/index.js');

module.exports = (app) => {
    const users = require('../controllers/user.js');
    const categories = require('../controllers/categories.js');
    // const categories = require('../controllers/category.js');
    // const stocks = require('../controllers/stock.js');
    // const prices = require('../controllers/price.js');

    app.get('/users', middlewareHere, users.list);
    app.post('/user', middlewareHere, users.create);
    app.post('/user/auth', middlewareHere, users.login);
    app.patch('/user', middlewareHere, users.update);
    app.delete('/user', middlewareHere, users.delete);

    app.get('/categories', middlewareHere, categories.list);
    app.post('/category', middlewareHere, categories.create);
    app.patch('/category', middlewareHere, categories.update);
    app.delete('/category', middlewareHere, categories.delete);


}