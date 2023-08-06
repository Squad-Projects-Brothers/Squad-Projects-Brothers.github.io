document.addEventListener("DOMContentLoaded", function () {
  //exibirUltimoPedido();
});

//função de conectar no json **NÃO APAGAR A URL LOCALHOST**
function pegaritens() {
  url = "https://ravinristorant.000webhostapp.com/json/server-itens.php";
  //url = "http://localhost/Squad-Projects-Brothers.github.io/json/server-itens.php";

  // Verifica se o cardápio já foi carregado anteriormente
  const cardapioCarregado = localStorage.getItem("cardapioCarregado");

  if (cardapioCarregado) {
    // O cardápio já foi carregado, obtém os dados do localStorage
    const dadosArmazenados = localStorage.getItem("cardapio");
    const data = JSON.parse(dadosArmazenados);

    // Monta o HTML com os dados já armazenados
    montadorHtml(data);
  } else {
    // O cardápio ainda não foi carregado, faz a chamada fetch para obter os dados
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao obter os dados do servidor.");
        }
        return response.json();
      })
      .then((data) => {
        const respostaJson = data;
        localStorage.setItem("cardapio", JSON.stringify(data));
        localStorage.setItem("cardapioCarregado", "true"); // Indica que o cardápio foi carregado

        // Chama a função para montar o HTML com os dados obtidos
        montadorHtml(data);
      })
      .catch((error) => {
        console.error(error);
        // Aqui você pode tratar o erro, por exemplo, exibindo uma mensagem de erro na página
      });
  }
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
    if (divInitial !== null) {
      divInitial.innerHTML = textHtml;
    }
  }
}

function resetItemValue() {
  document.getElementById("numberItem").textContent = "1";
}

//função atualizar as informações do modalItem1 quando chamado
function atualizarModal(id, nome, categoria, descricao, valor) {
  let addDescricao = document.getElementById("descricao-produto");
  let titulo = document.getElementById("modalItem1Label");
  let valorProduto = document.getElementById("valorItem");
  let addItem = document.getElementById("addItem");
  let observacaoItem1 = document.getElementById("observacaoItem1");
  titulo.innerText = nome;
  addDescricao.innerText = descricao;
  valorProduto.innerText = "R$" + valor;
  let função = `adicionarProdutoNoCarrinho(${id},'${nome}','${categoria}','${descricao}','${valor}')`;
  addItem.setAttribute("onclick", função);
}

// função de quantidade de itens no model de cada produto

//função de separar cada item na sua categoria ex sobremesa, comidas. no cardapio
function activeModel(elemento, categoria) {
  let elementosAtivos = document.getElementsByClassName("activo");
  for (elementoAtivo of elementosAtivos) {
    elementoAtivo.classList.remove("activo");
  }
  elemento.parentNode.classList.add("activo");
  let itensMenu = document.getElementsByClassName("itens-menu");
  for (itemMenu of itensMenu) {
    if (itemMenu.getAttribute("data-category") === categoria) {
      itemMenu.classList.remove("inactive");
    } else {
      itemMenu.classList.add("inactive");
    }
  }
}
//função de aparecer todos os produtos no cardapio
function selecionarTodosItens(elemento) {
  removerClasseAtivo(elemento);
  let itensMenu = document.getElementsByClassName("itens-menu");
  for (itemMenu of itensMenu) {
    itemMenu.classList.remove("inactive");
    document.getElementById("todos-tab").classList.remove("active");
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
