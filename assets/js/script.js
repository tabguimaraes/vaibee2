console.log("ok");

const imgPop = document.getElementById("imgPop");

const url = `https://api.deezer.com/album/302127`;

async function getData() {
  const response = await fetch(url);
  let responseData = await response.json();
  console.log(responseData);

  imgPop.src = responseData.cover_medium;
}

getData();
