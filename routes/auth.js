const {Router} = require('express')
const User = require('../model/user')
const router = Router()

router.get('/', async (req, res) => {
    res.render('auth', {
        title: 'Auth',
        isAuthPage: true
    })
})

router.get('/signout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth#signin')
    })
})

router.post('/signin', async (req, res) => {
    let user = await User.findById('5facf0a3d39f370b1c4b396e')
    req.session.user = user
    req.session.isAuthenticated = true
    req.session.save(err => {
        if (err) {
            throw err
        } else {
            res.redirect('/')
        }
    })
})

module.exports = router