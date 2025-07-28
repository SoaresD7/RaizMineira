document.addEventListener('DOMContentLoaded', () => {
  // Botões
  const btnRefresh = document.getElementById('btn-refresh');
  const btnBack = document.getElementById('btn-back');

  // Alerta customizado
  const customAlert = document.getElementById('custom-alert');
  const alertMessage = document.getElementById('alert-message');
  const alertBtn = document.getElementById('custom-alert-btn');

  // Função para mostrar alerta customizado
  function showAlert(message) {
    alertMessage.textContent = message;
    customAlert.classList.remove('hidden');
    customAlert.focus();
  }

  // Fecha alerta ao clicar no botão OK
  alertBtn.addEventListener('click', () => {
    customAlert.classList.add('hidden');
  });

  // Fecha alerta ao pressionar ESC
  window.addEventListener('keydown', (e) => {
    if (!customAlert.classList.contains('hidden') && e.key === 'Escape') {
      customAlert.classList.add('hidden');
    }
  });

  /**
   * Simulação de API - substituir futuramente por fetch real
   * Para múltiplos pedidos, retorna um array de pedidos
   */
  function fetchOrders() {
    return Promise.resolve([
      {
        id: 205,
        time: '12:10',
        items: ['Trem Bão de Minas', 'Suco de Laranja', 'Pão de Queijo'],
        status: 'preparando'
      },
      {
        id: 206,
        time: '12:15',
        items: ['Anguzinho da Esquina', 'Refrigerante'],
        status: 'concluido'
      },
      {
        id: 207,
        time: '12:20',
        items: ['Petisco da Roça', 'Água Mineral'],
        status: 'entregue'
      }
    ]);
  }

  /**
   * Atualiza visual dos pedidos na página
   * Recebe lista de pedidos e atualiza o DOM
   */
  function updateOrdersUI(orders) {
    const container = document.querySelector('.container');
    
    // Remove todos os cards atuais, exceto os botões finais
    const buttonsDiv = container.querySelector('.buttons');
    container.querySelectorAll('.order-card').forEach(card => card.remove());

    // Para cada pedido, criar e adicionar o card ao container, antes dos botões
    orders.forEach(order => {
      const card = document.createElement('section');
      card.className = 'order-card';

      card.innerHTML = `
        <div class="order-header">
          <div class="order-id">Pedido #${order.id}</div>
          <div class="order-time">${order.time}</div>
        </div>
        <ul class="order-items">
          ${order.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <div class="progress">
          <div class="step${order.status === 'preparando' ? ' active' : ''}" data-step="preparando">
            <span class="circle"></span>
            Preparando
          </div>
          <div class="step${order.status === 'concluido' ? ' active' : ''}" data-step="concluido">
            <span class="circle"></span>
            Concluído
          </div>
          <div class="step${order.status === 'entregue' ? ' active' : ''}" data-step="entregue">
            <span class="circle"></span>
            Entregue
          </div>
        </div>
      `;
      container.insertBefore(card, buttonsDiv);
    });
  }

  /**
   * Função para atualizar dados da tela (refresh)
   */
  function refresh() {
    fetchOrders()
      .then(updateOrdersUI)
      .catch(err => {
        console.error('Erro ao buscar pedidos:', err);
        showAlert('Erro ao atualizar status. Por favor, tente novamente.');
      });
  }

  // Evento: Atualizar Status
  btnRefresh.addEventListener('click', refresh);

  // Evento: Voltar para tela inicial
  btnBack.addEventListener('click', () => {
    window.location.href = '../Inicio/Inicio.html';
  });

  // Inicializa carregando os dados
  refresh();
});
