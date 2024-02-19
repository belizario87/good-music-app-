//Capture elements
const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const cover = document.getElementById("cover");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const nextBtn = document.getElementById("next");
const previousBtn = document.getElementById("previous");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
//Musics objects
const asYouWere = {
  id: 1,
  songName: "As You Were",
  artist: "TrackTribe",
  file: "as_you_were",
};

const boomBapFlip = {
  id: 2,
  songName: "Boom Bap flick ",
  artist: "Quincas Moreira",
  file: "boom_bap_flick",
};

const cant_hide = {
  id: 3,
  songName: "Can't Hide",
  artist: "Otis Mackdonald",
  file: "cant_hide",
};

const playlist = [asYouWere, boomBapFlip, cant_hide];
let index = 0;

//Player Methods
function initializeSong() {
  cover.src = `/player/images/${playlist[index].file}.webp`;
  song.src = `/player/songs/${playlist[index].file}.mp3`;
  songName.innerText = playlist[index].songName;
  bandName.innerText = playlist[index].artist;
}

let isPlaying = false;

function playMusic() {
  play.querySelector(".bi").classList.remove("bi-play-circle-fill");
  play.querySelector(".bi").classList.add("bi-pause-circle-fill");
  song.play();
  isPlaying = true;
}

function stopMusic() {
  play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
  play.querySelector(".bi").classList.add("bi-play-circle-fill");
  song.pause();
  isPlaying = false;
}

function playPauseDecider() {
  if (isPlaying) {
    stopMusic();
  } else {
    playMusic();
  }
}

function previousSong() {
  if (index === 0) {
    index = playlist.length - 1;
  } else {
    index -= 1;
  }
  initializeSong();
  playMusic();
}

function nextSong() {
  if (index === playlist.length - 1) {
    index = 0;
  } else {
    index += 1;
  }
  initializeSong();
  playMusic();
}

function updateProgressBar() {
  const barWidth = (song.currentTime / song.duration) * 100;
  currentProgress.style.setProperty("--progress", `${barWidth}%`);
}

function jumpTo(event) {
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / width) * song.duration;
  song.currentTime = jumpToTime;
}

initializeSong();

play.addEventListener("click", playPauseDecider);
previousBtn.addEventListener("click", previousSong);
nextBtn.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", jumpTo);
