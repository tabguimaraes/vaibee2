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
  const containerTexto = document.createElement("div");

  // Atribuição das classes
  article.classList.add(
    "grid",
    "gap-2",
    "lg:gap-10",
    "place-content-center",
    "p-5",
    "lg:justify-around",
    "hover:bg-[#414141]",
    "transition",
    "duration-300",
  );
  img.classList.add("rounded-2xl", "w-[100%]");
  picture.classList.add("cursor-pointer");
  h2.classList.add("text-2xl", "truncate");
  p.classList.add("text-[#f2e9cc]", "truncate");
  span.classList.add("text-[#f2e9cc]", "truncate");
  containerTexto.classList.add("grid", "gap-2", "lg:gap-0", "w-[280px]");

  const template = document.createElement("template");
  template.innerHTML = `
    <media-theme-tailwind-audio style="width: 100%; height: 10dvh; border-radius: 10px;
  overflow: hidden;
  margin: 100 auto;">
      <audio 
        slot="media"
        src="${id}"
        playsinline
        crossorigin="anonymous"
      ></audio>
    </media-theme-tailwind-audio>
  `;

  // Receber os valores dos parametros
  img.src = imagem;
  h2.innerText = musica;
  span.innerText = album;
  p.innerText = artista;

  // Incluir os elementos
  picture.appendChild(img);
  containerTexto.appendChild(h2);
  containerTexto.appendChild(span);
  containerTexto.appendChild(p);
  // containerTexto.appendChild(playerMusical(preview));
  containerTexto.appendChild(template.content.cloneNode(true));
  href.appendChild(picture);
  article.appendChild(href);
  article.appendChild(containerTexto);
  section.appendChild(article);

  // evento de clique no card
  href.addEventListener("click", (e) => {
    e.preventDefault(); // evita navegação
    verDetalhes({ imagem, musica, album, artista, id });
  });
}

function atribuirInfosNosCards(lista) {
  let listaMusicasEmAlta = [...lista.tracks.data];

  listaMusicasEmAlta.forEach((item) => {
    const album = item.album.title;
    const artista = item.artist.name;
    const imagem = item.album.cover_medium;
    const title = item.title_short;
    const preview = item.preview;

    criarCards(imagem, title, album, artista, musicasEmAlta, preview);
  });
}

function verDetalhes({ imagem, musica, album, artista, id }) {
  main.innerHTML = "";

  const section = document.createElement("section");
  section.classList.add("p-10");

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

  // player estilizado
  const template = document.createElement("template");
  template.innerHTML = `
    <media-theme-tailwind-audio style="display: block; width: 80%; height: 75px;
  border-radius: 20px;
  overflow: hidden;
  margin: auto auto; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
      <audio 
        slot="media"
        src="${id}"
        playsinline
        crossorigin="anonymous"
      ></audio>
    </media-theme-tailwind-audio>
  `;

  section.appendChild(img);
  section.appendChild(h2);
  section.appendChild(span);
  section.appendChild(p);
  main.appendChild(section);
  main.appendChild(template.content.cloneNode(true));
}

// function playerMusical(id) {
//   const template = document.createElement("template");
//   template.innerHTML = `
//     <media-theme-tailwind-audio style="display: block; width: 80%; height: 75px;
//   border-radius: 20px;
//   overflow: hidden;
//   margin: auto auto; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
//       <audio
//         slot="media"
//         src="${id}"
//         playsinline
//         crossorigin="anonymous"
//       ></audio>
//     </media-theme-tailwind-audio>
//   `;
// }
