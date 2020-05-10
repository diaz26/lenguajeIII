const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController')

router.post('/', async(req, res) => {
    const resp = await authController.auth(req)
    res.json(resp)

})

module.exports = router
