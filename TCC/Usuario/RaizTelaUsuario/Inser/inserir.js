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

  form.addEventListener('submit', async function (e) {
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
      // Valida no banco de dados via API
      try {
        const resp = await fetch(`http://localhost:8080/api/reservas?cpf=${cpf}`);
        if (resp.ok) {
          const reservas = await resp.json();
          // Procura reserva com código igual ao digitado
          const reservaEncontrada = reservas.find(r => String(r.codigoReserva || r.codigo_reserva) === reserva);
          if (reservaEncontrada) {
            showToast('Reserva validada com sucesso!', 'success');
            setTimeout(() => {
              window.location.href = '../../SistemaUsuarioInicio/Inicio/Inicio.html';
            }, 2600);
          } else {
            document.getElementById('reservaError').textContent = 'Código de reserva não encontrado para este CPF.';
            showToast('Código de reserva inválido.', 'error');
          }
        } else {
          showToast('Erro ao consultar reserva.', 'error');
        }
      } catch {
        showToast('Erro de conexão com a API.', 'error');
      }
    } else {
      showToast('Corrija os erros e tente novamente.', 'error');
    }
  });

  btnVoltar.addEventListener('click', () => {
    window.location.href = '../Inicio/UsuarioTela.html';
  });
});
