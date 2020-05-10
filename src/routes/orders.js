const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController')
const authController = require('../controllers/authController')

router.get('/', authController.verifyUser, async (req, res) => {
    const misPedidos = await pedidosController.listLogued(req)
    const pedidosRealizados = await pedidosController.ordersRealized(req)
    let sesion = req.session.carrito
    const resp = req.session.resp
    delete req.session.resp
    res.render('orders/view_orders', {layout: 'carrito', sesion, misPedidos, pedidosRealizados, resp });
})

router.get('/cancel/:id', authController.verifyUser, async (req, res) => {
    const resp = await pedidosController.anular(req.params.id)
    req.session.resp = resp
    res.redirect('/orders')
})

router.get('/anul/:id', authController.verifyUser, async (req, res) => {
    const resp = await pedidosController.anular(req.params.id, 8)
    req.session.resp = resp
    console.log(resp, req.params.id)
    res.redirect('/orders')
})

router.get('/show/:id', authController.verifyUser, async (req, res) => {
    const order = await pedidosController.find(req.params.id)
    const detalles = await pedidosController.details(req.params.id)
    let sesion = req.session.carrito
    res.render('orders/view_orders_unique', {layout: 'carrito', sesion, order, detalles });
})

router.post('', authController.verifyUser, async(req, res) => {
    const resp = await pedidosController.store(req)
    req.session.resp = resp
    res.redirect('/orders')
})

module.exports = router;
