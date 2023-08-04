const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Define em qual pasta o usuário consegue 'acessar'
app.use(express.static(path.join(__dirname, 'src/app/components/cozinha')));

// Define onde ficam os views
app.set('views', path.join(__dirname, 'src/app/components/cozinha'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Define o arquivo que ele vai enxergar
app.get('/', (req, res) => {
    res.render('index');
});
let messages = [];
io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);
    //envia o historico de mensagem apenas para o novo conectado
    socket.broadcast.emit('previousMessagens', messages);
    //          aqui o nome do evento que pega no html
    
    socket.on('sendMessage', data =>{
        messages.push(data);
        //envia a mensagem para todos os conectados
        socket.broadcast.emit('receivedMessage', data);
    }) 
    
});

// Escuta a porta 3000 para o servidor
server.listen(3000, () => {
    console.log('Servidor está conectado.');
});
