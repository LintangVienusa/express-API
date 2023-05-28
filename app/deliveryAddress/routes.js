const { policyCheck } = require('../../middleware')
const deliveryAddressController = require('./controller')
const routes = require('express').Router()

routes.post(
    '/delivery-address',
    policyCheck('create', 'deliveryAddress'),
    deliveryAddressController.store
)

routes.get(
    '/delivery-address',
    policyCheck('view', 'deliveryAddress'),
    deliveryAddressController.index
)

routes.put(
    '/delivery-address/:id',
    policyCheck('view', 'deliveryAddress'),
    deliveryAddressController.update
)

routes.delete(
    '/delivery-address/:id',
    policyCheck('delete', 'deliveryAddress'),
    deliveryAddressController.destroy
)

module.exports = routes