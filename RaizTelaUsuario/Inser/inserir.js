// Executa quando todo o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  // Pega referências aos elementos da tela
  const form     = document.getElementById('inserirForm');
  const cpfInput = document.getElementById('cpf');
  const resInput = document.getElementById('reserva');
  const toast    = document.getElementById('toast');

  // Evento de submit do formulário
  form.addEventListener('submit', e => {
    e.preventDefault();      // Previne recarregamento padrão
    clearErrors();           // Limpa mensagens de erro anteriores

    // Validação do CPF: deve conter exatamente 11 dígitos numéricos
    if (!/^\d{11}$/.test(cpfInput.value)) {
      return setError('cpfError', 'Digite 11 dígitos numéricos.');
    }

    // Validação do número da reserva: não pode ficar em branco
    if (!resInput.value.trim()) {
      return setError('reservaError', 'Informe o número da reserva.');
    }

    // Exibe um toast de “Verificando...”
    showToast('Verificando...', 'success');

    // Simula chamada ao servidor (1.5s)
    setTimeout(() => {
      const sucesso = true; // Aqui você integra sua lógica real

      if (sucesso) {
        // Reserva inserida
        showToast('Reserva inserida com sucesso!', 'success');
        // Após 2s, redireciona (substitua pelo seu arquivo real)
        setTimeout(() => {
          window.location.href = 'pagina-sucesso.html';
        }, 2000);
      } else {
        // Erro ao inserir
        showToast('Erro ao inserir. Tente novamente.', 'error');
      }
    }, 1500);
  });

  // Mostra mensagem de erro em um <span> com id fornecido
  function setError(id, msg) {
    document.getElementById(id).textContent = msg;
  }

  // Limpa todas as mensagens de erro da tela
  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
  }

  // Exibe um toast com texto e tipo (success ou error)
  function showToast(message, tipo) {
    toast.textContent = message;
    toast.className   = `toast show ${tipo}`;  // adiciona classes CSS
    clearTimeout(toast.hideTimer);              // limpa timeout anterior
    // Após 3s, esconde o toast
    toast.hideTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});
