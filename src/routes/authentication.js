const express = require('express');
const router = express.Router();

const usuarios = require('../controllers/usuariosController');

router.post('/', async(req, res) => {
    const resp = await usuarios.login(req.body);
    res.json(resp);
})

module.exports = router;