const {Router} = require('express')
const router = Router()
const Courses = require('../model/course')

router.get('/', async (req, res) => {

    const courses = await Courses.getAllCourses()
    res.render('courses', {
        title: `Courses ${courses.length}`,
        isCourses: true,
        courses,
    })
})

router.get('/:id', async (req, res) => {

    const course = await Courses.getByIdCourse(req.params.id)
    res.render('course', {
        title: `Course ${course.title}`,
        course
    })
})

module.exports = router