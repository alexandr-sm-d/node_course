const express = require('express')
const expressHBS = require('express-handlebars')
const path = require('path')
const app = express();

const hbs = expressHBS.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// app.get('/', ((req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.hbs'))
// }))
//
// app.get('/about', ((req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'about.hbs'))
// }))

app.get('/', ((req, res) => {
    res.render('index')
}))
app.get('/about', ((req, res) => {
    res.render('about')
}))
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})