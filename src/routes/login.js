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
    await authController.auth(req)
    res.redirect('/home')
})

router.get('/recuperarconstrasena', (req, res) => {
    res.render('login/view_reset_pass');
})


module.exports = router;
