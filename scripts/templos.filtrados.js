// Configuração do rodapé
document.getElementById("anoAtual").textContent = new Date().getFullYear();
document.getElementById("ultimaModificacao").textContent = "Última Modificação: " + document.lastModified;

// Array de Templos fornecido + 3 novos templos adicionados
const templos = [
  {
    nomeDoTemplo: "Aba Nigeria",
    localizacao: "Aba, Nigéria",
    consagracao: "2005, 7 de agosto",
    area: 11500,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Manti Utah",
    localizacao: "Manti, Utah, Estados Unidos",
    consagracao: "1888, 21 de maio",
    area: 74792,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Payson Utah",
    localizacao: "Payson, Utah, Estados Unidos",
    consagracao: "2015, 7 de junho",
    area: 96630,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Yigo Guam",
    localizacao: "Yigo, Guam",
    consagracao: "2020, 2 de maio",
    area: 6861,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    nomeDoTemplo: "Washington D.C.",
    localizacao: "Kensington, Maryland, Estados Unidos",
    consagracao: "1974, 19 de novembro",
    area: 156558,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    nomeDoTemplo: "Lima Peru",
    localizacao: "Lima, Peru",
    consagracao: "1986, 10 de janeiro",
    area: 9600,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Cidade do México, México",
    localizacao: "Cidade do México, México",
    consagracao: "1983, 2 de dezembro",
    area: 116642,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // 3 Templos adicionais
  {
    nomeDoTemplo: "Campinas Brasil",
    localizacao: "Campinas, São Paulo, Brasil",
    consagracao: "2002, 17 de maio",
    area: 48100,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/campinas-brazil/400x250/campinas-brazil-temple-1030-main.jpg"
  },
  {
    nomeDoTemplo: "Salt Lake",
    localizacao: "Salt Lake City, Utah, Estados Unidos",
    consagracao: "1893, 6 de abril",
    area: 382207,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
  },
  {
    nomeDoTemplo: "Fortaleza Brasil",
    localizacao: "Fortaleza, Ceará, Brasil",
    consagracao: "2019, 2 de junho",
    area: 36000,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/fortaleza-brazil/400x250/1-Fortaleza-Temple-Photo-2213673.jpg"
  }
];

document.addEventListener('DOMContentLoaded', () => {
    // Seletores do menu e da grade de imagens
    const menuToggle = document.querySelector('.hamburguer');
    const navMenu = document.querySelector('.menu');
    const pageTitle = document.getElementById('titulo');
    const menuLinks = document.querySelectorAll('.menu a');
    const fotoGrid = document.querySelector('.foto-grid');

    // Função para renderizar os cartões dos templos
    function renderizarTemplos(listaDeTemplos) {
        fotoGrid.innerHTML = ''; // Limpa os resultados anteriores
        
        listaDeTemplos.forEach(templo => {
            // Criação dos elementos HTML
            let card = document.createElement('figure');
            
            let nome = document.createElement('h3');
            nome.textContent = templo.nomeDoTemplo;
            
            let local = document.createElement('p');
            local.innerHTML = `<strong>Localização:</strong> ${templo.localizacao}`;
            
            let data = document.createElement('p');
            data.innerHTML = `<strong>Consagração:</strong> ${templo.consagracao}`;
            
            let tamanho = document.createElement('p');
            tamanho.innerHTML = `<strong>Área:</strong> ${templo.area} sq ft`;
            
            let imagem = document.createElement('img');
            imagem.setAttribute('src', templo.urlDaImagem);
            imagem.setAttribute('alt', templo.nomeDoTemplo);
            imagem.setAttribute('loading', 'lazy'); // Implementação do Lazy Loading
            
            // Adiciona os elementos ao card
            card.appendChild(nome);
            card.appendChild(local);
            card.appendChild(data);
            card.appendChild(tamanho);
            card.appendChild(imagem);
            
            // Adiciona o card a grid principal
            fotoGrid.appendChild(card);
        });
    }

    // Chama a função pela primeira vez exibindo todos os templos
    renderizarTemplos(templos);

    // Lógica para abrir e fechar menu (Hamburguer)
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Lógica de mudar o texto, filtrar o array e fechar o menu ao clicar
    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            // Atualizar texto do título principal
            const linkText = link.textContent;
            pageTitle.textContent = linkText;

            // Lógica de filtro baseada no texto do link clicado
            if (linkText === 'Antigo') {
                renderizarTemplos(templos.filter(t => parseInt(t.consagracao.substring(0, 4)) < 1900));
            } else if (linkText === 'Novo') {
                renderizarTemplos(templos.filter(t => parseInt(t.consagracao.substring(0, 4)) > 2000));
            } else if (linkText === 'Grande') {
                renderizarTemplos(templos.filter(t => t.area > 90000));
            } else if (linkText === 'Pequeno') {
                renderizarTemplos(templos.filter(t => t.area < 10000));
            } else {
                renderizarTemplos(templos); // Exibe todos ao clicar em Página Inicial
            }

            // Fechar menu no modo mobile após clicar
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});