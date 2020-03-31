const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('view_content', {layout: 'product' });
})

router.get('/agregar', (req, res) => {
    res.render('view_add_cart', {layout: 'product' });
})

router.get('/:another', (req, res) => {
    res.render('view_categorias', {layout: 'categorias' });
})

module.exports = router;
