
function pegaritens() {
    url = "https://ravinristorant.000webhostapp.com/json/server-itens.php";
    // url = "http://localhost/Squad-Projects-Brothers.github.io/json/server-itens.php";

    fetch(url)
        .then((dados) => {
            return dados.json();
        })
        .then((data) => {
            montadorHtml(data);
        });
}

function montadorHtml(itensMenu) {
    const divInitial = document.getElementById("cardapio");
    //const modalItem1 = document.getElementById("modalItem1");
    const descricao = document.getElementById("descricao-produto");
    const tituloProduto = document.getElementById("modalItem1Label");
    var textHtml = "";

    for (itensMenu of itensMenu) {
        textHtml += `
                    <div class="col-sm-4 mb-3" data-category="${itensMenu.categoria}"> 
                            <div class="card">
                                <img src="${itensMenu.imagem}" class="card-img-top custom-image" alt="Item 1">
                                <div class="card-body">
                                    <h5 class="card-title">${itensMenu.nome}</h5>
                                    <div class="text-center">
                                        <button class="btn btn-primary" data-bs-toggle="modal"
                                            data-bs-target="#modalItem1" id="${itensMenu.id}">Adicionar ao Pedido</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        descricao.innerHTML = itensMenu.descricao;
        tituloProduto.innerText = itensMenu.nome;
        divInitial.innerHTML = textHtml;

    }
}
// função de quantidade de itens no model de cada produto
function addNumeroDeItens() {
    const numberItem = document.getElementById("numberItem");
    const currentValue = parseInt(numberItem.innerText);
    numberItem.innerText = currentValue + 1;
}

function removeNumeroDeItens() {
    const numberItem = document.getElementById("numberItem");
    const currentValue = parseInt(numberItem.innerText);
    if (currentValue > 0) {
        numberItem.innerText = currentValue - 1;
    }
}
var itemEmEdicao = null; // Variável para armazenar o item em edição

function editarDiv(button) {
    // Obtém o elemento pai do botão clicado, que é a div com a classe "restaurant-cart-item sidebar-pedido-line"
    var divItem = button.closest(".restaurant-cart-item");

    // Obtém o texto do item do pedido e o preço
    var itemTexto = divItem.querySelector(".sidebar-pedido-item-description span:first-child").innerText;
    var itemPreco = divItem.querySelector(".sidebar-pedido-item-description span:last-child").innerText;

    // Preenche o formulário de edição com os detalhes do item
    document.getElementById("quantidade").value = parseInt(itemTexto);

    // Exibe o formulário de edição
    document.querySelector(".modal-form-edit").style.display = "block";

    // Armazena o item em edição para posterior atualização
    itemEmEdicao = divItem;
    console.log(itemTexto)
}

function salvarEdicao() {
    var novaQuantidade = document.getElementById("quantidade").value;

    // Atualiza o texto do item com a nova quantidade
    var descricaoItem = itemEmEdicao.querySelector(".sidebar-pedido-item-description span:first-child");
    var valor = document.querySelector('.restaurant-cart-item .sidebar-pedido-item-description span:last-child').textContent;
    descricaoItem.innerText = novaQuantidade + "x";
    console.log(valor);
    valor.innerText = novaQuantidade * valor;
    console.log(valor);
    // Fecha o formulário de edição
    document.querySelector(".modal-form-edit").style.display = "none";

    // Limpa a variável de item em edição
    itemEmEdicao = null;
}

function cancelarEdicao() {
    // Fecha o formulário de edição
    document.querySelector(".modal-form-edit").style.display = "none";

    // Limpa a variável de item em edição
    itemEmEdicao = null;
}

function removerDiv(button) {
    // Obtém o elemento pai do botão clicado, que é a div com a classe "restaurant-cart-item sidebar-pedido-line"
    var divItem = button.closest(".restaurant-cart-item");

    // Remove a div inteira do DOM
    divItem.remove();
}
