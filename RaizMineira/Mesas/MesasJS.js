
// Mock de status das mesas: livre, reserva, ocupado
// Exemplo: ["livre", "reserva", "ocupado", ...]

// Mock de dados das mesas
const mesas = Array.from({length: 24}, (_, i) => ({
  numero: i+1,
  status: "livre",
  // Para ocupado
  nome: "",
  pessoas: 0,
  // Para reserva
  reservaNome: "",
  reservaHorario: "",
  reservaObs: ""
}));
// Exemplo: mesas 2, 7 reservadas; 5, 10, 12 ocupadas
mesas[1].status = "reserva";
mesas[1].reservaNome = "Fernanda Dias";
mesas[1].reservaHorario = "13:30";
mesas[1].reservaObs = "Mesa na janela";
mesas[6].status = "reserva";
mesas[6].reservaNome = "Carlos Souza";
mesas[6].reservaHorario = "14:00";
mesas[6].reservaObs = "Aniversário";
mesas[4].status = "ocupado";
mesas[4].nome = "João Silva";
mesas[4].pessoas = 3;
mesas[9].status = "ocupado";
mesas[9].nome = "Maria Oliveira";
mesas[9].pessoas = 2;
mesas[11].status = "ocupado";
mesas[11].nome = "Ana Paula";
mesas[11].pessoas = 5;

function corMesa(status) {
  if (status === "livre") return "#43a047"; // verde
  if (status === "reserva") return "#f7a440"; // laranja
  if (status === "ocupado") return "#e53935"; // vermelho
  return "#ccc";
}

function renderizarMesas() {
  const grid = document.getElementById("grid-mesas");
  grid.innerHTML = "";
  mesas.forEach((mesa, i) => {
    const btn = document.createElement("button");
    btn.className = "mesa-botao";
    btn.style.background = corMesa(mesa.status);
    btn.innerHTML = `<span class='mesa-numero'>${mesa.numero}</span>`;
    btn.title = `Mesa ${mesa.numero} - ${mesa.status.charAt(0).toUpperCase() + mesa.status.slice(1)}`;
    btn.onclick = () => mostrarPainelMesa(i);
    grid.appendChild(btn);
  });
}

function mostrarPainelMesa(idx) {
  const painel = document.getElementById("painel-mesa");
  const mesa = mesas[idx];
  let html = `<h2>Mesa ${mesa.numero}</h2>`;
  if (mesa.status === "livre") {
    html += `<div class='mesa-status-livre'>Livre</div><p>Nenhuma ocupação ou reserva.</p>`;
  } else if (mesa.status === "ocupado") {
    html += `<div class='mesa-status-ocupado'>Ocupada</div>`;
    html += `<p><strong>Cliente:</strong> ${mesa.nome}</p>`;
    html += `<p><strong>Pessoas na mesa:</strong> ${mesa.pessoas}</p>`;
    html += `<p><em>Comanda em andamento...</em></p>`;
  } else if (mesa.status === "reserva") {
    html += `<div class='mesa-status-reserva'>Reservada</div>`;
    html += `<p><strong>Reserva para:</strong> ${mesa.reservaNome}</p>`;
    html += `<p><strong>Horário:</strong> ${mesa.reservaHorario}</p>`;
    html += `<p><strong>Observações:</strong> ${mesa.reservaObs}</p>`;
    html += `<button class='botao cancelar-reserva' onclick='cancelarReserva(${idx})'>Cancelar Reserva</button>`;
  }
  painel.innerHTML = html;
}

function cancelarReserva(idx) {
  mesas[idx].status = "livre";
  mesas[idx].reservaNome = "";
  mesas[idx].reservaHorario = "";
  mesas[idx].reservaObs = "";
  renderizarMesas();
  document.getElementById("painel-mesa").innerHTML = `<h2>Mesa ${mesas[idx].numero}</h2><div class='mesa-status-livre'>Livre</div><p>Nenhuma ocupação ou reserva.</p>`;
}

window.onload = renderizarMesas;
