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
  res.header("Access-Control-Allow-Origin", "*"); // Pode especificar domínios permitidos em vez de '*'
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const messages = [];
let itemm;
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
      if (itemm && Array.isArray(itemm)) {
        for (const item of itemm) {
          const index = item.produtos.findIndex((produto) => produto.id === idPedido);
          if (index !== -1) {
            item.produtos[index].status = "Iniciado";
            axios.put(
              `https://64ce61410c01d81da3eec287.mockapi.io/ravin/ravin/${item.id}`,
              item
            )
            .then((response) => {
              console.log("Item atualizado na API:", response.data);
            })
            .catch((error) => {
              console.error("Erro ao atualizar item na API:", error);
            });
            io.emit("itemsArray", itemm);
            break; // Encerra o loop assim que encontrar e atualizar o item
          }
        }
      } else {
        console.log("Dados inválidos ou array de produtos não encontrado");
      }
    });
    socket.on("cancelarPedido", (idPedido) => {
      if (itemm && Array.isArray(itemm)) {
        for (const item of itemm) {
          const index = item.produtos.findIndex((produto) => produto.id === idPedido);
          if (index !== -1) {
            item.produtos[index].status = "Cancelado";
            axios.put(
              `https://64ce61410c01d81da3eec287.mockapi.io/ravin/ravin/${item.id}`,
              item
            )
            .then((response) => {
              console.log("Item atualizado na API:", response.data);
            })
            .catch((error) => {
              console.error("Erro ao atualizar item na API:", error);
            });
            io.emit("itemsArray", itemm);
            break; // Encerra o loop assim que encontrar e atualizar o item
          }
        }
      } else {
        console.log("Dados inválidos ou array de produtos não encontrado");
      }
    });
    socket.on("concluirPedido", (idPedido) => {
      if (itemm && Array.isArray(itemm)) {
        for (const item of itemm) {
          const index = item.produtos.findIndex((produto) => produto.id === idPedido);
          if (index !== -1) {
            item.produtos[index].status = "Concluido";
            axios.put(
              `https://64ce61410c01d81da3eec287.mockapi.io/ravin/ravin/${item.id}`,
              item
            )
            .then((response) => {
              console.log("Item atualizado na API:", response.data);
            })
            .catch((error) => {
              console.error("Erro ao atualizar item na API:", error);
            });
            io.emit("itemsArray", itemm);
            break; // Encerra o loop assim que encontrar e atualizar o item
          }
        }
      } else {
        console.log("Dados inválidos ou array de produtos não encontrado");
      }
    });


  console.log(`Socket conectado: ${socket.id}`);
  //envia o historico de mensagem apenas para o novo conectado
  socket.emit("previousMessagens", itemm);

  //          aqui o nome do evento que pega no html
  socket.on("sendMessage", (data) => {
    messages.push(data);
    console.log(data);
    axios.post("https://64ce61410c01d81da3eec287.mockapi.io/ravin/ravin", data);
  });
  socket.broadcast.emit("itemsArray", itemm);
});

// Executa o servidor na porta 3001
server.listen(3001, () => {
  console.log("Servidor está conectado.");
});
