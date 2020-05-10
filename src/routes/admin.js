const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
const usuario = require('../controllers/usuariosController');
const pedido = require('../controllers/pedidosController');
const producto = require('../controllers/productosController');

router.get('/', (req, res) => {
    res.render('admin/view_admin', {layout: 'admin' });
})
router.get('/usuarios', async(req, res) => {
    const usuarios = await admin.listAllUsers();
    res.render('admin/view_all_users', {layout: 'admin', usuarios });
})

router.get('/reportes', async(req, res) => {
    let report = await '0';
    res.render('admin/view_reports', {layout: 'admin', report });
})

router.post('/reportes', async(req, res) => {
    const data = await admin.listReport(req.body);
    let report = req.body.value;
    res.render('admin/view_reports', {layout: 'admin', report, data });
})

router.delete('/usuarios/delete/:id', async(req, res) => {
    const id = req.params.id;
    const response = await usuario.destroy(id);
    res.render('admin/view_all_users', {layout: 'admin', response });
})
router.get('/pedidos', async(req, res) => {
    const pedidos = await admin.listAllOrders();
    res.render('admin/view_all_orders', {layout: 'admin', pedidos });
})
router.delete('/pedidos/delete/:id', async(req, res) => {
    const id = req.params.id;
    const response = await pedido.destroy(id);
    res.render('admin/view_all_orders', {layout: 'admin', response });
})
router.get('/productos', async(req, res) => {
    const productos = await admin.listAllProducts();
    res.render('admin/view_all_products', {layout: 'admin', productos });
})
router.delete('/productos/delete/:id', async(req, res) => {
    const id = req.params.id;
    const response = await producto.destroy(id);
    res.render('admin/view_all_products', {layout: 'admin', response });
})


module.exports = router;
