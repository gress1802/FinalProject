let express = require('express');
let users = require('../models/users');
let router = express.Router();
const accountService = require('../services/accountService');

/*
 * This is a POST route that the path /login
 * It will check the username and password against the fake database
 * If the credentials are valid, it will create a session and return the user object
 * If the credentials are invalid, it will return an error message
 * @param {string} username - username
 * @param {string} password - password
 * @return {object} user - user object
 * @return {string} error - error message
*/
router.post("/login", async (req, res) => {
   let user = await accountService.getAccountByEmail(req.body.email);
   const ERROR = "Invalid credentials";
   if( user ) {
      req.session.regenerate( (err) => {
        if(err){
            console.error(err);
            res.status(500).send('Internal Server Error')
        } else {
            if(user.password == req.body.password){
                req.session.user = user;
                res.status(200).json(user);
            } else{
                res.status(401).json(ERROR);
            }
        }
      });
   } else {
      res.status(401).json(ERROR);
   }
});


/*
 * This is a POST route that the path /logout
 * It will destroy the session and redirect to the home page
*/
router.post("/logout", (req, res) => {
   req.session.regenerate( () => {
      res.redirect("/");
   });
});

module.exports = router;