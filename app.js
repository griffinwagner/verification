const express = require('express');
const app = express();
const peopleController = require('./controllers/peopleController');
const http = require('http');
const mysql = require('mysql');
const myDatabase = require('./db');



const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({extended: false});

// setting template engine
app.set('view engine', 'ejs');
// Static file management
app.use(express.static('./public'));

// linking controller file

peopleController(app, myDatabase(mysql));




var profileLink = 'https://www.google.com';

app.listen(3000);
console.log('Your girlfriend is running away at port 3000')

var request = require('request');
