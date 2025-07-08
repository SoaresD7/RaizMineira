// Filtrar por categoria
const filterButtons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.item-cardapio');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');
    items.forEach(item => {
      item.style.display = (category === 'all' || item.dataset.category === category)
        ? 'flex'
        : 'none';
    });
  });
});

// Contadores, total e reposicionamento do botão “Concluir”
document.addEventListener('DOMContentLoaded', () => {
  const totalPriceEl = document.getElementById('total-price');
  const concluirBtn   = document.getElementById('concluir');
  const resumo        = document.querySelector('.resumo-pedido');
  const lateral       = document.querySelector('.menu-lateral');

  function atualizarTotal() {
    let total = 0;
    items.forEach(item => {
      const qty   = parseInt(item.querySelector('.quantity').textContent, 10);
      const price = parseFloat(item.querySelector('.valor').dataset.price);
      total += qty * price;
    });
    totalPriceEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }

  // Move o botão conforme largura
  function reposicionarConcluir() {
    if (window.innerWidth <= 600) {
      if (!resumo.contains(concluirBtn)) resumo.appendChild(concluirBtn);
    } else {
      if (!lateral.contains(concluirBtn)) {
        lateral.insertBefore(concluirBtn, lateral.children[2]);
      }
    }
  }

  window.addEventListener('resize', reposicionarConcluir);
  reposicionarConcluir();

  // Incremento/decremento
  items.forEach(item => {
    const btnAdd = item.querySelector('.add-item');
    const btnDel = item.querySelector('.del-item');
    const qtyEl  = item.querySelector('.quantity');

    btnAdd.addEventListener('click', () => {
      qtyEl.textContent = parseInt(qtyEl.textContent, 10) + 1;
      atualizarTotal();
    });
    btnDel.addEventListener('click', () => {
      const v = parseInt(qtyEl.textContent, 10);
      if (v > 0) {
        qtyEl.textContent = v - 1;
        atualizarTotal();
      }
    });
  });

  // Alerta ao concluir
  concluirBtn.addEventListener('click', () => {
    alert(`Total do pedido: ${totalPriceEl.textContent}\nObrigado!`);
  });
});
