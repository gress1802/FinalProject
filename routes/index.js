var express = require('express');
var router = express.Router();

//FAKE DB STUFF
var userDB = require( "../models/users.js" );
var programDB = require("../models/programs.js" );

//testing account
new userDB.User('Joseph', 'Gress', 'gress2123@uwlax.edu', '111', true);

//testing programs
new programDB.Program('Program 1', 'This is program 1', 'Joseph Gress', '2020-11-11');
new programDB.Program('Program 2', 'This is program 2', 'Joseph Gress', '2020-11-11');
new programDB.Program('Program 3', 'This is program 3', 'Joseph Gress', '2020-11-11');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/*
 * GET Program List
 * This is an endpoint that will return a list of programs (JSON) (Used to populate the program portion of the list))
*/
router.get('/programs', (req, res, next) => {

});





module.exports = router;
