const Registration = require('../models/registration');
const Program = require('../models/program');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

async function createRegistration(programID, userID) {
  try {
    // Retrieve the program with the given programID
    const program = await Program.findByPk(programID);

    // Check if the program exists
    if (!program) {
      console.error('Error: Program not found');
      return null;
    }

    // Check if the number of participants is less than the capacity
    if (program.numParticipants < program.capacity) {
      const registration = await Registration.create({
        programID,
        userID,
        registrationID : uuidv4().split("-").reduce((acc, val) => acc + parseInt(val, 16), 0) % 1000000000,
      });

      // Increment numParticipants in the program
      program.numParticipants += 1;
      await program.save();

      return registration;
    } else {
      console.error('Error: Program capacity reached');
      return null;
    }
  } catch (error) {
    console.error('Error creating registration:', error);
    return null;
  }
}


async function getRegistrationByID(registrationID) {
  try {
    const registration = await Registration.findByPk(registrationID, {
      include: [Program, User],
    });

    if (!registration) {
      throw new Error('Registration not found');
    }

    return registration;
  } catch (error) {
    console.error('Error getting registration by ID:', error);
    return null;
  }
}

async function getAllRegistrations() {
  try {
    const registrations = await Registration.findAll({
      include: [Program, User],
    });

    return registrations;
  } catch (error) {
    console.error('Error getting all registrations:', error);
    return null;
  }
}

async function deleteRegistration(registrationID) {
  try {
    const registration = await Registration.findByPk(registrationID);

    if (!registration) {
      throw new Error('Registration not found');
    }

    await registration.destroy();

    return true;
  } catch (error) {
    console.error('Error deleting registration:', error);
    return false;
  }
}

module.exports = {
  createRegistration,
  getRegistrationByID,
  getAllRegistrations,
  deleteRegistration,
};
