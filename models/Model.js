const db = require('../data/db-config')

class Model {
  constructor(tableName) {
    this.tableName = tableName
  }
  find() {
    return db(this.tableName)
  }
  findBy(filter) {
    return db(this.tableName).where(filter)
  }
  add(newItem) {
    return db(this.tableName)
      .insert(newItem)
      .returning('*')
  }
  update(id, item) {
    return db(this.tableName)
      .where({ id })
      .update(item)
      .returning('*')
  }
  remove(id) {
    return db(this.tableName)
      .where({ id })
      .del()
  }
}

const Parent = new Model('parents')
const Child = new Model('child')
const Food = new Model('foods')
const Monster = new Model('monsters')

module.exports = { Parent, Child, Food, Monster }
