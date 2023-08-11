function receberPedido() {
    //var socket = io("http://ravin.ddns.net:3001");
    var socket = io("http://187.85.120.71:3001");

    socket.on("itemsArray", (itemm) => {
        // Limpa o conteúdo atual do elemento com a classe "messages"
        $(".messages").empty();

        return addNewComanda(itemm);
    });
}

function addNewComanda(itemm) {
    const listaPedidos = document.getElementById("lista_pedidos");
    const mesaSelecionada = localStorage.getItem("mesaEscolhida");

    itemm.forEach((item) => {
        if (item.mesa === mesaSelecionada) {
            const produtos = item.produtos;

            produtos.forEach((produto) => {
                // Verificar se o item já existe na lista
                const existingItem = document.getElementById(produto.id);

                if (!existingItem) {
                    let textHtml = `
                    <tr id="${produto.id}">
                        <td>${produto.id}</td>
                        <td>${item.mesa}</td>
                        <td>${produto.nome}</td>
                        <td>Kg</td>
                        <td>${produto.quantidade}</td>
                        <td>R$ 10.00</td>
                        <td>Pago</td>
                        <td>${produto.status}</td>
                    </tr>`;

                    listaPedidos.innerHTML += textHtml;
                }
            });
        }
    });
}
