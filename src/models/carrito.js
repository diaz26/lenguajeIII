'use strict'

const pool = require('../database')

module.exports = function () {

  async function addDetail(req) {
    const producto = await pool.query("SELECT * FROM productos WHERE id = " + req.id + " LIMIT 1")
    
    if (producto !== null) {
      const data = {
        producto_id: req.id,
        costo: producto[0].costo,
        cantidad: 1,
        total: producto[0].costo
      }
      await pool.query("INSERT INTO detalles_pedidos SET ?", [data])
    }
    const resp = getOrder();
    return resp
  }

  async function getOrder() {
    const resp = await pool.query("SELECT dp.*, p.imagen, p.nombre, p.codigo FROM detalles_pedidos AS dp JOIN productos AS p ON p.id = dp.producto_id WHERE dp.pedido_id IS NULL")
    return resp
  }

  return {
    addDetail,
    getOrder
  }
}
