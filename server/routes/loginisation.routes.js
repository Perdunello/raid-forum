const Router = require('express')
const loginisationRouter = new Router()
const loginisationController = require('../controller/loginisation.controller')

loginisationRouter.post('/signup', loginisationController.signUp)
loginisationRouter.get('/isexistaccount/:email', loginisationController.isExistAccount)
loginisationRouter.get('/login/:email&:password', loginisationController.login)
module.exports = loginisationRouter