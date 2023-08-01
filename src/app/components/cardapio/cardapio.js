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
        <div class="col-sm-4 mb-3 itens-menu" data-bs-toggle="modal" data-category="${itemMenu.categoria}" data-bs-target="#modalItem1"
        onclick="atualizarModal(${itemMenu.id},'${itemMenu.nome}','${itemMenu.categoria}','${itemMenu.descricao}','${itemMenu.valor}')"
        id="${itemMenu.id}"> 
                <div class="card card-cardapio" type="button">
                    <img src="${itemMenu.imagem}" class="card-img-top custom-image" alt="Item 1">
                    <div class="card-body">
                        <h5 class="card-title">${itemMenu.nome}</h5>
                        <div class="text-center">
                        </div>
                    </div>
                </div>
            </div>`;
        divInitial.innerHTML = textHtml;
    }
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
