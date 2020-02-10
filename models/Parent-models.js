const db = require('../data/db-config')

// Find
function find() {
  return db('parents').select('id', 'username', 'email')
}

// Findby
function findBy(filter) {
  return db('parents')
    .where(filter)
    .first()
}

// findById
function findById(id) {
  return db('parents')
    .where({ id })
    .select('parent_name', 'username', 'email')
}

// add
function add(user) {
  return db('parents')
    .insert(user)
    .returning('*')
}

// update
function update(id, user) {
  return db('parents')
    .where({ id })
    .update(user)
    .returning('*')
}

// remove
function remove(id) {
  return findBy({ id }).del()
}

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove
}
