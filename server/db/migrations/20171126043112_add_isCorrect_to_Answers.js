exports.up = function (knex, Promise) {
  return knex.schema.table('answers', (t) => {
    t.boolean('isCorrect').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('quizzes', (t) => {
    t.dropColumn('isCorrect');
  });
};
