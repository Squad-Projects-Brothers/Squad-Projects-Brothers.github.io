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

            $('#modalitem1').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget) // Botão que acionou o modal
                var recipient = id.data('whatever') // Extrai informação dos atributos data-*
                // Se necessário, você pode iniciar uma requisição AJAX aqui e, então, fazer a atualização em um callback.
                // Atualiza o conteúdo do modal. Nós vamos usar jQuery, aqui. No entanto, você poderia usar uma biblioteca de data binding ou outros métodos.
                var modal = $(this)
                modal.find('.modal-title').text('Nova mensagem para ' + recipient)
                modal.find('.modal-body input').val(recipient)
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
