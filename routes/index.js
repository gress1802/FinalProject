var express = require('express');
var router = express.Router();

//FAKE DB STUFF
var userDB = require( "../models/users.js" );
var programDB = require("../models/programs.js" );

//testing account
new userDB.User('Joseph', 'Gress', 'gress2123@uwlax.edu', '111', true);
new userDB.User('Joe', 'Gress', 'jgress1802@gmail.com', '111', false);

//testing programs
new programDB.Program('Program 1', '2020-12-12', '12:00', 'UWL', 'This is a test program 1', 'Free', 'Joseph Gress', 20);
new programDB.Program('Program 2', '2020-12-12', '12:00', 'UWL', 'This is a test program 2', 'Free', 'Joseph Gress', 25);
new programDB.Program('Program 3', '2020-12-12', '12:00', 'UWL', 'This is a test program 3', 'Free', 'Joseph Gress', 30);

/*
 * GET Program List
 * This is an endpoint that will return a list of programs (JSON) (Used to populate the program portion of the list))
*/
router.get('/programs', (req, res, next) => {
  var programs = programDB.getAllPrograms();
  res.status(200).send(programs);
});

/*
 * POST Program
 * This is an endpoint that will add a program to the database
 * The server will either respond with a 401 error or a 200 ok with the program object
 * The parameters will be in the requesst body
 * name, description, author, numParticipants, duration, price, time, location
 * @param {String} name - name of the program
 * @param {String} description - description of the program
 * @param {String} author - author of the program
 * @param {int} numParticipants - number of participants in the program
 * @param {int} duration - duration of the program
 * @param {int} price - price of the program
 * @param {date} - time of the program
 * @param {String} location - location of the program 
*/
router.post('/admin/programs', (req, res, next) => {
  //first check if the user is an admin
  if(req.session.user && req.session.user.admin){
    //get the parameters from the request body
    console.log(req.session);
    let name = req.body.name;
    let description = req.body.description;
    let numParticipants = req.body.maxParticipants;
    let duration = req.body.duration;
    let price = req.body.price;
    let time = req.body.time;
    let location = req.body.location;
    console.log(name, description, req.session.user.first, numParticipants, duration, price, time, location)
    let program = new programDB.Program(name, description, req.session.user.first + ' ' + req.session.user.last, numParticipants, duration, price, time, location);
    console.log(program);
    if(!name || !description || !numParticipants || !duration || !price || !time || !location){
      res.status(401).send('Invalid parameters');
    }
    res.status(200).send(program);
  }else{
    res.status(401).send('Unauthorized');
  }
});

/*
 * Post /api/v1/programs/:pid
 * This is a post endpoint that will sign a user up for a program
 * The user will either be a memeber or a guest
*/
router.post('/programs/:programName', (req, res, next) => {
  //first check if the user is logged in
  if(req.session.user){
    console.log("user is an admin");
    //get the parameters from user session
    let pName = req.params.programName;
    let program = programDB.getProgramByName(pName);
    let fullName = req.session.user.first + ' ' + req.session.user.last;
    if(program){
      if(program.numParticipants < program.maxParticipants){
        program.numParticipants++;
        program.participantsList.push(fullName);
        res.status(200).send(program);
      }else{
        res.status(401).send('Program is full');
      }
    }else{
      res.status(401).send('Program does not exist');
    }
  //if not logged in the user is a guest
  }else{
    console.log("user is a guest");
    //retreive the parameters from the request body which are the first and last name
    let pName = req.params.programName;
    let program = programDB.getProgramByName(pName);
    let fullName = req.body.first + ' ' + req.body.last;
    if(program){
      if(program.numParticipants < program.maxParticipants){
        program.numParticipants++;
        program.participantsList.push(fullName);
        res.status(200).send(program);
      }else{
        res.status(401).send('Program is full');
      }
    }
  }

});




module.exports = router;
