// inserir.js (versão mínima)

// Aguarda carregamento do DOM
window.addEventListener('DOMContentLoaded', () => {
  const welcome = document.getElementById('welcome-screen');
  const main    = document.getElementById('main-screen');

  if (welcome && main) {
    // Após 4s, esconde a tela de boas-vindas e mostra a principal
    setTimeout(() => {
      welcome.style.display = 'none';
      main.classList.remove('hidden');
    }, 4000);

    // Redirecionamentos (insira suas URLs nos placeholders)
    document.getElementById('btn-inserir-reserva')?.addEventListener('click', () => {
      window.location.href = ''; // URL do seu Cardápio
    });

    document.getElementById('btn-cadastrar-reserva')?.addEventListener('click', () => {
      window.location.href = ''; // URL do Status dos Pedidos
    });

    document.getElementById('btn-ver-minhas-reservas')?.addEventListener('click', () => {
      window.location.href = ''; // URL da Comanda
    });
  }
});
