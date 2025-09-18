const imgPop = document.getElementById("imgPop");
const musicasEmAlta = document.getElementById("musicasEmAlta");

// URL principal para albuns
const url = `https://api.deezer.com/chart/`;

async function getData() {
  const response = await fetch(url);
  let responseData = await response.json();
  inserirMusicasEmAlta(responseData.tracks.data);

  // criarContainerMusicas(responseData.cover_medium, null, null, null);
}

getData();

function criarContainerMusicas(imagem, musica, album, artista) {
  //Criação dos elementos e atribuição das classes
  const article = document.createElement("article");
  const picture = document.createElement("picture");
  const img = document.createElement("img");
  const h2 = document.createElement("h2");
  const span = document.createElement("span");
  const p = document.createElement("p");

  // Atribuição das classes
  article.classList.add(
    "items-center",
    "justify-around",
    "p-5",
    "hover:bg-gray-600",
  );
  img.classList.add("mb-5", "rounded-2xl");
  h2.classList.add("text-3xl");

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
}

function inserirMusicasEmAlta(lista) {
  let listaMusicasEmAlta = [...lista];

  listaMusicasEmAlta.forEach((item) => {
    const album = item.album.title;
    const artista = item.artist.name;
    const imagem = item.album.cover_medium;
    const musica = item.title_short;

    // console.log(item);

    // Artista
    // console.log(item.artist.name);

    // Album
    // console.log(item.album.title);

    //MUsica
    // console.log(item.title_short);

    //Cover IMG
    // console.log(item.album.cover_medium);

    // criarContainerMusicas(imagem, musica, album, artista)
    criarContainerMusicas(imagem, musica, album, artista);
  });
}
