// Função para pré-carregar o conteúdo da página inicial
function preloadHomeContent() {
  var url = "src/app/components/home/home.html";

  // Verifica se já existe uma mesa setada no localStorage
  var mesaEscolhida = localStorage.getItem("mesaEscolhida");
  if (mesaEscolhida) {
    // Redireciona para o aplicativo ou realiza a ação desejada
    preloadNavContent();
  } else {
    // Se ainda não houver uma mesa setada, busca o conteúdo da página inicial
    $.ajax({
      url: url,
      type: "GET",
      success: function (response) {
        // Armazena o conteúdo da página inicial na variável
        document.getElementById("body-content").innerHTML = response;

        // Adiciona a classe "show" para aplicar o efeito de fade-in
        setTimeout(function () {
          document.getElementById("preTela").classList.add("show");
        }, 1000); // Aguarda 1 segundo para aplicar o efeito

        // Adiciona evento de clique ao botão "Confirmar"
        var btnConfirmar = document.getElementById("btnConfirmar");
        btnConfirmar.addEventListener("click", function () {
          // Obtem o valor selecionado na lista suspensa (mesa escolhida)
          var mesaEscolhida = document.getElementById("mesas").value;

          // Adiciona a classe de animação para desaparecer à pré-tela
          var preTela = document.getElementById("preTela");
          preTela.classList.add("fade-out");

          // Armazena o valor da mesa em localStorage
          localStorage.setItem("mesaEscolhida", mesaEscolhida);

          // Redireciona para o aplicativo ou realiza a ação desejada
          setTimeout(function () {
            preloadNavContent();
          }, 1000);
        });
      },
      error: function (xhr, status, error) {
        console.log("Erro na solicitação AJAX:", error);
      },
    });
  }
}

function setMesaId() {
  const idMesa = localStorage.getItem("mesaEscolhida");
  document.getElementById("idMesa").innerHTML = "M: " + idMesa;
}
