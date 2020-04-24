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

async function listLogued(req) {
    let id = (req.session.user !== undefined) ? req.session.user.id : 0
    const res = await pedidos().listLogued(id)
    return res
}

async function ordersRealized(req) {
    let id = (req.session.user !== undefined) ? req.session.user.id : 0
    const res = await pedidos().ordersRealized(id)
    return res
}

module.exports = {
    listAll,
    create,
    destroy,
    listLogued,
    ordersRealized
}
  