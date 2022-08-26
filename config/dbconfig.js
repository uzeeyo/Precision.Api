const sql = require('mssql/msnodesqlv8');

const pool = new sql.ConnectionPool({
    database: 'PrecisionDB',
    server: 'DESKTOP-IQVN5AP',
    driver: 'msnodesqlv8',
    options: {
      trustedConnection: true,
      instanceName: 'SQLEXPRESS',
    }
  })

sql.on('error', (err) => {
    console.log(err);
})

module.exports = { pool }