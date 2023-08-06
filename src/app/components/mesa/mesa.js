function escolherMesa() {
  var checkPedido = document.getElementById("valorTotalCarrinho").innerHTML;

  if (checkPedido === 'R$ 0,00') {
    alert("é necessário ao menos um pedido");
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
  let storage = localStorage.getItem("mesaSetada");
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
  localStorage.setItem("mesaSetada", valor.value);
  enviarPedidoParaCozinha();
}
