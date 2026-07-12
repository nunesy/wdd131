document.getElementById("anoAtual").textContent = new Date().getFullYear();
document.getElementById("ultimaModificacao").textContent = "Última Modificação: " + document.lastModified;

document.addEventListener('DOMContentLoaded', () => {
    // seletores do hamburguer
    const menuToggle = document.querySelector('.hamburguer');
    const navMenu = document.querySelector('.menu');

    // Seletores de troca
    const pageTitle = document.getElementById('titulo');
    const menuLinks = document.querySelectorAll('.menu a');

    // Abrir e fechar menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // logica de mudar o texto e fechar o menu ao clicar em um link
    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            // atualizar texto do main
            const linkText = link.textContent;
            pageTitle.textContent = linkText;

            //fechar menu no modo mobile apos clicar
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});