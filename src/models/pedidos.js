'use strict'

const pool = require('../database')

module.exports = function () {

  async function listAll() {
    const data = await pool.query("SELECT pe.*,DATE_FORMAT(pe.fecha_pedido,'%d/%m/%y') AS fecha_pedido, DATE_FORMAT(pe.fecha_entrega,'%d/%m/%y') AS fecha_entrega, CONCAT(us.nombres,' ',us.apellidos) AS comprador, es.nombre AS estado FROM pedidos AS pe JOIN listas_elementos AS es ON es.id = pe.estado_id JOIN usuarios as us on us.id = pe.usuario_id")
    return data
  }

  async function create(req) {
    return {
      status: 'success',
      msg: 'Pedido realizado exitosamente!'
    }
  }

  async function destroy(id) {
    const findRegister = "SELECT * FROM pedidos WHERE id = " + id + ' LIMIT 1';
    const register = await pool.query(findRegister)
    
    if (register === null) {
      const msg = 'Pedido no encontrado'
    } else {
      await pool.query("DELETE FROM pedidos WHERE id = " + id)
      const msg = 'Pedido eliminado exitosamente!'
    }
    return {
      status: 'success',
      msg: msg
    }
  }

  return {
    listAll,
    create,
    destroy
  }
}
