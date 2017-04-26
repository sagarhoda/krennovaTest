var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'Localhost',
  user: 'root',
  password: '',
  database: 'krennovaApp'
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

connection.connect();

app.use(bodyParser.json());
app.use(allowCrossDomain);

app.get('/superadmins/', function(req, res){
  connection.query('SELECT * FROM superadmins INNER JOIN login ON superadmins.sid=login.id', function(err, result){
    res.json(result);
  });
});

app.get('/superadmin/:id', function(req, res){
  var id = req.params.id;

  connection.query('SELECT * FROM superadmins INNER JOIN login ON superadmins.sid=login.id WHERE sid = ? ',[id],function(err, result){
    res.send(result);
  });
});

app.get('/admins', function(req, res){
  connection.query('SELECT * FROM admins', function(err, result){
    res.json(result);
  });
});

app.post('/admin', function (req, res) {
   var postData  = req.body;

   connection.query('INSERT INTO admins SET ?', postData, function (error, results) {
   });
});

app.get('/getAdmin/:id', function(req, res){
  var id = req.params.id;
  connection.query('SELECT * FROM admins INNER JOIN login ON admins.aid=login.id WHERE aid = ? ',[id],function(err, result){
    res.send(result);
  });
});

app.get('/notFreeAdmins', function(req, res){
  connection.query('SELECT DISTINCT admins.aid, admins.firstName, admins.lastName, admins.email, admins.createdBy FROM admins RIGHT JOIN users ON admins.aid=users.createdBy', function(err, result){
    res.json(result);
  });
});

app.get('/freeAdmins', function(req, res){
  connection.query('SELECT admins.aid, admins.firstName, admins.lastName, admins.email, admins.createdBy FROM admins LEFT JOIN users on admins.aid=users.createdBy WHERE users.createdBy IS NULL', function(err, result){
    res.json(result);
  });
});

app.delete('/deleteAdmin/:id', function(req, res){
  var id = req.params.id;

  connection.query('DELETE FROM admins WHERE aid = ? ',[id],function(err, result){
  });
});

app.get('/users', function(req, res){
  connection.query('SELECT * FROM users INNER JOIN login ON users.id=login.id', function(err, result){
    res.json(result);
  });
});

app.delete('/deleteUser/:id', function(req, res){
  var id = req.params.id;

  connection.query('DELETE FROM users WHERE id = ? ',[id],function(err, result){
  });
});

app.delete('/deleteFromLogin/:id', function(req, res){
  var id = req.params.id;

  connection.query('DELETE FROM login WHERE id = ? ',[id],function(err, result){
  });
});


app.get('/getUser/:id', function(req, res){
  var id = req.params.id;
  connection.query('SELECT * FROM users WHERE id = ? ',[id],function(err, result){
    res.send(result);
  });
});

app.get('/getAssignedUser/:id', function(req, res){
  var id = req.params.id;
  connection.query('SELECT * FROM users INNER JOIN login ON users.id=login.id WHERE createdBy = ? ',[id],function(err, result){
    res.send(result);
  });
});

app.get('/getLastId', function(req, res){
  connection.query('SELECT MAX(id)+1 AS numOfUser FROM login', function(err, result){
    res.send(result);
  });
});

app.get('/login/:id', function(req, res){
  var id = req.params.id;
  connection.query('SELECT username, id FROM login WHERE id = ? ',[id], function(err, result){
    res.send(result);
  });
});

app.post('/user', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO users SET ?', postData, function (error, results) {});
});

app.post('/new/login', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO login SET ?', postData, function (error, results) {});
});

app.put('/update/user', function (req, res) {
   var firstName = req.body.firstName;
   var lastName = req.body.lastName;
   var email = req.body.email;
   var id = req.body.id;

   connection.query('UPDATE users SET firstName=?, lastName=?, email=? where id=?', [firstName, lastName, email, id], function (error, results) {
   });
});

app.put('/update/admin', function (req, res) {
   var firstName = req.body.firstName;
   var lastName = req.body.lastName;
   var email = req.body.email;
   var id = req.body.id;

   connection.query('UPDATE admins SET firstName=?, lastName=?, email=? where aid=?', [firstName, lastName, email, id], function (error, results) {
   });
});

app.put('/update/login', function (req, res) {
   var username = req.body.username;
   var id = req.body.id;

   connection.query('UPDATE login SET username=? where id=?', [username, id], function (error, results) {
   });
});

app.post('/login/:username/:password', function(req, res){
  var username = req.params.username;
  var password = req.params.password;

  connection.query('SELECT * FROM login WHERE username = ? && password = ? ',[username, password],function(err, result){
    res.send(result);
  });
});

app.listen(5000);