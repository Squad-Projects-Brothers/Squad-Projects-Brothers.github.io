function aaa() {
  var socket = io("http://138.36.206.61:3001");

  socket.on("itemsArray", (itemm) => {
    // Limpa o conteúdo atual do elemento com a classe "messages"
    $(".messages").empty();

    // Percorre cada item do array
    itemm.forEach((item) => {
      const idPedido = item.id;
      const produtos = item.produtos;

      // Cria um elemento de div para cada item
      const itemDiv = $(
        '<div class="message container text-center text-primary-emphasis bg-primary-subtle bs-warning-bg-subtle border border-primary-subtle rounded-3"></div>'
      );
      itemDiv.append(
        `<div class="titulo-mesa text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" id="${item.id}">Mesa: ${item.mesa}</div>`
      );

      // Cria um elemento de lista não ordenada para os produtos do item
      const produtosList = $('<table class=" table "></table>');
      const tabelaList = $(
        `<tr>
          <th class="col text-center">id</th>
          <th class="col text-center">Produto</th>
          <th class="col text-center">Quantidade</th>
          <th class="col text-center">Status</th>
        </tr>`
      );
      produtosList.append(tabelaList);
      // Percorre a lista de produtos do item e cria elementos de lista para cada produto
      produtos.forEach((produto) => {
        const produtoElement = $(
          `<tr type="checkbox" class="btn btn-primary" name="options" id="${produto.id}">
                <td class="col"> ${produto.id}</td>
                <td class="col"> ${produto.nome}</td>
                <td class="col"> ${produto.quantidade}</td>
                <td class="col"> ${produto.status}</td>
          </tr>
          `
        );
        produtosList.append(produtoElement);
      });

      // Adiciona a lista de produtos do item à div do item
      itemDiv.append(produtosList);

      // Cria o botão "Concluir Pedido" para o item
      const iniciarPedidoBtn = $(
        '<button class="btn btn-outline-warning">Iniciar Pedido</button>'
      );
      const cancelarrPedidoBtn = $(
        '<button class="btn btn-outline-warning">Cancelar Pedido</button>'
      );
      const concluirPedidoBtn = $(
        '<button class="btn btn-outline-warning">Concluir Pedido</button>'
      );

      iniciarPedidoBtn.click(() => {
        // Envia a solicitação ao servidor para concluir o pedido
        socket.emit("iniciarPedido", idPedido);
      });
      cancelarrPedidoBtn.click(() => {
        // Envia a solicitação ao servidor para concluir o pedido
        socket.emit("cancelarPedido", idPedido);
      });
      concluirPedidoBtn.click(() => {
        // Envia a solicitação ao servidor para concluir o pedido
        socket.emit("concluirPedido", idPedido);
      });
      // Adiciona o botão "Concluir Pedido" à div do item
      itemDiv.append(iniciarPedidoBtn);
      itemDiv.append(cancelarrPedidoBtn);
      itemDiv.append(concluirPedidoBtn);

      // Adiciona a div do item ao elemento com a classe "messages"
      $(".messages").append(itemDiv);
    });
  });
}
