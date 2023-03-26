const route = require('express').Router();
const multer = require('multer');
const os = require('os');
const productController = require('./controller')

route.get('/products', productController.index);
route.post('/products', multer({dest: os.tmpdir()}).single('image'), productController.store)

module.exports = route;