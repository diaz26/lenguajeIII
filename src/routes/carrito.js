const express = require('express');
const router = express.Router();
const productos = require('../controllers/productosController');

router.get('/', async(req, res) => {
    const allProductos = await productos.listAll();
    res.render('cart/view_cart', {layout: 'carrito', Productos: allProductos });
})

router.get('/agregar', (req, res) => {
    res.render('cart/view_add_cart', {layout: 'carrito' });
})

module.exports = router;
