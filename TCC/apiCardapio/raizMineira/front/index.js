const API_URL = 'http://localhost:8080/api/cardapio';

document.getElementById('btnCadastrar').addEventListener('click', cadastrarProduto);

async function cadastrarProduto() {
  const tipo = document.getElementById('tipoProduto').value;
  const nome = document.getElementById('nomeProduto').value;
  const descricao = document.getElementById('descricaoProduto').value;
  const preco = parseFloat(document.getElementById('precoProduto').value);

  if (!nome || !descricao || isNaN(preco)) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  const produto = { nome, descricao, preco, tipo };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto)
    });

    if (response.ok) {
      alert('Produto cadastrado com sucesso!');
      limparFormulario();
      listarProdutos();
    } else {
      alert('Erro ao cadastrar produto.');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro de conexão com a API.');
  }
}

function limparFormulario() {
  document.getElementById('nomeProduto').value = '';
  document.getElementById('descricaoProduto').value = '';
  document.getElementById('precoProduto').value = '';
  document.getElementById('tipoProduto').value = 'PRATO';

  const botao = document.getElementById('btnCadastrar');
  botao.textContent = 'Cadastrar Produto';
  botao.onclick = cadastrarProduto;
}

async function listarProdutos() {
  try {
    const response = await fetch(API_URL);
    const produtos = await response.json();

    const lista = document.getElementById('listaProdutos');
    lista.innerHTML = '';

    produtos.forEach(produto => {
      const item = document.createElement('div');
      item.className = 'p-4 border rounded-lg shadow';
      item.innerHTML = `
        <h3 class="text-lg font-bold">${produto.nome} <span class="text-sm text-gray-500">(${produto.tipo})</span></h3>
        <p class="text-gray-600">${produto.descricao}</p>
        <p class="font-semibold mt-2">R$ ${produto.preco.toFixed(2)}</p>
        <div class="mt-4 flex gap-2">
          <button onclick="editarProduto(${produto.id})" class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">Editar</button>
          <button onclick="deletarProduto(${produto.id})" class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Excluir</button>
        </div>
      `;
      lista.appendChild(item);
    });

  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  }
}

async function deletarProduto(id) {
  if (confirm('Tem certeza que deseja excluir este produto?')) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Produto excluído com sucesso!');
        listarProdutos();
      } else {
        alert('Erro ao excluir produto.');
      }
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  }
}

async function editarProduto(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const produto = await response.json();

    document.getElementById('nomeProduto').value = produto.nome;
    document.getElementById('descricaoProduto').value = produto.descricao;
    document.getElementById('precoProduto').value = produto.preco;
    document.getElementById('tipoProduto').value = produto.tipo;

    const botao = document.getElementById('btnCadastrar');
    botao.textContent = 'Salvar Alterações';
    botao.onclick = () => atualizarProduto(id);

  } catch (error) {
    console.error('Erro ao buscar produto:', error);
  }
}

async function atualizarProduto(id) {
  const tipo = document.getElementById('tipoProduto').value;
  const nome = document.getElementById('nomeProduto').value;
  const descricao = document.getElementById('descricaoProduto').value;
  const preco = parseFloat(document.getElementById('precoProduto').value);

  const produtoAtualizado = { id, nome, descricao, preco, tipo };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produtoAtualizado)
    });

    if (response.ok) {
      alert('Produto atualizado com sucesso!');
      limparFormulario();
      listarProdutos();
    } else {
      alert('Erro ao atualizar produto.');
    }

  } catch (error) {
    console.error('Erro ao atualizar:', error);
  }
}

listarProdutos();
