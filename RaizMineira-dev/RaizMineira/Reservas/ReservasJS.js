function voltar() {
  window.location.href = "../Main.html";
}

document.getElementById('btnAdicionar').addEventListener('click', function() {
  window.location.href = 'Editar/Adicionar/AdicionarReserva.html';
});

document.getElementById('btnEditar').addEventListener('click', function() {
  window.location.href = 'Editar/Adicionar/EditarReserva.html';
});

document.getElementById('btnCancelar').addEventListener('click', function() {
  // Lógica para cancelar reserva
});

document.getElementById('btnVoltar').addEventListener('click', function() {
  window.location.href = '../Main.html';
});

reserva = { nome: "João", numero: 1, mesa: 5, data: "2023-10-01", hora: "19:00", status: "confirmada" }

// Exemplo de reservas geradas conforme solicitado (12 reservas)
const reservasExemplo = [
  { nome: 'Exemplo 1', numero: '12345678', mesa: 1, data: '2025-06-26', hora: '12:00', status: 'Confirmado' },
  { nome: 'Exemplo 2', numero: '23456789', mesa: 5, data: '2025-06-26', hora: '13:30', status: 'Confirmado' },
  { nome: 'Exemplo 3', numero: '34567890', mesa: 12, data: '2025-06-27', hora: '15:00', status: 'Confirmado' },
  { nome: 'Exemplo 4', numero: '45678901', mesa: 8, data: '2025-06-27', hora: '16:45', status: 'Confirmado' },
  { nome: 'Exemplo 5', numero: '56789012', mesa: 17, data: '2025-06-28', hora: '18:00', status: 'Confirmado' },
  { nome: 'Exemplo 6', numero: '67890123', mesa: 24, data: '2025-06-28', hora: '19:30', status: 'Confirmado' },
  { nome: 'Exemplo 7', numero: '78901234', mesa: 3, data: '2025-06-29', hora: '12:00', status: 'Confirmado' },
  { nome: 'Exemplo 8', numero: '89012345', mesa: 15, data: '2025-06-29', hora: '13:45', status: 'Confirmado' },
  { nome: 'Exemplo 9', numero: '90123456', mesa: 21, data: '2025-06-29', hora: '15:30', status: 'Confirmado' },
  { nome: 'Exemplo 10', numero: '10234567', mesa: 10, data: '2025-06-29', hora: '17:00', status: 'Confirmado' },
  { nome: 'Exemplo 11', numero: '11234567', mesa: 7, data: '2025-06-29', hora: '18:30', status: 'Confirmado' },
  { nome: 'Exemplo 12', numero: '12234567', mesa: 19, data: '2025-06-29', hora: '20:45', status: 'Confirmado' }
];

function preencherTabelaReservas() {
  const corpo = document.getElementById('corpoTabelaReservas');
  corpo.innerHTML = '';
  reservasExemplo.forEach((reserva, idx) => {
    const tr = document.createElement('tr');
    tr.classList.add('linha-reserva');
    tr.innerHTML = `
      <td>${reserva.nome}</td>
      <td>${reserva.numero}</td>
      <td>${reserva.mesa}</td>
      <td>${reserva.data}</td>
      <td>${reserva.hora}</td>
      <td>${reserva.status}</td>
    `;
    tr.addEventListener('click', function() {
      document.querySelectorAll('.linha-reserva').forEach(l => l.classList.remove('selecionada'));
      tr.classList.add('selecionada');
    });
    corpo.appendChild(tr);
    // Linha divisória fina
    if (idx < reservasExemplo.length - 1) {
      const divider = document.createElement('tr');
      divider.innerHTML = `<td colspan='6' style='padding:0;'><div class='linha-divisoria'></div></td>`;
      corpo.appendChild(divider);
    }
  });
}

document.addEventListener('DOMContentLoaded', preencherTabelaReservas);
