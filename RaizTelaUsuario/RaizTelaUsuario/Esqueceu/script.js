document.addEventListener('DOMContentLoaded', () => {
  const form  = document.getElementById('consultaForm');
  const nome  = document.getElementById('nome');
  const cpf   = document.getElementById('cpf');
  const toast = document.getElementById('toast');

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();

    if (!nome.value.trim()) {
      return setError('nomeError', 'Digite seu nome.');
    }
    if (!/^\d{11}$/.test(cpf.value)) {
      return setError('cpfError', 'Digite 11 dígitos numéricos.');
    }

    showToast('Buscando reserva...', 'success');

    setTimeout(() => {
      const encontrado = true; // Simulação

      if (encontrado) {
        showToast('Reserva encontrada!', 'success');
        // redirecione ou exiba detalhes aqui
      } else {
        showToast('Reserva não encontrada.', 'error');
      }
    }, 1500);
  });

  function setError(id, msg) {
    document.getElementById(id).textContent = msg;
  }

  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
  }

  function showToast(message, tipo) {
    toast.textContent = message;
    toast.className = `toast show ${tipo}`;
    clearTimeout(toast.hideTimer);
    toast.hideTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }
});
