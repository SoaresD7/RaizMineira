document.addEventListener('DOMContentLoaded', () => {
  const btnRefresh = document.getElementById('btn-refresh');
  const btnBack = document.getElementById('btn-back');
  const customAlert = document.getElementById('custom-alert');
  const alertMessage = document.getElementById('alert-message');
  const alertBtn = document.getElementById('custom-alert-btn');

  function showAlert(message) {
    alertMessage.textContent = message;
    customAlert.classList.remove('hidden');
    customAlert.focus();
  }

  alertBtn.addEventListener('click', () => {
    customAlert.classList.add('hidden');
  });
  window.addEventListener('keydown', (e) => {
    if (!customAlert.classList.contains('hidden') && e.key === 'Escape') {
      customAlert.classList.add('hidden');
    }
  });

  function fetchOrders() {
    return Promise.resolve([
      { id: 205, time: '12:10', items: ['Trem Bão de Minas', 'Suco de Laranja', 'Pão de Queijo'], status: 'preparando' },
      { id: 206, time: '12:15', items: ['Anguzinho da Esquina', 'Refrigerante'], status: 'concluido' },
      { id: 207, time: '12:20', items: ['Petisco da Roça', 'Água Mineral'], status: 'entregue' }
    ]);
  }

  function updateOrdersUI(orders) {
    const container = document.querySelector('.container');
    const buttonsDiv = container.querySelector('.buttons');
    container.querySelectorAll('.order-card').forEach(c => c.remove());
    orders.forEach(order => {
      const card = document.createElement('section');
      card.className = 'order-card';
      card.innerHTML = `
        <div class="order-header">
          <div class="order-id">Pedido #${order.id}</div>
          <div class="order-time">${order.time}</div>
        </div>
        <ul class="order-items">
          ${order.items.map(i => `<li>${i}</li>`).join('')}
        </ul>
        <div class="progress">
          <div class="step${order.status==='preparando'?' active':''}"><span class="circle"></span>Preparando</div>
          <div class="step${order.status==='concluido'?' active':''}"><span class="circle"></span>Concluído</div>
          <div class="step${order.status==='entregue'?' active':''}"><span class="circle"></span>Entregue</div>
        </div>`;
      container.insertBefore(card, buttonsDiv);
    });
  }

  function refresh() {
    fetchOrders()
      .then(updateOrdersUI)
      .catch(() => showAlert('Erro ao atualizar status. Por favor, tente novamente.'));
  }

  btnRefresh.addEventListener('click', refresh);
  btnBack.addEventListener('click', () => {
    window.location.href = '../Inicio/UsuarioTelaInicio.html';
  });

  refresh();
});
