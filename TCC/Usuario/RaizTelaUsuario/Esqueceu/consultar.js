document.addEventListener('DOMContentLoaded', function() {
  const form       = document.getElementById('consultaForm');
  const nomeInput  = document.getElementById('nome');
  const cpfInput   = document.getElementById('cpf');
  const nomeError  = document.getElementById('nomeError');
  const cpfError   = document.getElementById('cpfError');
  const btnVoltar  = document.getElementById('btnVoltar');

  // Ao submeter o formulário
  form.addEventListener('submit', function(e) {
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

    // Se tudo OK, redireciona para a página de ver reservas
    if (valid) {
      window.location.href = 'Verificar reservas/index.html';
    }
  });

  // Impede digitação de letras no CPF e limita a 11 dígitos
  cpfInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
    if (this.value.length > 11) {
      this.value = this.value.slice(0, 11);
    }
  });

  // Botão “Voltar” leva ao index.html
  if (btnVoltar) {
    btnVoltar.addEventListener('click', function() {
      window.location.href = '../Inicio/UsuarioTela.html';
    });
  }
});
