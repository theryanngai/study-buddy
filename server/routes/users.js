const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');

router.get('/user', authHelpers.loginRequired, (req, res, next) =>  {
  handleResponse(res, 200, 'success');
});

router.get('/currentUser', authHelpers.loginRequired, (req, res, next) => {
  if (!req.user) return next(new Error('No current user found'));
  res.json(req.user);
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = router;
