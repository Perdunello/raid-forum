const Router = require('express')
const heroesRouter = new Router()
const heroesController = require('../controller/heroes.controller')

heroesRouter.get('/allChampionsAvatars', heroesController.getAllChampionsAvatars)
heroesRouter.get('/champion/:id', heroesController.getAllChampionData)
// router.get('/champions/:id', heroesImagesController.getChampion)
heroesRouter.get('/skills/:id',heroesController.getSkills)
module.exports = heroesRouter