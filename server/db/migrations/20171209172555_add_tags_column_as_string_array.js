exports.up = function (knex, Promise) {
  return knex.schema.table('quizzes', (t) => {
    t.specificType('tags', 'text[]');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('quizzes', (t) => {
    t.dropColumn('tags');
  });
};
