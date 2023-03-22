const Router = require('express')
const artifactsRouter = new Router()
const artifactsController = require('../controller/artifacts.controller')

artifactsRouter.get('/', artifactsController.getAllArtifactsIcons)
artifactsRouter.get('/:id',artifactsController.getSet)
module.exports = artifactsRouter