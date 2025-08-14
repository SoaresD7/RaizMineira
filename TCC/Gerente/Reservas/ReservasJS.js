

function voltar() {
  window.location.href = "../Main.html";
}

document.getElementById('btnEditar').addEventListener('click', function() {
  window.location.href = 'Editar/Adicionar/EditarReserva.html';
});

document.getElementById('btnCancelar').addEventListener('click', function() {
  // Lógica para cancelar reserva
});

document.getElementById('btnVoltar').addEventListener('click', function() {
  window.location.href = '../Main.html';
});

let reservasBanco = [];

async function carregarReservasAPI() {
  try {
    const resp = await fetch('http://localhost:8080/api/reservas/clientes');
    if (!resp.ok) throw new Error('Erro ao buscar reservas');
    reservasBanco = await resp.json();
    preencherTabelaReservas();
  } catch (e) {
    alert('Erro ao carregar reservas do banco!');
  }
}

function preencherTabelaReservas(filtro = '') {
  const corpo = document.getElementById('corpoTabelaReservas');
  corpo.innerHTML = '';
  const filtroLower = filtro.trim().toLowerCase();
  reservasBanco.forEach((reserva, idx) => {
    // Monta texto para filtro
    const textoReserva = `${reserva.clienteNome} ${reserva.idReserva} ${reserva.clienteCpf} ${reserva.clienteEmail} ${reserva.dataReserva} ${reserva.horaReserva} ${reserva.idMesa} ${reserva.lugares}`.toLowerCase();
    if (filtroLower && !textoReserva.includes(filtroLower)) return;
    const tr = document.createElement('tr');
    tr.classList.add('linha-reserva');
    tr.innerHTML = `
      <td>${reserva.clienteNome || ''}</td>
      <td>${reserva.idReserva || ''}</td>
      <td>${reserva.clienteCpf || ''}</td>
      <td>${reserva.clienteEmail || ''}</td>
      <td>${reserva.dataReserva || ''}</td>
      <td>${reserva.horaReserva || ''}</td>
      <td>Mesa ${reserva.idMesa || ''}</td>
      <td>${reserva.lugares || ''} pessoa${reserva.lugares > 1 ? 's' : ''}</td>
    `;
    tr.addEventListener('click', function() {
      document.querySelectorAll('.linha-reserva').forEach(l => l.classList.remove('selecionada'));
      tr.classList.add('selecionada');
    });
    corpo.appendChild(tr);
    // Linha divisória fina
    if (idx < reservasBanco.length - 1) {
      const divider = document.createElement('tr');
      divider.innerHTML = `<td colspan='8' style='padding:0;'><div class='linha-divisoria'></div></td>`;
      corpo.appendChild(divider);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  carregarReservasAPI();
  const barraPesquisa = document.getElementById('barraPesquisaReservas');
  if (barraPesquisa) {
    barraPesquisa.addEventListener('input', function() {
      preencherTabelaReservas(barraPesquisa.value);
    });
  }
});
