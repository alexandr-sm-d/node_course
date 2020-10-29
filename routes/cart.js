const {Router} = require('express')
const router = Router()
const Cart = require('../model/cart')

router.get('/', async (req, res) => {
    // const cart = await Cart.getAllPurchaseOrders()
    res.render('cart', {
        title: 'Cart',
        isCart: true,
    })
})

router.post('/add', async (req, res) => {
    await Cart.addNewProductToCart(req.body.id)
    res.redirect('/cart')
})

module.exports = router