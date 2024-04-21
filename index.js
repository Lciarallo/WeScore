const exphbs = require("express-handlebars")
const handlebars = require('handlebars');
const helpers = require('handlebars-helpers')();
const bodyParser = require('body-parser');
const express = require("express")
const dotenv  = require('dotenv')
dotenv.config()
const path = require("path")
const app = express()
const port = 3002
//Import routes
const routesLogin = require("./src/routes/loginRoutes")
const routesHome = require("./src/routes/homeRoutes")
const routesPainelws = require("./src/routes/painelwsRoutes")
const routesCampeonato = require('./src/routes/campeonatoRoutes')
const routesPartida = require("./src/routes/partidaRoutes")
// Lê as configurações do .env 
// todos os helpers fornecidos por handlebars-helpers:
const { eq } = handlebars.helpers;

// Adicione o helper ao Handlebars
handlebars.registerHelper('eq', eq);
// Definindo uma função para que o handlebars possa formatar a data corretamente para o usuário final
const hbs = exphbs.create({
    helpers: {
        formatDate: function (dateTimeString) {
            const date = new Date(dateTimeString); //Converte a string em data
    
            // Defina o fuso horário para UTC
            date.setUTCHours(0, 0, 0, 0);
    
            const year = date.getUTCFullYear(); // Pega o ano em UTC
            const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Pega o mês em UTC (+1 porque inicia do zero)
            const day = String(date.getUTCDate()).padStart(2, '0'); // Pega o dia em UTC
    
            return `${day}/${month}/${year}` //devolve formatado
        }
    }
})
// Configuração do Handlebars como engine de renderização
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Configuração do diretório das views(devido a ter a pasta SRC)
app.set('views', path.join(__dirname, 'src','views'));
// Configurar o middleware bodyParser.urlencoded() para "form url encoded"
app.use(bodyParser.urlencoded({ extended: true }));
// Configuração de arquivos estáticos (CSS, JS, imagens)
app.use(express.static('public'))

/* CONFIGURAÇÕES DA SESSÃO DO USUÁRIO */
// Importa o módulo 'express-session'.
const session = require('express-session');
const partidaRoutes = require("../WeScore-API/src/routes/partidaRoutes");

// Importa o módulo 'FileStore' que será usado para armazenar as sessões em arquivos no sistema de arquivos do servidor.
const FileStore = require('session-file-store')(session);

// Configuração do middleware 'express-session'.
app.use(
  session({
    // Define o nome do cookie de sessão.
    name: 'session',

    // Define uma chave secreta para assinar o cookie de sessão.
    secret: process.env.SECRET,

    // Impede que a sessão seja regravada no servidor a cada solicitação.
    resave: false,

    // Impede que sessões não inicializadas sejam salvas no servidor.
    saveUninitialized: false,

    // Configura o local onde as sessões serão armazenadas no sistema de arquivos do servidor.
    store: new FileStore({
      // Uma função de log vazia que define o caminho para o diretório onde as sessões serão armazenadas.
      logFn: function () { },
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),

    // Configurações do cookie de sessão.
    cookie: {
      // Define se o cookie deve ser seguro (true em produção / geralmente para https).
      secure: false,

      // Define o tempo de vida máximo do cookie em milissegundos (1 hora neste exemplo).
      maxAge: 7200000,

      // Define a data de expiração do cookie (1 hora a partir do momento atual).
      expires: new Date(Date.now() + 7200000),

      // Impede que o cookie de sessão seja acessado por JavaScript no navegador (para segurança).
      httpOnly: true,
    },
  })
)
/* FIM DAS CONFIGURAÇÕES DA SESSÃO DO USUÁRIO */

// Configuração das rotas
app.use('/',routesHome)
app.use('/',routesLogin)
app.use('/painelws', routesPainelws)
app.use('/painelws/campeonato', routesCampeonato)
app.use('/painelws/partida', routesPartida)

//GET route for notes page
app.get('/contato', function(req,res){
    res.render('contato')
})
// 404 route
app.use(function(req,res){
  res.render('404')
})

app.listen(port, ()=>{
    console.log(`Servidor rodando: http://localhost:${port}`)
})