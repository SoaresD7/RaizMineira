// Quando tudo carregar
window.addEventListener('DOMContentLoaded', () => {
  const welcome = document.getElementById('welcome-screen');
  const main   = document.getElementById('main-screen');

  // Após 4 segundos (1s entrada + 2s exibição + 1s saída)
  setTimeout(() => {
    welcome.style.display = 'none';
    main.classList.remove('hidden');
  }, 4000);

 
  // Redirecionamentos para index.html
  document.getElementById('btn-inserir-reserva')
    .addEventListener('click', () => {
      window.location.href = '../Inser/Inserir.html';
    });

  document.getElementById('btn-cadastrar-reserva')
    .addEventListener('click', () => {
      window.location.href = '../Cadastro/Cadastro.html';
    });

  document.getElementById('btn-ver-minhas-reservas')
    .addEventListener('click', () => {
      window.location.href = 'index.html';
    });
});


