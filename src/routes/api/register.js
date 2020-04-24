const express = require('express')
const router = express.Router()
const register = require('../../controllers/registerController')

router.get('/', async(req, res) => {
    const data = await register.list();
    res.json(data)
})

router.post('/', async(req, res) => {
    const resp = await register.create(req.body)
    res.json(resp)
})

module.exports = router
