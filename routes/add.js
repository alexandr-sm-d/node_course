const {Router} = require('express')
const Courses = require('../model/course')
const router = Router()

router.get('/', ((req, res) => {
    res.render('add', {
        title: 'Add',
        isAdd: true
    })
}))

router.post('/', async (req, res) => {
    // console.log(req.body)
    // try {
    //     const course = new Courses(
    //         req.body.title,
    //         req.body.price,
    //         req.body.img
    //     )
    //     await course.save()
    //     res.redirect('/courses')
    // } catch (e) {
    //     console.log(e)
    // }

    const course = new Courses({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userID: req.user // ._id вытащит сам
    })

    try {
        await course.save()
        res.redirect('/courses')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router