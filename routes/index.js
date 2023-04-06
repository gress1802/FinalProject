var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const Account = require('../models/account.js');
const programService = require('../services/programService.js');
const User = require('../models/user.js');
const registrationService = require('../services/registrationService.js');
const Program = require('../models/program.js');
const Registration = require('../models/registration.js');

/*
THIS CODE IS ONLY RAN ONCE TO CREATE THE ACCOUNTS IN THE DATABASE
*CREATE ADMIN ACCOUNT* 
const adminAccount = Account.create({
  email: "gress2123@uwlax.edu",
  username: "Joseph",
  password: "111",
  status: "active",
  isAdmin: true,
  accountID: uuidv4().split('-').reduce((acc, val) => acc + parseInt(val, 16), 0) % 1000000000
}); 
*CREATE NONADMIN ACCOUNTS*
const janAccount = Account.create({
  email: "jdoe802@gmail.com",
  username: "Jane",
  password: "111",
  status: "active",
  isAdmin: false,
  accountID: uuidv4().split('-').reduce((acc, val) => acc + parseInt(val, 16), 0) % 1000000000
});
const janeAccount = Account.create({
  email: "landerson@gmail.com",
  username: "Luke",
  password: "111",
  status: "active",
  isAdmin: false,
  accountID: uuidv4().split('-').reduce((acc, val) => acc + parseInt(val, 16), 0) % 1000000000
});
const ainiAccount = Account.create({ 
  email: "aanderson@gmail.com",
  username: "Aini",
  password: "111",
  status: "active",
  isAdmin: false,
  accountID: uuidv4().split('-').reduce((acc, val) => acc + parseInt(val, 16), 0) % 1000000000
});
*/
//CREATE USERs ()

//testing programs

/*
 * GET Program List
 * This is an endpoint that will return a list of programs (JSON) (Used to populate the program portion of the list))
*/
router.get('/programs', async (req, res, next) => {
  try {
    const programs = await programService.getAllPrograms();
    res.status(200).send(programs);
  } catch (error) {
    console.error("Error getting programs:", error);
    res.status(500).send({ message: "Error getting programs" });
  }
});

router.post("/admin/programs", (req, res, next) => {
  //first check if the user is an admin
  if (req.session.user && req.session.user.isAdmin) {
    //get the parameters from the request body
    let programData = {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      day: req.body.day,
      capacity: req.body.capacity,
      memberPrice: req.body.memberPrice,
      nonMemberPrice: req.body.nonMemberPrice,
      programID: uuidv4().split("-").reduce((acc, val) => acc + parseInt(val, 16), 0) % 1000000000,
      question: req.body.question,
      numParticipants: 0,
    };

    console.log(req.body);
    console.log(programData);

    if (
      !programData.name ||
      !programData.description ||
      !programData.location ||
      !programData.startDate ||
      !programData.endDate ||
      !programData.startTime ||
      !programData.endTime ||
      !programData.day ||
      !programData.capacity ||
      !programData.memberPrice ||
      !programData.nonMemberPrice
    ) {
      res.status(401).send({ msg: "Invalid parameters" });
    } else {
      programService.createProgram(programData).then((result) => {
        if (result.success) {
          res.status(200).send(result.program);
        } else {
          res.status(500).send({ msg: "Error creating program" });
        }
      });
    }
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});


/*
 * Post /api/v1/programs/:pid
 * This is a post endpoint that will sign a user up for a program
 * The user will either be a memeber or a guest
*/
router.post('/programs/:pid', async (req, res, next) => {
  let pid = req.params.pid;
  let program = await Program.findByPk(pid);
  console.log(pid);
  if (!program) {
    res.status(401).send({ msg: 'Program does not exist' });
    return;
  }

  if (req.session.user) {
    let registration = await registrationService.createRegistration(pid, req.session.user.userID);
    if (registration) {
      res.status(200).send(program);
    } else {
      res.status(401).send({ msg: 'Program is full' });
    }
  } else {
    let fullName = req.body.name;
    // You should create a guest user and then pass their ID to the createRegistration function
    // For now, I'm assuming you don't have a guest user implementation
    res.status(401).send({ msg: 'Guest registration not implemented' });
  }
});





module.exports = router;
