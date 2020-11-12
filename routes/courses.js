const {Router} = require('express')
const router = Router()
const Courses = require('../model/course')

router.get('/', async (req, res) => {

    const courses = await Courses.find().populate('userID', 'email name')

    console.log(courses)

    res.render('courses', {
        title: `Courses`,
        isCourses: true,
        courses,
    })
})

router.get('/:id', async (req, res) => {

    const course = await Courses.findById(req.params.id)
    res.render('course', {
        layout: 'screen',
        title: `Course ${course.title}`,
        course
    })
})

router.get('/:id/edit', async (req, res) => {

    if (!req.query.allow) {
        return res.redirect('/')
    }

    const course = await Courses.findById(req.params.id)
    res.render('course-edit', {
        title: `Edit ${course.title}`,
        course
    })
})

router.post('/edit', async (req, res) => {
    let {id} = req.body
    delete req.body.id
    await Courses.findByIdAndUpdate(id, req.body)
    res.redirect('/courses')
})

router.post('/remove', async (req, res) => {
    console.log(req.body)
    try {
        await Courses.deleteOne({_id: req.body.id})
        res.redirect('/courses')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router