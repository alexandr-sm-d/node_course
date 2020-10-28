const {Router} = require('express')
const router = Router()
const Courses = require('../model/course')

router.get('/', async (req, res) => {

    const courses = await Courses.getAllCourses()
    res.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses,
    })
})

module.exports = router