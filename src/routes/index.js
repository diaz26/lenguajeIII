const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController')
const listasElementosController = require('../controllers/listasElementosController')
const authController = require('../controllers/authController')

router.get('/', authController.verifyUser, async(req, res) => {
    res.redirect('/home')
})

router.get('/home', authController.verifyUser, async (req, res) => {
    const productos = await productosController.listAll(req);
    const categorias = await listasElementosController.listHome()
    let sesion = req.session.carrito;
    res.render('view_home', {layout: 'logued', productos, categorias, sesion });
})

module.exports = router;