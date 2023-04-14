const { policyCheck } = require('../../middleware')
const deliveryAddressController = require('./controller')
const routes = require('express').Router()

routes.post(
    '/delivery-address',
    policyCheck('create', 'deliveryAddress'),
    deliveryAddressController.store
)

module.exports = routes