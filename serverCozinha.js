const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Define em qual pasta o usuário consegue 'acessar'
app.use(express.static(path.join(__dirname, '')));

// Define onde ficam os views
app.set('views', path.join(__dirname, ''));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Define o arquivo que ele vai enxergar
app.get('/', (req, res) => {
    res.render('index');
});
const messages = [];
io.on('connection', socket => {
    socket.on('iniciarPedido', mesa => {
        // Procura o item pelo número da mesa
        const index = messages.findIndex(item => item.mesa === mesa);
        if (index !== -1) {
            // Atualiza o status dos produtos para "iniciado"
            messages[index].produtos.forEach(produto => {
                produto.status = 'Iniciado';
            });
    
            // Envia o array atualizado para todos os clientes conectados
            io.emit('itemsArray', messages);
        }
    });
    socket.on('cancelarPedido', mesa => {
        // Procura o item pelo número da mesa
        const index = messages.findIndex(item => item.mesa === mesa);
        if (index !== -1) {
            // Atualiza o status dos produtos para "iniciado"
            messages[index].produtos.forEach(produto => {
                produto.status = 'Cancelado';
            });
    
            // Envia o array atualizado para todos os clientes conectados
            io.emit('itemsArray', messages);
        }
    });

    socket.on('concluirPedido', mesa => {
        // Procura o item pelo número da mesa
        const index = messages.findIndex(item => item.mesa === mesa);
        if (index !== -1) {
            // Remove o item do array
            messages.splice(index, 1);
            // Envia o array atualizado para todos os clientes conectados
            io.emit('itemsArray', messages);
        }
    });
    console.log(`Socket conectado: ${socket.id}`);
    //envia o historico de mensagem apenas para o novo conectado
    socket.emit('previousMessagens', messages);
    //          aqui o nome do evento que pega no html
    socket.on('sendMessage', data => {
        messages.push(data);
        console.log(data);
    })
    socket.broadcast.emit('itemsArray', messages);

});

// Executa o servidor na porta 3001
server.listen(3001, () => {
    console.log('Servidor está conectado.');
});
