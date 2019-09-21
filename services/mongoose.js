const mongoose = require('mongoose')
const uri = 'mongodb://localhost/node_community'

// 实际上只是创建了一个Connection对象，能够操作数据库，但是不能操作具体的document
mongoose.connect(uri)

const db = mongoose.connection

db.once('open', function() {
  console.log('connected')
})

db.on('error', console.error.bind(console, 'connection error:'))
