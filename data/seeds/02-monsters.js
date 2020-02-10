exports.seed = async function(knex) {
  await knex('monsters').insert([
    { name: 'monster-orange' },
    { name: 'monster-red' },
    { name: 'monster-green' },
    { name: 'monster-purple' }
  ])
}
