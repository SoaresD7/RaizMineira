window.addEventListener('DOMContentLoaded', () => {
  // Referência às telas de boas-vindas e principal
  const welcome = document.getElementById('welcome-screen');
  const main   = document.getElementById('main-screen');

  if (welcome && main) {
    // Troca de telas após 4 segundos
    setTimeout(() => {
      welcome.style.display = 'none';          // Esconde tela de boas-vindas
      main.classList.remove('hidden');         // Mostra tela principal
    }, 4000);

    // Redireciona ao clicar nos botões
    document.getElementById('btn-inserir-reserva')?.addEventListener('click', () => {
      window.location.href = '../Inser/Inserir.html';
    });

    document.getElementById('btn-cadastrar-reserva')?.addEventListener('click', () => {
      window.location.href = '../Cadastro/Cadastro.html';
    });

    document.getElementById('btn-ver-minhas-reservas')?.addEventListener('click', () => {
      window.location.href = '../Esqueceu/index.html';
    });
  }

  // Verifica se estamos na página de consultar reserva
  const form = document.getElementById('consultaForm');
  if (form) {
    const nome  = document.getElementById('nome');
    const cpf   = document.getElementById('cpf');
    const toast = document.getElementById('toast');
    const btnBack = document.getElementById('voltar-reservas');

    // Botão voltar para tela principal
    btnBack?.addEventListener('click', () => {
      window.location.href = '../UsarioTela.html';
    });

    // Evento de envio do formulário
    form.addEventListener('submit', e => {
      e.preventDefault();
      clearErrors();

      // Validação de nome
      if (!nome.value.trim()) {
        return setError('nomeError', 'Digite seu nome.');
      }

      // Validação de CPF (11 dígitos numéricos)
      if (!/^\d{11}$/.test(cpf.value)) {
        return setError('cpfError', 'Digite 11 dígitos numéricos.');
      }

      // Simula busca da reserva
      showToast('Buscando reserva...', 'success');

      setTimeout(() => {
        const encontrado = true; // Simulação de resultado

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

    // Mostra mensagem de erro em um campo
    function setError(id, msg) {
      document.getElementById(id).textContent = msg;
    }

    // Limpa todos os erros da tela
    function clearErrors() {
      document.querySelectorAll('.error').forEach(el => el.textContent = '');
    }

    // Exibe notificação estilo "toast"
    function showToast(message, tipo) {
      toast.textContent = message;
      toast.className = `toast show ${tipo}`;
      clearTimeout(toast.hideTimer);
      toast.hideTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }
});
