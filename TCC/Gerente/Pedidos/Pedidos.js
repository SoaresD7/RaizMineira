// Lista de pedidos de exemplo (mock)
const pedidos = [
  {
    mesa: 5,
    nome: "João Silva",
    horario: "12:30",
    ordem: 1,
    status: "entregue",
    tempoPedido: 40, // minutos
    itens: [
      { tipo: "Prato Principal", nome: "Picanha na Chapa" },
      { tipo: "Bebida", nome: "Coca-Cola" },
      { tipo: "Acompanhamento", nome: "Batata Frita" },
      { tipo: "Especial", nome: "Molho da Casa" }
    ]
  },
  {
    mesa: 2,
    nome: "Maria Oliveira",
    horario: "12:35",
    ordem: 2,
    status: "atrasado",
    tempoPedido: 35,
    itens: [
      { tipo: "Prato Principal", nome: "Frango Grelhado" },
      { tipo: "Bebida", nome: "Suco de Laranja" },
      { tipo: "Acompanhamento", nome: "Salada" }
    ]
  },
  {
    mesa: 8,
    nome: "Carlos Souza",
    horario: "12:40",
    ordem: 3,
    status: "espera",
    tempoPedido: 10,
    itens: [
      { tipo: "Prato Principal", nome: "Hambúrguer Vegano" },
      { tipo: "Especial", nome: "Molho Barbecue" }
    ]
  },
  {
    mesa: 3,
    nome: "Ana Paula",
    horario: "12:45",
    ordem: 4,
    status: "espera",
    tempoPedido: 5,
    itens: [
      { tipo: "Prato Principal", nome: "Risoto de Camarão" },
      { tipo: "Bebida", nome: "Água com Gás" }
    ]
  },
  {
    mesa: 7,
    nome: "Pedro Lima",
    horario: "12:50",
    ordem: 5,
    status: "espera",
    tempoPedido: 2,
    itens: [
      { tipo: "Prato Principal", nome: "Lasanha" },
      { tipo: "Acompanhamento", nome: "Arroz Branco" },
      { tipo: "Especial", nome: "Queijo Extra" }
    ]
  },
  {
    mesa: 10,
    nome: "Lucas Martins",
    horario: "12:20",
    ordem: 6,
    status: "entregue",
    tempoPedido: 50,
    itens: [
      { tipo: "Prato Principal", nome: "Bife à Parmegiana" },
      { tipo: "Bebida", nome: "Refrigerante" }
    ]
  },
  {
    mesa: 12,
    nome: "Fernanda Dias",
    horario: "13:05",
    ordem: 7,
    status: "espera",
    tempoPedido: 15,
    itens: [
      { tipo: "Prato Principal", nome: "Filé de Tilápia" },
      { tipo: "Bebida", nome: "Chá Gelado" },
      { tipo: "Acompanhamento", nome: "Legumes Grelhados" }
    ]
  },
  {
    mesa: 4,
    nome: "Rafael Costa",
    horario: "13:10",
    ordem: 8,
    status: "atrasado",
    tempoPedido: 38,
    itens: [
      { tipo: "Prato Principal", nome: "Strogonoff de Frango" },
      { tipo: "Bebida", nome: "Guaraná" },
      { tipo: "Acompanhamento", nome: "Batata Palha" }
    ]
  }
];


function renderPedidos() {
  const lista = document.getElementById('lista-pedidos');
  lista.innerHTML = '';
  // Separar pedidos entregues dos demais
  let naoEntregues = pedidos.filter(p => p.status !== 'entregue');
  const entregues = pedidos.filter(p => p.status === 'entregue');
  // Ordenar por prioridade: atrasado > espera > outros, depois por tempoPedido desc
  naoEntregues = naoEntregues.sort((a, b) => {
    // Atrasado primeiro
    const getStatus = p => (p.status === 'atrasado' || (p.status === 'espera' && p.tempoPedido >= 30)) ? 2 : (p.status === 'espera' ? 1 : 0);
    const sa = getStatus(a);
    const sb = getStatus(b);
    if (sa !== sb) return sb - sa;
    // Depois, maior tempoPedido primeiro
    return b.tempoPedido - a.tempoPedido;
  });
  // Atribuir ordem de prioridade visual
  naoEntregues.forEach((p, i) => p._ordemPrioridade = i + 1);
  // Atrasados: status "atrasado" OU espera com tempo > 30min
  const renderItem = (pedido, status) => {
    if (status === undefined) status = pedido.status;
    if (status === 'espera' && pedido.tempoPedido >= 30) status = 'atrasado';
    const div = document.createElement('div');
    div.className = `pedido status-${status}`;
    // Conteúdo compacto (fechado)
    const tempoAtraso = (status === 'atrasado') ? `<span class="tempo-atraso">${pedido.tempoPedido} min</span>` : '';
    const cabecalhoCompacto = `
      <div class="pedido-cabecalho">
        <div class="pedido-info">
          ${pedido.status !== 'entregue' ? `<span><strong>#${pedido._ordemPrioridade}</strong></span>` : ''}
          <span>${pedido.horario}</span>
          <span>${pedido.nome}</span>
        </div>
        <span class="pedido-status">${status === 'atrasado' ? `<span style='display:flex;align-items:center;gap:4px;'><span style='font-weight:bold;'>Atrasado</span>${tempoAtraso}</span>` : (status === 'entregue' ? 'Entregue' : 'Em Espera')}</span>
      </div>
    `;
    // Conteúdo expandido: status ao lado do número do pedido
    const cabecalhoExpandido = `
      <div class="pedido-cabecalho">
        <div class="pedido-info">
          ${pedido.status !== 'entregue' ? `<span style="display: flex; align-items: center; gap: 8px;"><strong>#${pedido._ordemPrioridade}</strong><span class="pedido-status" style="position:static; margin-left:0;">${status === 'atrasado' ? `<span style='display:flex;align-items:center;gap:4px;'><span style='font-weight:bold;'>Atrasado</span><span class='tempo-atraso'>${pedido.tempoPedido} min</span></span>` : (status === 'entregue' ? 'Entregue' : 'Em Espera')}</span></span>` : ''}
          <span><strong>Nome:</strong> ${pedido.nome}</span>
          <span><strong>Horário:</strong> ${pedido.horario}</span>
          <span><strong>Mesa:</strong> ${pedido.mesa}</span>
          ${status === 'atrasado' ? `<span class='tempo-atraso' style='margin-left:8px;'><strong>Tempo em espera:</strong> ${pedido.tempoPedido} min</span>` : ''}
        </div>
      </div>
      <ul class="acompanhamentos">
        ${pedido.itens.map(a => `<li><strong>${a.tipo}:</strong> ${a.nome}</li>`).join('')}
      </ul>
    `;
    div.innerHTML = cabecalhoCompacto;
    div.addEventListener('click', function(e) {
      // Evita expandir vários ao clicar dentro do conteúdo
      if (!div.classList.contains('expandido')) {
        document.querySelectorAll('.pedido.expandido').forEach(el => {
          el.classList.remove('expandido');
          el.innerHTML = el.dataset.compacto;
        });
        div.classList.add('expandido');
        div.innerHTML = cabecalhoExpandido;
      } else {
        div.classList.remove('expandido');
        div.innerHTML = cabecalhoCompacto;
      }
    });
    // Salva o conteúdo compacto para restaurar ao fechar
    div.dataset.compacto = cabecalhoCompacto;
    lista.appendChild(div);
  };
  naoEntregues.forEach(pedido => {
    let status = pedido.status;
    if (status === 'espera' && pedido.tempoPedido >= 30) status = 'atrasado';
    renderItem(pedido, status);
  });
  entregues.forEach(pedido => {
    renderItem(pedido, 'entregue');
  });
}

// Salva apenas pedidos não entregues no localStorage para integração com Main
function salvarPedidosNoStorage() {
  const pedidosParaContador = pedidos.filter(p => {
    let status = p.status;
    if (status === 'espera' && p.tempoPedido >= 30) status = 'atrasado';
    return status !== 'entregue';
  });
  localStorage.setItem('pedidos', JSON.stringify(pedidosParaContador));
}

window.onload = function() {
  renderPedidos();
  salvarPedidosNoStorage();
};
