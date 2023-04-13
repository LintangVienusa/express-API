const routes = require('express').Router();
const tagController = require('./controller');
const { policyCheck } = require('../../middleware')

routes.get('/tags', tagController.index)
routes.post('/tags', 
    policyCheck('create', 'Tag'),
    tagController.store)
routes.put('/tags/:id', 
    policyCheck('update', 'Tag'),
    tagController.update)
routes.delete('/tags/:id', 
    policyCheck('delete', 'Tag'),
    tagController.destroy)

module.exports = routes