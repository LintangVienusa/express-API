const routes = require('express').Router();
const tagController = require('./controller');

routes.get('/tags', tagController.index)
routes.post('/tags', tagController.store)
routes.put('/tags/:id', tagController.update)
routes.delete('/tags/:id', tagController.destroy)

module.exports = routes