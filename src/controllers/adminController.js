'use strict'

const productos = require('../models/productos')
const pedidos = require('../models/pedidos')
const usuarios = require('../models/usuarios')

async function listAllOrders () {
    const listAll = await pedidos().listAll()
    return listAll
}

async function listAllProducts () {
    const listAll = await productos().listAll()
    return listAll
}

async function listAllUsers () {
    const listAll = await usuarios().listAll()
    return listAll
}

module.exports = {
    listAllOrders,
    listAllProducts,
    listAllUsers
}
  