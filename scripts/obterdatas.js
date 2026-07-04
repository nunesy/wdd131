// Preenche o ano atual dinamicamente no elemento span do rodapé
document.getElementById("anoAtual").textContent = new Date().getFullYear();

// Preenche o segundo parágrafo com a data da última modificação no formato nativo
document.getElementById("ultimaModificacao").textContent = "Última Modificação: " + document.lastModified;