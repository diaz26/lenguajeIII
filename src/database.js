const mysql = require('mysql')
const {promisify} = require('util')
const {database} = require('./keys')

const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{
    if (err) {
        if(err.code == 'PROTOCOL_CONNECTION_LOST') {
            console.error('LA BASE DE DATOS FUE CERRADA');
        }
        if(err.code == 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
    }
    if (connection) {
        connection.release();
        console.log('conectado');
    }
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;