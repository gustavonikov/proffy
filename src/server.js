const express = require('express');
const nunjucks = require('nunjucks');
const { getHome, getStudy, getTeach, postTeach } = require('./pages/pagesFunctions');

const server = express();

// configurar nunjucks
nunjucks.configure('src/pages', { express: server, noCache: true });

server
    // receber os dados do req.body
    .use(express.urlencoded({ extended: true }))
    // configurar arquivos estáticos(css,scripts,imagens)
    .use(express.static('public'))
    // rotas (pages) da aplicação
    .get('/', getHome())
    .get('/study', getStudy())
    .get('/teach', getTeach())
    .post('/save-teacher-register', postTeach())
    .listen(5500, () => console.log('Server running on PORT 5500'));
