const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController')

router.get('/', async(req, res) => {
    const misPedidos = await pedidosController.listLogued(req)
    const pedidosRealizados = await pedidosController.ordersRealized(req)
    let sesion = req.session.carrito;
    res.render('orders/view_orders', {layout: 'payment', sesion, misPedidos, pedidosRealizados });
})

router.get('/:id', (req, res) => {
    res.render('orders/view_orders_unique', {layout: 'payment' });
})

module.exports = router;
