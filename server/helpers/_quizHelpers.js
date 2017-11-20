const knex = require('../db/knex');

function createQuiz(req, res) {
  return handleErrors(req)
    .then(() => {
      return knex('quizzes')
        .insert({
          title: req.body.title,
          tags: req.body.tags,
          userId: req.body.userId,
          description: req.body.description,
        })
        .returning('*');
    })
    .catch((err) => {
      res.status(400).json({status: err.message});
    });
}

function handleErrors(req) {
  return new Promise((resolve, reject) => {
    if (!req.body.title) {
      reject({
        message: 'Title was not found. A title must be selected to save this quiz',
      });
    }
    else if (!req.body.userId) {
      reject({
        message: 'User was not found. A user must be provided to save this quiz',
      });
    } else {
      resolve();
    }
  });
}

module.exports = {
  createQuiz,
};
