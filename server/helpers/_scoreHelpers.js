const knex = require('../db/knex');

function getScoresByUserId(req, res) {
  // code!
}

function createScore(req, res) {
  return handleScoreCreationErrors(req)
    .then(() => knex('scores')
      .insert({
        quizId: req.body.quizId,
        userId: req.body.userId,
        score: req.body.score,
        correctCount: req.body.correctCount,
        incorrectCount: req.body.incorrectCount,
      })
      .returning('*'))
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function handleScoreCreationErrors(req) {
  return new Promise((resolve, reject) => {
    if (!req.body.quizId) {
      reject({
        message: 'QuizId was not found. A quizId must be selected to save this score',
      });
    } else if (!req.body.userId) {
      reject({
        message: 'UserId was not found. A userId must be provided to save this score',
      });
    } else if (!new Number(req.body.score)) {
      reject({
        message: 'Calculated score not found. A score must be provided to save this score',
      });
    } else if (!new Number(req.body.correctCount)) {
      reject({
        message: 'Correct answer count not found. This must be provided to save this score',
      });
    }  else if (!new Number(req.body.incorrectCount)) {
      reject({
        message: 'Incorrect answer count not found. This must be provided to save this score',
      });
    } else {
      resolve();
    }
  });
}

module.exports = {
  createScore,
  getScoresByUserId,
};
