let mesas = [];
let reservas = [];

async function carregarMesas() {
  try {
    const resp = await fetch('http://localhost:8080/api/mesas'); // Troque pela URL real da sua API
    mesas = await resp.json();
    // Busca reservas do dia com dados completos do cliente
    const respReservas = await fetch('http://localhost:8080/api/reservas/clientes'); // Novo endpoint
    reservas = await respReservas.json();
    renderizarMesas();
  } catch (e) {
    alert('Erro ao carregar mesas do banco de dados!');
  }
}

function corMesa(status) {
  if (status === "DISPONIVEL") return "#43a047"; // verde
  if (status === "RESERVADA") return "#f7a440"; // laranja
  if (status === "OCUPADA") return "#ffe066"; // amarelo
  return "#ccc";
}

function renderizarMesas() {
  const grid = document.getElementById("grid-mesas");
  grid.innerHTML = "";
  mesas.forEach((mesa, i) => {
    // Verifica status real da mesa pela reserva
    const mesaIdNum = Number(mesa.id ?? mesa.numero);
    const reservaMesa = reservas.find(r => {
      const idMesa = Number(r.idMesa ?? r.mesaId ?? r.id_mesa);
      return idMesa === mesaIdNum && (r.status === 'AGENDADA' || r.status === 'OCUPADA');
    });
    let statusReal;
    if (reservaMesa) {
      statusReal = reservaMesa.status === 'OCUPADA' ? 'OCUPADA' : 'RESERVADA';
    } else {
      statusReal = 'DISPONIVEL';
    }
    const btn = document.createElement("button");
    btn.className = "mesa-botao";
    btn.style.background = corMesa(statusReal);
    btn.innerHTML = `<span class='mesa-numero'>${mesa.numero}</span>`;
    btn.title = `Mesa ${mesa.numero} - ${statusReal}`;
    btn.onclick = () => mostrarPainelMesa(i);
    grid.appendChild(btn);
  });
}

function mostrarPainelMesa(idx) {
  const painel = document.getElementById("painel-mesa");
  const mesa = mesas[idx];
  let html = `<h2>Mesa ${mesa.numero}</h2>`;
  const mesaIdNum = Number(mesa.id ?? mesa.numero);
  // Busca reserva AGENDADA ou OCUPADA para esta mesa
  const reservaMesa = reservas.find(r => {
    const idMesa = Number(r.idMesa ?? r.mesaId ?? r.id_mesa);
    return idMesa === mesaIdNum && (r.status === 'AGENDADA' || r.status === 'OCUPADA');
  });

  if (reservaMesa) {
    if (reservaMesa.status === 'AGENDADA') {
      html += `<div class='mesa-status-reserva'>Reservada</div>`;
    } else {
      html += `<div class='mesa-status-ocupado'>Ocupada</div>`;
    }
    html += `<p><strong>Cliente:</strong> ${reservaMesa.clienteNome || ''}</p>`;
    html += `<p><strong>CPF:</strong> ${reservaMesa.clienteCpf || ''}</p>`;
    html += `<p><strong>Email:</strong> ${reservaMesa.clienteEmail || ''}</p>`;
    html += `<p><strong>Telefone:</strong> ${reservaMesa.clienteTelefone || ''}</p>`;
    html += `<p><strong>Data:</strong> ${reservaMesa.dataReserva || ''}</p>`;
    html += `<p><strong>Horário:</strong> ${reservaMesa.horaReserva || ''}</p>`;
    html += `<p><strong>Lugares:</strong> ${reservaMesa.lugares}</p>`;
  } else {
    html += `<div class='mesa-status-livre'>Livre</div><p>Nenhuma ocupação ou reserva.</p>`;
  }
  painel.innerHTML = html;
}

// Função de cancelar reserva pode ser implementada conforme integração futura

window.onload = carregarMesas;
