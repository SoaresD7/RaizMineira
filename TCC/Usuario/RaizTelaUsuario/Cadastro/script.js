const duplas    = [[1,7],[6,12],[13,19],[18,24]];
const ocupadas  = [3,7,12,18,21];
let mesaSelecionada = null;

const descricoes = {
  1:"Perto da janela",2:"Canto aconchegante",3:"Ao lado do bar",4:"Próxima à saída",
  5:"Vista para jardim",6:"Mesa dupla central",7:"Perto do palco",8:"Ao fundo",
  9:"Próxima ao vitral",10:"Esquina iluminada",11:"Central VIP",12:"Ao lado do aquário",
  13:"Vista panorâmica",14:"Ambiente reservado",15:"Canto silencioso",16:"Perto da entrada",
  17:"Mesa familiar",18:"Junto ao buffet",19:"Central ampla",20:"Próxima às plantas",
  21:"Mesa comemorativa",22:"Ao lado do sofá",23:"Canto íntimo",24:"Em destaque"
};

const showToast = (msg,tipo) => {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${tipo}`;
  clearTimeout(t.hideTimer);
  t.hideTimer = setTimeout(() => t.className = 'toast', 3000);
};

const setError   = (id,msg) => document.getElementById(id).textContent = msg;
const clearError = id      => document.getElementById(id).textContent = '';

const btnSubmit  = document.getElementById('btn-submit'),
      inputHora  = document.getElementById('hora'),
      inputData  = document.getElementById('data');

// Valida horário de funcionamento
function validaHorario() {
  clearError('horaError');
  const d = inputData.value, h = inputHora.value;
  if (!d||!h) { btnSubmit.disabled = false; return; }

  const [Y,M,D]   = d.split('-').map(Number),
        [H,Min]   = h.split(':').map(Number),
        weekday   = new Date(Y,M-1,D,H,Min).getDay();

  let ok = weekday === 0
    ? (H>12&&H<23)||(H===13&&Min>=0)||(H===23&&Min===0)
    : (H>12&&H<=23)||(H===13&&Min>=0);

  if (!ok) {
    setError('horaError','Fora do horário de funcionamento');
    btnSubmit.disabled = true;
    inputHora.style.color = 'var(--cinza-info)';
  } else {
    btnSubmit.disabled = false;
    inputHora.style.color = '';
  }
}

inputHora.addEventListener('change', validaHorario);
inputData.addEventListener('change', validaHorario);

// Voltar sempre para index.html
document.getElementById('btnVoltar').onclick = () => {
  window.location.href = '../Inicio/UsuarioTela.html';
};

// Abre popup de escolha de mesa
document.getElementById('btn-escolher-mesa').onclick = () => {
  document.getElementById('popup-mesas').classList.remove('hidden');
  renderGrid();
  document.getElementById('mesa-info').style.display = 'none';
};

// Fecha popup
document.getElementById('btn-fechar-popup').onclick = () => {
  document.getElementById('popup-mesas').classList.add('hidden');
};

function isDupla(n) {
  return duplas.some(pair => pair.includes(n));
}

function renderGrid() {
  const grid = document.getElementById('grid-mesas');
  grid.innerHTML = '';
  for (let i = 1; i <= 24; i++) {
    if (duplas.some(p => p[1] === i)) continue;
    const btn = document.createElement('button');
    btn.dataset.num = i;
    btn.className  = 'btn-mesa';
    if (isDupla(i)) btn.classList.add('dupla');
    if (ocupadas.includes(i)) {
      btn.classList.add('ocupada');
      btn.disabled = true;
    }
    btn.onclick = () => {
      document.querySelectorAll('.btn-mesa').forEach(x => x.classList.remove('selecionada'));
      btn.classList.add('selecionada');
      mesaSelecionada = i;
      document.getElementById('mesa-info').style.display = 'block';

      document.getElementById('status-mesa').textContent =
        ocupadas.includes(i) ? 'Ocupada'
      : isDupla(i)           ? 'Mesa dupla'
                             : 'Mesa simples';

      document.getElementById('descricao-mesa').textContent = descricoes[i];

      const sel = document.getElementById('qtd-lugares');
      sel.value = '';
      Array.from(sel.options).forEach(o => {
        o.style.display = (o.value>4 && !isDupla(i)) ? 'none' : '';
      });
    };
    grid.appendChild(btn);
  }
}

// Confirma seleção de mesa
document.getElementById('btn-confirmar-mesa').onclick = () => {
  const qtd = document.getElementById('qtd-lugares').value;
  if (!mesaSelecionada || !qtd) {
    setError('mesaError','Selecione mesa e lugares');
    return;
  }
  document.getElementById('btn-escolher-mesa').textContent =
    `Mesa ${mesaSelecionada} (${qtd})`;
  document.getElementById('popup-mesas').classList.add('hidden');
  clearError('mesaError');
};

// Ao enviar o formulário, redireciona para outro index.html
document.getElementById('reservaForm').addEventListener('submit', e => {
  e.preventDefault();
  ['nomeError','cpfError','emailError','telefoneError','dataError','horaError','mesaError']
    .forEach(clearError);

  let ok = true,
      v  = id => document.getElementById(id).value.trim();

  if (!v('nome')) {
    setError('nomeError','Digite seu nome'); ok = false;
  }
  if (!/^\d{11}$/.test(v('cpf').replace(/\D/g,''))) {
    setError('cpfError','CPF inválido'); ok = false;
  }
  if (!/\S+@\S+\.\S+/.test(v('email'))) {
    setError('emailError','E-mail inválido'); ok = false;
  }
  if (!v('telefone')) {
    setError('telefoneError','Digite seu telefone'); ok = false;
  }
  if (!v('data')) {
    setError('dataError','Escolha a data'); ok = false;
  }
  if (!v('hora')) {
    setError('horaError','Escolha o horário'); ok = false;
  }
  if (!mesaSelecionada) {
    setError('mesaError','Selecione mesa'); ok = false;
  }
  if (!ok) {
    showToast('Corrija os erros','error');
    return;
  }

  showToast('Confirmando reserva...','success');
  setTimeout(() => {
    // Redireciona após sucesso
    window.location.href = '../Esqueceu/index.html';
  }, 1200);
});
