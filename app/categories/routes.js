const routes = require('express').Router();
const categoriesController = require('./controller');
const { policyCheck } = require('../../middleware')

routes.get('/categories', categoriesController.index)
routes.post('/categories', 
    policyCheck('create', 'Categories'),
    categoriesController.store)
routes.put('/categories/:id', 
    policyCheck('update', 'Categories'),
    categoriesController.update)
routes.delete('/categories/:id', 
    policyCheck('delete', 'Categories'),
    categoriesController.destroy)

module.exports = routes