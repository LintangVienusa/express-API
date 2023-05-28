const router = require('express').Router()
const { policyCheck } = require('../../middleware')
const orderController = require('./controller')

router.post(
    '/orders', orderController.store,
    policyCheck('create', 'Order'))
router.get(
    '/orders', orderController.index,
    policyCheck('view', 'Order'))

module.exports = router