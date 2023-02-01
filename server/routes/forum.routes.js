const Router = require('express')
const forumRouter = new Router()
const forumController = require('../controller/forum.controller')

forumRouter.get('/messages', forumController.getMessages)

module.exports = forumRouter
