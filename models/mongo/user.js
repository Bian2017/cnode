const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  age: { type: Number }
})

const UserModel = mongoose.model('user', UserSchema)

/*
 * Model的操作权限不希望整个放出去，希望稍微封装一下，便于其他人进行调用
 */
async function createANewUser(params) {
  const user = new UserModel({ name: params.name, age: params.age })

  return await user.save().catch(e => {
    console.log(e)
    throw new Error(`error creating user ${JSON.stringify(params)}`)
  })
}

/**
 * 通常情况下都需要做分页的限制：
 * + 服务端资源是有限的，防止高并发情况；
 * + 避免占用太多带宽(数据多占用带宽)
 */
async function getUsers(params = { page: 0, pageSize: 10 }) {
  const flow = UserModel.find({})
  flow.skip(params.page * params.pageSize)
  flow.limit(params.pageSize)

  return await flow.catch(e => {
    console.log('e:', e)
    throw new Error('error getting user from db')
  })
}

async function getUserById(userId) {
  return await UserModel.findOne({ _id: userId }).catch(e => {
    console.log('e:', e)
    throw new Error(`error getting user by id: ${userId}`)
  })
}

async function updateUserById(userId, update) {
  // findOneAndUpdate: 原子性操作
  return await UserModel.findOneAndUpdate({ _id: userId }, update, { new: true }) // new: true 表示将更新后的文档返回出来
    .catch(e => {
      console.log('e:', e)
      throw new Error(`error updating user by id: ${userId}`)
    })
}

module.exports = {
  model: UserModel,
  createANewUser,
  getUsers,
  getUserById,
  updateUserById
}
