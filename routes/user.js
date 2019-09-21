const express = require('express')
const router = express.Router()
const User = require('../models/mongo/user')

/**
 * RESTFUL风格
 *
 * '/user': 返回userList
 */
router
  .route('/')
  .get((req, res, next) => {
    ;(async () => {
      let users = await User.getUsers()
      return {
        code: 0,
        users
      }
    })()
      .then(r => {
        res.json(r)
      })
      .catch(e => {
        next(e)
      })
  })
  .post((req, res, next) => {
    ;(async () => {
      let user = await User.createANewUser({
        name: req.body.name,
        age: req.body.age
      })
      return {
        code: 0,
        user
      }
    })()
      .then(r => {
        res.json(r)
      })
      .catch(e => {
        next(e)
      })
  })

/**
 * RESTFUL风格
 *
 * '/user/lilei': 返回具体用户
 */
router
  .route('/:id')
  .get((req, res, next) => {
    ;(async () => {
      let user = await User.getUserById(Number(req.params.id))
      return {
        code: 0,
        user
      }
    })()
      .then(r => {
        res.json(r)
      })
      .catch(e => {
        next(e)
      })
  })
  .patch((req, res) => {
    ;(async () => {
      let user = await User.updateUserById(Number(req.params.id), {
        name: req.body.name,
        age: req.body.age
      })
      return {
        code: 0,
        user
      }
    })()
      .then(r => {
        res.json(r)
      })
      .catch(e => {
        next(e)
      })
  })

module.exports = router
