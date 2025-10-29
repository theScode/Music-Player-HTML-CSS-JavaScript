const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.querySelector(".progress-bar");
const volumeControl = document.getElementById("volume");

//Song list (Array of objects)
const songs = [
  {
    title: "Bijuria",
    artist: "Neha Kakkar",
    audioSrc: "songs/song1.mp3",
    coverSrc: "covers/song1.jpg"
  },
  {
    title: "Ghungroo",
    artist: "UK Haryanvi",
    audioSrc: "songs/song2.mp3",
    coverSrc: "covers/song2.jpg"
  }
];

// Track which song is playing
let songIndex = 0;
let isPlaying = false;

function loadSong(song) {

  isPlaying=false;
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.coverSrc;
  audio.src = song.audioSrc;
}
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸"; 
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️"; // Change icon to play
}
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
function nextSong() {
  songIndex = (songIndex + 1) % songs.length; // Move to next song, loop back to start
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length; // Move to previous song
  loadSong(songs[songIndex]);
  playSong();
}
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);


// ---------- PROGRESS BAR UPDATE ----------
audio.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
}

// Volume Control
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

audio.addEventListener("ended", nextSong);
loadSong(songs[songIndex]);
