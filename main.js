// Função para pré-carregar o conteúdo da página inicial
function preloadNavContent() {
  var url = "src/app/components/nav/nav.html";

  // Faz uma solicitação AJAX para buscar o conteúdo da página inicial
  $.ajax({
    url: url,
    type: "GET",
    success: function (response) {
      // Armazena o conteúdo da página inicial na variável
      document.getElementById("body-content").innerHTML = response;

      document
        .getElementById("openPedidoModal")
        .addEventListener("click", function () {
          $("#pedidoModal").modal("show");
        });

      $(".sidebar ul li").on("click", function () {
        $(".sidebar ul li.active").removeClass("active");
        $(this).addClass("active");
      });

      setMesaId();
      loadContent('src/app/components/cardapio/cardapio');
    },
    error: function (xhr, status, error) {
      console.log("Erro na solicitação AJAX:", error);
    },
  });
}

// Função para carregar o conteúdo da página
function loadContent(target) {
  var url = target + ".html";
  // Para outras páginas, faz uma solicitação AJAX para buscar o conteúdo correspondente
  $.ajax({
    url: url,
    type: "GET",
    success: function (response) {
      // Atualiza o conteúdo principal
      document.getElementById("main-content").innerHTML = response;
      pegaritens();

      document.addEventListener("DOMContentLoaded", function () {
        // Conteúdo totalmente carregado, adiciona a classe "fade-in" ao <body>
        document.body.classList.add("fade-in-body");
      
        // Após um pequeno atraso, remova a classe "fade-in" para exibir o conteúdo gradualmente
        setTimeout(function () {
          document.body.classList.remove("fade-in-body");
        }, 500); // Aguarde 500ms antes de remover a classe para mostrar o conteúdo gradualmente
      });
    },
    error: function (xhr, status, error) {
      console.log("Erro na solicitação AJAX:", error);
    },
  });
}

function loadPedidoContent() {
  var url = "src/app/components/pedido/pedido.html";

  // Faz uma solicitação AJAX para buscar o conteúdo do pedido.html
  $.ajax({
    url: url,
    type: "GET",
    success: function (response) {
      // Armazena o conteúdo do pedido.html na variável
      document.getElementById("modalContentCustom").innerHTML = response;
    },
    error: function (xhr, status, error) {
      console.log("Erro na solicitação AJAX:", error);
    },
  });
}

function loadMesaContent() {
  var url = "src/app/components/mesa/mesa.html";

  // Faz uma solicitação AJAX para buscar o conteúdo do pedido.html
  $.ajax({
    url: url,
    type: "GET",
    success: function (response) {
      // Armazena o conteúdo do pedido.html na variável
      document.getElementById("mesaMenu").innerHTML = response;
    },
    error: function (xhr, status, error) {
      console.log("Erro na solicitação AJAX:", error);
    },
  });
}

