const main = document.getElementById("main");
const logo = document.getElementById("logo");
const musicasEmAlta = document.getElementById("musicasEmAlta");
const playLists = document.getElementById("playLists");
const podcasts = document.getElementById("podcasts");
const inputBar = document.getElementById("inputBar");
const formSearch = document.querySelector("form");

// URL principal para albuns, músicas e podcasts
const url = `https://corsproxy.io/?url=https://api.deezer.com/chart/`;

async function getData() {
  try {
    const response = await fetch(url);
    let responseData = await response.json();

    console.log(responseData);

    atribuirInfosNosCards(responseData);
  } catch (error) {
    console.log(error);
  }
}

getData();

logo.addEventListener("click", () => {
  location.reload();
});

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
  h2.classList.add("text-2xl", "truncate", "text-[#ffbb00]");
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
    verDetalhesDoCard(imagem, musica, album, artista, id, tipo);
  });
}

function atribuirInfosNosCards(lista) {
  let listaMusicasEmAlta = [...lista.tracks.data];
  let listaPlayLists = [...lista.playlists.data];
  let listaPodcasts = [...lista.podcasts.data];

  console.log(listaMusicasEmAlta);

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

    criarCards(imagem, title, "", "", playLists, "");
  });

  listaPodcasts.forEach((item) => {
    const imagem = item.picture_medium;
    const title = item.title;

    criarCards(imagem, title, "", "", podcasts, "", "podcasts");
  });
}

function verDetalhesDoCard(imagem, musica, album, artista, id, tipo) {
  // Inserido para que a tela se mova para o topo quando clicar em algum card que está muito abaixo da visualização
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // Verificar o primeiro filho fdo elemento main e remove-lo se o id foi "detalhes" (o id que usei na sessão detalhes do cards)
  const primeiroElemento = main.firstChild;
  if (primeiroElemento && primeiroElemento.id === "detalhes") {
    primeiroElemento.remove();
  }

  const hrefVoltar = document.createElement("a");

  const iconeVoltar = document.createElement("svg");

  iconeVoltar.classList.add(
    "absolute",
    "top-[40%]",
    "left-[12%]",
    "hover:scale-115",
    "transition",
    "duration-300",
    "md:left-[15%]",
    "md:top-[35%]",
    "lg:left-[20%]",
    "lg:top-[45%]",
  );

  iconeVoltar.setAttribute("id", "btnVoltar");

  iconeVoltar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="12" fill="#ffbb00"/>
  <path d="M14 6l-6 6 6 6" fill="none" stroke="#282828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
  hrefVoltar.classList.add("hover:cursor-pointer");
  hrefVoltar.appendChild(iconeVoltar);

  const section = document.createElement("section");
  section.classList.add(
    "p-10",
    "grid",
    "md:grid-cols-[500px_1fr]",
    "md:grid-rows-4",
    "md:mt-20",
  );

  section.setAttribute("id", "detalhes");

  const img = document.createElement("img");
  img.src = imagem;
  img.classList.add(
    "mb-5",
    "rounded-2xl",
    "justify-self-center",
    "md:col-[1]",
    "md:row-span-full",
  );

  const h2 = document.createElement("h2");
  h2.innerText = musica;
  h2.classList.add("text-3xl", "mb-3", "md:col-[2]", "text-[#ffbb00]");

  const span = document.createElement("span");
  span.innerText = album;
  span.classList.add("block", "mb-2", "text-[#f2e9cc]", "md:col-[2]");

  const p = document.createElement("p");
  p.innerText = artista;
  p.classList.add("text-[#f2e9cc]", "mb-3", "md:col-[2]");

  const audio = document.createElement("audio");
  audio.classList.add("w-full", "md:col-[2]");
  audio.controls = true;
  audio.src = id;

  main.appendChild(hrefVoltar);
  section.appendChild(img);
  section.appendChild(h2);
  section.appendChild(span);
  section.appendChild(p);

  if (tipo === "musicasEmAlta") {
    section.appendChild(audio);
  }

  main.prepend(section);

  document.getElementById("btnVoltar").addEventListener("click", () => {
    location.reload();
  });
}

async function buscarMusicas(consulta) {
  // URL para buscas
  const endPoint = `https://corsproxy.io/?url=https://api.deezer.com/search?q=${consulta}`;

  const response = await fetch(endPoint);

  let dadosDaBusca = await response.json();

  inserirResultadosDeBusca(dadosDaBusca.data, consulta);
}

formSearch.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const valorDaBusca = inputBar.value;
  buscarMusicas(valorDaBusca);

  setTimeout(() => {
    inputBar.value = "";
  }, 1500);
});

function inserirResultadosDeBusca(dadosDaBusca, valorBuscado) {
  const dados = [...dadosDaBusca];

  const sectionContainer = document.createElement("section");
  sectionContainer.classList.add("my-10", "px-4", "lg:my-20");

  const tituloDaBusca = document.createElement("h1");
  const span = document.createElement("span");

  tituloDaBusca.classList.add(
    "text-center",
    "text-[#f2e9cc]",
    "mt-10",
    "text-2xl",
    "text-wrap",
    "truncate",
    "px-5",
  );
  span.classList.add("text-yellow-400", "italic");
  span.innerText = String(valorBuscado).toUpperCase();

  tituloDaBusca.append("Você buscou por: ");
  tituloDaBusca.appendChild(span);

  sectionContainer.appendChild(tituloDaBusca);

  const sectionResultadosContainer = document.createElement("section");
  sectionResultadosContainer.classList.add(
    "grid",
    "grid-cols-2",
    "lg:grid-cols-5",
    "lg:gap-5",
  );

  sectionContainer.appendChild(sectionResultadosContainer);

  main.innerHTML = "";

  dados.forEach((item, index) => {
    console.log(item, index + 1);

    const posicao = index + 1;
    const imagem = item.album.cover_medium;
    const musica = item.title_short;
    const album = item.album.title;
    const artista = item.artist.name;
    const audio = item.preview;

    let novoCard = cardResultadosBuscas(
      posicao,
      imagem,
      musica,
      album,
      artista,
      audio,
    );

    sectionContainer.appendChild(novoCard);
  });

  main.appendChild(sectionContainer);
}

function cardResultadosBuscas(index, imagem, musica, album, artista, audio) {
  const cardContainer = document.createElement("div");

  cardContainer.classList.add(
    "grid",
    "grid-cols-[auto_2fr_2fr_1fr]",
    "grid-rows-4",
    "gap-5",
    "p-4",
    "hover:bg-[#414141]",
    "rounded-2xl",
    "transition",
    "duration-300",
  );

  // posição na lista
  const posicaoNaLista = document.createElement("p");
  posicaoNaLista.innerText = index;
  posicaoNaLista.classList.add(
    "col-[1]",
    "text-2xl",
    "place-self-center",
    "row-span-full",
    "text-[#ffbb00]",
  );

  // capa do álbum
  const capaDoAlbum = document.createElement("img");
  capaDoAlbum.src = imagem;
  capaDoAlbum.classList.add(
    "col-start-2",
    "col-end-4",
    "row-start-1",
    "row-span-4",
    "rounded-xl",
    "object-cover",
    "w-full",
    "h-auto",
  );

  // título da música
  const musicaTitulo = document.createElement("p");
  musicaTitulo.innerText = musica;
  musicaTitulo.classList.add("col-[4]", "row-[1]", "text-[#ffbb00]", "text-xl");

  // álbum
  const albumTitulo = document.createElement("p");
  albumTitulo.innerText = album;
  albumTitulo.classList.add("col-[4]", "row-[2]", "text-[#f2e9cc]", "truncate");

  // artista
  const artistaTitulo = document.createElement("p");
  artistaTitulo.innerText = artista;
  artistaTitulo.classList.add(
    "col-[4]",
    "row-[3]",
    "text-[#f2e9cc]",
    "truncate",
  );

  // preview do áudio
  const audioPreview = document.createElement("audio");
  audioPreview.controls = true;
  audioPreview.src = audio;
  audioPreview.classList.add("col-[4]", "row-[4]", "w-full");

  // adiciona tudo no container
  cardContainer.appendChild(posicaoNaLista);
  cardContainer.appendChild(capaDoAlbum);
  cardContainer.appendChild(musicaTitulo);
  cardContainer.appendChild(albumTitulo);
  cardContainer.appendChild(artistaTitulo);
  cardContainer.appendChild(audioPreview);

  return cardContainer;
}
