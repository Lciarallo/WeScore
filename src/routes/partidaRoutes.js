const express = require('express')
const partidaRouter = express.Router()
const partidaController = require('../controllers/partidaController')

partidaRouter.get('/:partida', partidaController.getPartidaCampeonatoById)

module.exports = partidaRouter