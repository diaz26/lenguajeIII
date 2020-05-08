'use strict'

const productos = require('../models/productos')
const listasElementos = require('../models/listasElementos')

async function listAll (req = null) {
    let data = {
        id: req.session.user.id
    }
    if (req !== null && req.body !== undefined) {
        data.term = req.body.term || ''
    }
    const listAll = await productos().listAll(data)
    return listAll
}

async function create (req) {
    let addImg = true;
    let msg = 'Producto creado correctamente!'
    if (req.params.id !== undefined) {
        const findProduct = await find(req.params.id)
        if (findProduct.status == 'error') {
            return findProduct
        }
        if ( req.files == null || req.files.imagen == undefined || findProduct.product.imagen == req.files.imagen.name) {
            addImg = false;
        }
    } 

    if (addImg) {
        let file = req.files.imagen
        let nameSave = Date.now().toString() + Math.ceil(Math.random() * 1000) + '.' + file.name.split('.')[1]

        await file.mv(`src/public/images/${nameSave}`)
        req.body.imagen = await nameSave
    }

    req.body.usuario_id = await req.session.user.id

    if (req.params.id !== undefined) {
        await productos().update(req.params.id, req.body)
        msg = 'Producto actualizado correctamente!'
    } else {
        await productos().create(req.body)
    }

    return {
        status: 'success',
        msg
    }
}

async function destroy (id) {
    const res = await productos().destroy(id)
    return res
}

async function listLogued(req) {
    let id = (req.session.user == undefined) ? 0 : req.session.user.id; 
    const res = await productos().listLogued(id)
    return res
}

async function createList() {
    const categorias = await listasElementos().listType(5)
    return categorias
}

async function find(id) {
    const product = await productos().find(id)
    if (product.length > 0) {
        return {
            status: 'success',
            product: product[0]
        }
    } else {
        return {
            status: 'error',
            msg: 'Producto no encontrado!'
        }
    }
}

async function filterCategory(req) {
    const products = await productos().filterCategory(req.params.id, req.session.user.id)
    return products
}

module.exports = {
    listAll,
    create,
    destroy,
    listLogued,
    createList,
    find,
    filterCategory
}
  