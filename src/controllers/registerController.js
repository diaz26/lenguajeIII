'use strict'

const usuarios = require('../models/usuarios')
const listasElementos = require('../models/listasElementos')
const authController = require('./authController')

async function list (req = null) {
    const listAll = await listasElementos().listType(2)
    return listAll
}

async function create (req) {
    const validateUser = await usuarios().findEmail(req) 
    if (validateUser.length > 0) {
        return {
            status: 'error',
            msg: 'Email ya registrado'
        }
    } else {
        await usuarios().create(req)
        req.pass = req.contrasena;
        const respAuth = await authController.auth({ body: req }); 
        
        return respAuth
    }
}


module.exports = {
    list,
    create
}
  