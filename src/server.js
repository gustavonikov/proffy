const path = require('path');
const express = require('express');

const server = express();
const pathHome = path.join(__dirname, '/pages/Home/index.html');
const pathStudy = path.join(__dirname, '/pages/Study/index.html');
const pathTeach = path.join(__dirname, 'pages/Teach/index.html');

server.use(express.static('public'))
    .get('/', (request, response) => response.sendFile(pathHome, 'Erro 404: Página não encontrada'))
    .get('/study', (request, response) => response.sendFile(pathStudy, 'Erro 404: Página não encontrada'))
    .get('/teach', (request, response) => response.sendFile(pathTeach, 'Erro 404: Página não encontrada'))
    .listen(5500);
