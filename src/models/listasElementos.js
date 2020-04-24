'use strict'

const pool = require('../database')

module.exports = function () {

  async function listType(type) {
    const elements = await pool.query(`SELECT * FROM listas_elementos WHERE tipo_lista_id = '` + type + `'`)
    return elements
  }

  return {
    listType
  }
}
