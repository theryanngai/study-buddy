const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('users').del()
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('johnson123', salt);
      return Promise.join(
        knex('users').insert({
          username: 'jeremy',
          firstname: 'jeremy',
          lastname: 'butt',
          email: 'jeremy@jeremy.com',
          password: hash,
        }));
    });
};
