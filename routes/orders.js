const {Router} = require('express')
const router = Router()
const Order = require('../model/order')

router.get('/', (req, res) => {
    res.render('orders', {
        title: 'Orders',
        isOrders: true
    })
})

router.post('/', async (req, res) => {
    res.redirect('/orders')
})

module.exports = router