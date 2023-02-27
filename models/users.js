const { v4: uuidv4 } = require('uuid');

// Fake database
// TODO: Replace with real database
const BY_EMAIL = {};
const BY_ID = {};

/*
 * User class
 * @param {string} first - first name
 * @param {string} last - last name
 * @param {string} email - email address
 * @param {string} password - password
 * @param {boolean} admin - admin status (true/false)
*/
class User {
   constructor(first, last, email, password, admin) {
      this.first = first;
      this.last = last;
      this.email = email;
      this.password = password;
      this.id = uuidv4();
      this.admin = admin;

      BY_ID[ this.id ] = this;
      BY_EMAIL[ this.email ] = this;
   }
}

// Get user by username (returns a copy of the user object)
function getUsersByEmail( username ) {
   let user = BY_EMAIL[ username ];
   return user && Object.assign( {}, user );
}

// Get user by id (returns a copy of the user object)
function getUserById(id) {
   let user = BY_ID[ id ];
   return user && Object.assign( {}, user );
}


module.exports = { User, getUsersByEmail, getUserById};