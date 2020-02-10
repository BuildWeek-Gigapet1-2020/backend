const bcrypt = require('bcryptjs')

exports.seed = async function(knex) {
  const pw = await bcrypt.hash('test', 12)

  await knex('parents').insert([
    {
      parent_name: 'test1',
      username: 'test1',
      password: pw,
      email: 'test1@test.com'
    },
    {
      parent_name: 'test2',
      username: 'test2',
      password: pw,
      email: 'test2@test.com'
    },
    {
      parent_name: 'test3',
      username: 'test3',
      password: pw,
      email: 'test3@test.com'
    },
    {
      parent_name: 'test4',
      username: 'test4',
      password: pw,
      email: 'test4@test.com'
    },
    {
      parent_name: 'test5',
      username: 'test5',
      password: pw,
      email: 'test5@test.com'
    }
  ])
}
