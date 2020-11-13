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
const RouterOrders = require('./routes/orders')
const RouterAuth = require('./routes/auth')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const defineAuth = require('./middleware/defineAuth')

const MONGODB_URI = `mongodb+srv://alexandr:Lsgwt1mH29LqHc4F@cluster0.phegs.mongodb.net/Cluster0?retryWrites=true&w=majority`
const hbs = expressHBS.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: 'hbs'
})

const store = MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'secret value',
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(defineAuth)

app.use('/', RouterHome)
app.use('/courses', RouterCourses)
app.use('/add', RouterAdd)
app.use('/cart', RouterCart)
app.use('/orders', RouterOrders)
app.use('/auth', RouterAuth)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = MONGODB_URI

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        // let candidate = await User.findOne()
        // if (!candidate) {
        //     let user = new User({
        //         email: 'alex@mail.ru',
        //         name: 'Alex',
        //         cart: {items: []}
        //     })
        //
        //     user.save()
        // }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()
