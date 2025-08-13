// JS para Adicionar Reserva
// Adicione aqui a lógica de validação e envio futuramente

document.querySelector('.botao-voltar').addEventListener('click', function() {
  window.history.back();
});

// Função para adicionar item ao cardápio
document.querySelector('.formulario-cardapio .botao:not(.botao-voltar)').addEventListener('click', async function() {
  const inputs = document.querySelectorAll('.input-cardapio');
  const nome = inputs[0].value.trim();
  const preco = parseFloat(inputs[1].value);
  const descricao = inputs[2].value.trim();
  let tipo = inputs[3].value;

  // Mapeamento para o backend (valores do enum TipoProduto)
  const tipoMap = {
    'Entrada': 'entradas',
    'Principal': 'pratosprincipais',
    'Vegetariano': 'pratosvegetarianos',
    'Sobremesa': 'sobrimesas',
    'Bebida': 'bebidas',
    'Extra': 'extras'
  };
  tipo = tipoMap[tipo] || 'entradas';

  if (!nome || isNaN(preco) || preco <= 0 || !tipo) {
    showModal('Preencha todos os campos corretamente!', null, null, 'OK', '');
    return;
  }

  const novoItem = {
    nome,
    preco,
    descricao,
    tipo
  };

  try {
    const resp = await fetch('http://localhost:8080/api/cardapio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoItem)
    });
    if (resp.ok) {
      showModal('Criado com sucesso!', function() {
        window.location.href = '../../GerenciarCardapio.html';
      }, null, 'OK', '');
    } else {
      let erro = '';
      try {
        erro = await resp.text();
      } catch (e) {
        erro = 'Erro desconhecido.';
      }
      showModal('Erro ao adicionar item:<br><span style="color:#d32f2f">' + erro + '</span>', null, null, 'OK', '');
      console.error('Erro ao adicionar item:', erro);
    }
  } catch (e) {
    console.error('Erro de conexão com o servidor:', e);
    // Função showModal precisa estar fora do catch para ser reconhecida
    window.showModal && window.showModal('Erro de conexão com o servidor:<br><span style="color:#d32f2f">' + (e.message || e) + '</span>', null, null, 'OK', '');
  }
});

// Modal personalizado para alertas e confirmações (reutilizado do CardapioJS.js)
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
    ${cancelText ? `<button id="modal-cancel" style="background:#fff3e0; color:#a66c00; border:0px solid #fedcac; border-radius:0px; padding:0rem 0rem; font-size:1rem;">${cancelText}</button>` : ''}
    </div>
  </div>`;
  modal.style.display = 'flex';
  document.getElementById('modal-confirm').onclick = () => {
    modal.style.display = 'none';
    if (confirmCallback) confirmCallback();
  };
  if (cancelText) {
    const btnCancel = document.getElementById('modal-cancel');
    if (btnCancel) {
      btnCancel.onclick = () => {
        modal.style.display = 'none';
        if (cancelCallback) cancelCallback();
      };
    }
  }
}
