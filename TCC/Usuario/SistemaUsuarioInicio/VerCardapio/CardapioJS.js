// Função para buscar e renderizar itens do cardápio
async function carregarCardapio() {
  // Troque a URL abaixo pela rota real da sua API
  const resp = await fetch('http://localhost:8080/api/cardapio');
  const itens = await resp.json();
  const lista = document.getElementById('cardapio-list');
  lista.innerHTML = '';
  // Mapeamento para nomes amigáveis das categorias
  const tipoLabel = {
    'entradas': 'Entradas',
    'pratosprincipais': 'Pratos Principais',
    'pratosvegetarianos': 'Pratos Vegetarianos',
    'sobrimesas': 'Sobremesas',
    'bebidas': 'Bebidas',
    'extras': 'Extras'
  };
  itens.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item-cardapio';
    div.dataset.category = item.tipo;
    div.innerHTML = `
      <div class="nome">${item.nome}</div>
      <div class="descricao">${item.descricao}</div>
      <div class="valor" data-price="${item.preco}">R$ ${Number(item.preco).toFixed(2).replace('.', ',')}</div>
      <div class="categoria">${tipoLabel[item.tipo] || item.tipo}</div>
      <div class="controls">
        <button class="del-item">-</button>
        <span class="quantity">0</span>
        <button class="add-item">+</button>
      </div>
    `;
    lista.appendChild(div);
  });
  aplicarListeners();
}

// Filtrar itens por categoria
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    document.querySelectorAll('.item-cardapio').forEach(item => {
      item.style.display = (category === 'all' || item.dataset.category === category)
        ? 'flex'
        : 'none';
    });
  });
});

function aplicarListeners() {
  const items = document.querySelectorAll('.item-cardapio');
  const totalPrice = document.getElementById('total-price');
  const voltarBtn = document.getElementById('voltar');
  const concluirBtn = document.getElementById('concluir');

  function atualizarTotal() {
    let soma = 0;
    items.forEach(item => {
      const qty = +item.querySelector('.quantity').textContent;
      const price = +item.querySelector('.valor').dataset.price;
      soma += qty * price;
    });
    totalPrice.textContent = `R$ ${soma.toFixed(2).replace('.', ',')}`;
  }

  voltarBtn.addEventListener('click', () => {
    window.location.href = '../Inicio/UsuarioTelaInicio.html';
  });

  items.forEach(item => {
    const btnAdd = item.querySelector('.add-item');
    const btnDel = item.querySelector('.del-item');
    const qtyEl = item.querySelector('.quantity');

    btnAdd.addEventListener('click', () => {
      qtyEl.textContent = +qtyEl.textContent + 1;
      atualizarTotal();
    });
    btnDel.addEventListener('click', () => {
      let v = +qtyEl.textContent;
      if (v > 0) {
        qtyEl.textContent = v - 1;
        atualizarTotal();
      }
    });
  });


  function showAlert(title, message, callback) {
    document.body.style.overflow = 'hidden';
    const overlay = document.createElement('div');
    overlay.className = 'alerta-personalizado';
    overlay.innerHTML = `
      <div class="caixa-alerta">
        <h2>${title}</h2>
        <p>${message}</p>
        <button id="btn-fechar-alerta">OK</button>
      </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));

    overlay.querySelector('#btn-fechar-alerta').addEventListener('click', () => {
      overlay.classList.remove('visible');
      overlay.addEventListener('transitionend', () => {
        overlay.remove();
        document.body.style.overflow = '';
        if (callback) callback();
      }, { once: true });
    });
  }

  concluirBtn.addEventListener('click', () => {
    showAlert('Pedido Concluído!', `Total do pedido: <strong>${totalPrice.textContent}</strong>`, () => {
      window.location.href = '../Comanda/Comanda.html';
    });
  });

  atualizarTotal();
}

document.addEventListener('DOMContentLoaded', carregarCardapio);
