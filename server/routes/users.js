const express = require('express');

const router = express.Router();

const _authHelpers = require('../auth/_helpers');
const _userHelpers = require('../helpers/_userHelpers');

router.get('/loginCheck', _authHelpers.loginRequired, (req, res, next) => {
  handleResponse(res, 200, 'success');
});

router.get('/user/:id', _authHelpers.loginRequired, (req, res, next) => _userHelpers.getUserById(req, res)
  .then(
    response => res.send(response),
    err => handleResponse(res, 500, 'error'),
  ));

router.get('/user-search/:username', _authHelpers.loginRequired, (req, res, next) => _userHelpers.searchUsers(req, res)
  .then(
    response => res.send(response),
    err => handleResponse(res, 500, 'error'),
  ));

router.get('/currentUser', _authHelpers.loginRequired, (req, res, next) => {
  if (!req.user) return next(new Error('No current user found'));
  res.json(req.user);
});

router.patch('/user/:id', _authHelpers.loginRequired, (req, res, next) => _userHelpers.patchUserById(req, res)
  .then(
    response => res.send(response[0]),
    err => handleResponse(res, 500, 'error'),
  ));

router.post('/createFriendship', _authHelpers.loginRequired, (req, res, next) => _userHelpers.addFriend(req, res)
  .then(
    response => res.send(response[0]),
    err => handleResponse(res, 500, 'error'),
  ));


function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = router;
