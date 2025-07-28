document.addEventListener('DOMContentLoaded', () => {
  const btnPagar = document.getElementById('btn-pagar');
  const alerta = document.getElementById('alerta');
  const fechar = document.getElementById('fechar-alerta');

  btnPagar.addEventListener('click', () => {
    alerta.classList.remove('hidden');
  });

  fechar.addEventListener('click', () => {
    alerta.classList.add('hidden');
  });
});
