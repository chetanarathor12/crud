var mysql = require('mysql');

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database:"matka",
  port:3306
});
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });
/*connection.connect((err)=> {
  if (err) throw err;
  console.log('Connected!');
});*/
  
//module.exports =  mysql;

//import mysql from "mysql";
/*var mysql = require("mysql");
 
const pool = mysql.createPool({
            connectionLimit : 10,
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'product',
            debug    : false  
});                    
 
function executeQuery(sql, callback) {
    pool.getConnection((err,connection) => {
        if(err) {
            return callback(err, null);
        } else {
            if(connection) {
                connection.query(sql, function (error, results, fields) {
                connection.release();
                console.log('connecteddddddddddd');
                if (error) {
                    return callback(error, null);
                } 
                return callback(null, results);
                });
            }
        }
    });
}
 
function query(sql, callback) {
    //console.log(sql);    
    executeQuery(sql,function(err, data) {
        if(err) {
            console.log(err)
            return callback(err);
        }       
        callback(null, data);
    });
}

var db = {
    query: query
}
console.log('connected');*/

module.exports = mysql;
 