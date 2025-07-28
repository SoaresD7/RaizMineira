// Aguarda carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
  // Referências aos elementos do formulário
  const form         = document.getElementById('reservaForm');
  const dataInput    = document.getElementById('data');
  const timeInput    = document.getElementById('hora');
  const listaIndispo = document.getElementById('listaIndisponiveis');
  const toast        = document.getElementById('toast');

  // Array para simular horários já reservados
  let reservedSlots = [];

  // Ao mudar a data, ajusta limites de horário e mostra indisponíveis
  dataInput.addEventListener('change', () => {
    clearErrors();             // limpa erros antigos
    timeInput.value = '';      
    listaIndispo.innerHTML = '';

    const val = dataInput.value;
    if (!val) return;

    const day = new Date(val).getDay();
    // Qui–Sáb
    if ([4,5,6].includes(day)) {
      timeInput.min = '11:00';
      timeInput.max = '23:59';
    }
    // Domingo
    else if (day === 0) {
      timeInput.min = '11:00';
      timeInput.max = '23:00';
    }
    // Outros dias sem restrição
    else {
      timeInput.min = '';
      timeInput.max = '';
    }

    // Simula slots já ocupados
    reservedSlots = ['12:00', '14:30', '19:00'];
    reservedSlots.forEach(h => {
      const li = document.createElement('li');
      li.textContent = `${h} — indisponível`;
      listaIndispo.appendChild(li);
    });
  });

  // Validação e submissão do formulário
  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();

    // Checa campos obrigatórios
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

    // Mostra “Verificando...”
    showToast('Verificando...', 'success');

    // Simula processo de cadastro
    setTimeout(() => {
      const sucesso = true; // troque pela sua lógica real

      if (sucesso) {
        showToast('Reserva cadastrada com sucesso!', 'success');
        // Após 2s, retorna à tela principal
        setTimeout(() => {
          window.location.href = '../Inicio/UsarioTela.html';
        }, 2000);
      } else {
        showToast('Erro ao cadastrar. Tente novamente.', 'error');
      }
    }, 2000);
  });

  // Exibe mensagem de erro em <span> específico
  function setError(id, msg) {
    document.getElementById(id).textContent = msg;
  }

  // Limpa todas as mensagens de erro
  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
  }

  // Controla o toast de feedback
  function showToast(message, tipo) {
    toast.textContent = message;
    toast.className = `toast show ${tipo}`;   // ex: "toast show success"
    clearTimeout(toast.hideTimer);
    toast.hideTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});
