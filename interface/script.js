const AmorDePrimavera = {
  id: 0,
  songName: "Amor de primavera",
  albumName: "Amor & Dor",
  artistName: "AD",
  coverFile: "4.jpg",
};

const barulhenta = {
  id: 1,
  songName: "Barulhenta",
  albumName: "Pega a batida",
  artistName: "Heitor Campos ft. Mc Leonardo",
  coverFile: "1.jpg",
};

const altoNivel = {
  id: 2,
  songName: "Alto Nivel",
  albumName: "Embalos",
  artistName: "Mauro Rui",
  coverFile: "2.jpg",
};

const alucinacoes = {
  id: 3,
  songName: "Alucinaçoes",
  albumName: "Recomeço",
  artistName: "Dj Borboleta",
  coverFile: "3.jpg",
};
const emPerigo = {
  id: 4,
  songName: "Em perigo",
  albumName: "Amor em chamas",
  artistName: "Ingrid Correa",
  coverFile: "5.jpg",
};

const osAmoresEstranhos = {
  id: 5,
  songName: "Rafaela Garcia",
  albumName: "Joatinga",
  artistName: "Rafaela Garcia",
  coverFile: "6.jpg",
};

const musicLibary = [
  AmorDePrimavera,
  barulhenta,
  altoNivel,
  alucinacoes,
  emPerigo,
  osAmoresEstranhos,
];

let songs = [...musicLibary];
let playlist = JSON.parse(localStorage.getItem("playlist")) ?? [
  AmorDePrimavera,
  barulhenta,
  altoNivel,
];

const pageBody = document.getElementById("page-body");
const searchTerm = document.getElementById("search-term");
const searchButton = document.getElementById("search-button");
const logoButton = document.getElementById("logo-button");
const playlistButton = document.getElementById("playlist");
const removeSongPlaylist = document.getElementById("");

//Metodo para carregar a biblioteca de musica
function loadLibrary() {
  pageBody.innerHTML = "";
  for (let i = 0; i < songs.length; i++) {
    pageBody.innerHTML += `<div
    class="card d-flex align-items-center"
    style="width: 18rem; height: 30rem"
  >
    <img
      src="/interface/images/${songs[i].coverFile}"
      class="card-img-top"
      alt="imagem do album"
    />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">${songs[i].songName}</h5>
      <p>${songs[i].albumName}</p>
      <p>${songs[i].artistName}</p>
      <button class="btn btn-outline-primary" onclick="addToPlaylist(${songs[i].id})">
      <i class="bi bi-plus-circle"></i>
      </button>
    </div>
  </div>`;
  }
}

//Carrega os elementos da playlist
function loadPlaylist() {
  playlistButton.innerHTML = "";
  for (let i = 0; i < playlist.length; i++) {
    playlistButton.innerHTML += `
    <p id=${playlist[i].id} class="d-flex justify-content-between border-top border-bottom align-items-center"> 
    ${playlist[i].songName} - ${playlist[i].artistName} 
      <button class="btn btn-outline-danger" onclick="removeFromPlaylist(${playlist[i].id})"> 
        <i class="bi bi-trash-fill"></i> 
      </button>
    </p>
    `;
  }
}

function removeFromPlaylist(songId) {
  playlist = playlist.filter((song) => song.id !== songId);
  document.getElementById(songId).remove();
  updateLocalStorage();
}

function addToPlaylist(songId) {
  if (playlist.find((song) => song.id === songId)) return;

  const songToAdd = songs.find((x) => x.id === songId);

  playlist.push(songToAdd);

  playlistButton.innerHTML += `
  <p id=${songToAdd.id} class="d-flex justify-content-between border-top border-bottom align-items-center"> 
  ${songToAdd.songName} - ${songToAdd.artistName} 
    <button class="btn btn-outline-danger" > 
      <i class="bi bi-trash-fill"></i> 
    </button>
  </p>
  `;
  updateLocalStorage();
}

//Filtra e busca as musicas
function searchClick() {
  if (searchTerm.value === "") return;
  songs = songs.filter(
    (song) =>
      song.songName.includes(searchTerm.value) ||
      song.albumName.includes(searchTerm.value) ||
      song.artistName.includes(searchTerm.value)
  );
  loadLibrary();
}

//Reseta o filtro
function resetFilter() {
  if (searchTerm.value !== "") {
    return;
  } else {
    songs = [...musicLibary];
    loadLibrary();
  }
}

function updateLocalStorage() {
  localStorage.setItem("playlist", JSON.stringify(playlist));
}

playlistButton.addEventListener("click", loadPlaylist);
searchButton.addEventListener("click", searchClick);
searchTerm.addEventListener("input", resetFilter);
searchTerm.addEventListener("click", resetFilter);

loadLibrary();
loadPlaylist();
