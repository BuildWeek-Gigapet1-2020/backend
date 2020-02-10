exports.seed = async function(knex) {
  await knex('child').insert([
    { name: 'Bob', monster_id: '1', parent_id: '1' },
    { name: 'Larry', monster_id: '1', parent_id: '1' },
    { name: 'Sally', monster_id: '2', parent_id: '2' },
    { name: 'Tina', monster_id: '3', parent_id: '3' },
    { name: 'Howard', monster_id: '4', parent_id: '3' }
  ])
}
