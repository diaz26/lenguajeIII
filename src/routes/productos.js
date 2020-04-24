const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', async(req, res) => {
    const productos = await productosController.listAll();
    let sesion = req.session.carrito;
    res.render('view_home', {layout: 'logued', productos, sesion });
})

router.get('/my', async(req, res) => {
    const productos = await productosController.listLogued(req);
    let sesion = req.session.carrito;
    res.render('products/view_my_products', {layout: 'carrito', productos, sesion });
})

router.post('/', async(req, res) => {
    const respuesta = await productosController.create(req.body);
    res.render('products/view_my_products', {layout: 'carrito', response });
})

router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const response = await productosController.update(id, req.body);
    res.render('products/view_my_products', {layout: 'carrito', response });
})

router.delete('/delete/:id', async(req, res) => {
    const id = req.params.id;
    const response = await productosController.destroy(id);
    res.render('products/view_my_products', {layout: 'carrito', response });
})

router.post('/search', async(req, res) => {
    const productos = await productosController.listAll(req.body);
})

router.get('/nuevo', (req, res) => {
    //res.render('view_product_new', {layout: 'product' });
})

router.get('/:another', async(req, res) => {
    const productos = await productosController.listAll();
    res.render('products/view_products', {layout: 'categorias', productos });
})

module.exports = router;
