document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('consultaForm');
  const nomeInput = document.getElementById('nome');
  const cpfInput = document.getElementById('cpf');
  const nomeError = document.getElementById('nomeError');
  const cpfError = document.getElementById('cpfError');

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

    if (valid) {
      window.location.href = '../Verificar reservas/index.html';
    }
  });

  // Impede digitação de letras no campo CPF
  cpfInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
    if (this.value.length > 11) {
      this.value = this.value.slice(0, 11);
    }
  });
});
