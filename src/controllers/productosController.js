'use strict'

const productos = require('../models/productos')

async function listAll (req = null) {
    if (req !== null && req.body !== undefined) {
        req = req.body
    }
    const listAll = await productos().listAll(req)
    return listAll
}

async function create (req) {
    const res = await productos().create(req)
    return res
}

async function destroy (id) {
    const res = await productos().destroy(id)
    return res
}

async function update (id, req) {
    const res = await productos().update(id, req)
    return res
}

async function listLogued(req) {
    let id = (req.session.user == undefined) ? 0 : req.session.user.id; 
    const res = await productos().listLogued(id)
    return res

}


module.exports = {
    listAll,
    create,
    destroy,
    update,
    listLogued
}
  