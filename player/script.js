//Capture elements
const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const cover = document.getElementById("cover");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const nextBtn = document.getElementById("next");
const previousBtn = document.getElementById("previous");
const likeBtn = document.getElementById("like");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const songTime = document.getElementById("song-time");
const totalTime = document.getElementById("total-time");
//Musics objects
const asYouWere = {
  id: 1,
  songName: "As You Were",
  artist: "TrackTribe",
  file: "as_you_were",
  liked: false,
};

const boomBapFlip = {
  id: 2,
  songName: "Boom Bap flick ",
  artist: "Quincas Moreira",
  file: "boom_bap_flick",
  liked: false,
};

const cant_hide = {
  id: 3,
  songName: "Can't Hide",
  artist: "Otis Mackdonald",
  file: "cant_hide",
  liked: false,
};

let isPlaying = false;
let isShufle = false;
let repeatOn = false;
const originalPlaylist = [asYouWere, boomBapFlip, cant_hide];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

//Player Methods
function initializeSong() {
  cover.src = `/player/images/${sortedPlaylist[index].file}.webp`;
  song.src = `/player/songs/${sortedPlaylist[index].file}.mp3`;
  songName.innerText = sortedPlaylist[index].songName;
  bandName.innerText = sortedPlaylist[index].artist;
  likeButtonRender();
}

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

function shuffleArray(preShuffleArray) {
  for (let i = preShuffleArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Troca os elementos preShuffleArray[i] e preShuffleArray[j]

    [preShuffleArray[i], preShuffleArray[j]] = [
      preShuffleArray[j],
      preShuffleArray[i],
    ];
  }
}

function shuffleButtonClicked() {
  if (isShufle === false) {
    isShufle = true;
    shuffleArray(sortedPlaylist);
    shuffleButton.classList.add("button-active");
  } else {
    isShufle = false;
    sortedPlaylist = [...originalPlaylist];
    shuffleButton.classList.remove("button-active");
  }
}

function repeatButtonClicked() {
  if (repeatOn === false) {
    repeatOn = true;
    repeatButton.classList.add("button-active");
  } else {
    repeatOn = false;
    repeatButton.classList.remove("button-active");
  }
}

function nextOrRepeat() {
  if (repeatOn === false) {
    nextSong();
  } else {
    playMusic();
  }
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
    index = sortedPlaylist.length - 1;
  } else {
    index -= 1;
  }
  initializeSong();
  playMusic();
}

function nextSong() {
  if (index === sortedPlaylist.length - 1) {
    index = 0;
  } else {
    index += 1;
  }
  initializeSong();
  playMusic();
}

function updateProgress() {
  const barWidth = (song.currentTime / song.duration) * 100;
  currentProgress.style.setProperty("--progress", `${barWidth}%`);
  songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event) {
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / width) * song.duration;
  song.currentTime = jumpToTime;
}

function toHHMMSS(originalNumber) {
  const hours = Math.floor(originalNumber / 3600);
  const minutes = Math.floor((originalNumber - hours * 3600) / 60);
  const seconds = Math.floor(originalNumber - hours * 3600 - minutes * 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateTotalTime() {
  totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonRender() {
  if (sortedPlaylist[index].liked === true) {
    likeBtn.querySelector(".bi").classList.remove("bi-heart");
    likeBtn.querySelector(".bi").classList.add("bi-heart-fill");
    likeBtn.classList.add("button-active");
  } else {
    likeBtn.querySelector(".bi").classList.add("bi-heart");
    likeBtn.querySelector(".bi").classList.remove("bi-heart-fill");
    likeBtn.classList.remove("button-active");
  }
}

function likedButtonClicked() {
  if (sortedPlaylist[index].liked === false) {
    sortedPlaylist[index].liked = true;
  } else {
    sortedPlaylist[index].liked = false;
  }
  likeButtonRender();
}

initializeSong();

play.addEventListener("click", playPauseDecider);
previousBtn.addEventListener("click", previousSong);
nextBtn.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgress);
song.addEventListener("ended", nextOrRepeat);
song.addEventListener("loadedmetadata", updateTotalTime);
progressContainer.addEventListener("click", jumpTo);
shuffleButton.addEventListener("click", shuffleButtonClicked);
repeatButton.addEventListener("click", repeatButtonClicked);
likeBtn.addEventListener("click", likedButtonClicked);
