let USER_ID_INIT = 10000
const users = []

class User {
  constructor(params) {
    if (!params.name || !params.age) throw new Error('Age and name is required when create a user')
    this.name = params.name
    this.age = params.age
    this._id = USER_ID_INIT++
  }
}

async function createANewUser(params) {
  const user = new User(params)
  users.push(user)
  return user
}

async function getUserList() {
  return users
}

async function getUserById(userId) {
  return users.find(u => u._id === userId)
}

module.exports = {
  model: User,
  createANewUser,
  getUserList,
  getUserById
}
