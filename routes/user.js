const express = require('express')
const router = express.Router()

/**
 * RESTFUL风格
 *
 * '/user': 返回userList
 */
router
  .route('/')
  .get((req, res, next) => {
    res.send('trying to get user list')
  })
  .post((req, res) => {
    res.send('trying to create a user')
  })

/**
 * RESTFUL风格
 *
 * '/user/lilei': 返回具体用户
 */
router
  .route('/:id')
  .get((req, res, next) => {
    res.send('trying to get a user')
  })
  .patch((req, res) => {
    res.send('trying to modify a user')
  })

module.exports = router
