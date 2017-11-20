exports.up = function (knex, Promise) {
  return knex.schema.table('quizzes', (t) => {
    t.dropColumn('questions');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('quizzes', (t) => {
    table.specificType('questions', 'jsonb[]');
  });
};
