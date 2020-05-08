const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController')
const authController = require('../controllers/authController')

router.get('/', authController.verifyUser , async (req, res) => {
    const user = await usuariosController.findLogued(req)

    let sesion = req.session.carrito;
    const resp = req.session.resp
    delete req.session.resp;

    res.render('profile/view_profile', {layout: 'carrito', sesion, user, resp });
})

router.post('/', authController.verifyUser, async (req, res) => {
    const resp = await usuariosController.updateUser(req, req.session.user.id || null, req.body)
    req.session.resp = resp
    res.redirect('/profile')
})

router.post('/update_pass', authController.verifyUser, async (req, res) => {
    const resp = await usuariosController.updateUser(req, req.session.user.id || null, req.body, true)
    req.session.resp = resp
    res.redirect('/profile')

})

module.exports = router;
