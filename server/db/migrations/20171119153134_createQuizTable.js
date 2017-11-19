exports.up = (knex, Promise) => {
  return knex.schema.createTable('quizzes', (table) => {
    table.increments('id').unsigned().primary();
    table.bigInteger('userId').unsigned().index().notNullable();
    table.string('description').defaultTo('Untitled Quiz');
    table.specificType('questions', 'jsonb[]');
    table.specificType('tags', 'jsonb[]');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('quizzes');
};
