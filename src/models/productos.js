'use strict'

const pool = require('../database')

module.exports = function () {

    async function listAll(req) {
        let query = `SELECT p.*, (SELECT COUNT(*) FROM detalles_pedidos WHERE producto_id = p.id) AS ventas FROM productos AS p`;
        if (req !== undefined && req !== null && req.term !== undefined) {
            console.log('ENTRA')
            query += ` WHERE nombre like '%${req.term}%'`
        }
        const data = await pool.query(query)
        return data
    }

    async function create(req) {
        return {
            status: 'success',
            msg: 'Producto creado exitosamente!'
        }
    }
    async function destroy(id) {
        const findRegister = "SELECT * FROM productos WHERE id = " + id + ' LIMIT 1';
        const register = await pool.query(findRegister)
        
        if (register === null) {
          const msg = 'Producto no encontrado'
        } else {
          await pool.query("DELETE FROM productos WHERE id = " + id)
          const msg = 'Producto eliminado exitosamente!'
        }
        return {
          status: 'success',
          msg: msg
        }
    }

    async function update(id, req) {
        const updateRegister = "UPDATE productos SET " + req + ' LIMIT 1';
        const register = await pool.query(findRegister)
        
        const msg = 'Producto eliminado exitosamente!'
        return {
            status: 'success',
            msg: msg
        }
    }

    async function listLogued(id) {
        const data = await pool.query(`SELECT * FROM productos WHERE usuario_id = ` + 21)
        return data
    }

    async function find(id) {
        const data = await pool.query(`SELECT * FROM productos WHERE id = ` + id)
        return data
    }

    return {
      listAll,
      create,
      destroy,
      listLogued,
      find
    }
}
