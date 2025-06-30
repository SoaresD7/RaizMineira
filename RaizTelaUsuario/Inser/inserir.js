document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('inserirForm');
  const cpfInput  = document.getElementById('cpf');
  const resInput  = document.getElementById('reserva');
  const toast     = document.getElementById('toast');
  const btnBack   = document.getElementById('voltar-reservas');

  // Voltar
  btnBack.addEventListener('click', () => window.history.back());

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();

    // Valida CPF (11 dígitos numéricos)
    if (!/^\d{11}$/.test(cpfInput.value)) {
      return setError('cpfError', 'Digite 11 dígitos numéricos.');
    }

    // Valida número de reserva
    if (!resInput.value.trim()) {
      return setError('reservaError', 'Informe o número da reserva.');
    }

    // Mostra “Verificando...”
    showToast('Verificando...', 'success');

    setTimeout(() => {
      const sucesso = true; // ajuste conforme sua lógica real

      if (sucesso) {
        showToast('Reserva inserida com sucesso!', 'success');
        
        // Redireciona após 2 segundos
        setTimeout(() => {
          window.location.href = 'pagina-sucesso.html'; // <- substitua pelo nome real da sua página
        }, 2000);

      } else {
        showToast('Erro ao inserir. Tente novamente.', 'error');
        // Nada acontece, a tela continua
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
