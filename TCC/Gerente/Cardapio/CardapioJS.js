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
    // Adiciona os botões de filtro dinamicamente
    const filtroContainer = document.querySelector('.filtro-tags > div');
    if (filtroContainer && !filtroContainer.querySelector('.filter-btn')) {
      filtroContainer.innerHTML = `
        <button class="botao filter-btn" data-category="todos" style="background:#f7a444; color:#fff;">Todos</button>
        <button class="botao filter-btn" data-category="entrada">Entradas</button>
        <button class="botao filter-btn" data-category="principal">Pratos Principais</button>
        <button class="botao filter-btn" data-category="vegetariano">Pratos Vegetarianos</button>
        <button class="botao filter-btn" data-category="sobremesa">Sobremesas</button>
        <button class="botao filter-btn" data-category="bebida">Bebidas</button>
        <button class="botao filter-btn" data-category="extra">Extras</button>
      `;
    }
    itens.forEach(item => {
      painel.innerHTML += `
        <div class="item-cardapio" data-category="${item.tipo.toLowerCase()}">
          <div class="nome">${item.nome}</div>
          <div class="valor">R$ ${item.preco.toFixed(2)}</div>
          <div class="descricao">${item.descricao || ''}</div>
          <div class="categoria">${item.tipo}</div>
        </div>
      `;
    });
    ativarFiltroCardapio();
  } catch (e) {
    painel.innerHTML = '<p>Erro ao carregar cardápio.</p>';
  }
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
