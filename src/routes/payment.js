const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('view_payment', {layout: 'payment' });
})

module.exports = router;
