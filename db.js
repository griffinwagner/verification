module.exports = function(mysql){
  const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'users'
  });

  db.connect(function(err) {
    if(err){
      throw err;
    };
    console.log('Mysql is connected');
  });

  return db;
}
