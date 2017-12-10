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

function getFriendshipsByUserId(req, res) {
  const userId = req.params.id;
  return knex('friendships')
    .select('userid1 as friend')
    .where('userid2', parseInt(userId))
    .union(function () {
      this.select('userid2 as friend')
        .from('friendships')
        .where('userid1', parseInt(userId));
    })
    .returning('friend')
    .catch((err) => {
      res.status(400).json({ status: err.message });
    });
}

module.exports = {
  createFriendship,
  getFriendshipsByUserId,
};
