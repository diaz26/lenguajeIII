'use strict'

const listasElementos = require('../models/listasElementos')

async function listType(id) {
    const listAll = await listasElementos().listType(id)
    return listAll
}

async function listHome() {
    const categorias = await listasElementos().listTypeLimit(5, 3)
    return categorias
}

module.exports = {
    listType,
    listHome
}