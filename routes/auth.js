const {Router} = require('express')
const router = Router()

router.get('/', async (req, res) => {
    res.render('auth', {
        title: 'Auth',
        isAuthPage: true
    })
})

module.exports = router