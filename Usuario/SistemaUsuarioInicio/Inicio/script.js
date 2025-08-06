window.addEventListener('DOMContentLoaded', () => {
  // Botão “Ver Cardápio” → vai para inserir/index.html
  document.getElementById('btn-inserir-reserva')?.addEventListener('click', () => {
    window.location.href = '../VerCardapio/GerenciarCardapio.html';
  });

  // Botão “Status dos Pedidos” → vai para cadastro/index.html
  document.getElementById('btn-cadastrar-reserva')?.addEventListener('click', () => {
    window.location.href = '../Pedido/TelastatusDoPedido.html';
  });

  // Botão “Ver Minha Comanda” → vai para comanda/index.html
  document.getElementById('btn-ver-minhas-reservas')?.addEventListener('click', () => {
    window.location.href = '../Comanda/Comanda.html';
  });

  // Se tiver o formulário de consulta nesta mesma página...
  const form = document.getElementById('consultaForm');
  if (!form) return;

  const nome    = document.getElementById('nome');
  const cpf     = document.getElementById('cpf');
  const toast   = document.getElementById('toast');
  const btnBack = document.getElementById('voltar-reservas');

  // Botão Voltar → retorna ao menu principal (index.html)
  btnBack?.addEventListener('click', () => {
    window.location.href = '../index.html';
  });

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
      const encontrado = true; // simulação
      if (encontrado) {
        showToast('Reserva encontrada!', 'success');
        setTimeout(() => {
          window.location.href = 'detalhes-reserva.html';
        }, 2000);
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
