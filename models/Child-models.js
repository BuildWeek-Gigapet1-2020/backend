const { Food, Monster, Child } = require('./Model')

async function findById(id) {
  const child_food = await Food.findBy({ child_id: id })
  const child = await Child.findBy({ id }).first()
  const monster = await Monster.findBy({ id: child.monster_id })
  return {
    child,
    child_food,
    monster
  }
}

module.exports = {
  findById
}
