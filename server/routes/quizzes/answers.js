const express = require('express');

const answersRouter = express.Router({ mergeParams: true });

const _authHelpers = require('../../auth/_helpers');
const _quizHelpers = require('../../helpers/_quizHelpers');

// GETs all answers for the quizId in the path.
answersRouter.get('', (req, res, next) => _quizHelpers.getAnswersByQuestionId(req, res)
  .then(response => res.json(response))
  .catch((err) => { handleResponse(res, 500, 'error'); }));


answersRouter.post('/create', _authHelpers.loginRedirect, (req, res, next) => _quizHelpers.createAnswers(req, res)
  .then((response) => {
  })
  .catch((err) => { handleResponse(res, 500, 'error'); }));

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = answersRouter;
