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

  async function productosTop() {
    const resp = await pool.query(`SELECT pr.*, SUM(cantidad) AS cantidad_venta FROM detalles_pedidos AS dp JOIN pedidos AS p ON p.id = dp.pedido_id JOIN productos AS pr ON pr.id = dp.producto_id WHERE p.estado_id = 5 GROUP BY pr.id ORDER BY cantidad_venta DESC`)
    return resp
  }
  async function usuariosTop() {
    const resp = await pool.query(`SELECT us.*, gen.nombre as genero, ro.nombre as rol FROM pedidos AS p

    JOIN usuarios AS us ON us.id = p.usuario_id
    JOIN listas_elementos AS gen ON gen.id = us.genero_id
    JOIN listas_elementos AS ro ON ro.id = us.rol_id
    WHERE p.estado_id = 5`)
    return resp
  }
  async function usuariosSinCompras() {
    const resp = await pool.query(`SELECT us.*, gen.nombre as genero, ro.nombre as rol FROM usuarios as us
    JOIN listas_elementos AS gen ON gen.id = us.genero_id
    JOIN listas_elementos AS ro ON ro.id = us.rol_id
    WHERE us.id not in (SELECT us.id FROM pedidos AS p
    JOIN usuarios AS us ON us.id = p.usuario_id
    WHERE p.estado_id = 5)`)
    return resp
  }

  async function listLogued(id) {
    const resp = await pool.query(`SELECT p.referencia, le.nombre AS estado, CAST(p.fecha_pedido AS DATE), CAST(p.fecha_entrega AS DATE), prod.imagen, prod.nombre, dp.* FROM detalles_pedidos AS dp
        JOIN pedidos AS p ON p.id = dp.pedido_id
        JOIN productos AS prod ON prod.id = dp.producto_id
        JOIN listas_elementos AS le ON le.id = p.estado_id
        `)
    return resp
  }

  async function ordersRealized(id) {
    const resp = await pool.query(`SELECT pe.*, le.nombre AS estado FROM pedidos AS pe
      JOIN listas_elementos AS le ON le.id = pe.estado_id
      WHERE pe.usuario_id = ` + id)
    return resp
  }

  return {
    listAll,
    create,
    destroy,
    productosTop,
    usuariosTop,
    usuariosSinCompras,
    listLogued,
    ordersRealized
  }
}
