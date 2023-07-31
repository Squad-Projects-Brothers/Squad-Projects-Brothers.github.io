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
        <div class="col-sm-4 mb-3 itens-menu" data-category="${itemMenu.categoria}"> 
                <div class="card">
                    <img src="${itemMenu.imagem}" class="card-img-top custom-image" alt="Item 1">
                    <div class="card-body">
                        <h5 class="card-title">${itemMenu.nome}</h5>
                        <div class="text-center">
                            <button class="btn btn-primary" data-bs-toggle="modal"
                            <button data-bs-target="#modalItem${itemMenu.id}"
                            onclick="atualizarModalEChamarOutraFuncao(${itemMenu.id},'${itemMenu.nome}','${itemMenu.categoria}','${itemMenu.descricao}','${itemMenu.valor}')"
                            id="${itemMenu.id}">Adicionar ao Pedido</button>
                                </div>
                    </div>
                </div>
            </div>`;
        divInitial.innerHTML = textHtml;
    }
}
//função auxiliar para poder chamar mais de uma função no onclick do produto
function atualizarModalEChamarOutraFuncao(id, nome, categoria, descricao, valor) {
    atualizarModal(id, nome, categoria, descricao, valor);
    mudarIdModal(id);
}
//função atualizar as informações do modalItem1 quando chamado
function atualizarModal(id, nome, categoria, descricao, valor) {
    let addDescricao = document.getElementById("descricao-produto");
    let titulo = document.getElementById("modalItem1Label");
    let valorProduto = document.getElementById("valorItem");
    console.log(valorProduto)
    let addItem = document.getElementById("addItem");
    let observacaoItem1 = document.getElementById("observacaoItem1");
    titulo.innerText = nome;
    addDescricao.innerText = descricao;
    valorProduto.innerText = 'R$' + valor;
    let função = `adicionarProdutoNoCarrinho(${id},'${nome}','${categoria}','${descricao}','${valor}')`;
    addItem.setAttribute('onclick', função);
    console.log(modais)
}
//função para mudar o atributo name do modalItem1
function mudarIdModal(id) {
    const newModalId = "modalItem" + id;

    // Obtém todos os elementos com o atributo 'name' igual a 'modalItem'
    const modals = document.getElementsByName("modalItem");

    // Loop para verificar cada modal
    for (const modal of modals) {
        if (modal.id === newModalId) {
            // O modal já tem o ID correto, então não precisamos fazer nada
            console.log(modal);
        } else {
            // Atualiza o ID do modal
            modal.setAttribute("id", newModalId);
            console.log(modal);
        }
    }
}
// função de quantidade de itens no model de cada produto


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
        document.getElementById("todos-tab").classList.remove("active")
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
