const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const expressHBS = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const app = express();
const RouterHome = require('./routes/home')
const RouterCourses = require('./routes/courses')
const RouterAdd = require('./routes/add')
const RouterCart = require('./routes/cart')
const User = require('./model/user')


const hbs = expressHBS.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req,res,next) => {
    try {
        let user = await User.findById('5facf0a3d39f370b1c4b396e')
        req.user = user
        next()
    } catch (e) {
        console.log(e)
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', RouterHome)
app.use('/courses', RouterCourses)
app.use('/add', RouterAdd)
app.use('/cart', RouterCart)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const password = 'Lsgwt1mH29LqHc4F'
        const dbname = 'Cluster0'
        const url = `mongodb+srv://alexandr:${password}@cluster0.phegs.mongodb.net/${dbname}?retryWrites=true&w=majority`

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        let candidate = await User.findOne()
        if (!candidate) {
            let user = new User({
                email: 'alex@mail.ru',
                name: 'Alex',
                cart: {items: []}
            })

            user.save()
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()
