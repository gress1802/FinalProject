var express = require('express');
var router = express.Router();

//FAKE DB STUFF
var userDB = require( "../models/users.js" );

//testing account
new userDB.User('Joseph', 'Gress', 'gress2123@uwlax.edu', '111', true);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
