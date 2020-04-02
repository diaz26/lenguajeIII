'use strict'

const carrito = require('../models/carrito')

async function addDetail (req) {
    const res = await carrito().addDetail(req)
    return res
}

async function getOrder () {
    const res = await carrito().getOrder()
    return res
}


module.exports = {
    addDetail,
    getOrder
}
  