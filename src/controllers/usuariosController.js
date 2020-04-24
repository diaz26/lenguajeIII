'use strict'

const usuarios = require('../models/usuarios')

async function listAll (req = null) {
    const listAll = await usuarios().listAll(req)
    return listAll
}

async function create (req) {
    const validateUser = await usuarios().findEmail(req) 
    let resp;
    if (validateUser.length > 0) {
        resp = {
            status: 'error',
            msg: 'Email ya registrado'
        }
    } else {
        await usuarios().create(req)
        req.pass = req.contrasena;
        const user = await this.login(req); 
        
        resp = {
            status: 'success',
            id: user.id,
            msg: 'Se ha registrado exitosamente!'
        }
    }
    return resp
}

async function destroy (id) {
    const res = await usuarios().destroy(id)
    return res
}

async function login(req) {
    const user = await usuarios().findLog(req);
    let resp;
    if (user.length > 0 && user[0].id !== undefined) {
        resp = {
            status: 'success',
            id: user[0].id
        }
    } else {
        resp = {
            status: 'error',
            msg: 'Usuario y/o contraseña incorrecta' 
        }
    }
    return resp;
}

module.exports = {
    listAll,
    create,
    destroy,
    login
}
  