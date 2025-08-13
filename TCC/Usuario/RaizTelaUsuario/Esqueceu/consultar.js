document.addEventListener('DOMContentLoaded', function() {
  const form       = document.getElementById('consultaForm');
  const nomeInput  = document.getElementById('nome');
  const cpfInput   = document.getElementById('cpf');
  const nomeError  = document.getElementById('nomeError');
  const cpfError   = document.getElementById('cpfError');
  const btnVoltar  = document.getElementById('btnVoltar');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    let valid = true;
    nomeError.textContent = '';
    cpfError.textContent = '';

    // Validação do nome
    if (!nomeInput.value.trim()) {
      nomeError.textContent = 'Digite seu nome.';
      valid = false;
    }

    // Validação do CPF (apenas números, 11 dígitos)
    const cpf = cpfInput.value.replace(/\D/g, '');
    if (!cpf) {
      cpfError.textContent = 'Digite o CPF.';
      valid = false;
    } else if (cpf.length !== 11) {
      cpfError.textContent = 'O CPF deve ter 11 números.';
      valid = false;
    }

    if (!valid) return;

    // Consulta na API usando GET e parâmetros na URL
    try {
      const url = `http://localhost:8080/api/clientes/${cpf}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const cliente = await response.json();
        if (cliente.nome && cliente.nome.toLowerCase() === nomeInput.value.trim().toLowerCase()) {
          localStorage.setItem('cpfConsulta', cpf);
          window.location.href = 'Verificar reservas/index.html';
        } else {
          nomeError.textContent = 'Nome ou CPF não encontrados.';
          cpfError.textContent = 'Nome ou CPF não encontrados.';
        }
      } else if (response.status === 404) {
        nomeError.textContent = 'Nome ou CPF não encontrados.';
        cpfError.textContent = 'Nome ou CPF não encontrados.';
      } else {
        nomeError.textContent = 'Erro ao consultar dados.';
        cpfError.textContent = 'Erro ao consultar dados.';
      }
    } catch (err) {
      nomeError.textContent = 'Erro de conexão com o servidor.';
      cpfError.textContent = 'Erro de conexão com o servidor.';
    }
  });

  cpfInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
    if (this.value.length > 11) {
      this.value = this.value.slice(0, 11);
    }
  });

  if (btnVoltar) {
    btnVoltar.addEventListener('click', function() {
      window.location.href = '../Inicio/UsuarioTela.html';
    });
  }
});