const express = require('express');
const router = express.Router();

const _authHelpers = require('../auth/_helpers');
const _quizHelpers = require('../helpers/_quizHelpers');

// uncomment and add in loginRedirect once session is being properly persisted
// router.post('/create', _authHelpers.loginRedirect, (req, res, next) => {
router.post('/create', (req, res, next) => {
  return _quizHelpers.createQuiz(req, res)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => { handleResponse(res, 500, 'error'); });
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = router;
