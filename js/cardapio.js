
function pegaritens() {
    url = "https://ravinristorant.000webhostapp.com/json/server-itens.php";

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
    const descricao = document.getElementById("descricao-produto");
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
                                            data-bs-target="#modalItem1">Adicionar ao Pedido</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        divInitial.innerHTML = textHtml;
        descricao.innerText = itensMenu.descricao;
    }
}


// A PARTIR DAQUI TEM QUE REVISAR GUYS


function fazerPedido(item) {
    const itensClassName = document.getElementsByName(`qtd-${item.id}`);
    const qtdItem = itensClassName[0].value;
    item['quantidade'] = qtdItem;
    
    //enviar pedido pra web

    salvarUltimoPedido(item);
    salvarHistorico(item);
    atualizarValorTotal(item);
}

/*
function salvarUltimoPedido(pedido) {
    localStorage.setItem("lastOrder", JSON.stringify(pedido))

}
function salvarHistorico(pedido) {
    if (localStorage.getItem("orderHistory") === null) {
        historicoPedidos = { itens: [] };
    } else {
        historicoPedidos = JSON.parse(localStorage.getItem("orderHistory"));
    }
    historicoPedidos.itens.push(pedido);
    localStorage.setItem("orderHistory", JSON.stringify(historicoPedidos));
}
/* mesma função da de baixo
function filtrarItensMenu() {
    const elementosAtivos = document.getElementsByClassName("active");
    for (elementoAtivo of elementosAtivos) {
        elementoAtivo.classList.remove("active");
    }
    elemento.parentNode.classList.add("active");

    const itensMenu = documente.getElementsByClassName("itens-menu");
    for (itemMenu of itens) {
        if (itemMenu.getAttribute("data-category") === categoria) {
            itemMenu.classList.remove("inactive");
        } else {
            itemMenu.classList.add("inactive");
        }
    }
}
function activeModel(elemento, categoria) {

    removerClasseAtivo(elemento);

    const itensMenu = document.getElementsByClassName("itens-menu");
    for (itemMenu of itensMenu) {
        if (itemMenu.getAttribute("data-category") === categoria) {
            itemMenu.classList.remove("inactive");
        } else {
            itemMenu.classList.add("inactive");
        }
    }
}

selecionarTodosItens(elemento){
    removerClasseAtivo(elemento);

    const itensMenu = document.getElementsByClassName("itens-menu");
    for (itemMenu of itensMenu) {
        itemMenu.classList.remove("inactive");
    }

}

function removerClasseAtivo() {
    const elementosAtivos = document.getElementsByClassName("active");
    for (elementoAtivo of elementosAtivos) {
        elementoAtivo.classList.remove("active");
    }
    elementoAtivo.classList.remove("active");
}

function atualizarValorTotal(pedido) {
    const htmlValorTotal = document.getElementById("valor-total");
    var valorTotal = 0;
    if (htmlValorTotal.textContent !== "") {
        valorTotal = Number(htmlValorTotal.textContent)
    }

    htmlValorTotal.textContent = valorTotal + (pedido.qtd * pedido.valor)
}

*/