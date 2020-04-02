const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productosController');

router.get('/', async(req, res) => {
    const productos = await productosController.listAll();
    res.render('view_home', {layout: 'app', productos });
})

router.get('/', (req, res) => {
    res.render('view_home', {layout: 'app' });
})

router.post('/admin', (req, res) => {

    let result = Number(req.body.num1) + Number(req.body.num2);

    res.render('view_admin', {suma: result});
})

router.get('/client', (req, res) => {
    res.render('view_client', {result: []});
})

router.post('/client', (req, res) => {
    numero = Number(req.body.num)
    result = []
    for (let index = numero; index = 1 ; index--) {
        let data = numero + ' x ' + index + ' = ' + (numero * index)
        const element = array[index];
    }

    res.render('view_client', {suma: result});
})

module.exports = router;