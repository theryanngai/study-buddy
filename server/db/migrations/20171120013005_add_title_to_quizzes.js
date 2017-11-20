exports.up = function(knex, Promise) {
  return knex.schema.table('quizzes', function(t) {
    t.string('title').notNull().defaultTo('Untitled Quiz');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('quizzes', function(t) {
    t.dropColumn('title');
  });
};
