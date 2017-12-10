exports.up = function(knex, Promise) {
  return knex.schema.table('quizzes', (t) => {
    t.dropColumn('tags');
  });
};

exports.down = function(knex, Promise) {
  table.specificType('tags', 'jsonb[]');
};
