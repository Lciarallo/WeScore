const express = require('express')
const routerLogin = express.Router()
const loginController = require('../controllers/loginController')

routerLogin.get('/login',loginController.loginPage)
routerLogin.post('/login', loginController.autenticate);

//Rota para logout do sistema
routerLogin.get('/logout', function (req, res) {
    //apaga a sessão
    req.session.destroy()
    //redireciona para a página de login
    res.redirect('/login')
});

module.exports = routerLogin