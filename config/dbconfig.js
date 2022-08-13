const sql = require('mssql/msnodesqlv8');

const pool = new sql.ConnectionPool({
    database: 'PrecisionDB',
    server: process.env.SERVER,
    driver: 'msnodesqlv8',
    options: {
      trustedConnection: true
    }
  })

sql.on('error', (err) => {
    console.log(err);
})

module.exports = { pool }