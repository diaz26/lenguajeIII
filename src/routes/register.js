const express = require('express');
const router = express.Router();
const register = require('../controllers/registerController');

router.get('/', async(req, res) => {
    const data = await register.list();
    res.render('register/view_register', {data});
})

router.post('/', async(req, res) => {
    await register.create(req.body);
    res.redirect('/home')
})

module.exports = router;
