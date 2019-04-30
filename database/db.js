const knex = require('knex')


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'djole',
      password : 'djole',
      database : 'smartass'
    }
  });

  module.exports = {db}


