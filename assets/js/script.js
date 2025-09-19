// import "player.style/tailwind-audio";

/* 
import 'player.style/tailwind-audio';

const template = document.createElement('template');
template.innerHTML = `
  <media-theme-tailwind-audio style="width: 100%">
    <audio
      slot="media"
      src="https://stream.mux.com/fXNzVtmtWuyz00xnSrJg4OJH6PyNo6D02UzmgeKGkP5YQ/low.mp4"
      playsinline
      crossorigin="anonymous"
    ></audio>
  </media-theme-tailwind-audio>`;

document.body.append(template.content);

*/

const main = document.getElementById("main");
const musicasEmAlta = document.getElementById("musicasEmAlta");
const playLists = document.getElementById("playLists");
const podcasts = document.getElementById("podcasts");

// URL principal para albuns, músicas e podcasts
const url = `https://corsproxy.io/?url=https://api.deezer.com/chart/`;

async function getData() {
  const response = await fetch(url);
  let responseData = await response.json();

  atribuirInfosNosCards(responseData);
}

getData();

function criarCards(imagem, musica, album, artista, section, id) {
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

  // evento de clique no card
  href.addEventListener("click", (e) => {
    e.preventDefault(); // evita navegação
    verDetalhes({ imagem, musica, album, artista, id });
  });
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
    const preview = item.preview;

    console.log(preview);

    criarCards(imagem, title, album, artista, musicasEmAlta, preview);
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

function verDetalhes({ imagem, musica, album, artista, id }) {
  // limpa o main
  main.innerHTML = "";

  // cria a nova section
  const section = document.createElement("section");
  section.classList.add("p-10");

  // cria elewmento template
  const template = document.createElement("template");

  template.innerHTML = `
  <media-theme-tailwind-audio style="width: 100%">
    <audio
      slot="media"
      src=${id}
      playsinline
      crossorigin="anonymous"
    ></audio>`;

  const img = document.createElement("img");
  img.src = imagem;
  img.classList.add("mb-5", "rounded-2xl");

  const h2 = document.createElement("h2");
  h2.innerText = musica;
  h2.classList.add("text-3xl", "mb-3");

  const span = document.createElement("span");
  span.innerText = album;
  span.classList.add("block", "mb-2", "text-[#f2e9cc]");

  const p = document.createElement("p");
  p.innerText = artista;
  p.classList.add("text-[#f2e9cc]");

  section.appendChild(img);
  section.appendChild(h2);
  section.appendChild(span);
  section.appendChild(p);
  section.appendChild(template);

  main.appendChild(section);
}
