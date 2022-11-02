const Router = require('express')
const LoginisationRouter = new Router()
const loginisationController = require('../controller/loginisation.controller')

LoginisationRouter.post('/signup', loginisationController.signUp)
LoginisationRouter.get('/isexistaccount/:email', loginisationController.isExistAccount)
module.exports = LoginisationRouter