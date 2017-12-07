exports.up = function(knex, Promise) {
  return knex.schema.table('quizzes', function(t) {
    t.boolean('isPublic').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('quizzes', function(t) {
    t.dropColumn('isPublic');
  });
};
