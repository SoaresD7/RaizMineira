const telaBloqueio = document.getElementById('tela-bloqueio');
const telaSenha = document.getElementById('tela-senha');
const telaPrincipal = document.getElementById('tela-principal');
const senhaInput = document.getElementById('senha');
const botaoLogout = document.querySelector('.logout');
const botaoFechar = document.querySelector('.botao-fechar');

// Animação de desbloqueio ao clicar na tela de bloqueio
telaBloqueio.addEventListener('click', () => {
  telaBloqueio.classList.add('subindo');
  telaBloqueio.addEventListener('animationend', () => {
    telaBloqueio.classList.add('escondido');
    telaSenha.classList.remove('escondido');
  }, { once: true });
});

// Validar senha no Enter
senhaInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const senha = senhaInput.value;
    if (senha === '1234') {
      telaSenha.classList.add('escondido');
      telaPrincipal.classList.remove('escondido');

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Acesso liberado!",
        background: "#fff3e0",
        color: "#3a2f2f",
        showConfirmButton: false,
        timer: 1500,
        didOpen: () => {
          const icon = Swal.getPopup().querySelector('.swal2-success-line-tip');
          const icon2 = Swal.getPopup().querySelector('.swal2-success-line-long');
          const circle = Swal.getPopup().querySelector('.swal2-success-ring');
          if (icon && icon2 && circle) {
            icon.style.background = '#f7a440';
            icon2.style.background = '#f7a440';
            circle.style.borderColor = '#f7a440';
          }
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Senha incorreta",
        text: "Tente novamente",
        background: "#fff3e0",
        color: "#3a2f2f",
        confirmButtonColor: "#f7a440",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
});

// Logout volta para tela de bloqueio
botaoLogout.addEventListener('click', () => {
  telaPrincipal.classList.add('escondido');

  // Remove a animação e mostra a tela de bloqueio
  telaBloqueio.classList.remove('subindo');
  telaBloqueio.classList.remove('escondido');

  telaSenha.classList.add('escondido');
  senhaInput.value = '';
});

// Botão fechar programa na tela de bloqueio (fecha a aba)
botaoFechar.addEventListener('click', (e) => {
  e.stopPropagation();
  window.close();
});

// Redirecionamento dos botões
window.abrirPagina = function(caminho) {
  window.location.href = caminho;
};

window.abrirPaginaPedidos = function() {
  alert("Funcionalidade de Acompanhamento de Pedidos ainda não implementada.");
};
