'use strict'

const usuarios = require('../models/usuarios')

async function listAll (req = null) {
    const listAll = await usuarios().listAll(req)
    return listAll
}

async function create (req) {
    const res = await usuarios().create(req)
    return res
}

async function destroy (id) {
    const res = await usuarios().destroy(id)
    return res
}

module.exports = {
    listAll,
    create,
    destroy
}
  