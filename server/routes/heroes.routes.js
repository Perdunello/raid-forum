const Router = require('express')
const heroesRouter = new Router()
const heroesController = require('../controller/heroes.controller')

heroesRouter.get('/allChampionsAvatars', heroesController.getAllChampionsAvatars)
heroesRouter.get('/:id', heroesController.getAllChampionData)
heroesRouter.get('/skills/:id', heroesController.getSkills)

module.exports = heroesRouter