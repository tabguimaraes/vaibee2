const main = document.getElementById("main");
const musicasEmAlta = document.getElementById("musicasEmAlta");
const playLists = document.getElementById("playLists");
const podcasts = document.getElementById("podcasts");

// URL principal para albuns, músicas e podcasts
const url = `https://api.deezer.com/chart/`;

async function getData() {
  const response = await fetch(url);
  let responseData = await response.json();

  atribuirInfosNosCards(responseData);
}

getData();

function criarCards(imagem, musica, album, artista, section) {
  //Criação dos elementos e atribuição das classes
  const href = document.createElement("a");
  const article = document.createElement("article");
  const picture = document.createElement("picture");
  const img = document.createElement("img");
  const h2 = document.createElement("h2");
  const span = document.createElement("span");
  const p = document.createElement("p");

  // Atribuição das classes
  article.classList.add(
    "min-w-[250px]",
    "flex-1",
    "cursor-pointer",
    "p-5",
    "items-center",
    "justify-around",
    "hover:bg-[#414141]",
    "transition",
    "duration-300",
  );
  img.classList.add("mb-5", "rounded-2xl");
  h2.classList.add("text-2xl", "truncate");
  p.classList.add("text-[#f2e9cc]");
  span.classList.add("text-[#f2e9cc]");

  // Receber os valores dos parametros
  img.src = imagem;
  h2.innerText = musica;
  span.innerText = album;
  p.innerText = artista;

  // Incluir os elementos
  picture.appendChild(img);

  article.appendChild(picture);
  article.appendChild(h2);
  article.appendChild(span);
  article.appendChild(p);
  href.appendChild(article);
  section.appendChild(href);
}

function atribuirInfosNosCards(lista) {
  let listaMusicasEmAlta = [...lista.tracks.data];
  let listaPlayLists = [...lista.playlists.data];
  let listaPodcasts = [...lista.podcasts.data];

  listaMusicasEmAlta.forEach((item) => {
    const album = item.album.title;
    const artista = item.artist.name;
    const imagem = item.album.cover_medium;
    const title = item.title_short;

    criarCards(imagem, title, album, artista, musicasEmAlta);
  });

  listaPlayLists.forEach((item) => {
    const imagem = item.picture_medium;
    const title = item.title;

    criarCards(imagem, title, "", "", playLists);
  });

  listaPodcasts.forEach((item) => {
    const imagem = item.picture_medium;
    const title = item.title;

    criarCards(imagem, title, "", "", podcasts);
  });
}

console.log(main);

main.addEventListener("click", function (evento) {
  evento.target.addEventListener("click", (event) => {
    console.log(event);
  });
});
