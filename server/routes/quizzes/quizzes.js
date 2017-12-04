const express = require('express');

const quizRouter = express.Router();

const _authHelpers = require('../../auth/_helpers');
const _quizHelpers = require('../../helpers/_quizHelpers');
const questionRouter = require('./questions.js');

quizRouter.use('/:quizId/questions', questionRouter);

// uncomment and add in loginRedirect once session is being properly persisted
// quizRouter.post('/create', _authHelpers.loginRedirect, (req, res, next) => {
quizRouter.post('/create', _authHelpers.loginRequired, (req, res, next) => _quizHelpers.createQuiz(req, res)
  .then(
    response => res.send(response[0]),
    err => handleResponse(res, 500, 'error'),
  ));

// Returns all quizzes created by the current user (for Dashboard purposes)
quizRouter.get('/myQuizzes', _authHelpers.loginRequired, (req, res, next) => _quizHelpers.getQuizzesByCurrentUser(req, res)
  .then(
    (response) => {
      if (!response) return next(new Error("failed to find current user's created quizzes"));
      res.send(response);
      next();
    },
    err => handleResponse(res, 500, 'error'),
  ));

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

quizRouter.get('/:quizId', _authHelpers.loginRequired, (req, res, next) => _quizHelpers.getQuizById(req, res)
  .then(
    (response) => {
      if (!response) return next(new Error('failed to find quiz'));
      res.send(response);
      next();
    },
    err => handleResponse(res, 500, 'error'),
  ));

/*
  Returns all quizzes whose titles have matches for the provided searchString.
  Eventually need to extend this to respect tags, and probably add a more sophisticated
  search algorithm.
*/
quizRouter.get('/search/:searchString', _authHelpers.loginRequired, (req, res, next) => _quizHelpers.searchQuizzes(req, res)
  .then(
    (response) => {
      res.send(response);
      next();
    },
    err => handleResponse(res, 500, 'error'),
  ));

module.exports = quizRouter;
