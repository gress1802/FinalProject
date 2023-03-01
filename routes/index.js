var express = require('express');
var router = express.Router();

//FAKE DB STUFF
var userDB = require( "../models/users.js" );
var programDB = require("../models/programs.js" );

//testing account
new userDB.User('Joseph', 'Gress', 'gress2123@uwlax.edu', '111', true);
new userDB.User('Jane', 'Doe', 'jgress1802@gmail.com', '111', false);

//testing programs

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
    let question = req.body.question;
    let program = new programDB.Program(name, description, req.session.user.first + ' ' + req.session.user.last, numParticipants, duration, price, time, location, question);
    console.log(program);
    if(!name || !description || !numParticipants || !duration || !price || !time || !location){
      res.status(401).send({msg : 'Invalid parameters'});
    }
    res.status(200).send(program);
  }else{
    res.status(401).send({msg : 'Unauthorized'});
  }
});

/*
 * Post /api/v1/programs/:pid
 * This is a post endpoint that will sign a user up for a program
 * The user will either be a memeber or a guest
*/
router.post('/programs/:pid', (req, res, next) => {
  //first check if the user is logged in
  if(req.session.user){
    //get the parameters from user session
    let pid = req.params.pid;
    let program = JSON.parse(JSON.stringify(programDB.getProgramById(pid)));
    let fullName = req.session.user.first + ' ' + req.session.user.last;
    if(program){
      if(program.numParticipants < program.maxParticipants){
        programDB.addParticipant(pid, fullName);
        res.status(200).send(program);
      }else{
        res.status(401).send({msg : 'Program is full'});
      }
    }else{
      res.status(401).send({msg : 'Program does not exist'});
    }
  //if not logged in the user is a guest
  }else{
    //retreive the parameters from the request body which are the first and last name
    let pid = req.params.pid;
    let program = programDB.getProgramById(pid);
    let fullName = req.body.name;
    if(program){
      if(program.numParticipants < program.maxParticipants){
        programDB.addParticipant(pid, fullName);
        res.status(200).send(program);
      }else{
        res.status(401).send({ msg : 'Program is full'});
      }
    }
  }

});




module.exports = router;
