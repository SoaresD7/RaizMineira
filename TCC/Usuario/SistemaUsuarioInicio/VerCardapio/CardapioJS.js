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

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.item-cardapio');
  const totalPrice = document.getElementById('total-price');
  const voltarBtn = document.getElementById('voltar');
  const concluirBtn = document.getElementById('concluir');

  // Atualiza o total
  function atualizarTotal() {
    let soma = 0;
    items.forEach(item => {
      const qty = +item.querySelector('.quantity').textContent;
      const price = +item.querySelector('.valor').dataset.price;
      soma += qty * price;
    });
    totalPrice.textContent = `R$ ${soma.toFixed(2).replace('.', ',')}`;
  }

  // Botão Voltar
  voltarBtn.addEventListener('click', () => {
    window.location.href = '../Inicio/UsuarioTelaInicio.html';
  });

  // Controle de quantidade
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

  // Alerta modal
  function showAlert(title, message) {
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
      }, { once: true });
    });
  }

  // Concluir pedido
  concluirBtn.addEventListener('click', () => {
    showAlert('Pedido Concluído!', `Total do pedido: <strong>${totalPrice.textContent}</strong>`);
  });

  atualizarTotal();
});
