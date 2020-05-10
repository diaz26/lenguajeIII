'use strict'

const pool = require('../database')

module.exports = function () {

  async function authUser(req) {
    const user = await pool.query(`SELECT * FROM usuarios WHERE email = '` + req.email + `' AND contrasena = '` + req.pass + `' LIMIT 1`)
    if (user.length > 0) {
      return (user[0])
    } else {
      return false
    }
  }

  return {
    authUser
  }
}