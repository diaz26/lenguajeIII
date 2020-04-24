'use strict'
const jwt = require('jsonwebtoken')
const secret = require('../lib/secret')
const authModel = require('../models/auth')

async function auth(req) {
    if (req.body.email && req.body.pass) {
        const user = await authModel().authUser(req.body);
        if (user) {
            req.session.user = user;
            await iniciarCarrito(req);
            const token = jwt.sign({ id: user.id }, secret, { expiresIn: 216000 })
            return { 'status': 'success', 'token' : token, 'user': user.id}
        } else {
            return { 'status': 'error', 'msg': 'Usuario y/o contraseña incorrecta' }
        }
    } else {
        return { 'status': 'error', 'msg': 'El email y la contraseña son obligatorios' }
    }
}

async function verifyToken(req, res, next) {
    try {
        const header = req.headers.authorization.split(' ')
        const token = (header.length > 0) ? header[1] : null
        const verify = await jwt.verify(token, secret)

        if (verify !== null) {
            next()
        } else {
            res.send({ status: 'error', msg: 'No se reconoce la clave de acceso' })
        }
    } catch (error) {
        res.send({ status: 'error', msg: 'No se reconoce la clave de acceso' })
    }
}

async function iniciarCarrito(req) {
    req.session.carrito = {
        productos: [],
        cantidad: '0',
        valor: '$ 0'
    }
}


module.exports = {
    auth,
    verifyToken
}