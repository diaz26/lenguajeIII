const express = require('express');
const router = express.Router();
const carrito = require('../controllers/carritoController');

router.get('/', async(req, res) => {
    const productos = await carrito.getOrder();
    res.render('cart/view_cart', {layout: 'carrito', productos });
})

router.post('/', async(req, res) => {

    await carrito.addDetail(req);

    res.render('cart/view_cart', {layout: 'carrito' });
})

router.get('/agregar', (req, res) => {
    res.render('cart/view_add_cart', {layout: 'carrito' });
})

module.exports = router;
