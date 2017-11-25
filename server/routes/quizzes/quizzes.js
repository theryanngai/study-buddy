const express = require('express');

const quizRouter = express.Router();

const _authHelpers = require('../../auth/_helpers');
const _quizHelpers = require('../../helpers/_quizHelpers');
const questionRouter = require('./questions.js');

quizRouter.use('/:id/questions', questionRouter);

// uncomment and add in loginRedirect once session is being properly persisted
// quizRouter.post('/create', _authHelpers.loginRedirect, (req, res, next) => {
quizRouter.post('/create', (req, res, next) => _quizHelpers.createQuiz(req, res)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => { handleResponse(res, 500, 'error'); }));

quizRouter.get('/:id', (req, res, next) => _quizHelpers.getQuizById(req, res)
  .then((response) => {
    return res.json(response);
  })
  .catch((err) => { handleResponse(res, 500, 'error'); }));

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = quizRouter;
