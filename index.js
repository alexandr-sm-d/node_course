const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const expressHBS = require('express-handlebars')
const app = express();
const RouterHome = require('./routes/home')
const RouterCourses = require('./routes/courses')
const RouterAdd = require('./routes/add')
const RouterCart = require('./routes/cart')


const hbs = expressHBS.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', RouterHome)
app.use('/courses', RouterCourses)
app.use('/add', RouterAdd)
app.use('/cart', RouterCart)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const password = '5mBnUrsqzDmMOgXW'
        const dbname = 'Cluster0'
        const url = `mongodb+srv://alexandr:${password}@cluster0.phegs.mongodb.net/${dbname}?retryWrites=true&w=majority`
        // const url = `mongodb+srv://alexandr:${password}@cluster0.phegs.mongodb.net/shop`

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()
