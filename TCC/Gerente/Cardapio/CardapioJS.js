// Modal personalizado para alertas e confirmações
function showModal(msg, confirmCallback, cancelCallback, confirmText = 'Confirmar', cancelText = 'Cancelar') {
  let modal = document.getElementById('custom-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'custom-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.25)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    document.body.appendChild(modal);
  }
  modal.innerHTML = `<div style="background:#fff8e1; border-radius:14px; box-shadow:0 2px 16px #f7a44444; padding:2rem 2.5rem; min-width:300px; text-align:center;">
    <div style="font-size:1.15rem; color:#a66c00; margin-bottom:1.5rem;">${msg}</div>
    <div style="display:flex; gap:1rem; justify-content:center;">
    <button id="modal-confirm" style="background:#f7a444; color:#fff; border:2px solid #f7a444; border-radius:8px; padding:0.7rem 1.5rem; font-weight:bold; font-size:1rem; box-shadow:0 0 8px #f7a444; cursor:pointer;">${confirmText}</button>
    <button id="modal-cancel" style="background:#fff3e0; color:#a66c00; border:0px solid #fedcac; border-radius:0px; padding:0rem 0rem; font-size:1rem;">${cancelText}</button>
    </div>
  </div>`;
  modal.style.display = 'flex';
  document.getElementById('modal-confirm').onclick = () => {
    modal.style.display = 'none';
    if (confirmCallback) confirmCallback();
  };
  document.getElementById('modal-cancel').onclick = () => {
    modal.style.display = 'none';
    if (cancelCallback) cancelCallback();
  };
}
function voltar() {
  window.location.href = "../Main.html";
}

// Função para carregar os itens do cardápio do backend
async function carregarCardapio() {
  const painel = document.querySelector('.linha-cardapio');
  painel.innerHTML = '<p>Carregando...</p>';
  try {
  const resp = await fetch('http://localhost:8080/api/cardapio');
    const itens = await resp.json();
    painel.innerHTML = '';
    // Adiciona os botões de filtro dinamicamente com nomes amigáveis
    const filtroContainer = document.querySelector('.filtro-tags > div');
    if (filtroContainer && !filtroContainer.querySelector('.filter-btn')) {
      filtroContainer.innerHTML = `
        <button class="botao filter-btn" data-category="todos" style="background:#f7a444; color:#fff;">Todos</button>
        <button class="botao filter-btn" data-category="entradas">Entradas</button>
        <button class="botao filter-btn" data-category="pratosprincipais">Pratos principais</button>
        <button class="botao filter-btn" data-category="pratosvegetarianos">Pratos vegetarianos</button>
        <button class="botao filter-btn" data-category="sobrimesas">Sobrimesas</button>
        <button class="botao filter-btn" data-category="bebidas">Bebidas</button>
        <button class="botao filter-btn" data-category="extras">Extras</button>
      `;
    }
    // Mapeamento para nomes amigáveis das categorias
    const tipoLabel = {
      'entradas': 'Entradas',
      'pratosprincipais': 'Pratos principais',
      'pratosvegetarianos': 'Pratos vegetarianos',
      'sobrimesas': 'Sobrimesas',
      'bebidas': 'Bebidas',
      'extras': 'Extras'
    };
    itens.forEach(item => {
      const tipoAmigavel = tipoLabel[item.tipo] || item.tipo;
      const div = document.createElement('div');
      div.className = 'item-cardapio';
      div.setAttribute('data-category', item.tipo);
      div.innerHTML = `
        <div class="nome">${item.nome}</div>
        <div class="valor">R$ ${item.preco.toFixed(2)}</div>
        <div class="descricao">${item.descricao || ''}</div>
        <div class="categoria">${tipoAmigavel}</div>
      `;
      div.onclick = function() {
        document.querySelectorAll('.item-cardapio').forEach(el => el.classList.remove('selecionado'));
        div.classList.add('selecionado');
        window.itemSelecionadoCardapio = item;
        const btnEditar = document.getElementById('btn-editar-item');
        const btnRemover = document.getElementById('btn-remover-item');
        if (btnEditar) btnEditar.disabled = false;
        if (btnRemover) btnRemover.disabled = false;
      };
      painel.appendChild(div);
    });

    if (document.getElementById('btn-editar-item')) {
      document.getElementById('btn-editar-item').onclick = editarItemCardapio;
    }
    if (document.getElementById('btn-remover-item')) {
      document.getElementById('btn-remover-item').onclick = removerItemCardapio;
    }
    ativarFiltroCardapio();
  } catch (e) {
    painel.innerHTML = '<p>Erro ao carregar cardápio.</p>';
  }
}

// Função para editar o item selecionado
function editarItemCardapio() {
  const item = window.itemSelecionadoCardapio;
  if (!item) return;
  window.location.href = `Adicionar/Editar/EditarItem.html?id=${item.id}`;
}

// Função para remover o item selecionado
async function removerItemCardapio() {
  const item = window.itemSelecionadoCardapio;
  if (!item) return;
  showModal('Tem certeza que deseja remover o item?', async () => {
    try {
      const resp = await fetch(`http://localhost:8080/api/cardapio/${item.id}`, {
        method: 'DELETE'
      });
      if (resp.ok) {
        showModal('Item removido com sucesso!', () => {
          window.itemSelecionadoCardapio = null;
          const btnEditar = document.getElementById('btn-editar-item');
          const btnRemover = document.getElementById('btn-remover-item');
          if (btnEditar) btnEditar.disabled = true;
          if (btnRemover) btnRemover.disabled = true;
          carregarCardapio();
        }, null, 'OK', '');
      } else {
        showModal('Erro ao remover item.', null, null, 'OK', '');
      }
    } catch (e) {
      showModal('Erro de conexão com o servidor.', null, null, 'OK', '');
    }
  }, null, 'Remover', 'Cancelar');
}

window.onload = carregarCardapio;

// Função para ativar o filtro dos botões
function ativarFiltroCardapio() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = function() {
      const categoria = this.getAttribute('data-category');
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.style.background = '';
        b.style.color = '';
      });
      this.style.background = '#f7a444';
      this.style.color = '#fff';
      document.querySelectorAll('.item-cardapio').forEach(item => {
        const itemCat = (item.getAttribute('data-category') || '').toLowerCase();
        if (categoria === 'todos' || itemCat === categoria) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    };
  });
}
