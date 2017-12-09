const knex = require('../db/knex');

function createFriendship(req, res) {
// @TODO: Need to handle the edge case where a user tries to add himself, or ID comparison breaks
  const currentUserId = req.user.id;
  const friendCandidateId = req.body.id;
  const isCurrentUserIdSmaller = currentUserId < friendCandidateId;
  const userId1 = isCurrentUserIdSmaller ? currentUserId : friendCandidateId;
  const userId2 = isCurrentUserIdSmaller ? friendCandidateId : currentUserId;

  return knex('friendships')
    .insert({
      userid1: userId1,
      userid2: userId2,
    })
    .returning('*')
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

function getFriendsByUserId(req, res) {

}

module.exports = {
  createFriendship,
  getFriendsByuserId,
};
