//função acionada ao clicar no botao adicionar produto no modal de confirmação
function adicionarProdutoNoCarrinho(id, nome, categoria, descricao, valor) {

    let valorItem = document.getElementById("valorItem").textContent.replace("R$ ", "").replace(",", ".");
    let numberItem = document.getElementById("numberItem").innerText;
    let nomeProd = document.getElementById("modalItem1Label").innerText;
    let listaItens = document.getElementById("listaItens");
    let quantidadeItens = parseInt(numberItem);
    let valorFinal = (parseFloat(quantidadeItens) * parseFloat(valorItem.substring(2)));
    let idT = id;

    // Verificar se o item já existe na lista
    let itemJaExistente = false;
    let itensNaLista = listaItens.getElementsByClassName('restaurant-cart-item');

    for (let t = 0; t < itensNaLista.length; t++) {
        let itemA = itensNaLista[t];
        let nomeItem = itemA.getElementsByTagName('span')[1].innerText;

        if (nomeItem === nomeProd) {
            // O item já existe na lista, atualize a quantidade e o valor
            let quantidadeSpan = itemA.getElementsByTagName('span')[0];
            let setarOValor = itemA.getElementsByTagName('span')[2];
            let valorSpan = itemA.getElementsByTagName('span')[2].innerText.replace("R$ ", "").replace(",", ".");
            let quantidadeExistente = parseInt(quantidadeSpan.innerText);
            let novaQuantidade = (quantidadeExistente + (quantidadeItens - quantidadeExistente));
            let novoValor = (novaQuantidade * parseFloat(valorItem.substring(2)));
            quantidadeSpan.innerText = novaQuantidade;
            setarOValor.innerText = 'R$ ' + novoValor.toFixed(2).replace(".", ",");
            itemJaExistente = true

            listaStorage.push(localStorage.getItem('produto',))
            break;
        }
    }
    // Se o item não existe na lista, adicione um novo item
    if (itemJaExistente === false) {
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

    }

    document.getElementById('numberItem').innerText = '1';

    calcularValorTotal();
    calcularQuantidadeTotal();
}

function atualizarModalEChamarOutraFuncao(id, nome, categoria, descricao, valor) {
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
    valorProduto.innerText = 'R$' + valor;
    let função = `adicionarProdutoNoCarrinho(${id},'${nome}','${categoria}','${descricao}','${valor}')`;
    //let função = `adicionarProdutoNoCarrinho(${JSON.stringify(id,nome,categoria,descricao,valor)})`;
    addItem.setAttribute('onclick', função);

}

function salvarUltimoPedido(pedido) {
    localStorage.setItem("lastOrder", JSON.stringify(pedido));
}


function salvarProdutoCarrinho(pedido) {


    listaItens.push(addStorage())

}




//remove item do "carrinho"
function removerDiv(button) {
    // Obtém o elemento pai do botão clicado, que é a div com a classe "restaurant-cart-item sidebar-pedido-line"
    let divItem = button.closest(".restaurant-cart-item");

    // Remove a div inteira do DOM
    divItem.remove();
    calcularValorTotal()
    calcularQuantidadeTotal()

}

function calcularValorTotal() {
    let listaItens = document.getElementById("listaItens");
    let itensNaLista = listaItens.getElementsByClassName('restaurant-cart-item');

    if (itensNaLista.length != null) { // Verifica se há algum item na lista
        let valorTotalCarrinho = document.getElementById("valorTotalCarrinho");
        let valorTotalCarrinhoBotao = document.getElementById("valorTotalCarrinhoBotao");
        let valorTotal = parseFloat(0);

        for (let i = 0; i < itensNaLista.length; i++) {
            let item = itensNaLista[i];
            let valorItem = item.getElementsByTagName('span')[2].innerText.replace("R$ ", "").replace(",", ".");
            valorTotal = parseFloat(valorTotal) + parseFloat(valorItem);
        }

        valorTotalCarrinho.innerText = 'R$ ' + valorTotal.toFixed(2).replace(".", ",");
        valorTotalCarrinhoBotao.innerText = 'R$ ' + valorTotal.toFixed(2).replace(".", ",");
    } else {
        // Caso não haja itens na lista, você pode fazer algo aqui, por exemplo:
        let valorTotalCarrinho = document.getElementById("valorTotalCarrinho");
        valorTotalCarrinho.innerText = 'R$ 0,00';
        let valorTotalCarrinhoBotao = document.getElementById("valorTotalCarrinhoBotao");
        valorTotalCarrinhoBotao.innerText = 'R$ 0,00';
    }
}

//calcula a quantidade toda de itens pedido e jogar no botão do carrinho
function calcularQuantidadeTotal() {
    let listaItens = document.getElementById("listaItens");
    let itensNaLista = listaItens.getElementsByClassName('restaurant-cart-item');
    let quantidadeTotalCarrinhoBotao = document.getElementById("quantidadeTotalCarrinhoBotao");
    let quantidadeTotal = parseInt(0);
    for (let k = 0; k < itensNaLista.length; k++) {
        let item = itensNaLista[k];
        let quantidadeDeItens = item.getElementsByTagName('span')[0].innerText;
        quantidadeTotal = parseInt(quantidadeDeItens) + parseInt(quantidadeTotal);
    }
    quantidadeTotalCarrinhoBotao.innerText = quantidadeTotal + ' itens';

}

// Exemplo de uso:
//let total = calcularValorTotal();

//função de mudar quantidade de produtos no model confirmação
function alterarQtd(acao) {
    const valor = document.getElementById("valorItem").innerHTML

    const qtd = document.getElementById("numberItem")
    const valorTotalAtualizado = fomatarValor(valor)

    if (acao == '-' && qtd.innerHTML == 1) {

    } else {
        acao == '+' ? qtd.innerHTML++ : qtd.innerHTML--
        const valorTotal = qtd.innerHTML * valorTotalAtualizado
    }
}

function somenteNumeros(n) {
    return n.replace(/\D/g, '')
}

function fomatarValor(n) {
    return n.toLocaleString('pt-br', { style: "currency", currency: "BRL" });
}

function enviarPedidoParaCozinha() {
    var socket = io('http://localhost:3001');
   

    function renderMessage(message) {
    }

    socket.on('previousMessagens', function (messages) {
        for (var i = 0; i < messages.length; i++) {
            renderMessage(messages[i]);
        }
    });

    socket.on('receivedMessage', function (message) {
        renderMessage(message);
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
                var produtoFormatado = {
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
            socket.emit('sendMessage', mensageObject); // Evento envia o objeto message + autor
            // Chama a função para mostrar a mensagem passando o mensageObject
            renderMessage(mensageObject);
        }
    });
}
