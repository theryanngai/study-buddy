exports.up = (knex, Promise) => {
  return knex.raw('CREATE TABLE friendships (\n' +
    ' userId1 INT NOT NULL,\n' +
    ' userId2 INT NOT NULL,\n' +
    ' PRIMARY KEY (userId1, userId2),\n' +
    ' CHECK (userId1 < userId2)\n' +
    ');\n' +
    'CREATE INDEX friendship_userId2 ON friendships(userId2);');
};

exports.down = (knex, Promise) => knex.schema.dropTable('friendships');
