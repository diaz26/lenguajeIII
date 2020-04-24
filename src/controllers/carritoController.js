'use strict'

const carrito = require('../models/carrito')
const productos = require('../models/productos')

async function addDetail (req) {

    let buscarProducto = await productos().find(req.body.id) 

    if (buscarProducto.length > 0) {
        let productoNuevo = buscarProducto[0]
        let registroProducto = {
            id: productoNuevo.id,
            nombre: productoNuevo.nombre,
            codigo: productoNuevo.codigo,
            imagen: productoNuevo.imagen,
            costo: productoNuevo.costo,
            cantidad: 1,
            total: productoNuevo.costo
        };
        if (req.session.carrito !== undefined) {
            let productoFind = req.session.carrito.productos.find(prod => prod.id == productoNuevo.id);
            if (productoFind !== null) {
                req.session.carrito.productos.forEach(data => {
                    if (data.id == productoNuevo.id) {
                        data.cantidad++
                        data.total = data.cantidad * productoNuevo.costo
                    }
                });
            } else {
                console.log('no encuenta', registroProducto)
                req.session.carrito.productos.push(registroProducto)
            }
            req.session.carrito.cantidad = req.session.carrito.productos.length
        } else {
            req.session.carrito = {
                productos: [],
                cantidad: 1,
                total: 0 
            }
            req.session.carrito.productos.push(registroProducto)
        }
        let total = 0
        req.session.carrito.productos.forEach(carr => {
            total += carr.total
        })
        req.session.carrito.total = total
        console.log(req.session.carrito)
        return req.session.carrito
    }
    return true
    
}

async function getOrder () {
    const res = await carrito().getOrder()
    return res
}


module.exports = {
    addDetail,
    getOrder
}
  