const imgPop = document.getElementById("imgPop");
const musicasEmAlta = document.getElementById("musicasEmAlta");
const playLists = document.getElementById("playLists");

// URL principal para albuns
const url = `https://api.deezer.com/chart/`;

async function getData() {
  const response = await fetch(url);
  let responseData = await response.json();

  console.log(responseData);

  atribuirInfosNosCards(responseData);
}

getData();

function criarCards(imagem, musica, album, artista) {
  //Criação dos elementos e atribuição das classes
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

  musicasEmAlta.appendChild(article);
  // playLists.appendChild(article);
}

function atribuirInfosNosCards(lista) {
  let listaMusicasEmAlta = [...lista.tracks.data];
  let playLists = [...lista.playlists.data];

  console.log(playLists);

  listaMusicasEmAlta.forEach((item) => {
    const album = item.album.title;
    const artista = item.artist.name;
    const imagem = item.album.cover_medium;
    const musica = item.title_short;

    criarCards(imagem, musica, album, artista);
  });

  //   playLists.forEach((item) => {
  //     const album = item.album.title;
  //     const artista = item.artist.name;
  //     const imagem = item.album.cover_medium;
  //     const musica = item.title_short;

  //     criarCards(imagem, musica, album, artista);
  //   });
}
