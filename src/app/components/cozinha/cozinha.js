function createItemDiv(item) {
  const itemDiv = $('<div class="message container text-center text-primary-emphasis bg-primary-subtle bs-warning-bg-subtle border border-primary-subtle rounded-3"></div>');
  itemDiv.append(`<div class="titulo-mesa text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" id="${item.id}">Mesa: ${item.mesa}</div>`);
  const produtosList = $('<table class="table "></table>');
  const tabelaList = $(`<tr class="row"> 
    <th class="col ">id</th>
    <th class="col ">Produto</th>
    <th class="col ">Quantidade</th>
    <th class="col ">Status</th>
    <th class="col-5 ">Atualizar status pedido</th>
  </tr>`);
  produtosList.append(tabelaList);
  
  item.produtos.forEach((produto) => {
    produtosList.append(createProdutoElement(produto));
  });
  
  itemDiv.append(produtosList);
  return itemDiv;
}

function createProdutoElement(produto) {
  const produtoElement = $(`
    <tr type="checkbox" class="row" name="options" id="${produto.id}">
      <td class="col"> ${produto.id}</td>
      <td class="col"> ${produto.nome}</td>
      <td class="col"> ${produto.quantidade}</td>
      <td class="col"> ${produto.status}</td>
    </tr>
  `);

  const iniciarPedidoBtn = createButton("Iniciar Pedido", "btn-outline-primary", () => {
    socket.emit("iniciarPedido", produto.id);
    console.log(produto.id);
  });

  const cancelarPedidoBtn = createButton("Cancelar Pedido", "btn-outline-danger", () => {
    socket.emit("cancelarPedido", produto.id);
    console.log(produto.id);
  });

  const concluirPedidoBtn = createButton("Concluir Pedido", "btn-outline-success", () => {
    socket.emit("concluirPedido", produto.id);
    console.log(produto.id);
  });

  produtoElement.append(iniciarPedidoBtn, cancelarPedidoBtn, concluirPedidoBtn);
  return produtoElement;
}

function createButton(text, className, onClickHandler) {
  const button = $(`<td class="col"><button class="btn ${className}">${text}</button></td>`);
  button.click(onClickHandler);
  return button;
}

function processItemsArray(itemm) {
  $(".messages").empty();
  itemm.forEach((item) => {
    const itemDiv = createItemDiv(item);
    $(".messages").append(itemDiv);
  });
}

function aaa() {
  var socket = io("http://ravin.ddns.net:3001");
  //var socket = io("http://187.85.120.71:3001");

  socket.on("itemsArray", (itemm) => {
    processItemsArray(itemm);
  });
}
