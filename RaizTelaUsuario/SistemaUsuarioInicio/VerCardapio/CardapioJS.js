document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');
    document.querySelectorAll('.item-cardapio').forEach(item => {
      item.style.display =
        category === 'all' || item.dataset.category === category ? 'flex' : 'none';
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.item-cardapio');
  const totalPrice = document.getElementById('total-price');
  const voltarBtn = document.getElementById('voltar');
  const concluirBtn = document.getElementById('concluir');

  function atualizarTotal() {
    let soma = 0;
    items.forEach(item => {
      const qty = parseInt(item.querySelector('.quantity').textContent, 10);
      const price = parseFloat(item.querySelector('.valor').dataset.price);
      soma += qty * price;
    });
    totalPrice.textContent = `R$ ${soma.toFixed(2).replace('.', ',')}`;
  }

  voltarBtn.addEventListener('click', () => {
    window.location.href = '../Inicio/Inicio.html';
  });

  items.forEach(item => {
    const btnAdd = item.querySelector('.add-item');
    const btnDel = item.querySelector('.del-item');
    const qtyEl = item.querySelector('.quantity');

    btnAdd.addEventListener('click', () => {
      qtyEl.textContent = parseInt(qtyEl.textContent, 10) + 1;
      atualizarTotal();
    });

    btnDel.addEventListener('click', () => {
      let v = parseInt(qtyEl.textContent, 10);
      if (v > 0) {
        qtyEl.textContent = v - 1;
        atualizarTotal();
      }
    });
  });

  concluirBtn.addEventListener('click', () => {
    const valor = totalPrice.textContent;
    const alertBox = document.createElement('div');
    alertBox.className = 'alerta-personalizado';
    alertBox.innerHTML = `
      <div class="caixa-alerta">
        <h2>Pedido Concluído!</h2>
        <p>Total do pedido: <strong>${valor}</strong></p>
        <button id="btn-fechar-alerta">OK</button>
      </div>
    `;
    document.body.appendChild(alertBox);

    document.getElementById('btn-fechar-alerta').addEventListener('click', () => {
      alertBox.remove();
    });
  });

  const reposicionarConcluir = () => {
    const resumo = document.querySelector('.resumo-pedido');
    if (window.innerWidth > 600) {
      if (!lateral.contains(concluirBtn)) lateral.appendChild(concluirBtn);
    } else {
      if (!resumo.contains(concluirBtn)) resumo.appendChild(concluirBtn);
    }
  };

  window.addEventListener('resize', reposicionarConcluir);
  reposicionarConcluir();
});
