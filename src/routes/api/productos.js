const express = require('express');
const router = express.Router();
const productosController = require('../../controllers/productosController');
const authController = require('../../controllers/authController')
const jwt = require('jsonwebtoken')

router.get('/', /*authController.verifyToken,*/ async (req, res) => {
    const productos = await productosController.listAll();
    res.json({ productos} );
})

router.get('/my', async(req, res) => {
    const productos = await productosController.listLogued(req);
    res.json({ productos} );
})

router.post('/search', async(req, res) => {
    const productos = await productosController.listAll(req.body);
    res.json({ productos} );
})

module.exports = router;
