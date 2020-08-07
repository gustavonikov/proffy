const path = require('path');
const express = require('express');

const server = express();
const pathHome = path.join(__dirname, '/pages/Home/index.html');
const pathStudy = path.join(__dirname, '/pages/Study/index.html');
const pathTeach = path.join(__dirname, 'pages/Teach/index.html');

server.use(express.static('public'))
    .get('/', (request, response) => response.sendFile(pathHome, 'Não foi possível achar a página'))
    .get('/study', (request, response) => response.sendFile(pathStudy, 'Não foi possível achar a página'))
    .get('/teach', (request, response) => response.sendFile(pathTeach, 'Não foi possível achar a página'))
    .listen(5500);
