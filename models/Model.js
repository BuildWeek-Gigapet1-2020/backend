const db = require('../data/db-config')

class Model {
  constructor(tableName) {
    this.tableName = tableName
  }
  find() {
    return db(this.tableName)
  }
  findBy(filter) {
    return db(this.tableName)
      .where(filter)
      .first()
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

class Children extends Model {
  constructor(tableName) {
    super(tableName)
    this.tableName = tableName
  }

  async findById(id) {
    const child_food = await Food.findBy({ child_id: id })
    const child = await Child.findBy({ id }).first()
    const monster = await Monster.findBy({ id: child.monster_id })
    return {
      child,
      child_food,
      monster
    }
  }
}

const Parent = new Model('parents')
const Child = new Children('child')
const Food = new Model('foods')
const Monster = new Model('monsters')

module.exports = { Parent, Child, Food, Monster }
