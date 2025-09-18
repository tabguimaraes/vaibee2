console.log("ok");

const imgPop = document.getElementById("imgPop");

// URL principal para albuns
const url = `https://api.deezer.com/chart/`;

async function getData() {
  const response = await fetch(url);
  let responseData = await response.json();
  console.log(responseData);

  // imgPop.src = responseData.cover_medium;
}

getData();
