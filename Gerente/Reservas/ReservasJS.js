
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

const reservasExemplo = [
  { nome: 'Exemplo 1', numero: '12345678', cpf: '11111111111', email: 'exemplo1@gmail.com', mesa: 1, data: '2025-06-26', hora: '12:00', pessoas: 2, status: 'Confirmado' },
  { nome: 'Exemplo 2', numero: '23456789', cpf: '22222222222', email: 'exemplo2@gmail.com', mesa: 5, data: '2025-06-26', hora: '13:30', pessoas: 4, status: 'Confirmado' },
  { nome: 'Exemplo 3', numero: '34567890', cpf: '33333333333', email: 'exemplo3@gmail.com', mesa: 12, data: '2025-06-27', hora: '15:00', pessoas: 1, status: 'Confirmado' },
  { nome: 'Exemplo 4', numero: '45678901', cpf: '44444444444', email: 'exemplo4@gmail.com', mesa: 8, data: '2025-06-27', hora: '16:45', pessoas: 3, status: 'Confirmado' },
  { nome: 'Exemplo 5', numero: '56789012', cpf: '55555555555', email: 'exemplo5@gmail.com', mesa: 17, data: '2025-06-28', hora: '18:00', pessoas: 2, status: 'Confirmado' },
  { nome: 'Exemplo 6', numero: '67890123', cpf: '66666666666', email: 'exemplo6@gmail.com', mesa: 24, data: '2025-06-28', hora: '19:30', pessoas: 4, status: 'Confirmado' },
  { nome: 'Exemplo 7', numero: '78901234', cpf: '77777777777', email: 'exemplo7@gmail.com', mesa: 3, data: '2025-06-29', hora: '12:00', pessoas: 1, status: 'Confirmado' },
  { nome: 'Exemplo 8', numero: '89012345', cpf: '88888888888', email: 'exemplo8@gmail.com', mesa: 15, data: '2025-06-29', hora: '13:45', pessoas: 2, status: 'Confirmado' },
  { nome: 'Exemplo 9', numero: '90123456', cpf: '99999999999', email: 'exemplo9@gmail.com', mesa: 21, data: '2025-06-29', hora: '15:30', pessoas: 3, status: 'Confirmado' },
  { nome: 'Exemplo 10', numero: '10234567', cpf: '10101010101', email: 'exemplo10@gmail.com', mesa: 10, data: '2025-06-29', hora: '17:00', pessoas: 4, status: 'Confirmado' },
  { nome: 'Exemplo 11', numero: '11234567', cpf: '11111111112', email: 'exemplo11@gmail.com', mesa: 7, data: '2025-06-29', hora: '18:30', pessoas: 2, status: 'Confirmado' },
  { nome: 'Exemplo 12', numero: '12234567', cpf: '12121212121', email: 'exemplo12@gmail.com', mesa: 19, data: '2025-06-29', hora: '20:45', pessoas: 3, status: 'Confirmado' }
];

function preencherTabelaReservas(filtro = '') {
  const corpo = document.getElementById('corpoTabelaReservas');
  corpo.innerHTML = '';
  const filtroLower = filtro.trim().toLowerCase();
  reservasExemplo.forEach((reserva, idx) => {
    // Verifica se algum campo contém o filtro
    const textoReserva = `${reserva.nome} ${reserva.numero} ${reserva.cpf} ${reserva.email} ${reserva.data} ${reserva.hora} ${reserva.mesa} ${reserva.pessoas}`.toLowerCase();
    if (filtroLower && !textoReserva.includes(filtroLower)) return;
    const tr = document.createElement('tr');
    tr.classList.add('linha-reserva');
    tr.innerHTML = `
      <td>${reserva.nome}</td>
      <td>${reserva.numero}</td>
      <td>${reserva.cpf}</td>
      <td>${reserva.email}</td>
      <td>${reserva.data}</td>
      <td>${reserva.hora}</td>
      <td>Mesa ${reserva.mesa}</td>
      <td>${reserva.pessoas} pessoa${reserva.pessoas > 1 ? 's' : ''}</td>
    `;
    tr.addEventListener('click', function() {
      document.querySelectorAll('.linha-reserva').forEach(l => l.classList.remove('selecionada'));
      tr.classList.add('selecionada');
    });
    corpo.appendChild(tr);
    // Linha divisória fina
    if (idx < reservasExemplo.length - 1) {
      const divider = document.createElement('tr');
      divider.innerHTML = `<td colspan='8' style='padding:0;'><div class='linha-divisoria'></div></td>`;
      corpo.appendChild(divider);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  preencherTabelaReservas();
  const barraPesquisa = document.getElementById('barraPesquisaReservas');
  if (barraPesquisa) {
    barraPesquisa.addEventListener('input', function() {
      preencherTabelaReservas(barraPesquisa.value);
    });
  }
});
