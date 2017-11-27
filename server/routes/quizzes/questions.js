const express = require('express');

const questionsRouter = express.Router({ mergeParams: true });

const _authHelpers = require('../../auth/_helpers');
const _quizHelpers = require('../../helpers/_quizHelpers');
const answersRouter = require('./answers.js');

questionsRouter.use('/:questionId/answers', answersRouter);

questionsRouter.get('', (req, res, next) => _quizHelpers.getQuestionsByQuizId(req, res)
  .then(
    response => res.send(response),
    err => handleResponse(res, 500, 'error'),
  ));


questionsRouter.get('/:questionId', (req, res, next) => _quizHelpers.getQuestionById(req, res)
  .then(response => res.json(response))
  .catch((err) => { handleResponse(res, 500, 'error'); }));


// questionsRouter.post('/create', _authHelpers.loginRedirect, (req, res, next) => _quizHelpers.createQuestion(req, res)
questionsRouter.post('/create', (req, res, next) => _quizHelpers.createQuestion(req, res)
  .then(
    response => res.send(response[0]),
    err => handleResponse(res, 500, 'error'),
  ));

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = questionsRouter;
