const express = require('express')
const expressHBS = require('express-handlebars')
const path = require('path')
const app = express();
const RouterHome = require('./routes/home')
const RouterCourses = require('./routes/courses')
const RouterAdd = require('./routes/add')

const hbs = expressHBS.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use('/', RouterHome)
app.use('/courses', RouterCourses)
app.use('/add', RouterAdd)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})