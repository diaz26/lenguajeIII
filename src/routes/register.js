const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('register/view_register');
})

module.exports = router;
