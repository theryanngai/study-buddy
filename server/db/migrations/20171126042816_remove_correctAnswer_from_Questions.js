exports.up = function (knex, Promise) {
  return knex.schema.table('questions', (t) => {
    t.dropColumn('correctAnswerId');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('questions', (t) => {
    t.bigInteger('correctAnswerId').unsigned().index().notNullable();
  });
};
