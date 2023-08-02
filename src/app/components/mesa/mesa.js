
function escolherMesa() {
    var alerta = document.getElementById("alerta");
    alerta.style.display = "block";

}

function fecharAlerta() {
    var alerta = document.getElementById("alerta");
    alerta.style.display = "none";
}
function verificaStorage(num) {
    let storage = localStorage.getItem('mesaSetada');
    if (storage === null) {
        addMesa(num)
        fecharAlerta();
    } else (
        alert('Você já selectionou uma mesa!')
    )
}
function addMesa(num) {
    let valor = num;
    if (localStorage.getItem("mesaSetada") === null) {
        historicoPedidos = { itens: [] }
    } else {
        historicoPedidos = JSON.parse(localStorage.getItem("mesaSetada"));
    }
    historicoPedidos.itens.push('valor: ' + valor);
    localStorage.setItem("mesaSetada", JSON.stringify(historicoPedidos));
}