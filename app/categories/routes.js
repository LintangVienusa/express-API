const routes = require('express').Router();
const categoriesController = require('./controller');

routes.get('/categories', categoriesController.index)
routes.post('/categories', categoriesController.store)
routes.put('/categories/:id', categoriesController.update)
routes.delete('/categories/:id', categoriesController.destroy)

module.exports = routes