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

async function listReport(req) {
    let resp = null;
    switch (req.value) {
        case '1':
            resp = await pedidos().productosTop();
            break;
        case '2':
            resp = await pedidos().usuariosTop();
            break;
        case '3':
            resp = await pedidos().usuariosSinCompras();
            break;    
        default:
            break;
    }
    
    return resp
}

module.exports = {
    listAllOrders,
    listAllProducts,
    listAllUsers,
    listReport
}
  