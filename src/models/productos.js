'use strict'

const pool = require('../database')

module.exports = function () {

    async function listAll(req) {
        let query = `SELECT p.*, (SELECT COUNT(*) FROM detalles_pedidos WHERE producto_id = p.id) AS ventas, le.nombre AS categoria FROM productos AS p JOIN listas_elementos AS le ON le.id = p.categoria_id WHERE p.usuario_id != ${req.id}`;
        if (req !== undefined && req !== null && req.term !== '') {
            query += ` AND nombre like '%${req.term}%'`
        }
        const data = await pool.query(query)
        return data
    }

    async function create(data) {
        await pool.query("INSERT INTO productos SET ?", [data])
        return true;
    }

    async function destroy(id) {
        await pool.query(`DELETE FROM productos WHERE id = ?`, [id])
        return true
    }

    async function update(id, req) {
        await pool.query(`UPDATE productos SET ? WHERE id = ?`, [req, id])
        return true
    }

    async function listLogued(id) {
        const data = await pool.query(`SELECT p.*, c.nombre AS categoria FROM productos as p 
            JOIN listas_elementos AS c ON c.id = p.categoria_id
            WHERE p.usuario_id = ${id}`)
        return data
    }

    async function find(id) {
        const data = await pool.query(`SELECT p.*, c.nombre as categoria FROM productos AS p JOIN listas_elementos AS c ON c.id = p.categoria_id WHERE p.id = ?`, [id])
        return data
    }

    async function filterCategory(id, userId) {
        const data = await pool.query(`SELECT * FROM productos WHERE categoria_id = ? AND usuario_id != ?`, [id, userId])
        return data
    }
    

    return {
      listAll,
      create,
      destroy,
      listLogued,
      find,
      update,
      filterCategory
    }
}
