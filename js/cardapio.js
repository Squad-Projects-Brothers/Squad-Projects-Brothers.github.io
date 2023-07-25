
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
}/*
function addItensCarrinho() {
    const carrinhoDeCompras = [];

    function adicionarItemCarrinho(item) {
      carrinhoDeCompras.push(item);
      atualizarListaCarrinho();
    }

    function atualizarListaCarrinho() {
      const listaCarrinho = document.getElementById("listaCarrinho");
      listaCarrinho.innerHTML = ""; 

      carrinhoDeCompras.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        listaCarrinho.appendChild(listItem);
      });
    }
}*/
function removerDiv(button) {
    // Obtém o elemento pai do botão clicado, que é a div com a classe "restaurant-cart-item sidebar-pedido-line"
    var divItem = button.closest(".restaurant-cart-item");
    
    // Remove a div inteira do DOM
    divItem.remove();
}

