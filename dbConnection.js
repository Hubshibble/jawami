const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jawamiDB",
    port: 3306,
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err) console.log("MySQL connection created successfully");
    else console.log("MySQL connection FAILED \n", err);
});

module.exports = mysqlConnection;