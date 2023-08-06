//função acionada ao clicar no botao adicionar produto no modal de confirmação

function adicionarProdutoNoCarrinho(id, nome, categoria, descricao, valor) {
  let quantidadeItens = parseInt(document.getElementById("numberItem").innerText);
  let nomeProd = document.getElementById("modalItem1Label").innerText;
  let listaItens = document.getElementById("listaItens");

  // Verificar se o item já existe na lista
  let itemJaExistente = false;
  let itensNaLista = listaItens.getElementsByClassName("restaurant-cart-item");

  for (let t = 0; t < itensNaLista.length; t++) {
    let itemA = itensNaLista[t];
    let nomeItem = itemA.querySelector("#descProdutoPedido").innerText;
    if (nomeItem === nomeProd) {
      // O item já existe na lista, atualize a quantidade e o valor
      let quantidadeSpan = itemA.querySelector("#qtdPedido");
      let valorSpan = itemA.querySelector("#valorTotalPedido");
      let valorItem = parseFloat(valor.replace("R$ ", "").replace(",", "."));
      let quantidadeExistente = parseInt(quantidadeSpan.innerText);

      if (quantidadeItens > quantidadeExistente) {
        // Incrementar quantidade
        let novaQuantidade = quantidadeExistente + quantidadeItens;
        let novoValor = novaQuantidade * valorItem;
        quantidadeSpan.innerText = novaQuantidade;
        valorSpan.innerText = "R$ " + novoValor.toFixed(2).replace(".", ",");
      } else if (quantidadeItens < quantidadeExistente) {
        // Decrementar quantidade
        let novaQuantidade = quantidadeExistente - quantidadeItens;
        let novoValor = novaQuantidade * valorItem;
        quantidadeSpan.innerText = novaQuantidade;
        valorSpan.innerText = "R$ " + novoValor.toFixed(2).replace(".", ",");
      }

      itemJaExistente = true;
      break;
    }
  }

  // Se o item não existe na lista, adicione um novo item
  if (!itemJaExistente) {
    let valorFinal = quantidadeItens * parseFloat(valor.replace("R$ ", "").replace(",", "."));
    let textHtml = `
    <div class="restaurant-cart-item sidebar-pedido-line">
        <div class="sidebar-pedido-item-description sidebar-pedido-justify">
            <span id="qtdPedido">${quantidadeItens}</span>
            <span id="descProdutoPedido">${nomeProd}</span> 
            <span id="valorTotalPedido">R$ ${valorFinal.toFixed(2).replace(".", ",")}</span>
        </div>
        <div class="sidebar-pedido-item-tags"></div>
        <div class="sidebar-pedido-item-buttons-wrapper">
            <button type="button"
                role="button"
                class="btn btn-link-edit btn-size-l sidebar-pedido-button-item-button"
                theme="link" variant="sidebar-pedido-button-item-button" label="Editar"
                data-test-id="restaurant-cart-item__edit-button" color="primary"
                data-bs-toggle="modal" data-bs-target="#modalItem1" 
                onclick="atualizarModalEChamarOutraFuncao(${id},'${nome}','${categoria}','${descricao}','${valor}')"
                id="${id}">Editar
            </button>
            <button type="button"
                role="button"
                class="btn btn-link-edit btn-gray btn-size-m sidebar-pedido-button-item-button"
                theme="link" color="gray" variant="sidebar-pedido-button-item-button"
                label="Remover" data-test-id="restaurant-cart-item__remove-button"
                target="" rel="" onclick="removerDiv(this)">
                <span class="btn-label">Remover</span>
            </button>
        </div>
    </div>`;
    listaItens.innerHTML += textHtml;

    // Salvar o último pedido no Local Storage
    const ultimoPedido = {
      id: id,
      nome: nome,
      categoria: categoria,
      descricao: descricao,
      valor: parseFloat(valor.replace("R$ ", "").replace(",", "."))
    };
    localStorage.setItem("ultimoPedido", JSON.stringify(ultimoPedido));

    //exibirModalUltimoPedido();

  }

  document.getElementById("numberItem").innerText = "1";
  calcularValorTotal();
  calcularQuantidadeTotal();
}

//ÚLTIMO PEDIDO



/*function exibirModalItemUltimoPedido() {
  const ultimoPedido = localStorage.getItem('ultimoPedido');
  if (ultimoPedido) {
      const { id, nome, categoria, descricao, valor } = JSON.parse(ultimoPedido);
      atualizarModal(id, nome, categoria, descricao, valor);
      $('#modalItem1').modal('show'); // Abre o modal do item
  }else{
    const modalBody = document.querySelector('#modalItem1 .modal-body');
    modalBody.innerHTML = '<p>Nenhum pedido registrado ainda.</p>';
    $('#modalItem1').modal('show'); // Abre o modal vazio com a mensagem
  }
  }
  
  function exibirModalItemUltimoPedido() {
    const ultimoPedido = localStorage.getItem('ultimoPedido');
    if (ultimoPedido) {
      const { id, nome, categoria, descricao, valor } = JSON.parse(ultimoPedido);
      atualizarModal(id, nome, categoria, descricao, valor);
      $('#modalItem1').modal('show'); // Abre o modal do item
    } else {
      // Caso não haja último pedido registrado, exibe a mensagem "Nenhum pedido registrado ainda."
      const modalBody = document.querySelector('#modalItem1 .modal-body');
      modalBody.innerHTML = '<p>Nenhum pedido registrado ainda.</p>';
      const modalTitle = document.querySelector('#modalItem1 .modal-title');
      modalTitle.textContent = 'Último Pedido';
      const modalFooter = document.querySelector('#modalItem1 .modal-footer');
      modalFooter.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
      `;
      $('#modalItem1').modal('show'); // Abre o modal vazio com a mensagem
    }
  }*/
  
  function exibirModalItemUltimoPedido() {
    const ultimoPedido = localStorage.getItem('ultimoPedido');
    if (ultimoPedido) {
      const { id, nome, categoria, descricao, valor } = JSON.parse(ultimoPedido);
      atualizarModal(id, nome, categoria, descricao, valor);
      $('#modalItem1').modal('show'); // Abre o modal do item
    } else {
      // Aguarda 500ms antes de exibir o alerta
      setTimeout(() => {
        alert('Não existe histórico de pedidos.');
      }, 100);
    }
  }


function atualizarModalEChamarOutraFuncao(
  id,
  nome,
  categoria,
  descricao,
  valor
) {
  atualizarModal(id, nome, categoria, descricao, valor);
  // mudarIdModal(id);
}

//função atualizar as informações do modalItem1 quando chamado
function atualizarModal(id, nome, categoria, descricao, valor) {
  let addDescricao = document.getElementById("descricao-produto");
  let titulo = document.getElementById("modalItem1Label");
  let valorProduto = document.getElementById("valorItem");
  let addItem = document.getElementById("addItem");
  let observacaoItem1 = document.getElementById("observacaoItem1");
  titulo.innerText = nome;
  addDescricao.innerText = descricao;
  valorProduto.innerText = "R$" + valor;
  let função = `adicionarProdutoNoCarrinho(${id},'${nome}','${categoria}','${descricao}','${valor}')`;

  addItem.setAttribute("onclick", função);

}

//remove item do "carrinho"
function removerDiv(button) {
  // Obtém o elemento pai do botão clicado, que é a div com a classe "restaurant-cart-item sidebar-pedido-line"
  let divItem = button.closest(".restaurant-cart-item");

  // Remove a div inteira do DOM
  divItem.remove();
  calcularValorTotal();
  calcularQuantidadeTotal();
}

function calcularValorTotal() {
  let listaItens = document.getElementById("listaItens");
  let itensNaLista = listaItens.getElementsByClassName("restaurant-cart-item");

  if (itensNaLista.length != null) {
    // Verifica se há algum item na lista
    let valorTotalCarrinho = document.getElementById("valorTotalCarrinho");
    let valorTotalCarrinhoBotao = document.getElementById(
      "valorTotalCarrinhoBotao"
    );
    let valorTotal = parseFloat(0);

    for (let i = 0; i < itensNaLista.length; i++) {
      let item = itensNaLista[i];
      let valorItem = item
        .getElementsByTagName("span")[2]
        .innerText.replace("R$ ", "")
        .replace(",", ".");
      valorTotal = parseFloat(valorTotal) + parseFloat(valorItem);
    }

    valorTotalCarrinho.innerText =
      "R$ " + valorTotal.toFixed(2).replace(".", ",");
    valorTotalCarrinhoBotao.innerText =
      "R$ " + valorTotal.toFixed(2).replace(".", ",");
  } else {
    // Caso não haja itens na lista, você pode fazer algo aqui, por exemplo:
    let valorTotalCarrinho = document.getElementById("valorTotalCarrinho");
    valorTotalCarrinho.innerText = "R$ 0,00";
    let valorTotalCarrinhoBotao = document.getElementById(
      "valorTotalCarrinhoBotao"
    );
    valorTotalCarrinhoBotao.innerText = "R$ 0,00";
  }
}

//calcula a quantidade toda de itens pedido e jogar no botão do carrinho
function calcularQuantidadeTotal() {
  let listaItens = document.getElementById("listaItens");
  let itensNaLista = listaItens.getElementsByClassName("restaurant-cart-item");
  let quantidadeTotalCarrinhoBotao = document.getElementById(
    "quantidadeTotalCarrinhoBotao"
  );
  let quantidadeTotal = parseInt(0);
  for (let k = 0; k < itensNaLista.length; k++) {
    let item = itensNaLista[k];
    let quantidadeDeItens = item.getElementsByTagName("span")[0].innerText;
    quantidadeTotal = parseInt(quantidadeDeItens) + parseInt(quantidadeTotal);
  }
  quantidadeTotalCarrinhoBotao.innerText = quantidadeTotal + " itens";
}

// Exemplo de uso:
//let total = calcularValorTotal();

//função de mudar quantidade de produtos no model confirmação
function alterarQtd(acao) {
  const valor = document.getElementById("valorItem").innerHTML;

  const qtd = document.getElementById("numberItem");
  const valorTotalAtualizado = fomatarValor(valor);

  if (acao == "-" && qtd.innerHTML == 1) {
  } else {
    acao == "+" ? qtd.innerHTML++ : qtd.innerHTML--;
    const valorTotal = qtd.innerHTML * valorTotalAtualizado;
  }
}

function somenteNumeros(n) {
  return n.replace(/\D/g, "");
}

function fomatarValor(n) {
  return n.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

function enviarPedidoParaCozinha() {
  //var socket = io('http://localhost:3001');
  var socket = io("http://138.36.206.61:3001");
  console.log('aqui')
  function renderMessage(messages) {
    console.log(messages)
  }

  socket.on("previousMessagens", function (messages) {
    for (var i = 0; i < messages.length; i++) {
      renderMessage(messages[i]);
    }console.log(messages)
  });

  socket.on("receivedMessage", function (message) {
    renderMessage(message);
    console.log(message)
  });

  document.getElementById('alerta').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne de enviar alguma mensagem quando clica no botão
    var mesa = localStorage.getItem('mesaSetada');
    var listaProdutos = document.querySelectorAll('#listaItens .sidebar-pedido-line'); // Use the DOM method to get the elements correctly
    var listaObjProduto = [];
    function addLista() {
        listaProdutos.forEach(function (item) {
            var nomeProduto = item.querySelector('span:nth-child(2)').textContent;
            var quantidadeProduto = item.querySelector('span:nth-child(1)').textContent;
            function generateNumericId() {
              const randomNumber = Math.random(); // Gera um número aleatório entre 0 e 1
              const numericId = Math.floor(randomNumber * 100); // Converte e arredonda para um número inteiro de até 6 dígitos
              return numericId;
            }
            const geradorId = generateNumericId()
            var produtoFormatado = {
                id: geradorId,
                nome: nomeProduto,
                quantidade: quantidadeProduto,
                status: 'solicitado'

            };
            listaObjProduto.push(produtoFormatado);
        });
        return listaObjProduto;
      }
      listaObjProduto = addLista();

      if (mesa) {
        
        var mensageObject = {
          mesa: mesa,
          produtos: listaObjProduto,
        };

          // Salvar o último pedido no Local Storage
          localStorage.setItem("ultimoPedido", JSON.stringify(mensageObject));

        socket.emit("sendMessage", mensageObject);
        renderMessage(mensageObject);
      }
    });
}

