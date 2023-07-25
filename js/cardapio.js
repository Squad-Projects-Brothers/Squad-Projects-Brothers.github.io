
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
function lista() {
    const listaItensNumero = [1, 2, 3];
    const listaItens = document.getElementById("listaItens");
    var textHtml = "";
    // Para cada número na lista de itens, crie um novo elemento div e preencha-o com o conteúdo desejado
    listaItensNumero.forEach((itemNumero) => {
         textHtml += `
            <div class="sidebar-pedido-item sidebar-pedido-line">
                <div class="sidebar-pedido-item-description sidebar-pedido-justify"><span>ewqewqewqe</span><span>R$ 51,60</span></div>
                <div class="sidebar-pedido-item-tags"></div>
                <div class="sidebar-pedido-item-buttons-wrapper">
                    <button type="button" role="button" class="btn btn-link-edit btn-size-m sidebar-pedido-button-item-button" theme="link" variant="sidebar-pedido-button-item-button" label="Editar" data-test-id="restaurant-cart-item__edit-button" color="primary" target="" rel="">
                        <span class="btn-label">Editar</span>
                    </button>
                    <button type="button" role="button" class="btn btn-link-edit btn-gray btn-size-m sidebar-pedido-button-item-button" theme="link" color="gray" variant="sidebar-pedido-button-item-button" label="Remover" data-test-id="restaurant-cart-item__remove-button" target="" rel="">
                        <span class="btn-label">Remover</span>
                    </button>
                </div>
            </div>`;
        
        // Crie um novo elemento div para o item do pedido
        const novoItemPedido = document.createElement('div');
        novoItemPedido.innerHTML = textHtml;
        
        // Adicione o novo item do pedido como um filho do elemento listaItens
        listaItens.appendChild(novoItemPedido);
    });
}

