const { pool } = require('../config/dbconfig')

async function getUser(id) {
    const p = await pool.connect();
    const row = await p.request()
        .input('userID', id)
        .execute('getUser')
    return row.recordset[0];
}

module.exports = { getUser }