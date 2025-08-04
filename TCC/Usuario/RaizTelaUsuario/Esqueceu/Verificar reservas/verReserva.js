document.addEventListener('DOMContentLoaded', () => {
  const toast = document.getElementById('toast');
  const btnVoltar = document.getElementById('btnVoltar');
  const btnCancelar = document.getElementById('btnCancelar');
  const alerta = document.getElementById('alertaCancelar');
  const confirmar = document.getElementById('confirmarCancelar');
  const fechar = document.getElementById('fecharCancelar');

  // Simulação de dados da reserva (você pode substituir por dados reais depois)
  const reserva = {
    nome: 'João da Silva',
    cpf: '12345678901',
    numeroReserva: '000123', // <-- Número da reserva fixo, vindo do cadastro
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

  // Preencher os dados da reserva
  try {
    document.getElementById('numeroReserva').textContent = reserva.numeroReserva;
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

  // Botão Voltar
  btnVoltar.addEventListener('click', () => {
    window.history.back();
  });

  // Botão Cancelar abre o alerta
  btnCancelar.addEventListener('click', () => {
    alerta.style.display = 'flex';
  });

  // Confirmar cancelamento: mostrar alerta verde e redirecionar
  confirmar.addEventListener('click', () => {
    alerta.style.display = 'none';
    showToast('Reserva cancelada com sucesso!', 'success');
    setTimeout(() => {
      window.location.href = '../../Inicio/BoasVindas.html';
    }, 2000);
  });

  // Fechar alerta sem cancelar
  fechar.addEventListener('click', () => {
    alerta.style.display = 'none';
  });
});
