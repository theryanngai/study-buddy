const knex = require('../db/knex');

function getQuizById(req, res) {
  return knex('quizzes')
    .where('id', parseInt(req.params.quizId))
    .first()
    .returning('*')
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function getQuestionById(req, res) {
  return knex('questions')
    .where('id', parseInt(req.params.questionId))
    .returning('*')
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function getQuestionsByQuizId(req, res) {
  return knex('questions')
    .where('quizId', parseInt(req.params.quizId))
    .returning('*')
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function getAnswersByQuestionId(req, res) {
  return knex('answers')
    .where('questionId', parseInt(req.params.questionId))
    .returning('*')
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function createQuiz(req, res) {
  return handleQuizErrors(req)
    .then(() => knex('quizzes')
      .insert({
        title: req.body.title,
        tags: req.body.tags,
        userId: req.body.userId,
        description: req.body.description,
      })
      .returning('*'))
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function createQuestion(req, res) {
  return handleQuestionErrors(req)
    .then(() => knex('questions')
      .insert({
        quizId: req.body.quizId,
        questionText: req.body.questionText,
        questionType: req.body.questionType,
      })
      .returning('*'))
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function createAnswer(req, res) {
  return handleAnswerErrors(req)
    .then(() => knex('answers')
      .insert({
        questionId: req.body.questionId,
        answerText: req.body.answerText,
        answerType: req.body.answerType,
        isCorrect: req.body.isCorrect,
      })
      .returning('*'))
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function handleQuizErrors(req) {
  return new Promise((resolve, reject) => {
    if (!req.body.title) {
      reject({
        message: 'Title was not found. A title must be selected to save this quiz',
      });
    } else if (!req.body.userId) {
      reject({
        message: 'User was not found. A user must be provided to save this quiz',
      });
    } else {
      resolve();
    }
  });
}

function handleQuestionErrors(req) {
  return new Promise((resolve, reject) => {
    if (!req.body.quizId) {
      reject({
        message: 'Parent quiz id not found -- must not be null.',
      });
    } else if (!req.body.questionText) {
      reject({
        message: 'Question Text not found -- must not be null.',
      });
    } else if (!req.body.questionType) {
      reject({
        message: 'Question Type not found -- must not be null.',
      });
    } else {
      resolve();
    }
  });
}

function handleAnswerErrors(req) {
  return new Promise((resolve, reject) => {
    if (!req.body.questionId) {
      reject({
        message: 'Parent question id not found -- must not be null.',
      });
    } else if (!req.body.answerText) {
      reject({
        message: 'Answer Text not found -- must not be null.',
      });
    } else {
      resolve();
    }
  });
}

module.exports = {
  createAnswer,
  createQuiz,
  createQuestion,
  getQuizById,
  getQuestionById,
  getQuestionsByQuizId,
  getAnswersByQuestionId,
};
