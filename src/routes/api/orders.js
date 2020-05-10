const express = require('express');
const router = express.Router();
const usuariosController = require('../../controllers/usuariosController');
const carritoController = require('../../controllers/carritoController');
const authController = require('../../controllers/authController')

router.get('/', authController.verifyToken, async (req, res) => {
    const listas = await carritoController.list();
    const user = req.session.user
    res.json({
        listas,
        user
    });
})

router.post('/', authController.verifyToken, async(req, res) => {
    const productos = await productosController.listAll(req.body);
    res.json({
        productos
    });
})

module.exports = router;
