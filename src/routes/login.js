const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.get('/', (req, res) => {
    res.render('login/view_login');
})

router.get('/out', (req, res) => {
    delete req.session.user
    delete req.session.carrito
    res.redirect('/')
})

router.post('/', async(req, res) => {
    const resp = await authController.auth(req)
    if (resp.status == 'success') {
        res.redirect('/home')
    } else {
        res.render('login/view_login', {error: resp.msg});
    }

})

router.get('/resetpass', (req, res) => {
    let resp = req.session.resp
    delete req.session.resp
    res.render('login/view_reset_pass', {resp});
})

router.post('/resetpass', async(req, res) => {
    const resp = await authController.resetPass(req.body)
    req.session.resp = resp
    if (resp.status == 'success') {
        res.redirect('')
    } else {
        res.redirect('/login/resetpass')
    }
})

module.exports = router;
