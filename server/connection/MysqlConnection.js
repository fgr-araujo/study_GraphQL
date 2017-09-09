const mysql = require('mysql')
const {mysqlConnectionDB} = require('./ConnectionDetails')

const DISCONECTED = 0
const WAIT_FOR_CONNECTION = 1
const CONNECTED = 2

const mysqlConnection = {}

let connection = {}
let connectionState = DISCONECTED

mysqlConnection.getConnection = () => {
  return new Promise((resolve, reject) => {
    if (connectionState === DISCONECTED) {
      connectionState = WAIT_FOR_CONNECTION
      connection = connectMysql()
    } else if (connectionState === CONNECTED) {
      return resolve(connection)
    } else {
      return resolve(connection)
    }

    connection.connect((pErr) => {
      connectionState === CONNECTED
      if (pErr) return reject(pErr)
      return resolve(connection)
    })
  })
}

/**
* Create a mysql connection
*/
const connectMysql = () => {
  return mysql.createConnection({
    host     : mysqlConnectionDB.ip,
    user     : mysqlConnectionDB.user,
    password : mysqlConnectionDB.pass,
    database : mysqlConnectionDB.db,
    multipleStatements : true,
    dateStrings : 'DATETIME'
  })
}

module.exports = mysqlConnection
