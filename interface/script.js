const doIWannaKnow = {
  id: 0,
  songName: "Do I Wanna Know",
  artist: "Artic Monkeys",
  albumName: "AM",
  coverFile: "am.webp",
  songFile: "do_i_wanna_know.mp3",
  liked: false,
};

const theLessIKnowBetter = {
  id: 1,
  songName: "The Less I Know Better",
  artist: "Tame Impala",
  albumName: "Currents",
  coverFile: "currents.webp",
  songFile: "the_less_i_know_better.mp3",
  liked: false,
};

const liveForever = {
  id: 2,
  songName: "Live Forever",
  artist: "Oasis",
  albumName: "Definitely Maybe",
  coverFile: "definitely.webp",
  songFile: "live_forever.mp3",
  liked: false,
};

const asYouWere = {
  id: 3,
  songName: "As you Were",
  artist: "TrackTrybe",
  albumName: "TrackTrybe",
  coverFile: "as_you_were.webp",
  songFile: "as_you_were.mp3",
  liked: false,
};

const boomBapFlick = {
  id: 4,
  songName: "Boom Bap Flick",
  artist: "Quincas Moreira",
  albumName: "Quincas Moreira",
  coverFile: "boom_bap_flick.webp",
  songFile: "boom_bap_flick.mp3",
  liked: false,
};
const cantHide = {
  id: 5,
  songName: "Can't hide",
  artist: "Otis Macdonald",
  albumName: "Otis Mcdonald",
  coverFile: "cant_hide.webp",
  songFile: "cant_hide.mp3",
  liked: false,
};

const musicLibary = [
  cantHide,
  boomBapFlick,
  asYouWere,
  liveForever,
  theLessIKnowBetter,
  doIWannaKnow,
];

let songs = [...musicLibary];
let playlist = JSON.parse(localStorage.getItem("playlist")) ?? [
  cantHide,
  asYouWere,
  doIWannaKnow,
  asYouWere,
];

const pageBody = document.getElementById("page-body");
const searchTerm = document.getElementById("search-term");
const searchButton = document.getElementById("search-button");
const logoButton = document.getElementById("logo-button");
const playlistButton = document.getElementById("playlist");
const startPlayerBtn = document.getElementById("start-player");

//Metodo para carregar a biblioteca de musica
function loadLibrary() {
  pageBody.innerHTML = "";
  for (let i = 0; i < songs.length; i++) {
    pageBody.innerHTML += `<div
    class="card d-flex align-items-center"
    style="width: 18rem; height: 30rem"
  >
    <img
      src="/interface/images/covers/${songs[i].coverFile}"
      class="card-img-top"
      alt="imagem do album"
    />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">${songs[i].songName}</h5>
      <p>${songs[i].albumName}</p>
      <p>${songs[i].artist}</p>
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
    ${playlist[i].songName} - ${playlist[i].artist} 
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
  ${songToAdd.songName} - ${songToAdd.artist} 
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
      song.artist.includes(searchTerm.value)
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

function startPlayer() {
  location.href = "/player/";
}

playlistButton.addEventListener("click", loadPlaylist);
searchButton.addEventListener("click", searchClick);
searchTerm.addEventListener("input", resetFilter);
searchTerm.addEventListener("click", resetFilter);
startPlayerBtn.addEventListener("click", startPlayer);

loadLibrary();
loadPlaylist();
