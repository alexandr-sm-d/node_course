const {Router} = require('express')
const router = Router()
const Courses = require('../model/course')

router.get('/', async (req, res) => {

    const courses = await Courses.getAllCourses()
    res.render('courses', {
        title: `Courses`,
        isCourses: true,
        courses,
    })
})

router.get('/:id', async (req, res) => {

    const course = await Courses.getByIdCourse(req.params.id)
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

    const course = await Courses.getByIdCourse(req.params.id)
    res.render('course-edit', {
        title: `Edit ${course.title}`,
        course
    })
})

router.post('/edit', async (req, res) => {
    console.log('req.body', req.body)
    await Courses.updateCourse(req.body)
    res.redirect('/courses')
})

module.exports = router