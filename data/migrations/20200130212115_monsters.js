exports.up = async function(knex) {
  await knex.schema.createTable('monsters', tbl => {
    tbl.increments('id')
    tbl
      .string('name')
      .notNullable()
      .unique()
  })
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('monsters')
}
