const express = require('express');
const router = express.Router();
const productosController = require('../../controllers/productosController');
const authController = require('../../controllers/authController')

router.get('/', authController.verifyToken, async (req, res) => {
    const productos = await productosController.listAll();
    res.json({ productos} );
})

router.get('/my', authController.verifyToken, async (req, res) => {
    const productos = await productosController.listLogued(req);
    res.json({ productos} );
})

router.post('/search', authController.verifyToken, async (req, res) => {
    const productos = await productosController.listAll(req.body);
    res.json({ productos} );
})

module.exports = router;
