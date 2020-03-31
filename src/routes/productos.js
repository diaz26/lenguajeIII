const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', async(req, res) => {
    const productos = await productosController.listAll();
    //res.json(productos);
    res.render('products/view_my_products', {layout: 'carrito', productos });
})

router.post('/', async(req, res) => {
    const respuesta = await productosController.create(req.body);
    res.render('products/view_my_products', {layout: 'carrito', response });
    res.json(respuesta);
})

router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const response = await productosController.update(id, req.body);
    res.render('products/view_my_products', {layout: 'carrito', response });
    // res.json(respuesta);
})

router.delete('/delete/:id', async(req, res) => {
    const id = req.params.id;
    const response = await productosController.destroy(id);
    res.render('products/view_my_products', {layout: 'carrito', response });
})

router.post('/search', async(req, res) => {
    const productos = await productosController.listAll(req.body);
    res.json(productos);
})

router.get('/nuevo', (req, res) => {
    res.render('view_product_new', {layout: 'product' });
})

router.get('/:another', (req, res) => {
    res.render('view_categorias', {layout: 'categorias' });
})

module.exports = router;
