exports.up = (knex, Promise) => {
  return knex.schema.createTable('answers', (table) => {
    table.increments('id').unsigned().primary();
    table.bigInteger('questionId').unsigned().index().notNullable();
    table.string('answerText').notNullable();
    table.string('answerType').notNullable().defaultTo('multipleChoice');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('answers');
};
