const routes = require('express').Router();
const authController = require('./controller');

routes.post('/register', authController.register) 

module.exports = routes;