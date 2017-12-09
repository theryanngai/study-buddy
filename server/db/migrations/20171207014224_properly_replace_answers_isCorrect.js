exports.up = function(knex, Promise) {
  return knex.schema.table('answers', function(t) {
    t.boolean('isCorrect').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('answers', function(t) {
    t.dropColumn('isCorrect');
  });
};
