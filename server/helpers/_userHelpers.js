const knex = require('../db/knex');

function getUserById(req, res) {
  return knex('users')
    .where('id', parseInt(req.params.id))
    .first()
    .returning('*')
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function getUsersByIds(req, res) {
  const userIds = req.query.friendIds;

  return knex('users')
    .whereIn('id', userIds)
    .returning('*')
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function searchUsers(req, res) {
  const targetUsername = req.params.username;

  return knex('users')
    .where('username', 'ilike', `%${targetUsername}%`)
    .returning('*')
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function patchUserById(req, res) {
  const userId = req.user.id;
  const email = req.body.email;
  const aboutMeUpdate = req.body.aboutMe;
  const profilePictureUpdate = req.body.profilePicture;

  return knex('users')
    .where('id', userId)
    .update({ email, aboutMe: aboutMeUpdate, profilePicture: profilePictureUpdate })
    .returning('*')
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function getScoresByUser(req, res) {
  //code!
}

module.exports = {
  getUserById,
  getUsersByIds,
  searchUsers,
  patchUserById,
};
