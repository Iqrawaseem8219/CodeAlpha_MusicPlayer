
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

const playlists = [
  {
    name: "Mafia Vibes",
    songs: [
      {title:"True Stories", artist:"AP Dhillon", src:"song/True Stories - SirfJatt.Com.mp3", cover:"https://i.ytimg.com/vi/vzAoVL77ORs/maxresdefault.jpg"},
      {title:"Safety Off", artist:"Shubh", src:"song/Safety - SirfJatt.Com.mp3", cover:"https://tse1.mm.bing.net/th/id/OIP.fwd0WGaKvvDslTIN9VjLtwHaEK?pid=Api&P=0&h=220"},
      {title:"Tension", artist:"Diljit Dosanjh", src:"song/Tension-mp3-song-by-Diljit-Dosanjh.mp3", cover:"https://i.ytimg.com/vi/8_JyoKPUtuA/hqdefault.jpg"},
      {title:"wavy", artist:"Karan Aujla ", src:"song/Wavy - SirfJatt.Com.mp3", cover:"https://tse4.mm.bing.net/th/id/OIP.SYcl6S0_bcOHU3mHvfDwrAHaEK?pid=Api&P=0&h=220"},
      {title:"Jatt Diyan Tauran Ne", artist:" Gippy Grewal, Shipra Goyal, Adrija Gupta, Jatinder Shah & Kumaar", src:"song/Jatt Diyan Tauran (Full Audio Song) _ Gippy Grewal _ Punjabi Audio Song _ Speed Records.mp3", cover:"https://tse4.mm.bing.net/th/id/OIP.UH30F0evdyQlBX-LoZHrpAHaEK?pid=Api&P=0&h=220"}
    ]
  },
  {
    name: "Love songs",
    songs: [
      {title:"IDK HOW", artist:"Karan Aujla", src:"song/IDK_HOW_Karan_Aujla.mp3", cover:"https://tse3.mm.bing.net/th/id/OIP.AObEELQRx88CVoGqeP7A8gHaEK?pid=Api&P=0&h=220"},
      {title:"Tere Bina Na Guzara E", artist:"Josh brar", src:"song/Tere Bina Na Guzara E - SirfJatt.Com.mp3", cover:"https://tse3.mm.bing.net/th/id/OIP.qs8Pk4f6RLoYjs-XL5_W_QHaHa?pid=Api&P=0&h=220"},
      {title:"Piya O Re Piya", artist:"Atif Aslam", src:"song/shreya-ghoshal-atif-aslam-piya-o-re-piya-tere-naal-love-ho-gaya.mp3", cover:"https://tse3.mm.bing.net/th/id/OIP.T6MdivKFWULgh81L3bUTMwHaEK?pid=Api&P=0&h=220"},
      {title:"Mann Mera", artist:"Gajendra Verma", src:"song/Mann Mera Original Version - PagalWorld.mp3", cover:"https://tse2.mm.bing.net/th/id/OIP.VVf_2rwG5tCnBHVK6s0IrgAAAA?pid=Api&P=0&h=220"},
      {title:"Tu Hi Haqeeqat Khwab Tu", artist:"Javed Ali", src:"song/Tu Hi Haqeeqat Khwab Tu_128.mp3", cover:"https://tse1.mm.bing.net/th/id/OIP.BCK-mAPi5HVNosCgZk8JBAHaFj?pid=Api&P=0&h=220"}
    ]
  },
  {
    name: "Rap Rush",
    songs: [
      {title:"STFU", artist:"AP Dhillon, Shinda Kahlon", src:"song/STFU_AP_Dhillon_Shinda_Kahlon.mp3", cover:"https://tse1.mm.bing.net/th/id/OIP.6CqiHdgqmfzx1ZCbmuAbkQHaEK?pid=Api&P=0&h=220"},
      {title:"King Shit", artist:"Shubh", src:"song/King Shit - Shubh(MixJio.In).mp3", cover:"https://tse1.mm.bing.net/th/id/OIP.Xg0yz35IEYVKD2w-B4-obQHaEK?pid=Api&P=0&h=220"},
      {title:"Winning Speech", artist:"Karan Aujla", src:"song/Winning Speech - SirfJatt.Com.mp3", cover:"https://tse3.mm.bing.net/th/id/OIP.cQICp21uj12313UZ8xZyxwHaEK?pid=Api&P=0&h=220"},
      {title:"Amplifier", artist:"Imran Khan", src:"song/Amplifier_128.mp3", cover:"https://tse3.mm.bing.net/th/id/OIP.QDQ9sdKhkIKhtBSiermD4wHaEK?pid=Api&P=0&h=220"},
       {title:"Lalkara", artist:"Diljit Dosanjh", src:"song/Lalkara_128.mp3", cover:"https://tse1.mm.bing.net/th/id/OIP.pxMj2CLaQSKpji5otxYqoAHaEK?pid=Api&P=0&h=220"}
      ]
  },
  {
    name: "Sufi Qawali",
    songs: [
      {title:"Ali-maula-Ali-maula-Ali-dam-dam", artist:"Nusrat Fateh Ali Khan (NFAK)", src:"song/ali-maula-ali-maula-ali-dam-dam.mp3", cover:"https://tse3.mm.bing.net/th/id/OIP.mrb6XjCRvL9FlNu3UWj4_QHaFj?pid=Api&P=0&h=220"},
      {title:"Ya-Hayyu-Ya-Qayyum", artist:"Nusrat Fateh Ali Khan (NFAK)", src:"song/Nusrat-Fateh-Ali-Khan-Ya-Hayyu-Ya-Qayyum.mp3", cover:"https://tse4.mm.bing.net/th/id/OIP.1eMuPwDddNs7egBXsj8V1wHaFj?pid=Api&P=0&h=220"},
      {title:"Tajdar-e-Haram ", artist:"Ghulam Fareed Sabri", src:"song/Ghulam_farid_sabri-qawal-Tajdar_e_haram.mp3", cover:"https://tse2.mm.bing.net/th/id/OIP.y3ylIP0ihcz8mDLUJDocaAHaFj?pid=Api&P=0&h=220"},
      {title:"dam-mast-qalandar", artist:"Nusrat Fateh Ali Khan (NFAK)", src:"song/dam-mast-qalandar.mp3", cover:"https://tse2.mm.bing.net/th/id/OIP.wMGOTlOmTWsZkqWJ8aHr9gHaEK?pid=Api&P=0&h=220"},
      {title:"Allah-hoo-Allah-hoo", artist:"Nusrat Fateh Ali Khan (NFAK)", src:"song/allah-hoo-allah-hoo.mp3", cover:"https://tse1.mm.bing.net/th/id/OIP.y5WZZHllPVZZJEDxbuBiRQHaEK?pid=Api&P=0&h=220"}
    ]
  },
  {
    name: "Sad Songs",
    songs: [
      {title:"Bewafa", artist:"Imran khan", src:"song/Bewafa - Imran Khan.mp3", cover:"https://tse1.mm.bing.net/th/id/OIP.ox_grcrslnF04ZfyjCk5wgHaEK?pid=Api&P=0&h=220"},
      {title:"Ijazat", artist:"Falak Shabir", src:"song/Ijazat.mp3", cover:"https://tse1.mm.bing.net/th/id/OIP.iIfXe4eoyU0ex297U_fS1gHaCs?pid=Api&P=0&h=220"},
      {title:"Ki Samjhaiye", artist:"Amrinder Gill", src:"song/Ki Samjhaiye_128-(PagalWorld.Org.Im).mp3", cover:"https://tse1.mm.bing.net/th/id/OIP.hSZZ0xJwAshjjAYNQJ1WIQHaEK?pid=Api&P=0&h=220"},
      {title:"Raanjhan", artist:"Parampara Tandon", src:"song/Raanjhan - Parampara Tandon(MixJio.In).mp3", cover:"https://tse3.mm.bing.net/th/id/OIP.0nkgmKyZwm5n8Bz0Tj7wiAHaHa?pid=Api&P=0&h=220"},
      {title:"Uska Hi Banana", artist:"Arjit singh", src:"song/08 - Uska Hi Banana [Songspk.name].mp3", cover:"https://tse4.mm.bing.net/th/id/OIP.HLc6kkbNj3gzujfh5y4NqQHaEK?pid=Api&P=0&h=220"}
    ]
  },
  {
    name: "OST",
    songs: [
      {title:"Ehd e Wafa ", artist:"Aima Baig, Asim Azhar & Ali Zafar", src:"song/36 - Ehd e Wafa - OST - Hum TV (ApniISP.Com).mp3", cover:"https://tse4.mm.bing.net/th/id/OIP.q1zc1abAm7GZtCD8ub5jXQHaFG?pid=Api&P=0&h=220"},
      {title:"Meem Se Mohabbat ", artist:"Asim Azhar & Qirat Haider", src:"song/71 - Meem Se Mohabbat - OST - HUM TV (ApniISP.Com).mp3", cover:"https://tse3.mm.bing.net/th/id/OIP.3bJZQeECqnqScpS4vLLxRAHaEQ?pid=Api&P=0&h=220"},
      {title:"Ishq Murshid ", artist:"Ahmed Jehanzeb", src:"song/67 - Ishq Murshid - OST - HUM TV (ApniISP.Com).mp3", cover:"https://tse3.mm.bing.net/th/id/OIP.3egps6p9n6lDT5YuRtDVzQHaEK?pid=Api&P=0&h=220"},
      {title:"Raqs-E-Bismil", artist:"Vicky Akbar", src:"song/53 - Raqs-e-Bismil - OST - HUM TV (ApniISP.Com).mp3", cover:"https://tse3.mm.bing.net/th/id/OIP.JW9iRcupO2sHdxoM54dO8wHaEx?pid=Api&P=0&h=220"},
     {title:"Khamoshi ", artist:"Bilal khan", src:"song/08 - Khamoshi - OST - HumTV (ApniISP.Com).mp3", cover:"https://tse3.mm.bing.net/th/id/OIP.Os2NzXFgMXdi6g6Q8zExCgHaEF?pid=Api&P=0&h=220"},
    ]
  }
];

playlists.forEach((p, idx) => {
  const opt = document.createElement('option');
  opt.value = idx;
  opt.innerText = p.name;

});

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
