exports.up = function (knex, Promise) {
  return knex.schema.table('quizzes', (t) => {
    t.dropColumn('description');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('quizzes', (t) => {
    t.string('description').notNullable().defaultTo('Untitled Quiz');
  });
};
