// Função para pré-carregar o conteúdo da página inicial
function preloadHomeContent() {
    var url = 'src/app/components/nav/nav.html';

    // Faz uma solicitação AJAX para buscar o conteúdo da página inicial
    $.ajax({
        url: url,
        type: 'GET',
        success: function (response) {
            // Armazena o conteúdo da página inicial na variável
            document.getElementById('body-content').innerHTML = response;

            document.getElementById('openPedidoModal').addEventListener('click', function () {
                $('#pedidoModal').modal('show');
            });

            $(".sidebar ul li").on('click', function () {
                $(".sidebar ul li.active").removeClass('active');
                $(this).addClass('active');
            });
    
        },
        error: function (xhr, status, error) {
            console.log('Erro na solicitação AJAX:', error);
        }
    });
}

// Função para carregar o conteúdo da página
function loadContent(target) {
    var url = target + '.html';
    // Para outras páginas, faz uma solicitação AJAX para buscar o conteúdo correspondente
    $.ajax({
        url: url,
        type: 'GET',
        success: function (response) {
            // Atualiza o conteúdo principal
            document.getElementById('main-content').innerHTML = response;
            pegaritens();
        },
        error: function (xhr, status, error) {
            console.log('Erro na solicitação AJAX:', error);

        }
    });
}

function loadPedidoContent() {
    var url = 'src/app/components/pedido/pedido.html';

    // Faz uma solicitação AJAX para buscar o conteúdo do pedido.html
    $.ajax({
        url: url,
        type: 'GET',
        success: function (response) {
            // Armazena o conteúdo do pedido.html na variável
            document.getElementById('modalContentCustom').innerHTML = response;
            
        },
        error: function (xhr, status, error) {
            console.log('Erro na solicitação AJAX:', error);
        }
    });
}
