const bcrypt = require('bcryptjs');
const knex = require('../db/knex');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function getCurrentUser(req, res) {
  return req.user;
}

function createUser(req, res) {
  return handleErrors(req)
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(req.body.password, salt);
      return knex('users')
        .insert({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          email: req.body.email,
          password: hash,
        })
        .returning('*');
    })
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}


function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ status: 'Please log in' });
  return next();
}

function loginRedirect(req, res, next) {
  if (req.user) { return res.status(401).json({ status: 'You are already logged in' }); }
  return next();
}

function handleErrors(req) {
  return new Promise((resolve, reject) => {
    if (req.body.username.length < 3) {
      reject({
        message: 'Username must be at least 3 characters',
      });
    } else if (req.body.password.length < 6) {
      reject({
        message: 'Password must be longer than 5 characters',
      });
    } else {
      resolve();
    }
  });
}

module.exports = {
  comparePass,
  createUser,
  loginRequired,
  loginRedirect,
};
