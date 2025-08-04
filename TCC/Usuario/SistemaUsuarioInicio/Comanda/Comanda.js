document.addEventListener('DOMContentLoaded', () => {
  const alerta = document.getElementById('alerta-garcom');
  const fechar = document.getElementById('fechar-alerta');

  // Botão “OK” fecha o alerta
  fechar.addEventListener('click', () => {
    alerta.classList.add('hidden');
  });
});

// Função acionada ao clicar em “Chamar Garçom”
function chamarGarcom() {
  document.getElementById('alerta-garcom').classList.remove('hidden');
}
