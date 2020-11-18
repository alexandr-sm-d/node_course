const {Router} = require('express')
const router = Router()
const Order = require('../model/order')
const auth = require('../middleware/auth')


router.get('/', auth, async (req, res) => {
    try {
        let orders = await Order.find({'user.userID': req.user._id})
            .populate('user.userID')

        let ordersMap = orders.map(o => ({
            ...o._doc,
            totalPrice: o.courses.reduce((total, course) => {
                return total += course.count * course.course.price
            }, 0)
        }))

        res.render('orders', {
            title: 'Orders',
            isOrders: true,
            orders: ordersMap
        })
    } catch (e) {
        console.log(e)
    }
})

router.post('/', auth, async (req, res) => {
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