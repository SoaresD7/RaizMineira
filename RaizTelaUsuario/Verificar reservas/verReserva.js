document.addEventListener('DOMContentLoaded', () => {
  // Simulação de dados da reserva (substitua por integração real)
  const reserva = {
    nome: 'João da Silva',
    cpf: '12345678901',
    data: '2025-08-10',
    hora: '19:30',
    qtdPessoas: 4,
    observacao: 'Mesa próxima à janela.'
  };

  document.getElementById('nome').value = reserva.nome;
  document.getElementById('cpf').value = reserva.cpf;
  document.getElementById('data').value = reserva.data;
  document.getElementById('hora').value = reserva.hora;
  document.getElementById('qtdPessoas').value = reserva.qtdPessoas;
  document.getElementById('observacao').value = reserva.observacao;

  // Toast de sucesso ao carregar
  showToast('Reserva carregada com sucesso!', 'success');

  function showToast(message, tipo) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${tipo}`;
    clearTimeout(toast.hideTimer);
    toast.hideTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }
});
