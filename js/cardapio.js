//função de conectar no json **NÃO APAGAR A URL LOCALHOST**
function pegaritens() {
    url = "https://ravinristorant.000webhostapp.com/json/server-itens.php";
    //url = "http://localhost/Squad-Projects-Brothers.github.io/json/server-itens.php";

    fetch(url)
        .then((dados) => {
            return dados.json();
        })
        .then((data) => {
            const respostaJson = data;
            montadorHtml(data);
        });
}

//função de adicionar listar os itens do json
function montadorHtml(itensMenu) {
    let divInitial = document.getElementById("cardapio");
    var textHtml = "";

    for (itemMenu of itensMenu) {
        textHtml += `
        <div class="col-sm-4 mb-3 itens-menu"  data-category="${itemMenu.categoria}"> 
                <div class="card">
                    <img src="${itemMenu.imagem}" class="card-img-top custom-image" alt="Item 1">
                    <div class="card-body">
                        <h5 class="card-title">${itemMenu.nome}</h5>
                        <div class="text-center">
                            <button class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#modalItem1" onclick="atualizarModal('${itemMenu.id}','${itemMenu.nome}','${itemMenu.categoria}','${itemMenu.descricao}','${itemMenu.valor}')" id="${itemMenu.id}">Adicionar ao Pedido</button>
                                </div>
                    </div>
                </div>
            </div>`;
        divInitial.innerHTML = textHtml;


    }
}
function atualizarModal(id, nome, categoria, descricao, valor) {
    let addDescricao = document.getElementById("descricao-produto");
    let titulo = document.getElementById("modalItem1Label");
    let valorProduto = document.getElementById("valorItem");
    let addItem = document.getElementById("addItem");
    titulo.innerText = nome;
    addDescricao.innerText = descricao;
    valorProduto.innerText = 'R$' + valor;
    let função = `adicionarProdutoNoCarrinho(${id})`;
    addItem.setAttribute('onclick', função)
}
function adicionarProdutoNoCarrinho(idProduto){

}
// função de quantidade de itens no model de cada produto

const itemEmEdicao = null; // Variável para armazenar o item em edição
// função de editar item no "carrinho"
function editarDiv(button) {
    // Obtém o elemento pai do botão clicado, que é a div com a classe "restaurant-cart-item sidebar-pedido-line"
    let divItem = button.closest(".restaurant-cart-item");

    // Obtém o texto do item do pedido e o preço
    let itemTexto = divItem.querySelector(".sidebar-pedido-item-description span:first-child").innerText;
    let itemPreco = divItem.querySelector(".sidebar-pedido-item-description span:last-child").innerText;

    // Preenche o formulário de edição com os detalhes do item
    document.getElementById("quantidade").value = parseInt(itemTexto);

    // Exibe o formulário de edição
    document.querySelector(".modal-form-edit").style.display = "block";

    // Armazena o item em edição para posterior atualização
    itemEmEdicao = divItem;
}
//salva a edição do item no "carrinho"
function salvarEdicao() {
    let novaQuantidade = document.getElementById("quantidade").value;

    // Atualiza o texto do item com a nova quantidade
    let descricaoItem = itemEmEdicao.querySelector(".sidebar-pedido-item-description span:first-child");
    let valor = document.querySelector('.restaurant-cart-item .sidebar-pedido-item-description span:last-child').textContent;
    descricaoItem.innerText = novaQuantidade + "x";
    console.log(valor);
    valor.innerText = novaQuantidade * valor;
    console.log(valor);
    // Fecha o formulário de edição
    document.querySelector(".modal-form-edit").style.display = "none";

    // Limpa a variável de item em edição
    itemEmEdicao = null;
}
//cancela a edição do item no "carrinho"
function cancelarEdicao() {
    // Fecha o formulário de edição
    document.querySelector(".modal-form-edit").style.display = "none";

    // Limpa a variável de item em edição
    itemEmEdicao = null;
}
//remove item do "carrinho"
function removerDiv(button) {
    // Obtém o elemento pai do botão clicado, que é a div com a classe "restaurant-cart-item sidebar-pedido-line"
    let divItem = button.closest(".restaurant-cart-item");

    // Remove a div inteira do DOM
    divItem.remove();

}
//função de separar cada item na sua categoria ex sobremesa, comidas. no cardapio
function activeModel(elemento, categoria) {
    let elementosAtivos = document.getElementsByClassName("activo");
    for (elementoAtivo of elementosAtivos) {
        elementoAtivo.classList.remove("activo")
    }
    elemento.parentNode.classList.add("activo");
    let itensMenu = document.getElementsByClassName("itens-menu");
    for (itemMenu of itensMenu) {
        if (itemMenu.getAttribute("data-category") === categoria) {
            itemMenu.classList.remove("inactive")
        } else {
            itemMenu.classList.add("inactive")
        }
    }
}
//função de aparecer todos os produtos no cardapio
function selecionarTodosItens(elemento) {
    removerClasseAtivo(elemento);
    let itensMenu = document.getElementsByClassName("itens-menu");
    for (itemMenu of itensMenu) {
        itemMenu.classList.remove("inactive")
    }
}
//função de remover os produtos que não são da categoria escolhida no cardapio
function removerClasseAtivo(elemento) {
    let elementosAtivos = document.getElementsByClassName("activo");
    for (elementoAtivo of elementosAtivos) {
        elementoAtivo.classList.remove("activo");
    }
    elemento.classList.add("activo");
}