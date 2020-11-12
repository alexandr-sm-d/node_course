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
    try {
        let user = await req.user.populate('cart.items.courseID').execPopulate()
        let courses = user.cart.items.map(c => ({
            count: c.count,
            course: {...c.courseID._doc}
        }))

        let order = new Order({
            user: {
                name: req.user.name,
                userID: req.user
            },
            courses: courses
        })

        await order.save()
        await req.user.clearCart()

        res.redirect('/orders')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router