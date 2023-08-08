// Obtém os elementos do DOM
const paymentModal = document.getElementById("paymentModal");
const confirmPaymentButton = document.getElementById("confirmPayment");
const closeModalButton = document.getElementById("closeModalButton");

function closeModalPamento() {
  const paymentModal = document.getElementById("paymentModal");
  const divsFilhas = paymentModal.querySelectorAll("div"); 

  for (let i = 0; i < divsFilhas.length; i++) {
    const divFilha = divsFilhas[i];
    divFilha.remove();
  }
}

function pagar() {
  const selectedOption = document.querySelector(
    'input[name="paymentOption"]:checked'
  );

  if (selectedOption) {
    const paymentMethod = selectedOption.value;

    switch (paymentMethod) {
      case "pix":
        alert("Pagamento confirmado via PIX");
        enviarPedidoParaCozinha()
        break;
      case "cartao":
        alert("Pagamento confirmado via cartão");
        enviarPedidoParaCozinha()
        break;
      case "dinheiro":
        alert("Pagamento confirmado em dinheiro");
        enviarPedidoParaCozinha()
        break;
      default:
        alert("Método de pagamento não reconhecido");
    }
  } else {
    alert("Selecione uma opção de pagamento");
  }
}

$(document.getElementById('collapseTwob')).ready(function () {
  // Quando o botão Paypal é clicado
  $('#collapseTwo').on('show.bs.collapse', function () {
    // Adicione aqui o código para alterar o menu
    console.log('Botão Paypal clicado');
  });

  // Quando o botão Credit card é clicado
  $('#collapseOne').on('show.bs.collapse', function () {
    // Adicione aqui o código para alterar o menu
    console.log('Botão Credit card clicado');
  });
});