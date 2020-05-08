'use strict'

const pedidos = require('../models/pedidos')
const detallesPedidos = require('../models/detallesPedidos')
const generalServices = require('../services/generalServices')

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

async function store(req) {
    let pedido = {
        usuario_id: req.session.user.id,
        referencia: await code(),
        fecha_pedido: generalServices().dateNow(),
        estado_id: 6,
        total: req.session.carrito.valor,
        metodo_pago_id: req.body.metodo_pago_id,
        cuenta: req.body.cuenta
    }

    const pedido_id = await pedidos().create(pedido)

    let details = []

    req.session.carrito.productos.forEach(prod => {
        details.push({
            pedido_id,
            producto_id: prod.id,
            costo: prod.costo,
            cantidad: prod.cantidad,
            total: prod.valor,
        })
    });

    await detallesPedidos().insert(details)
    
    return {
        status: 'success',
        msg: 'Se realizó correctamente su pedido!'
    }
}

async function code() {
    const caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    let generate = "";
    for (let i = 0; i < 10; i++) generate += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    return generate
}

module.exports = {
    listAll,
    create,
    destroy,
    listLogued,
    ordersRealized,
    store
}
  