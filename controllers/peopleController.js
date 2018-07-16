const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({extended: false});
var request = require('request');


module.exports = function(app, db) {
    app.get('/', function(req, res) {
      res.render('index');

      });

      app.get ('/secondpage', function( app, db) {
        res.render('second');
      });




      // console.log(makeid());
      app.post('/getSecret', urlencodeParser, function(req, res){
            console.log("we secret");
            let item = req.body.link;
            console.log(item);
            let sql = `INSERT INTO users (link) VALUES ('${req.body.link}')`;
            console.log(sql);
            db.query(sql, (err, resultLink) => {
              if (err) throw err;
              console.log(resultLink);
            });
            var secretcode = req.body.secretcode;
            console.log(secretcode);
            let sql2 = `UPDATE users SET secretcode = "${req.body.secretcode}" WHERE link = '${req.body.link}';`
            db.query(sql2, (err, resultSecretcode) => {
              if (err) throw err;
              console.log(resultSecretcode);
            });
            request(req.body.link, secretcode,  function (error, response, body) {
              console.log('error:', error); // Print the error if one occurred
              console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
              console.log('body:', body); // Print the HTML for the Google homepage.
              console.log('+++++++++++++++++++++++++++++++++++++++++');
              // Getting Name
              var address = req.body.link
              var nameOpener = address.indexOf('/profile/');
              var nameBegin = nameOpener + 9;
              console.log(address.substring(nameBegin , ));
              nameWithExtra = address.substring(nameBegin , );
              console.log(nameWithExtra);
              // Linking
              console.log(secretcode);
              var hello =req.body.secretcode;
              console.log(hello);
              console.log(body.indexOf(secretcode));
              var diditwork = body.indexOf(secretcode);
              if (diditwork > -1) {
                let sql3 = `UPDATE users SET status = "Linked" WHERE link = '${req.body.link}';`
                db.query(sql3, (err, resultStatus) => {
                  if (err) throw err;
                  console.log(resultStatus);
                });

                let sql4 = `UPDATE users SET name = ? WHERE link = '${req.body.link}';`
                db.query(sql4, nameWithExtra, (err, resultName) => {
                  if (err) throw err;
                  console.log(resultName);
                  return resultName;

                });
                let sexySql = `SELECT * FROM users WHERE link = '${req.body.link}';`;

                db.query(sexySql, (err, results) => {
                  if (err) throw err;
                  console.log(results);
                  res.render('second', {info:results});
                });

              } else {
                res.render('fuckup')
                let sql3 = `UPDATE users SET status = "Unlinked" WHERE link = '${req.body.link}';`
                db.query(sql3, (err, result) => {
                  if (err) throw err;
                  console.log(result);
                });
              }
            });

      });

      app.post('/createpcode', urlencodeParser, function (req, res) {
        console.log("We creating a p-code");
        var pcode = req.body.pcode;
        console.log(pcode);
        let pcodesql = `UPDATE users SET pcode = '${req.body.pcode}' WHERE link = '${req.body.link}';`
        db.query(pcodesql, (err, result) => {
          if (err) throw err;
          console.log(result);
        });
        let profilePageSQL = `SELECT * FROM users WHERE link = '${req.body.link}';`;
        console.log(profilePageSQL);
        db.query(profilePageSQL, (err, results)=>{
          if (err) throw err;
          console.log(results);
          res.render('profile', {info:results})
        })
      });

      app.get('/signin', function (req, res) {
        res.render('signin');
      });

      app.post('/verify', urlencodeParser, function (req, res) {
        console.log("We Getting In");
        var pLink = req.body.link;
        console.log(pLink);
        var pPcode = req.body.pcode;
        let sql = `SELECT * FROM users WHERE link = '${req.body.link}' AND pcode = "${req.body.pcode}";`;
        console.log(sql);
        db.query(sql, (err, result)=>{
          if (err) throw err;
          console.log("Hello");;
          console.log(result);
          res.render('profile', {info:result});
        });
      });

      app.get('/vote', function (req, res) {
          let sql = `SELECT * FROM nominees;`;
          db.query(sql, (err, result)=> {
            console.log(result);
            res.render('award', {noms:result});
          });
      });

      app.get('/nominee/:id', function (req, res) {
        console.log("Voting");
        let sql = `INSERT INTO users (ITVote) VALUES ("Hello") WHERE `

      });




};


















//help
