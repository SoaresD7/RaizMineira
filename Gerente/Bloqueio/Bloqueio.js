const telaBloqueio = document.getElementById('tela-bloqueio');
const telaSenha = document.getElementById('tela-senha');
const senhaInput = document.getElementById('senha');
const botaoFechar = document.querySelector('.botao-fechar');

// Animação de desbloqueio ao clicar na tela de bloqueio

telaBloqueio.addEventListener('click', (e) => {
  if (e.target.classList.contains('botao-fechar')) return;
  telaBloqueio.classList.add('subindo');
  telaBloqueio.addEventListener('transitionend', () => {
    telaBloqueio.classList.add('escondido');
    telaSenha.classList.remove('escondido');
    senhaInput.focus();
  }, { once: true });
});

// Validar senha no Enter
senhaInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const senha = senhaInput.value;
    if (senha === '1234') {
      // Redireciona para Main.html
      window.location.href = '../Main.html';
    } else {
      senhaInput.value = '';
      senhaInput.placeholder = 'Senha incorreta';
      senhaInput.classList.add('erro');
      setTimeout(() => {
        senhaInput.placeholder = 'Senha';
        senhaInput.classList.remove('erro');
      }, 1200);
    }
  }
});

// Botão fechar programa na tela de bloqueio (fecha a aba)
botaoFechar.addEventListener('click', (e) => {
  e.stopPropagation();
  window.close();
});

function desligarSistema() {
  window.close();
}
