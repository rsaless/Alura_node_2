require('marko/node-require').install();                        // necessário para o marko trabalhar com o node
require('marko/express');                                       // necessário para o marko trabalhar com o express

const rotas = require('../app/rotas/rotas');                    // importa as rotas
const templates = require('../app/views/templates');            // importa os templates
const express = require('express');                             // importa o express
const app = express();                                          // ativa o express
const bodyParser = require('body-parser');                      // importa o body-parser, necessário para obter dados inseridos no form e enviados pelo post
const methodOverride = require('method-override');              // realiza sobrescrita de métodos HTTP
const sessaoAutenticacao = require('./sessao-autenticacao');    // importao o arquivo sessao-autenticacao

app.use('/estatico', express.static('src/app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

sessaoAutenticacao(app);
rotas(app);

app.use((req, res, next) => res.status(404).marko(templates.base.erro404));
app.use((erro, req, res, next) => res.status(500).marko(templates.base.erro500));

module.exports = app;

/* 
app.use('*', (req, res, next) => {
    //console.log('olá');
    next();
});
*/