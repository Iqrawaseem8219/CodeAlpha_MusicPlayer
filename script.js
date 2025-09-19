/* Vibes Music Player - script.js
   Put audio files under audio/playlistX/ as referenced below, or change urls.
*/

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const coverImg = document.getElementById('coverImg');
const volumeEl = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');
const playlistSelect = document.getElementById('playlistSelect');
const autoplayToggle = document.getElementById('autoplayToggle');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');

let isPlaying = false;
let currentPlaylistIndex = 0;
let currentSongIndex = 0;
let isShuffle = false;
let isRepeat = false;

// ---- Playlists data ----
// Replace URLs with your own file paths. Example paths assume:
// audio/playlist0/song1.mp3, audio/playlist1/song2.mp3, etc.
// Add album art in 'cover' property (can be local file paths).
const playlists = [
  {
    name: "Chill Vibes",
    songs: [
      {title:"True Stories", artist:"AP Dhillon", src:"song/True Stories - SirfJatt.Com.mp3", cover:"https://i.ytimg.com/vi/vzAoVL77ORs/maxresdefault.jpg"},
      {title:"Safety Off", artist:"Shubh", src:"song/Safety - SirfJatt.Com.mp3", cover:"https://tse1.mm.bing.net/th/id/OIP.fwd0WGaKvvDslTIN9VjLtwHaEK?pid=Api&P=0&h=220"},
      {title:"Tension", artist:"Diljit Dosanjh", src:"song/Tension-mp3-song-by-Diljit-Dosanjh.mp3", cover:"https://i.ytimg.com/vi/8_JyoKPUtuA/hqdefault.jpg"},
      {title:"wavy", artist:"Karan Aujla ", src:"song/Wavy - SirfJatt.Com.mp3", cover:"https://tse4.mm.bing.net/th/id/OIP.SYcl6S0_bcOHU3mHvfDwrAHaEK?pid=Api&P=0&h=220"},
      {title:"Jatt Diyan Tauran Ne", artist:" Gippy Grewal, Shipra Goyal, Adrija Gupta, Jatinder Shah & Kumaar", src:"song/", cover:"https://tse4.mm.bing.net/th/id/OIP.UH30F0evdyQlBX-LoZHrpAHaEK?pid=Api&P=0&h=220"}
    ]
  },
  {
    name: "Groovy Night",
    songs: [
      {title:"Groove Street", artist:"Night Owls", src:"audio/playlist1/groove-street.mp3", cover:"covers/c1-1.jpg"},
      {title:"Neon Lights", artist:"RetroBeats", src:"audio/playlist1/neon-lights.mp3", cover:"covers/c1-2.jpg"},
      {title:"Midnight Funk", artist:"Funk Lab", src:"audio/playlist1/midnight-funk.mp3", cover:"covers/c1-3.jpg"},
      {title:"Club Walk", artist:"DJ Smooth", src:"audio/playlist1/club-walk.mp3", cover:"covers/c1-4.jpg"}
    ]
  },
  {
    name: "Sunny Beats",
    songs: [
      {title:"Sunrise Run", artist:"Daylight", src:"audio/playlist2/sunrise-run.mp3", cover:"covers/c2-1.jpg"},
      {title:"Palm Drive", artist:"Beachset", src:"audio/playlist2/palm-drive.mp3", cover:"covers/c2-2.jpg"},
      {title:"Warm Coffee", artist:"Acoustic Soul", src:"audio/playlist2/warm-coffee.mp3", cover:"covers/c2-3.jpg"},
      {title:"Open Sky", artist:"Mornings", src:"audio/playlist2/open-sky.mp3", cover:"covers/c2-4.jpg"}
    ]
  },
  {
    name: "Indie Flow",
    songs: [
      {title:"Paper Planes", artist:"Tiny Echo", src:"audio/playlist3/paper-planes.mp3", cover:"covers/c3-1.jpg"},
      {title:"Window Seat", artist:"City Tales", src:"audio/playlist3/window-seat.mp3", cover:"covers/c3-2.jpg"},
      {title:"Soft Shoes", artist:"Indie Route", src:"audio/playlist3/soft-shoes.mp3", cover:"covers/c3-3.jpg"}
    ]
  },
  {
    name: "Retro Mix",
    songs: [
      {title:"Vinyl Nights", artist:"Retro King", src:"audio/playlist4/vinyl-nights.mp3", cover:"covers/c4-1.jpg"},
      {title:"Cassette Tape", artist:"OldSchool", src:"audio/playlist4/cassette-tape.mp3", cover:"covers/c4-2.jpg"},
      {title:"Echoes", artist:"Vintage", src:"audio/playlist4/echoes.mp3", cover:"covers/c4-3.jpg"}
    ]
  },
  {
    name: "Deep House",
    songs: [
      {title:"Underwater", artist:"HouseLab", src:"audio/playlist5/underwater.mp3", cover:"covers/c5-1.jpg"},
      {title:"Pulse", artist:"Beat Forge", src:"audio/playlist5/pulse.mp3", cover:"covers/c5-2.jpg"},
      {title:"Nightfall", artist:"SubGroove", src:"audio/playlist5/nightfall.mp3", cover:"covers/c5-3.jpg"},
      {title:"Low Light", artist:"GrooveSmith", src:"audio/playlist5/low-light.mp3", cover:"covers/c5-4.jpg"},
    ]
  }
];

// populate playlist select names
playlists.forEach((p, idx) => {
  const opt = document.createElement('option');
  opt.value = idx;
  opt.innerText = p.name;
  // first options already present in HTML; safe to ignore duplicates
});

// Fill UI playlist
function renderPlaylist(){
  playlistEl.innerHTML = '';
  const list = playlists[currentPlaylistIndex].songs;
  list.forEach((s, i) => {
    const li = document.createElement('li');
    li.dataset.index = i;
    li.innerHTML = `
      <div class="song-thumb"><img src="${s.cover || 'placeholder-cover.jpg'}" alt="thumb"/></div>
      <div class="song-info">
        <div class="s-title">${s.title}</div>
        <div class="s-artist">${s.artist}</div>
      </div>
    `;
    li.addEventListener('click', () => {
      loadSong(i);
      playAudio();
    });
    playlistEl.appendChild(li);
  });
  highlightActive();
}

function highlightActive(){
  [...playlistEl.children].forEach(li => li.classList.remove('active'));
  const active = playlistEl.querySelector('li[data-index="${currentSongIndex}"]');
  if(active) active.classList.add('active');
}

// Load song by index
function loadSong(index){
  const song = playlists[currentPlaylistIndex].songs[index];
  if(!song) return;
  currentSongIndex = index;
  audio.src = song.src;
  titleEl.innerText = song.title;
  artistEl.innerText = song.artist;
  coverImg.src = song.cover || 'placeholder-cover.jpg';
  progress.value = 0;
  currentTimeEl.innerText = '0:00';
  durationEl.innerText = '0:00';
  highlightActive();
}

// Play / Pause
function playAudio(){
  audio.play().then(()=>{
    isPlaying = true;
    playPauseBtn.innerText = '⏸';
    document.querySelector('.cover').classList.add('playing');
  }).catch(e=>{
    console.warn('play prevented', e);
  });
}
function pauseAudio(){
  audio.pause();
  isPlaying = false;
  playPauseBtn.innerText = '▶';
  document.querySelector('.cover').classList.remove('playing');
}

// Next / Prev
function nextSong(){
  const list = playlists[currentPlaylistIndex].songs;
  if(isShuffle){
    currentSongIndex = Math.floor(Math.random()*list.length);
  } else {
    currentSongIndex++;
    if(currentSongIndex >= list.length){
      if(isRepeat) currentSongIndex = 0;
      else {
        // if autoplay is enabled and repeat off, stop or move to next playlist?
        if(autoplayToggle.checked){
          currentSongIndex = 0;
        } else {
          currentSongIndex = list.length - 1;
          pauseAudio();
          return;
        }
      }
    }
  }
  loadSong(currentSongIndex);
  playAudio();
}
function prevSong(){
  if(audio.currentTime > 3){
    audio.currentTime = 0;
    return;
  }
  const list = playlists[currentPlaylistIndex].songs;
  if(isShuffle){
    currentSongIndex = Math.floor(Math.random()*list.length);
  } else {
    currentSongIndex--;
    if(currentSongIndex < 0) currentSongIndex = list.length - 1;
  }
  loadSong(currentSongIndex);
  playAudio();
}

// Update time & progress
audio.addEventListener('timeupdate', ()=> {
  if(!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent;
  currentTimeEl.innerText = formatTime(audio.currentTime);
  durationEl.innerText = formatTime(audio.duration);
});
audio.addEventListener('loadedmetadata', ()=> {
  durationEl.innerText = formatTime(audio.duration);
});
progress.addEventListener('input', (e)=> {
  if(!audio.duration) return;
  const pct = e.target.value;
  audio.currentTime = (pct/100) * audio.duration;
});
volumeEl.addEventListener('input', (e)=> {
  audio.volume = parseFloat(e.target.value);
});

// Format seconds -> mm:ss
function formatTime(sec){
  if(!sec || isNaN(sec)) return '0:00';
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2,'0');
  return minutes + ":"+ seconds ;
}

// play/pause click
playPauseBtn.addEventListener('click', ()=> {
  if(isPlaying) pauseAudio(); else playAudio();
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// on end
audio.addEventListener('ended', ()=> {
  if(isRepeat){
    audio.currentTime = 0;
    playAudio();
    return;
  }
  // if autoplay on, play next (and if on last and autoplay true, restart playlist)
  const list = playlists[currentPlaylistIndex].songs;
  if(currentSongIndex < list.length - 1){
    nextSong();
  } else {
    if(autoplayToggle.checked){
      // go to next playlist automatically if available
      if(currentPlaylistIndex < playlists.length - 1){
        currentPlaylistIndex++;
        playlistSelect.value = currentPlaylistIndex;
        currentSongIndex = 0;
        renderPlaylist();
        loadSong(0);
        playAudio();
      } else {
        // loop to first playlist
        currentPlaylistIndex = 0;
        playlistSelect.value = 0;
        renderPlaylist();
        loadSong(0);
        playAudio();
      }
    } else {
      pauseAudio();
      audio.currentTime = 0;
    }
  }
});

// playlist change
playlistSelect.addEventListener('change', (e)=>{
  currentPlaylistIndex = parseInt(e.target.value);
  currentSongIndex = 0;
  renderPlaylist();
  loadSong(0);
});

// shuffle & repeat
shuffleBtn.addEventListener('click', ()=>{
  isShuffle = !isShuffle;
  shuffleBtn.style.opacity = isShuffle ? 1 : 0.6;
});
repeatBtn.addEventListener('click', ()=>{
  isRepeat = !isRepeat;
  repeatBtn.style.opacity = isRepeat ? 1 : 0.6;
});

// keyboard controls
window.addEventListener('keydown', (e)=>{
  if(e.code === 'Space'){ e.preventDefault(); if(isPlaying) pauseAudio(); else playAudio(); }
  if(e.key === 'ArrowRight'){ nextSong(); }
  if(e.key === 'ArrowLeft'){ prevSong(); }
});

// init
function init(){
  // ensure something loads on first open
  currentPlaylistIndex = 0;
  playlistSelect.value = 0;
  renderPlaylist();
  loadSong(0);
  audio.volume = parseFloat(volumeEl.value);
  autoplayToggle.checked = true; // default on
}

init();
