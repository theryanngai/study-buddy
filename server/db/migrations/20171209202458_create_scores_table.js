exports.up = (knex, Promise) => {
  return knex.schema.createTable('scores', (table) => {
    table.increments('id').unsigned().primary();
    table.bigInteger('quizId').unsigned().index().notNullable();
    table.bigInteger('userId').unsigned().index().notNullable();
    table.decimal('score').notNullable();
    table.integer('correctCount').notNullable();
    table.integer('incorrectCount').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('scores');
};
