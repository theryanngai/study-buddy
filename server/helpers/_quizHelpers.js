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

function getQuizzesByCurrentUser(req, res) {
  const userId = req.user.id;
  return knex('quizzes')
    .where('userId', parseInt(userId))
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
    .orderBy('created_at')
    .returning('*')
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function getAnswersByQuestionId(req, res) {
  return knex('answers')
    .where('questionId', parseInt(req.params.questionId))
    .orderBy('created_at')
    .returning('*')
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

// Returns the 10 of the currently logged-in user's most recent scores for the provided quizId.
function getQuizScoresByUserId(req, res) {
  return knex('scores')
    .where('quizId', parseInt(req.params.quizId))
    .andWhere('userId', req.user.id)
    .orderBy('created_at')
    .limit(10)
    .returning('*')
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

// Returns all quizzes created by the provided userId, ordered by creation date.
function getQuizzesByUserId(req, res) {
  return knex('quizzes')
    .where('userId', parseInt(req.params.userId))
    .orderBy('created_at')
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
        userId: req.user.id,
        description: req.body.description,
        isPublic: req.body.isPublic,
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

function searchQuizzes(req, res) {
  const searchString = req.params.searchString;

  return knex('quizzes')
    .where('title', 'ilike', '%' + searchString + '%')
    .union(function () {
      this.select('*')
        .from('quizzes')
        .whereRaw("tags && '{" + searchString + "}'::text[]");
    })
    .andWhere('isPublic', true)
    .returning('*')
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
    } else if (!req.user.id) {
      reject({
        message: 'Logged in user was not found. A user must be provided to save this quiz',
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
  getQuizzesByCurrentUser,
  getQuizzesByUserId,
  searchQuizzes,
  getQuestionById,
  getQuestionsByQuizId,
  getAnswersByQuestionId,
  getQuizScoresByUserId,
};
