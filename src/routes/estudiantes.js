const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res) => {

    const data = await pool.query('SELECT id, nombre, edad FROM estudiantes')
    /*const data = [
        {
            id: 1,
            nombre: 'Jeff',
            edad: 20
        }
    ]*/
    res.render('estudiantes/view_estudiantes', {data});

})

module.exports = router;
