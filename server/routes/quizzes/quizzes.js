const express = require('express');

const quizRouter = express.Router();

const _authHelpers = require('../../auth/_helpers');
const _quizHelpers = require('../../helpers/_quizHelpers');
const _scoreHelpers = require('../../helpers/_scoreHelpers');
const questionRouter = require('./questions.js');

quizRouter.use('/:quizId/questions', questionRouter);

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

// Creates a new quiz
quizRouter.post('/create', _authHelpers.loginRequired, (req, res, next) => _quizHelpers.createQuiz(req, res)
  .then(
    response => res.send(response[0]),
    err => handleResponse(res, 500, 'error'),
  ));

// Creates a score for a quiz & user after a quiz is taken
quizRouter.post('/:quizId/score/create', _authHelpers.loginRequired, (req, res, next) => _scoreHelpers.createScore(req, res)
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

// Returns details for a quiz, specified by id
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
    },
    err => handleResponse(res, 500, 'error'),
  ));

module.exports = quizRouter;
