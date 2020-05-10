'use strict'

const productos = require('../models/productos')
const listasElementos = require('../models/listasElementos')

async function addDetail (req) {

    const productFind = await productos().find(req.params.id) 

    if (productFind.length > 0) {
        let product = productFind[0]
        let result = req.session.carrito.productos.find((prod) => prod.id == product.id)

        if (result !== undefined && result !== null) {
            await req.session.carrito.productos.forEach(dp => {
                if (dp.id == product.id) {
                    dp.cantidad++
                    dp.valor = dp.costo * dp.cantidad
                }
            });

        } else {
            product.cantidad = 1
            product.valor = product.costo
            await req.session.carrito.productos.push(product)
        }

        await calcularTotal(req)

        return {
            status: 'success',
            msg: 'Producto agregado al carrito!'
        }

    } else {
        return {
            status: 'error',
            msg: 'Producto no encontrado!'
        }
    }
}

async function removeDetail(req) {

    const result = req.session.carrito.productos.find((prod) => prod.id == req.params.id)

    if (result !== null && result.cantidad == 1) {
        let newCart = [];
        await req.session.carrito.productos.forEach(dp => {
            if (dp.id != req.params.id) {
                newCart.push(dp)
            }
        });

        req.session.carrito.productos = await newCart

    } else {
        await req.session.carrito.productos.forEach(dp => {
            if (dp.id == req.params.id) {
                dp.cantidad--
                dp.valor = dp.costo * dp.cantidad
            }
        });
    }
    await calcularTotal(req)

    return {
        status: 'success',
        msg: 'Producto eliminado!'
    }

}

async function calcularTotal(req) {
    let total = 0
    let cantidad = 0

    await req.session.carrito.productos.forEach(prod => {
        total += prod.valor
        cantidad += prod.cantidad
    })
    req.session.carrito.valor = await total
    req.session.carrito.cantidad = await cantidad
}

async function list() {
    const res = {
        metodosPagos: await listasElementos().listType(4)
    } 
    return res
}

module.exports = {
    addDetail,
    removeDetail,
    list,
}
  