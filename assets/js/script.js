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

function criarCards(imagem, musica, album, artista, section, id, tipo) {
  //Criação dos elementos e atribuição das classes
  const href = document.createElement("a");
  const article = document.createElement("article");
  const picture = document.createElement("picture");
  const img = document.createElement("img");
  const h2 = document.createElement("h2");
  const span = document.createElement("span");
  const p = document.createElement("p");
  const containerTextoEAudio = document.createElement("div");
  const audio = document.createElement("audio");

  // Atribuição das classes
  article.classList.add(
    "grid",
    "gap-2",
    "lg:gap-5",
    "place-content-center",
    "p-5",
    "lg:justify-around",
    "hover:bg-[#414141]",
    "rounded-2xl",
    "transition",
    "duration-300",
    "w-full",
  );
  picture.classList.add("cursor-pointer", "block", "w-full");
  img.classList.add("rounded-2xl", "w-full", "h-auto", "object-cover");
  h2.classList.add("text-2xl", "truncate");
  p.classList.add("text-[#f2e9cc]", "truncate");
  span.classList.add("text-[#f2e9cc]", "truncate");
  containerTextoEAudio.classList.add(
    "grid",
    "gap-2",
    "lg:gap-4",
    "w-full",
    "max-w-[280px]",
  );

  // Receber os valores dos parametros
  img.src = imagem;
  h2.innerText = musica;
  span.innerText = album;
  p.innerText = artista;
  audio.controls = true;
  audio.src = id;

  // Incluir os elementos
  picture.appendChild(img);
  containerTextoEAudio.appendChild(h2);
  containerTextoEAudio.appendChild(span);
  containerTextoEAudio.appendChild(p);
  audio.classList.add("w-full");

  if (tipo === "musicasEmAlta") {
    containerTextoEAudio.appendChild(audio);
  }
  href.appendChild(picture);
  article.appendChild(href);
  article.appendChild(containerTextoEAudio);
  section.appendChild(article);

  // Pegar evento de clique no card
  href.addEventListener("click", (evento) => {
    evento.preventDefault();
    verDetalhesDoCard(imagem, musica, album, artista, id);
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

    criarCards(
      imagem,
      title,
      album,
      artista,
      musicasEmAlta,
      preview,
      "musicasEmAlta",
    );
  });

  listaPlayLists.forEach((item) => {
    const imagem = item.picture_medium;
    const title = item.title;

    console.log(item);

    criarCards(imagem, title, "", "", playLists, "");
  });

  listaPodcasts.forEach((item) => {
    const imagem = item.picture_medium;
    const title = item.title;

    criarCards(imagem, title, "", "", podcasts, "");
  });
}

function verDetalhesDoCard(imagem, musica, album, artista, id) {
  main.innerHTML = "";

  const section = document.createElement("section");
  section.classList.add("p-10", "grid", "justify-items-center");

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

  const audio = document.createElement("audio");
  audio.controls = true;
  audio.src = id;

  section.appendChild(img);
  section.appendChild(h2);
  section.appendChild(span);
  section.appendChild(p);
  section.appendChild(audio);
  main.appendChild(section);
}
