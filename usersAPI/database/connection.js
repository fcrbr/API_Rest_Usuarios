var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      port: 3307, // Defina o número da porta desejado
      user : 'root',
      password : '123456',
      database : 'usertest',

    }
  });

module.exports = knex