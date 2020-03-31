'use strict'

const pedidos = require('../models/pedidos')

async function listAll (req = null) {
    const listAll = await pedidos().listAll(req)
    return listAll
}

async function create (req) {
    const res = await pedidos().create(req)
    return res
}

async function destroy (id) {
    const res = await pedidos().destroy(id)
    return res
}

module.exports = {
    listAll,
    create,
    destroy
}
  