const {Router} = require('express')
const router = Router()
const Courses = require('../model/course')

function mapCart(cart) {
    return cart.items.map(c => ({
        ...c.courseID._doc, // убери _doc, все увидишь, куча metadata
        count: c.count
    }))
}

function getTotalPrice(courses) {
    return courses.reduce((total, course) => {
        return total += course.price * course.count
    }, 0)
}

router.get('/', async (req, res) => {
    let user = await req.user.populate('cart.items.courseID').execPopulate()
    let courses = mapCart(user.cart)
    console.log(courses)
    res.render('cart', {
        title: 'Cart',
        isCart: true,
        products: courses,
        totalPrice: getTotalPrice(courses)
    })
})

router.post('/add', async (req, res) => {
    let course = await Courses.findById(req.body.id)
    await req.user.addToCart(course)
    res.redirect('/cart')
})

router.delete('/remove/:id', async (req, res) => {
    try {
        const course = await Courses.findById(req.params.id)
        await req.user.removeFromCart(course)

        let user = await req.user.populate('cart.items.courseID').execPopulate()
        let courses = mapCart(user.cart)
        let totalPrice = getTotalPrice(courses)

        res.json({
            courses: courses,
            totalPrice: totalPrice,
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router