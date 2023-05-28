const route = require('express').Router()
const { policyCheck } = require('../../middleware')
const cartController = require('./controller')

route.put(
    '/carts', cartController.update,
    policyCheck('update', 'Cart'),
)

route.get(
    '/carts', cartController.index,
    policyCheck('read', 'Cart')
)

module.exports = route