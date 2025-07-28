document.addEventListener('DOMContentLoaded', () => {
  function validarCPF(cpf) {
    const numeros = cpf.replace(/\D/g, '');
    return numeros.length === 11;
  }

  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => {
      toast.className = 'toast';
    }, 2500);
  }

  const form = document.getElementById('inserirForm');
  const btnVoltar = document.getElementById('btnVoltar');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const cpf = document.getElementById('cpf').value.trim();
    const reserva = document.getElementById('reserva').value.trim();
    let valid = true;

    // CPF
    if (!cpf) {
      document.getElementById('cpfError').textContent = 'CPF é obrigatório';
      valid = false;
    } else if (!validarCPF(cpf)) {
      document.getElementById('cpfError').textContent = 'CPF inválido (11 números).';
      valid = false;
    } else {
      document.getElementById('cpfError').textContent = '';
    }

    // Reserva
    if (!reserva) {
      document.getElementById('reservaError').textContent = 'Reserva é obrigatória';
      valid = false;
    } else if (!/^\d+$/.test(reserva)) {
      document.getElementById('reservaError').textContent = 'Só números.';
      valid = false;
    } else {
      document.getElementById('reservaError').textContent = '';
    }

    if (valid) {
      showToast('Reserva inserida com sucesso!', 'success');
      setTimeout(() => {
        window.location.href = '../../SistemaUsuarioInicio/Inicio/Inicio.html';
      }, 2600);
    } else {
      showToast('Corrija os erros e tente novamente.', 'error');
    }
  });

  btnVoltar.addEventListener('click', () => {
    window.location.href = '../Inicio/UsuarioTela.html';
  });
});