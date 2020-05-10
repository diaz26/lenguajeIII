'use strict'

const pool = require('../database')

module.exports = function () {

    async function insert(data) {
        await data.forEach(element => {
            pool.query("INSERT INTO detalles_pedidos SET ?", [element])
        });
        return true
    }

    async function findOrder(id) {
        const details = await pool.query(`
            SELECT p.imagen, p.codigo, p.nombre, c.nombre AS categoria, dp.costo, dp.cantidad, dp.total FROM detalles_pedidos as dp
            JOIN productos AS p ON p.id = dp.producto_id
            JOIN listas_elementos AS c ON c.id = p.categoria_id
            WHERE pedido_id = ?
            `, [id])
        return details
    }

    return {
        insert,
        findOrder
    }
}
