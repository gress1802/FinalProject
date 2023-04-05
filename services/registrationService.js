const Registration = require('../models/registration');
const Program = require('../models/program');
const User = require('../models/user');

async function createRegistration(programID, userID) {
  try {
    const registration = await Registration.create({
      programID,
      userID,
    });

    return registration;
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
