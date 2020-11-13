const {Router} = require('express')
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
    req.session.isAuthenticated = true
    res.redirect('/')
})

module.exports = router