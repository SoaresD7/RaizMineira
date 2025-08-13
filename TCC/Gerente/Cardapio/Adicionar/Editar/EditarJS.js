// Função para obter parâmetro da URL
function getParam(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

// Mapeamento para o backend (valores do enum TipoProduto)
const tipoMap = {
  'Entrada': 'entradas',
  'Principal': 'pratosprincipais',
  'Vegetariano': 'pratosvegetarianos',
  'Sobremesa': 'sobrimesas',
  'Bebida': 'bebidas',
  'Extra': 'extras'
};

// Preenche o formulário com os dados do item selecionado
async function preencherFormularioEdicao() {
  const id = getParam('id');
  if (!id) return;
  try {
    const resp = await fetch(`http://localhost:8080/api/cardapio/${id}`);
    if (!resp.ok) throw new Error('Item não encontrado');
    const item = await resp.json();
    const inputs = document.querySelectorAll('.input-cardapio');
    if (inputs.length >= 4) {
      inputs[0].value = item.nome || '';
      inputs[1].value = item.preco || '';
      inputs[2].value = item.descricao || '';
      // Seleciona o tipo correto
      for (let opt of inputs[3].options) {
        if (tipoMap[opt.textContent] === item.tipo) {
          opt.selected = true;
          break;
        }
      }
    }
  } catch (e) {
    alert('Erro ao carregar dados do item para edição.');
  }
}

window.onload = preencherFormularioEdicao;

// Função para salvar alterações
document.querySelector('.formulario-cardapio .botao:not(.botao-voltar)').addEventListener('click', async function() {
  const id = getParam('id');
  if (!id) return;
  const inputs = document.querySelectorAll('.input-cardapio');
  const nome = inputs[0].value.trim();
  const preco = parseFloat(inputs[1].value);
  const descricao = inputs[2].value.trim();
  let tipo = inputs[3].value;
  tipo = tipoMap[tipo] || 'entradas';

  if (!nome || isNaN(preco) || preco <= 0 || !tipo) {
    alert('Preencha todos os campos corretamente!');
    return;
  }

  const itemEditado = {
    id,
    nome,
    preco,
    descricao,
    tipo
  };

  try {
    const resp = await fetch(`http://localhost:8080/api/cardapio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemEditado)
    });
    if (resp.ok) {
      showModal('Item editado com sucesso!', function() {
        window.location.href = '../../GerenciarCardapio.html';
      }, null, 'OK', '');
    } else {
      const erro = await resp.text();
      showModal('Erro ao atualizar item: ' + erro, null, null, 'OK', '');
    }
  } catch (e) {
    showModal('Erro de conexão com o servidor.', null, null, 'OK', '');
  }
});
document.querySelector('.botao-voltar').addEventListener('click', function() {
  window.history.back();
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
