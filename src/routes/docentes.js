const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async(req, res) => {

    const data = await pool.query('SELECT id, nombre, edad FROM docentes')
    res.render('docentes/view_docentes', {data});
})

module.exports = router;
