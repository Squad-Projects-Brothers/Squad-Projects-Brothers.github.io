function escolherMesa() {
    var alerta = document.getElementById("alerta");
    alerta.style.display = "block";

}

function fecharAlerta() {
    var alerta = document.getElementById("alerta");
    alerta.style.display = "none";
}
function verificaStorage() {
    let storage = localStorage.getItem('mesaSetada');
    if (storage === null) {
        escolherMesa()
        addMesa()
        fecharAlerta()
    } else {

    }
}
function addMesa() {
    let valor = document.getElementById("numeroMesa");
    localStorage.setItem("mesaSetada", valor.value);
    enviarPedidoParaCozinha()
}