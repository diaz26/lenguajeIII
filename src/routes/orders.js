const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController')
const authController = require('../controllers/authController')

router.get('/', authController.verifyUser, async (req, res) => {
    const misPedidos = await pedidosController.listLogued(req)
    const pedidosRealizados = await pedidosController.ordersRealized(req)
    let sesion = req.session.carrito;
    res.render('orders/view_orders', {layout: 'carrito', sesion, misPedidos, pedidosRealizados });
})

router.get('/:id', (req, res) => {
    res.render('orders/view_orders_unique', {layout: 'carrito' });
})

router.post('', authController.verifyUser, async(req, res) => {
    const resp = await pedidosController.store(req)
    let sesion = req.session.carrito;
    res.render('orders/view_orders_unique', {layout: 'carrito', sesion });
})

module.exports = router;
