
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host  : 'classmysql.engr.oregonstate.edu',
  user  : 'cs290_watsoncl',
  password: '2663',
  database: 'cs290_watsoncl'

});

module.exports.pool = pool;
