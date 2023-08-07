function aaa() {
  var socket = io("http://ravin.ddns.net:3001");

  socket.on("itemsArray", (itemm) => {
    // Limpa o conteúdo atual do elemento com a classe "messages"
    $(".messages").empty();

    // Percorre cada item do array
    itemm.forEach((item) => {
      let idPedido;
      const produtos = item.produtos;

      // Cria um elemento de div para cada item
      const itemDiv = $(
        '<div class="message container text-center text-primary-emphasis bg-primary-subtle bs-warning-bg-subtle border border-primary-subtle rounded-3"></div>'
      );
      itemDiv.append(
        `<div class="titulo-mesa text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" id="${item.id}">Mesa: ${item.mesa}</div>`
      );

      // Cria um elemento de lista não ordenada para os produtos do item
      const produtosList = $('<table class="table "></table>');
      const tabelaList = $(
        `<tr class="row"> 
          <th class="col ">id</th>
          <th class="col ">Produto</th>
          <th class="col ">Quantidade</th>
          <th class="col ">Status</th>
          <th class="col-5 ">Atualizar status pedido</th>
        </tr>`
      );
      produtosList.append(tabelaList);
      // Percorre a lista de produtos do item e cria elementos de lista para cada produto
      produtos.forEach((produto) => {
        const produtoElement = $(
          `<tr type="checkbox" class="row" name="options" id="${produto.id}">
                <td class="col"> ${produto.id}</td>
                <td class="col"> ${produto.nome}</td>
                <td class="col"> ${produto.quantidade}</td>
                <td class="col"> ${produto.status}</td>
          `
        );
        produtosList.append(produtoElement);
        const iniciarPedidoBtn = $(
          `<td class="col">
            <button class="btn btn-outline-primary">Iniciar Pedido</button></td>
          `
        );
        const cancelarrPedidoBtn = $(
          `<td class="col">
            <button class="btn btn-outline-danger">Cancelar Pedido</button></td>
          `
        );
        const concluirPedidoBtn = $(
            `<td class="col">
              <button class="btn btn-outline-success">Concluir Pedido</button>
            </td>
          </tr>`
        );
        produtoElement.append(iniciarPedidoBtn);
        produtoElement.append(cancelarrPedidoBtn);
        produtoElement.append(concluirPedidoBtn);
        iniciarPedidoBtn.click(() => {
          // Envia a solicitação ao servidor para concluir o pedido
          idPedido = produto.id;
          socket.emit("iniciarPedido", idPedido);
          console.log(idPedido)
        });
        cancelarrPedidoBtn.click(() => {
          // Envia a solicitação ao servidor para concluir o pedido
          idPedido = produto.id;
          socket.emit("cancelarPedido", idPedido);
          console.log(idPedido)
        });
        concluirPedidoBtn.click(() => {
          // Envia a solicitação ao servidor para concluir o pedido
          idPedido = produto.id;
          socket.emit("concluirPedido", idPedido);
          console.log(idPedido)
        });
      });

      itemDiv.append(produtosList);
      $(".messages").append(itemDiv);
    });
  });
}
