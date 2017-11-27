const express = require('express');

const answersRouter = express.Router({ mergeParams: true });

const _authHelpers = require('../../auth/_helpers');
const _quizHelpers = require('../../helpers/_quizHelpers');

// GETs all answers for the quizId in the request.
answersRouter.get('', (req, res, next) => _quizHelpers.getAnswersByQuestionId(req, res)
  .then(
    response => res.send(response),
    err => handleResponse(res, 500, 'error'),
  ));


answersRouter.post('/create', _authHelpers.loginRedirect, (req, res, next) => _quizHelpers.createAnswer(req, res)
  .then(
    response => res.send(response[0]),
    err => handleResponse(res, 500, 'error'),
  ));


function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = answersRouter;
