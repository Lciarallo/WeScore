const express = require('express')
const routerPainelws = express.Router()
const painelwsController = require('../controllers/painelwsController')
const checkToken = require('../helpers/check-token')
const getUser = require('../helpers/getUser')



// Use o middleware para todas as rotas definidas abaixo
routerPainelws.use(checkToken);
routerPainelws.use(getUser);

routerPainelws.get('/', painelwsController.getALLDatas)
routerPainelws.get('/settings', painelwsController.pageSettings)
routerPainelws.get('/settings/profile', painelwsController.pageSettingsProfile)
routerPainelws.get('/settings/banners', painelwsController.pageSettingsBanner)

module.exports = routerPainelws