'use strict'

const pool = require('../database')

module.exports = function () {

    async function insert(data) {
        await pool.query("INSERT INTO detalles_pedidos SET ?", [data])
        return true
    }

    return {
        insert
    }
}
