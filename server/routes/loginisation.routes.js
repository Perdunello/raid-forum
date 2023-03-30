const Router = require('express')
const loginisationRouter = new Router()
const loginisationController = require('../controller/loginisation.controller')

loginisationRouter.post('/signup', loginisationController.signUp)
loginisationRouter.get('/isExistAccount/:email', loginisationController.isExistAccount)
loginisationRouter.get('/login/:email&:password', loginisationController.login)
loginisationRouter.post('/avatarUpload/:userId', loginisationController.avatarUpload)
loginisationRouter.get('/getAvatar/:userId', loginisationController.getAvatar)
module.exports = loginisationRouter