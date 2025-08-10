function mostrarTabela(id) {
  document.getElementById('tabelaVendas').classList.add('escondido');
  document.getElementById('tabelaPratos').classList.add('escondido');
  document.getElementById('tabelaResumo').classList.add('escondido');
  document.getElementById(id).classList.remove('escondido');
}

document.getElementById('btnVendas').addEventListener('click', function() {
  mostrarTabela('tabelaVendas');
});
document.getElementById('btnPratos').addEventListener('click', function() {
  mostrarTabela('tabelaPratos');
});
document.getElementById('btnResumo').addEventListener('click', function() {
  mostrarTabela('tabelaResumo');
});
document.getElementById('btnVoltar').addEventListener('click', function() {
  window.location.href = '../Main.html';
});
