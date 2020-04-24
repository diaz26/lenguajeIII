'use strict'

const pool = require('../database')

module.exports = function () {

  async function listAll() {
    const query = "SELECT us.*, CONCAT(us.nombres,' ',us.apellidos) AS nombre, r.nombre AS rol, g.nombre as genero FROM usuarios AS us JOIN listas_elementos as r on r.id = us.rol_id JOIN listas_elementos as g on g.id = us.genero_id";
    const data = await pool.query(query)
    return data
  }

  async function create(req) {
    await pool.query("INSERT INTO usuarios SET ?", [req])
    return true;
  }

  async function destroy(id) {
    const findUser = "SELECT * FROM usuarios WHERE id = " + id + ' LIMIT 1'; 
    const user = await pool.query(findUser)
    
    if (user === null) {
      const msg = 'Usuario no encontrado'
    } else {
      await pool.query("DELETE FROM usuarios WHERE id = " + id)
      const msg = 'Usuario eliminado exitosamente!'
    }
    return {
      status: 'success',
      msg: msg
    }
  }

  async function findLog(req) {
    const user = await pool.query(`SELECT * FROM usuarios WHERE email = '` + req.email + `' AND contrasena = '` + req.pass + `' LIMIT 1`)
    return user
  }

  async function findEmail(req) {
    const user = await pool.query(`SELECT * FROM usuarios WHERE email = '` + req.email + `'`)
    return user
  }

  return {
    listAll,
    create,
    destroy,
    findLog,
    findEmail
  }
}
