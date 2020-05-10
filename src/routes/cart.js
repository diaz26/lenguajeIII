const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const authController = require('../controllers/authController')

router.get('/', authController.verifyUser, async(req, res) => {
    let sesion = req.session.carrito;
    const resp = req.session.resp
    delete req.session.resp;

    const listas = await carritoController.list();
    
    res.render('cart/view_cart', {layout: 'carrito', sesion, resp, listas });
})

router.get('/add/:id', authController.verifyUser, async(req, res) => {
    const resp = await carritoController.addDetail(req);
    req.session.resp = resp
    res.redirect('/cart')
})

router.get('/remove/:id', authController.verifyUser, async(req, res) => {
    const resp = await carritoController.removeDetail(req);
    req.session.resp = resp
    res.redirect('/cart')
})

router.get('/clean', authController.verifyUser, async (req, res) => {
    await authController.iniciarCarrito(req);
    res.redirect('/cart')
})

module.exports = router;
