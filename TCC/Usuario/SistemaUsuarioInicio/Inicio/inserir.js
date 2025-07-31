// inserir.js

window.addEventListener('DOMContentLoaded', () => {
  const welcome = document.getElementById('welcome-screen');
  const main = document.getElementById('main-screen');

  // Espera 4 segundos, troca as telas
  setTimeout(() => {
    if (welcome && main) {
      welcome.style.display = 'none';
      main.classList.remove('hidden');
    }
  }, 4000);

  // Botão: Ver Cardápio
  document.getElementById('btn-inserir-reserva')?.addEventListener('click', () => {
    window.location.href = '../VerCardapio/GerenciarCardapio.html';
  });

  // Botão: Status dos Pedidos
  document.getElementById('btn-cadastrar-reserva')?.addEventListener('click', () => {
    window.location.href = '../Pedido/TelastatusDoPedido.html';
  });

  // Botão: Ver Comanda
  document.getElementById('btn-ver-minhas-reservas')?.addEventListener('click', () => {
    window.location.href = '../Comanda/Comanda.html';
  });
});
