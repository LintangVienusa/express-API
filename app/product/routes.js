const route = require('express').Router();
const multer = require('multer');
const os = require('os');
const productController = require('./controller');
const { policyCheck } = require('../../middleware');

route.get('/products', productController.index);
route.post('/products', 
    multer({dest: os.tmpdir()}).single('image'), 
    policyCheck('create', 'Product'),
    productController.store)
route.put('/products/:id', 
    multer({dest: os.tmpdir()}).single('image'), 
    policyCheck('update', 'Product'),
    productController.update)
route.delete('/products/:id', 
    policyCheck('delete', 'Product'),
    productController.destroy)

module.exports = route;