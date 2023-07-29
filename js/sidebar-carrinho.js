//função de adiconar os produtos em uma array que fica no localStorage(desenvolvendo ainda)
function addNaArray(a, b, c) {
    let valor = a.substring(2, 6);
    if (localStorage.getItem("orderHistory") === null) {
        historicoPedidos = { itens: [] };
    } else {
        historicoPedidos = JSON.parse(localStorage.getItem("orderHistory"));
    }
    historicoPedidos.itens.push('nome: ' + c + ',quantidade: ' + b + ',valor: ' + valor);
    localStorage.setItem("orderHistory", JSON.stringify(historicoPedidos));
}

//função acionada ao clicar no botao adicionar produto no model de confirmação
function adicionarProdutoNoCarrinho(id, nome, categoria, descricao, valor) {
    let valorItem = document.getElementById("valorItem").textContent.replace("R$ ", "").replace(",", ".");
    let numberItem = document.getElementById("numberItem").innerText;
    let nomeProd = document.getElementById("modalItem1Label").innerText;
    let listaItens = document.getElementById("listaItens");
    let quantidadeItens = parseInt(numberItem);

    let valorFinal = (parseFloat(quantidadeItens) * parseFloat(valorItem.substring(2)));
    // Verificar se o item já existe na lista
    let itemJaExistente = false;
    let itensNaLista = listaItens.getElementsByClassName('restaurant-cart-item');

    for (let i = 0; i < itensNaLista.length; i++) {
        let item = itensNaLista[i];
        let nomeItem = item.getElementsByTagName('span')[1].innerText;

        if (nomeItem === nomeProd) {
            // O item já existe na lista, atualize a quantidade e o valor
            let quantidadeSpan = item.getElementsByTagName('span')[0];
            let setarOValor = item.getElementsByTagName('span')[2];
            let valorSpan = item.getElementsByTagName('span')[2].innerText.replace("R$ ", "").replace(",", ".");
            let quantidadeExistente = parseInt(quantidadeSpan.innerText);
            let novaQuantidade = (quantidadeExistente + (quantidadeItens - quantidadeExistente));
            let novoValor = (novaQuantidade * parseFloat(valorItem.substring(2)));
            quantidadeSpan.innerText = novaQuantidade;
            setarOValor.innerText = 'R$ ' + novoValor.toFixed(2).replace(".", ",");
            itemJaExistente = true;
            break;
        }
    }

    // Se o item não existe na lista, adicione um novo item
    if (!itemJaExistente) {
        let textHtml = `
    <div class="restaurant-cart-item sidebar-pedido-line">
        <div class="sidebar-pedido-item-description sidebar-pedido-justify">
            <span>${quantidadeItens}</span>
            <span >${nomeProd}</span>
            <span>R$ ${valorFinal.toFixed(2).replace(".", ",")}</span>
        </div>
        <div class="sidebar-pedido-item-tags"></div>
        <div class="sidebar-pedido-item-buttons-wrapper">
            <button type="button"
                role="button"
                class="btn btn-link-edit btn-size-m sidebar-pedido-button-item-button"
                theme="link" variant="sidebar-pedido-button-item-button" label="Editar"
                data-test-id="restaurant-cart-item__edit-button" color="primary"
                data-bs-toggle="modal" data-bs-target="#modalItem1">
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
//calcular o valor total do carrinho 
function calcularValorTotal() {
    let listaItens = document.getElementById("listaItens");
    let itensNaLista = listaItens.getElementsByClassName('restaurant-cart-item');
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
    
}
//calcula a quantidade toda de itens pedido e jogar no botão do carrinho
function calcularQuantidadeTotal() {
    let listaItens = document.getElementById("listaItens");
    let itensNaLista = listaItens.getElementsByClassName('restaurant-cart-item');
    let quantidadeTotalCarrinhoBotao = document.getElementById("quantidadeTotalCarrinhoBotao");
    let quantidadeTotal = parseInt(0);
    for (let i = 0; i < itensNaLista.length; i++) {
        let item = itensNaLista[i];
        let quantidadeDeItens = item.getElementsByTagName('span')[0].innerText;
        quantidadeTotal = parseInt(quantidadeDeItens) + parseInt(quantidadeTotal);
    }
    quantidadeTotalCarrinhoBotao.innerText = quantidadeTotal + ' itens';
    
}

// Exemplo de uso:
let total = calcularValorTotal();
//função de mudar quantidade de produtos no model confirmação
function addNumeroDeItens() {
    let numberItem = document.getElementById("numberItem");
    let currentValue = parseInt(numberItem.innerText);
    numberItem.innerHTML = currentValue + 1;

}
//função de mudar quantidade de produtos no mdoel confirmação
function removeNumeroDeItens() {
    let numberItem = document.getElementById("numberItem");
    let currentValue = parseInt(numberItem.innerText);
    if (currentValue > 0) {
        numberItem.innerText = currentValue - 1;
    }
}