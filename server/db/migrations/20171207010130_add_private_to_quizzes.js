exports.up = function(knex, Promise) {
  return knex.schema.table('quizzes', function(t) {
    t.string('isPublic').notNull().defaultTo('true');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('quizzes', function(t) {
    t.dropColumn('isPublic');
  });
};
