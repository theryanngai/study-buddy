const express = require('express');

const router = express.Router();

const _authHelpers = require('../auth/_helpers');
const _friendshipHelpers = require('../helpers/_friendshipHelpers');

router.post('/create', _authHelpers.loginRequired, (req, res, next) => _friendshipHelpers.createFriendship(req, res)
  .then(
    response => res.send(response[0]),
    err => handleResponse(res, 500, 'error'),
  ));

router.get('/getFriendshipsByUserId/:id', _authHelpers.loginRequired, (req, res, next) => _friendshipHelpers.getFriendshipsByUserId(req, res)
  .then(
    (response) => {
      if (!response) return next(new Error("failed to find the user's friends"));
      res.send(response);
      next();
    },
    err => handleResponse(res, 500, 'error'),
  ));

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = router;
