const telaPrincipal = document.getElementById('tela-principal');

// Redirecionamento dos botões
window.abrirPagina = function(caminho) {
  window.location.href = caminho;
};


// Função para buscar o número de pedidos do localStorage
function atualizarContadorPedidos() {
  let pedidos = [];
  try {
    pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  } catch (e) {
    pedidos = [];
  }
  const contador = document.querySelector('.contador-pedidos');
  const notificacao = document.querySelector('.notificacao-pedidos');
  contador.textContent = pedidos.length;
  if (pedidos.length > 1) {
    notificacao.classList.add('ativa');
  } else {
    notificacao.classList.remove('ativa');
  }
}

window.abrirPaginaPedidos = function() {
  // Remove notificação ao clicar
  const notificacao = document.querySelector('.notificacao-pedidos');
  notificacao.classList.remove('ativa');
  window.location.href = './Pedidos/Pedidos.html';
};

// Atualiza o contador ao carregar a página
window.addEventListener('DOMContentLoaded', atualizarContadorPedidos);

document.querySelector('.logout').addEventListener('click', () => {
  window.location.href = './Bloqueio/Bloqueio.html';
});
