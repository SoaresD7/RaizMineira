document.addEventListener('DOMContentLoaded', () => {
  const toast = document.getElementById('toast');
  const btnVoltar = document.getElementById('btnVoltar');

  // Dados simulados da reserva
  const reserva = {
    nome: 'João da Silva',
    cpf: '12345678901',
    data: '10/08/2025',
    hora: '19:30',
    qtdPessoas: 4,
    observacao: 'Mesa próxima à janela.'
  };

  function showToast(message, tipo) {
    toast.textContent = message;
    toast.className = `toast show ${tipo}`;
    clearTimeout(toast.hideTimer);
    toast.hideTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Carrega os dados direto ao abrir a página
  try {
    document.getElementById('nome').textContent = reserva.nome;
    document.getElementById('cpf').textContent = reserva.cpf;
    document.getElementById('data').textContent = reserva.data;
    document.getElementById('hora').textContent = reserva.hora;
    document.getElementById('qtdPessoas').textContent = reserva.qtdPessoas;
    document.getElementById('observacao').textContent = reserva.observacao;

    showToast('Reserva carregada com sucesso!', 'success');
  } catch (error) {
    showToast('Erro ao carregar reserva!', 'error');
  }

  // Ação do botão Voltar
  btnVoltar.addEventListener('click', () => {
    window.history.back();
  });
});
