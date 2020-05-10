const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const listasElementosController = require('../controllers/listasElementosController')
const authController = require('../controllers/authController')

router.get('/', authController.verifyUser, async (req, res) => {
    const productos = await productosController.listLogued(req);
    let sesion = req.session.carrito;
    res.render('products/view_my_products', {layout: 'carrito', productos, sesion });
})

router.get('/new', authController.verifyUser, async (req, res) => {
    const categorias = await productosController.createList()
    res.render('products/view_product_new', {layout: 'carrito', categorias });
})

router.get('/edit/:id', authController.verifyUser, async (req, res) => {
    const resp = await productosController.find(req.params.id)
    if ( resp.status == 'error' ) {
        res.redirect('/products')
    }
    const categorias = await productosController.createList()
    res.render('products/view_product_new', {layout: 'carrito', categorias, product: resp.product });
})

router.get('/delete/:id', authController.verifyUser, async (req, res) => {
    await productosController.destroy(req.params.id)
    res.redirect('/products')
})

router.post('/search', authController.verifyUser, async (req, res) => {
    const productos = await productosController.listAll(req);
    const categorias = await listasElementosController.listHome()
    let sesion = req.session.carrito;
    res.render('view_home', {layout: 'logued', productos, categorias, sesion });
})

router.post('/:id', authController.verifyUser, async (req, res) => {
    const response = await productosController.create(req);
    const productos = await productosController.listLogued(req);
    let sesion = req.session.carrito;
    res.render('products/view_my_products', { layout: 'carrito', productos, sesion, response });
})

router.get('/category/:id', authController.verifyUser, async (req, res) => {
    const productos =  await productosController.filterCategory(req)
    const categorias = await listasElementosController.listHome()
    let sesion = req.session.carrito;
    res.render('view_home', {layout: 'logued', productos, categorias, sesion });
})

module.exports = router;
