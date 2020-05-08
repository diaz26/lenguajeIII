const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let sesion = req.session.carrito;
    res.render('contact/view_contact', {layout: 'carrito', sesion});
})

module.exports = router;
