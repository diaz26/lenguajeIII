'use strict'

const pool = require('../database')

module.exports = function () {

    async function listAll(req) {
        let query = "SELECT * FROM productos"
        
        if (req !== null && req.column !== undefined && req.column !== null) {
            let term = (req.term !== undefined && req.term !== null) ? req.term : '';
            if (req.term2 !== undefined && req.term2 !== null) {
                query += ' WHERE ' + req.column + " BETWEEN " + term + " AND " + term2;
            } else {
                query += ' WHERE ' + req.column + " like '%" + term + "%'";
            }
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

    return {
      listAll,
      create,
      destroy
    }
}
