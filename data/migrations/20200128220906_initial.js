exports.up = async function(knex) {
  await knex.schema.createTable('parents', tbl => {
    tbl.increments('id')
    tbl.string('parent_name', 128).notNullable()
    tbl
      .string('username', 128)
      .unique()
      .notNullable()
    tbl.string('password', 128).notNullable()
    tbl
      .string('email', 128)
      .unique()
      .notNullable()
  })
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('parents')
}
