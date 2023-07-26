//função para chamar o model de confirmar adcionar item
function chamarModelAddCarrinho(id, nome, valor, descricao) {
    let divInicial = document.getElementById("cardapio");
    let filhoDiv = divInicial;
    var textHtml = ""
    //add div model confirmação
    textHtml += `
    <div class="modal-dialog modal-dialog-centered" id="modelItemPro">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalItem1Label">${nome}</h5>
                    <button type="button" class="btn-close"  aria-label="Close" onclick="fecharModel()">
                        <span class="sr-only">Fechar</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Conteúdo do modal - detalhes do item -->
                    <p style="width: 250px" id="descricao-produto">${descricao}</p>

                    <!-- Campos de observação -->
                    <div class="mb-3">
                        <label for="observacaoItem1" class="form-label">Observação:</label>
                        <textarea class="form-control" id="observacaoItem1" rows="3"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <span class="modal-quantidade" id="valorItem">R$${valor}</span>
                    <button type="button" class="btn btn-danger rounded-pill">
                        <i onclick="removeNumeroDeItens()" id="i-remove-item" class="bi bi-dash"></i>
                    </button>
                    <span class="modal-quantidade" id="numberItem">1</span>
                    <button type="button" class="btn btn-primary rounded-pill">
                        <i onclick="addNumeroDeItens()" id="i-add-item" class="bi bi-plus"></i>
                    </button>
                    <a href="#" onclick="addItensCarrinho()" class="btn btn-primary" id="addItem"
                        >Adicionar ao Pedido</a>
                </div>
            </div>
        </div>`;
    filhoDiv.innerHTML = textHtml;
}
//função de adiconar os produtos em uma array que fica no localStorage(desenvolvendo ainda)
/*function addNaArray(a,b,c){
    let valor = a.substring(2, 6);
    if (localStorage.getItem("orderHistory") === null) {
        historicoPedidos = { itens: [] };
    } else {
        historicoPedidos = JSON.parse(localStorage.getItem("orderHistory"));
    }
    historicoPedidos.itens.push('nome: ' + c + ',quantidade: '+ b + ',valor: ' + valor);
    localStorage.setItem("orderHistory", JSON.stringify(historicoPedidos));
}*/
//fechar o model de confirma add itens
function fecharModel() {
    let modelItemPro = document.getElementById("modelItemPro")
    modelItemPro.remove();
    pegaritens();
}
//função acionada ao clicar no botao adicionar produto no model de confirmação
function addItensCarrinho() {
    let valorItem = document.getElementById("valorItem").innerText;
    let numberItem = document.getElementById("numberItem").innerText;
    let nomeProd = document.getElementById("modalItem1Label").innerText;
    let listaItens = document.getElementById("listaItens");
    addNaArray(valorItem, numberItem, nomeProd)
    var textHtml = "";
    textHtml += `
            <div class="restaurant-cart-item sidebar-pedido-line" >
                <div class="sidebar-pedido-item-description sidebar-pedido-justify">
                    <span>${numberItem}</span>
                    <span>${nomeProd}</span><span>R$ ${valorItem}</span>
                </div>
                <div class="sidebar-pedido-item-tags"></div>
                <div class="sidebar-pedido-item-buttons-wrapper"><button type="button"
                    role="button"
                    class="btn btn-link-edit btn-size-m sidebar-pedido-button-item-button"
                    theme="link" variant="sidebar-pedido-button-item-button" label="Editar"
                    data-test-id="restaurant-cart-item_edit-button" color="primary"
                    target="" rel="" onclick="editarDiv(this)"><span
                        class="btn-label">Editar</span></button><button type="button"
                            role="button"
                            class="btn btn-link-edit btn-gray btn-size-m sidebar-pedido-button-item-button"
                            theme="link" color="gray" variant="sidebar-pedido-button-item-button"
                            label="Remover" data-test-id="restaurant-cart-item__remove-button"
                            target="" rel="" onclick="removerDiv(this)"><span
                                class="btn-label">Remover</span></button>
                </div>
            </div >`;
            listaItens.innerHTML += textHtml;

}
//função de mudar quantidade de produtos no mdoel confirmação
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
}/*
function salvarUltimoPedido(pedido) {
    localStorage.setItem("lastOrder", JSON.stringify(pedido));
}

function salvarHistoricoPedidos(pedido) {
    if (localStorage.getItem("orderHistory") === null) {
        historicoPedidos = { itens: [] };
    } else {
        historicoPedidos = JSON.parse(localStorage.getItem("orderHistory"));
    }
    historicoPedidos.itens.push(pedido);
    localStorage.setItem("orderHistory", JSON.stringify(historicoPedidos));
}*/
