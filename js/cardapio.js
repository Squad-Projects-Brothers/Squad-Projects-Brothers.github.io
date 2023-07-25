
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
    var divItem = button.closest(".sidebar-pedido-line");
    console.log(divItem);

    // Verifica se o elemento pai foi encontrado corretamente
    if (!divItem) {
        console.error("Elemento com a classe 'restaurant-cart-item' não encontrado.");
        return;
    }

    // Obtém o elemento filho com a classe "sidebar-pedido-item-description"
    var itemDescription = divItem.querySelector(".sidebar-pedido-item-description");

    // Verifica se o elemento filho foi encontrado corretamente
    if (!itemDescription) {
        console.error("Elemento com a classe 'sidebar-pedido-item-description' não encontrado dentro de 'restaurant-cart-item'.");
        return;
    }

    // Obtém o texto do item do pedido e o preço
    var itemTexto = itemDescription.querySelector("span:first-child").innerText;
    var itemPreco = itemDescription.querySelector("span:last-child").innerText;

    // Preenche o formulário de edição com os detalhes do item
    document.getElementById("quantidade").value = parseInt(itemTexto);

    // Exibe o formulário de edição
    document.querySelector(".modal-form-edit").style.display = "block";

    // Armazena o item em edição para posterior atualização
    itemEmEdicao = divItem;
}

function salvarEdicao() {
    var novaQuantidade = document.getElementById("quantidade").value;

    // Atualiza o texto do item com a nova quantidade
    var descricaoItem = itemEmEdicao.querySelector(".sidebar-pedido-item-description span:first-child");
    descricaoItem.innerText = novaQuantidade + "x Chopp Pet 1litro";

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
    // Obtém o elemento pai do botão clicado, que é a div com a classe "sidebar-pedido-item"
    var divItem = button.closest(".sidebar-pedido-item");

    // Remove a div inteira do DOM
    divItem.remove();
}


