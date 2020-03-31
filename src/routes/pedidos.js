const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('orders/view_orders', {layout: 'payment' });
})

router.get('/:id', (req, res) => {
    res.render('orders/view_orders_unique', {layout: 'payment' });
})

module.exports = router;
