const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post('/', async(req, res) => {
    res.json({
        message: 'hi'
    })

    /*const data = await register.list();
    res.json(data)*/
})


module.exports = router
