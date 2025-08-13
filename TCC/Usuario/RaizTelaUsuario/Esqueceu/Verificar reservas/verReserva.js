document.addEventListener('DOMContentLoaded', async function () {
  const nomeSpan = document.getElementById('nome');
  const cpfSpan = document.getElementById('cpf');
  const numeroReserva = document.getElementById('numeroReserva');
  const dataSpan = document.getElementById('data');
  const horaSpan = document.getElementById('hora');
  const qtdPessoasSpan = document.getElementById('qtdPessoas');
  const observacaoSpan = document.getElementById('observacao');

  const btnCancelar = document.getElementById('btnCancelar');
  const btnVoltar = document.getElementById('btnVoltar');
  const alertaCancelar = document.getElementById('alertaCancelar');
  const confirmarCancelar = document.getElementById('confirmarCancelar');
  const fecharCancelar = document.getElementById('fecharCancelar');
  const toast = document.getElementById('toast');

  let reservaId = null;

  const cpf = localStorage.getItem('cpfConsulta');
  if (!cpf) {
    showToast('CPF não encontrado. Faça login novamente.');
    return;
  }

  try {
    const clienteResp = await fetch(`http://localhost:8080/api/clientes/${cpf}`);
    if (clienteResp.ok) {
      const cliente = await clienteResp.json();
      nomeSpan.textContent = cliente.nome || '--';
      cpfSpan.textContent = cliente.cpf || '--';
    } else {
      nomeSpan.textContent = '--';
      cpfSpan.textContent = '--';
      showToast('Cliente não encontrado.');
    }
  } catch {
    nomeSpan.textContent = '--';
    cpfSpan.textContent = '--';
    showToast('Erro ao buscar cliente.');
  }

  try {
    const reservasResp = await fetch(`http://localhost:8080/api/reservas/cpf/${cpf}`);
    if (reservasResp.ok) {
      const reservas = await reservasResp.json();
      if (reservas.length > 0) {
        const reserva = reservas[0];
        reservaId = reserva.id;

        numeroReserva.textContent = reserva.id || '--';
        dataSpan.textContent = formatarData(reserva.data_reserva) || '--';
        horaSpan.textContent = reserva.hora_reserva || '--';
        qtdPessoasSpan.textContent = reserva.lugares || '--';
        observacaoSpan.textContent = reserva.observacao || '--';

        btnCancelar.disabled = false;
      } else {
        limparCampos();
        btnCancelar.disabled = true;
        showToast('Nenhuma reserva encontrada.');
      }
    } else {
      showToast('Erro ao buscar reservas.');
    }
  } catch {
    showToast('Erro ao buscar reservas.');
  }

  btnCancelar.addEventListener('click', function () {
    if (reservaId) {
      alertaCancelar.style.display = 'flex';
    }
  });

  confirmarCancelar.addEventListener('click', async function () {
    if (reservaId) {
      try {
        const delResp = await fetch(`http://localhost:8080/api/reservas/${reservaId}`, {
          method: 'DELETE',
        });
        if (delResp.ok) {
          limparCampos();
          btnCancelar.disabled = true;
          reservaId = null;
          showToast('Reserva cancelada com sucesso!');
        } else {
          showToast('Erro ao cancelar reserva.');
        }
      } catch {
        showToast('Erro ao cancelar reserva.');
      }
      alertaCancelar.style.display = 'none';
    }
  });

  fecharCancelar.addEventListener('click', function () {
    alertaCancelar.style.display = 'none';
  });

  btnVoltar.addEventListener('click', function () {
    window.location.href = '../Inicio/UsuarioTela.html';
  });

  function limparCampos() {
    numeroReserva.textContent = '--';
    dataSpan.textContent = '--';
    horaSpan.textContent = '--';
    qtdPessoasSpan.textContent = '--';
    observacaoSpan.textContent = '--';
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  }

  function formatarData(dataISO) {
    if (!dataISO) return null;
    const dataObj = new Date(dataISO);
    return dataObj.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  }
});
