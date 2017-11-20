exports.up = (knex, Promise) => {
  return knex.schema.createTable('questions', (table) => {
    table.increments('id').unsigned().primary();
    table.bigInteger('quizId').unsigned().index().notNullable();
    table.bigInteger('correctAnswerId').unsigned().index().notNullable();
    table.string('questionText').notNullable();
    table.string('questionType').notNullable().defaultTo('multipleChoice');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('questions');
};
