const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const axios = require("axios"); // Importar a biblioteca Axios (se estiver usando Node.js)



// Fazer uma solicitação GET

// Define em qual pasta o usuário consegue 'acessar'
app.use(express.static(path.join(__dirname, "../../../../")));

// Define onde ficam os views
app.set("views", path.join(__dirname, ""));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// Define o arquivo que ele vai enxergar
app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.render("index");
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://138.36.206.61:5500/'); // Pode especificar domínios permitidos em vez de '*'
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const messages = [];
let itemm ;
io.on("connection", (socket) => {
  axios
  .get("https://64ce61410c01d81da3eec287.mockapi.io/ravin/ravin")
  .then((response) => {
    itemm = response.data;
    socket.emit("itemsArray", itemm);
  })
  .catch((error) => {
    console.error("Erro na solicitação:", error);
  });
 
  socket.on("iniciarPedido", (idPedido) => {
    // Procura o item pelo número da mesa
    const index = itemm.findIndex((item) => item.id === idPedido);
    if (index !== -1) {
      // Atualiza o status dos produtos para "iniciado"
      itemm[index].produtos.forEach((produto) => {
        produto.status = "Iniciado";
      });

      // Envia o array atualizado para todos os clientes conectados
      io.emit("itemsArray", itemm);
    }
  });
  socket.on("cancelarPedido", (idPedido) => {
    // Procura o item pelo número da mesa
    const index = itemm.findIndex((item) => item.id === idPedido);
    if (index !== -1) {
      // Atualiza o status dos produtos para "iniciado"
      itemm[index].produtos.forEach((produto) => {
        produto.status = "Cancelado";
      });

      // Envia o array atualizado para todos os clientes conectados
      io.emit("itemsArray", itemm);
    }
  });
  socket.on("concluirPedido", (idPedido) => {
    // Procura o item pelo número da mesa
    const index = itemm.findIndex((item) => item.id === idPedido);
    if (index !== -1) {
      // Atualiza o status dos produtos para "iniciado"
      itemm[index].produtos.forEach((produto) => {
        produto.status = "Pronto";
      });

      // Envia o array atualizado para todos os clientes conectados
      io.emit("itemsArray", itemm);
    }
  });

  /*Função de retirar o pedido da array
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
        */
  console.log(`Socket conectado: ${socket.id}`);
  //envia o historico de mensagem apenas para o novo conectado
  socket.emit("previousMessagens", itemm);

  //          aqui o nome do evento que pega no html
  socket.on("sendMessage", (data) => {
    messages.push(data);
    console.log(data);
    console.log(itemm);
    axios.post("https://64ce61410c01d81da3eec287.mockapi.io/ravin/ravin", data);
  });
  socket.broadcast.emit("itemsArray", itemm);
});

// Executa o servidor na porta 3001
server.listen(3001, () => {
  console.log("Servidor está conectado.");
});
