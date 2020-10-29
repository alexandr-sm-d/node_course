const {Router} = require('express')
const router = Router()
const Cart = require('../model/cart')

router.get('/', async (req, res) => {
    const cart = await Cart.getAllPurchaseOrders()
    res.render('cart', {
        title: 'Cart',
        isCart: true,
        products: cart.products,
        totalPrice: cart.totalPrice
    })
})

router.post('/add', async (req, res) => {
    await Cart.addNewProductToCart(req.body.id)
    res.redirect('/cart')
})

router.delete('/remove/:id', async (req, res) => {
    const cart = await Cart.removeProductById(req.params.id)
    res.json(cart)
})

module.exports = router