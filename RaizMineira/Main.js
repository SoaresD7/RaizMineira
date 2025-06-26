const telaPrincipal = document.getElementById('tela-principal');

// Redirecionamento dos botões
window.abrirPagina = function(caminho) {
  window.location.href = caminho;
};

window.abrirPaginaPedidos = function() {
  alert("Funcionalidade de Acompanhamento de Pedidos ainda não implementada.");
};

document.querySelector('.logout').addEventListener('click', () => {
  window.location.href = './Bloqueio/Bloqueio.html';
});
