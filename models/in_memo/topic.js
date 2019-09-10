let TOPIC_ID_INIT = 10000
const topics = []

class Topic {
  constructor(params) {
    if (!params.creator) throw { code: -1, msg: 'A topic must be sent by a user' }
    if (!params.title) throw { code: -1, msg: 'A topic must contain a title' }
    if (params.content.leng < 5) throw { code: -1, msg: "A topic's content must be longer than 5 charaters." }
    this._id = TOPIC_ID_INIT++
    this.title = params.title
    this.content = params.content
    this.replyList = []
  }
}

async function createANewTopic(params) {
  const topic = new Topic(params)
  topics.push(topic)
  return topic
}

async function getTopics() {
  return topics
}

async function getTopicById(topicId) {
  return topics.find(u => u._id === topicId)
}

async function updateTopicById(topicId, update) {
  const topic = topics.find(u => u._id === topicId)

  if (update.title) topic.title = update.title
  if (update.content) topic.content = update.content
}

async function replyATopic(params) {
  const topic = topics.find(t => Number(params.topicId) === t._id)
  topic.replyList.push({
    creator: params.creator,
    content: params.content
  })
  return topic
}

// 看到23:00
module.exports = {
  model: Topic,
  createANewTopic,
  getTopics,
  getTopicById,
  updateTopicById,
  replyATopic
}
