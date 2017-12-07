exports.up = function (knex) {
  return knex.schema.table('users', (table) => {
    table.string('aboutMe').defaultTo('I love StudyBuddy!');
    table.string('profilePicture');
  });
};

exports.down = function (knex) {
  return knex.schema.table('quizzes', (table) => {
    table.dropColumn('aboutMe');
    table.dropColumn('profilePicture');
  });
};
