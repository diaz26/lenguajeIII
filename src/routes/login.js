const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login/view_login');
})

router.get('/recuperarconstrasena', (req, res) => {
    res.render('login/view_reset_pass');
})


module.exports = router;
