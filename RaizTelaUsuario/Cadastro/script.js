document.addEventListener('DOMContentLoaded', () => {
  // Botão Voltar com ação
  document.getElementById('voltar-reservas')
    .addEventListener('click', () => window.history.back());

  const form         = document.getElementById('reservaForm');
  const dataInput    = document.getElementById('data');
  const timeInput    = document.getElementById('hora');
  const listaIndispo = document.getElementById('listaIndisponiveis');
  const toast        = document.getElementById('toast');

  let reservedSlots = [];

  dataInput.addEventListener('change', () => {
    clearErrors();
    timeInput.value = '';
    listaIndispo.innerHTML = '';
    const val = dataInput.value;
    if (!val) return;

    const day = new Date(val).getDay();
    if ([4,5,6].includes(day)) {
      timeInput.min = '11:00'; timeInput.max = '23:59';
    } else if (day === 0) {
      timeInput.min = '11:00'; timeInput.max = '23:00';
    } else {
      timeInput.min = ''; timeInput.max = '';
    }

    // Simulação de horários já reservados
    reservedSlots = ['12:00', '14:30', '19:00'];
    reservedSlots.forEach(h => {
      const li = document.createElement('li');
      li.textContent = `${h} — indisponível`;
      listaIndispo.appendChild(li);
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    clearErrors();

    if (!form.nome.value)      return setError('nomeError', 'Digite seu nome.');
    if (!form.cpf.value)       return setError('cpfError', 'Digite seu CPF.');
    if (!dataInput.value)      return setError('dataError', 'Escolha uma data.');
    if (!timeInput.value)      return setError('horaError', 'Escolha um horário.');
    if (reservedSlots.includes(timeInput.value)) {
      return setError('horaError', 'Horário indisponível.');
    }
    if (!form.pessoas.value)   return setError('pessoasError', 'Informe nº de pessoas.');
    if (!form.telefone.value)  return setError('telefoneError', 'Digite seu telefone.');
    if (!form.email.value)     return setError('emailError', 'Digite seu e‑mail.');

    showToast('Verificando...', 'success');

    let sucesso;
    try {
      sucesso = true;
    } catch {
      sucesso = false;
    }

    setTimeout(() => {
      if (sucesso) {
        showToast('Reserva cadastrada com sucesso!', 'success');
        setTimeout(() => {
          window.location.href = '../Inicio/UsarioTela.html';
        }, 2000);
      } else {
        showToast('Erro ao cadastrar. Tente novamente.', 'error');
      }
    }, 2000);
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
