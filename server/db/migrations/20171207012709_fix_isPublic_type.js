exports.up = function (knex, Promise) {
  return knex.schema.table('quizzes', (t) => {
    t.dropColumn('isPublic');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('quizzes', (t) => {
    t.string('isPublic').notNull().defaultTo('true');
  });
};
