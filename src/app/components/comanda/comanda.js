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
    //const codigoMesa = localStorage.get('mesaEscolhida')
    itemm.forEach((item) => {
        const listaPedidos = document.getElementById("lista_pedidos");
        const produtos = item.produtos;
        produtos.forEach((produto) => {
            let textHtml = `
                <tr>
                    <td>${produto.id}</td>
                    <td>${item.produtos.mesa}</td>
                    <td>${produto.nome}</td>
                    <td>Kg</td>
                    <td>${produto.quantidade}</td>
                    <td>R$ 10.00</td>
                    <td>Pago</td>
                    <td>${produto.status}</td>
                </tr>`;
            listaPedidos.innerHTML += textHtml;
        });
    });
}