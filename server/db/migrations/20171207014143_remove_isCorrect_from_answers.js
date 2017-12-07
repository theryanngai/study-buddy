exports.up = function (knex, Promise) {
  return knex.schema.table('answers', (t) => {
    t.dropColumn('isCorrect');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('quizzes', (t) => {
    t.boolean('isCorrect').notNullable();
  });
};
