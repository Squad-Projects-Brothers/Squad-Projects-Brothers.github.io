function escolherMesa() {
  var checkPedido = document.getElementById("valorTotalCarrinho").innerHTML;

  if (checkPedido === 'R$ 0,00') {
    $('pedido').modal('show');
  } else {
    var alerta = document.getElementById("alerta");
    alerta.style.display = "block";
  }
}
function fecharAlerta() {
  var alerta = document.getElementById("alerta");
  alerta.style.display = "none";
}
function verificaStorage() {
  let storage = localStorage.getItem("mesaEscolhida");
  if (storage === null) {
    addMesa();
    escolherMesa();
    fecharAlerta();
  } else {
    escolherMesa();
    fecharAlerta();
  }
}
function addMesa() {
  let valor = document.getElementById("numeroMesa");
  localStorage.setItem("mesaEscolhida", valor.value);
  enviarPedidoParaCozinha();
}
