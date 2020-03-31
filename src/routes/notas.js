const express = require('express');
const router = express.Router();

router.get('/agregar', (req, res) => {
    res.render('notas/agregar');
});

router.get('/editar', (req, res) => {
    res.render('notas/editar');
});

router.get('/eliminar', (req, res) => {
    res.render('notas/eliminar');
});

router.get('/actualizar', (req, res) => {
    res.render('notas/actualizar');
});


module.exports = router;