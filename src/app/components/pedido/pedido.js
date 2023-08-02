//função acionada ao clicar no botao adicionar produto no modal de confirmação
function adicionarProdutoNoCarrinho(id, nome, categoria, descricao, valor) {
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL
    // BOOTSTRAP MODAL - DOCUMENTAÇÃO ULTIMO MODAL

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
                class="btn btn-link-edit btn-size-m sidebar-pedido-button-item-button"
                theme="link" variant="sidebar-pedido-button-item-button" label="Editar"
                data-test-id="restaurant-cart-item__edit-button" color="primary"
                data-bs-togg le="modal" data-bs-target="#modalItem1"
                id="${id}">
                <span class="btn-label">Editar</span>
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
    
    calcularValorTotal();
    calcularQuantidadeTotal();
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
    console.log(valor)
    const qtd = document.getElementById("numberItem")
    const valorTotalAtualizado = fomatarValor(valor)
    console.log(valor)
    if (acao == '-' && qtd.innerHTML == 1) {

    } else {
        acao == '+' ? qtd.innerHTML++ : qtd.innerHTML--
        const valorTotal = qtd.innerHTML * valorTotalAtualizado
        console.log(valorTotal)
    }
}

function somenteNumeros(n) {
    return n.replace(/\D/g, '')
}

function fomatarValor(n) {
    return n.toLocaleString('pt-br', { style: "currency", currency: "BRL" });
}

function escolherMesa() {
    var mesas = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];
    var escolha = window.prompt('Escolha uma mesa: \n' + mesas.join('\n'));

    // Verifica se o usuário escolheu uma mesa válida
    if (escolha !== null && escolha !== '') {
        if (mesas.includes(escolha)) {
            alert('Você escolheu a ' + escolha + '.');
        } else {
            alert('Mesa inválida. Por favor, escolha uma mesa entre 1 e 5.');
        }
    } else {
        alert('Você não fez uma escolha de mesa.');
    }
}
