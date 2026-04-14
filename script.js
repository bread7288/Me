// Wes's Weather World — Open-Meteo (free, no API key)

const WMO = {
  0:  ['Clear Sky',     '☀️',  'sunny'],
  1:  ['Mostly Clear',  '🌤️', 'sunny'],
  2:  ['Partly Cloudy', '⛅',  'cloudy'],
  3:  ['Cloudy',        '☁️',  'cloudy'],
  45: ['Foggy',         '🌫️', 'foggy'],
  48: ['Icy Fog',       '🌫️', 'foggy'],
  51: ['Light Drizzle', '🌦️', 'rainy'],
  53: ['Drizzle',       '🌦️', 'rainy'],
  55: ['Heavy Drizzle', '🌧️', 'rainy'],
  61: ['Light Rain',    '🌧️', 'rainy'],
  63: ['Rainy',         '🌧️', 'rainy'],
  65: ['Heavy Rain',    '🌧️', 'rainy'],
  71: ['Light Snow',    '🌨️', 'snowy'],
  73: ['Snowy',         '❄️',  'snowy'],
  75: ['Heavy Snow',    '❄️',  'snowy'],
  77: ['Snow Grains',   '🌨️', 'snowy'],
  80: ['Light Showers', '🌦️', 'rainy'],
  81: ['Showers',       '🌧️', 'rainy'],
  82: ['Big Showers',   '⛈️', 'stormy'],
  85: ['Snow Showers',  '🌨️', 'snowy'],
  86: ['Heavy Snow',    '🌨️', 'snowy'],
  95: ['Thunderstorm',  '⛈️', 'stormy'],
  96: ['Storm+Hail',    '⛈️', 'stormy'],
  99: ['Storm+Hail',    '⛈️', 'stormy'],
};

const MASCOTS = { sunny:'😎','clear-night':'🌙',cloudy:'🙂',rainy:'🌧️',snowy:'⛄',stormy:'😬',foggy:'👻' };
const VIBES   = { sunny:"It's beautiful outside!",'clear-night':"The stars are out tonight!",cloudy:"A bit cloudy today!",rainy:"Grab your umbrella!",snowy:"Snow day! ⛄",stormy:"Stay safe inside!",foggy:"Super foggy out there!" };

const WEAR = {
  sunny:        [['🧴','Sunscreen']],
  'clear-night':[['🧥','Jacket'],['🌟','Stargazing!']],
  cloudy:       [['🧥','Light jacket']],
  rainy:        [['☔','Umbrella'],['🥾','Rain boots'],['🧥','Rain jacket']],
  snowy:        [['🧤','Gloves'],['🧣','Scarf'],['🥾','Snow boots'],['🧥','Big coat']],
  stormy:       [['🏠','Stay inside'],['🕯️','Flashlight just in case']],
  foggy:        [['🧥','Jacket'],['👟','Good shoes']],
};

const FACTS = {
  sunny:        ['The Sun is SO big that 1 million Earths could fit inside it! 🌍','A sunny day is caused by the Earth tilting toward the Sun! 🌎','Lightning strikes Earth about 100 times every second! ⚡'],
  'clear-night':['There are more stars in space than grains of sand on ALL Earth\'s beaches! 🏖️','The Moon is slowly moving away from Earth — 1.5 inches every year! 🌕','You can see the Space Station flying by with just your eyes! 🚀'],
  cloudy:       ['A single fluffy cloud can weigh as much as 100 elephants! 🐘','Clouds are made of billions of tiny water droplets! 💧','The highest clouds are 50 miles up in the sky! ✈️'],
  rainy:        ['Raindrops fall at about 14 miles per hour! 💨','Rainbows are actually full circles — you just see the top half! 🌈','A single thunderstorm can drop millions of gallons of water! 🌊'],
  snowy:        ['No two snowflakes are exactly the same — ever! ❄️','Snow is actually see-through, not white — it just looks white! 🤍','The biggest snowflake ever was 15 inches wide — like a pizza! 🍕'],
  stormy:       ['Thunder is the sound of air expanding super fast from lightning! 💥','A lightning bolt is 5x hotter than the Sun\'s surface! 🌞','Count seconds after lightning to find how far away it is! 🔢'],
  foggy:        ['Fog is just a cloud touching the ground! ☁️','San Francisco\'s famous fog has a nickname — "Karl"! 🌁','Some places get fog so thick it drips like rain! 💧'],
};

const TIPS = {
  sunny:'😎 Put on sunscreen! Even on warm sunny days your skin needs protection.',
  'clear-night':'🌙 Great night to look at stars! Can you find the Big Dipper?',
  cloudy:'🧥 A light layer wouldn\'t hurt — clouds can make it cooler!',
  rainy:'☔ Puddle jumping is totally allowed today! Just wear boots 😄',
  snowy:'⛄ Perfect snow day! Build a snowman and drink hot cocoa after.',
  stormy:'🏠 Stay cozy inside. Best time for games and movies!',
  foggy:'👀 It\'s foggy — hold a grown-up\'s hand if you go out!',
};

// ── Quiz questions ──
const QUIZ_QS = [
  { q:"What makes thunder?", choices:["Clouds bumping together","Cold and warm air mixing","Lightning heating air super fast","Wind blowing really hard"], ans:2 },
  { q:"How fast do raindrops fall?", choices:["2 miles per hour","14 miles per hour","50 miles per hour","100 miles per hour"], ans:1 },
  { q:"No two of these are exactly alike — ever!", choices:["Raindrops","Snowflakes","Clouds","Rainbows"], ans:1 },
  { q:"A lightning bolt is hotter than...", choices:["A campfire","Boiling water","The surface of the Sun","A pizza oven"], ans:2 },
  { q:"What is fog made of?", choices:["Smoke","Tiny water droplets touching the ground","Ice crystals in space","Invisible air"], ans:1 },
  { q:"How many Earths fit inside the Sun?", choices:["100","10,000","1 million","1 billion"], ans:2 },
  { q:"What shape is a rainbow really?", choices:["A half circle","A full circle","A straight line","A spiral"], ans:1 },
  { q:"What is hail made of?", choices:["Hard snow","Frozen rain balls","Dried mud","Tiny rocks"], ans:1 },
  { q:"Which is the most accurate weather forecast model?", choices:["A magic 8-ball","GFS","ECMWF","Looking at clouds yourself"], ans:2 },
  { q:"How far away is lightning if you count 5 seconds after the flash?", choices:["1 mile","5 miles","10 miles","Half a mile"], ans:0 },
  { q:"What causes wind?", choices:["The Earth spinning super fast","Differences in air pressure","The moon pulling air","Trees breathing"], ans:1 },
  { q:"What is the biggest snowflake ever recorded as wide as?", choices:["A coin","Your hand","A pizza","A car"], ans:2 },
];

// Moon helpers
function moonEmoji(p) { return ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'][Math.round(p*8)%8]; }
function moonName(p)  {
  if (p<.03||p>.97) return 'New Moon';
  if (p<.22) return 'Crescent';
  if (p<.28) return '1st Quarter';
  if (p<.47) return 'Waxing';
  if (p<.53) return 'Full Moon';
  if (p<.72) return 'Waning';
  if (p<.78) return 'Last Quarter';
  return 'Crescent';
}
function getMoonPhase(d) {
  const known=new Date(2000,0,6,18,14).getTime()/1000, period=2551443;
  return ((d.getTime()/1000-known)%period+period)%period/period;
}

function tempWord(f) {
  if (f>=95) return ['🥵 Scorching!','#e53935'];
  if (f>=85) return ['🔥 Hot!','#f4511e'];
  if (f>=70) return ['😊 Warm!','#fb8c00'];
  if (f>=55) return ['🙂 Nice!','#43a047'];
  if (f>=40) return ['🧥 Chilly!','#1e88e5'];
  if (f>=25) return ['🥶 Cold!','#1565c0'];
  return ['❄️ Freezing!!!','#4a148c'];
}

function playOutsideScore(tempF,windMph,rainPct,uvVal) {
  let s=100;
  if(tempF<32)s-=60; else if(tempF<45)s-=30; else if(tempF>95)s-=50; else if(tempF>85)s-=20; else if(tempF>=60&&tempF<=82)s+=10;
  s-=rainPct*.7;
  if(windMph>30)s-=30; else if(windMph>20)s-=15;
  if(uvVal>=11)s-=20; else if(uvVal>=8)s-=10;
  return Math.max(0,Math.min(100,s));
}

function playOutsideLabel(score) {
  if(score>=75) return ['YES! Go outside! 🎉','linear-gradient(90deg,#4caf50,#8bc34a)','🌳 Perfect weather to run around and have fun!'];
  if(score>=45) return ['Maybe... 🤔','linear-gradient(90deg,#ff9800,#ffc107)','🏃 It\'s okay outside, but bring a jacket just in case!'];
  return ['Stay Inside 🏠','linear-gradient(90deg,#f44336,#e91e63)','🛋️ Better to stay cozy inside today!'];
}

function uvLabel(uv) {
  if(uv<3)  return ['Low 🟢','uv-low'];
  if(uv<6)  return ['Medium 🟡','uv-mod'];
  if(uv<8)  return ['High 🟠','uv-high'];
  if(uv<11) return ['Very High 🔴','uv-vhigh'];
  return ['Extreme 🟣','uv-extreme'];
}

function aqiInfo(aqi) {
  if(!aqi||isNaN(aqi)) return {label:'--',cls:'',advice:'Checking...',pct:0};
  if(aqi<=50)  return {label:'Great Air! 😊',cls:'aqi-good',     advice:'Safe to breathe — go outside and play!',pct:aqi/500*100};
  if(aqi<=100) return {label:'Okay Air 😐',  cls:'aqi-moderate', advice:'Sensitive kids should take it easy outside.',pct:aqi/500*100};
  if(aqi<=150) return {label:'Sensitive ⚠️', cls:'aqi-sensitive',advice:'People with asthma should stay inside.',pct:aqi/500*100};
  if(aqi<=200) return {label:'Unhealthy 😷', cls:'aqi-unhealthy',advice:'Everyone should limit outdoor activity.',pct:aqi/500*100};
  if(aqi<=300) return {label:'Very Bad! 🚨', cls:'aqi-very',      advice:'Stay inside! Air is very unhealthy.',pct:aqi/500*100};
  return              {label:'Dangerous! 🆘',cls:'aqi-hazardous', advice:'Emergency conditions — stay indoors!',pct:aqi/500*100};
}

function wmo(code)         { return WMO[code]||['Unknown','🌡️','cloudy']; }
function pickRandom(arr)   { return arr[Math.floor(Math.random()*arr.length)]; }
function degToCompass(deg) { return ['N','NE','E','SE','S','SW','W','NW'][Math.round(deg/45)%8]; }
function toF(c)            { return c*9/5+32; }
function fmt(val)          { return Math.round(useCelsius?val:toF(val))+(useCelsius?'°C':'°F'); }

// ── State ──
let useCelsius=false, currentData=null, currentCity='', currentCountry='';
let currentLat=null, currentLon=null;
let refreshTimer=null, countdown=600;
let windyLayer='rain';
let soundOn=false, audioCtx=null, soundSource=null, soundGain=null;
let quizIdx=null, quizScore=0, quizTotal=0, quizAnswered=false;
let lastPressure=null;

// ── DOM ──
const cityInput   = document.getElementById('city-input');
const searchBtn   = document.getElementById('search-btn');
const locateBtn   = document.getElementById('locate-btn');
const loadingEl   = document.getElementById('loading');
const errorEl     = document.getElementById('error');
const errorMsg    = document.getElementById('error-msg');
const weatherEl   = document.getElementById('weather');
const bgLayer     = document.getElementById('bg-layer');
const particlesEl = document.getElementById('particles');
const unitToggle  = document.getElementById('unit-toggle');
const soundBtn    = document.getElementById('sound-btn');
const refreshInfo = document.getElementById('refresh-info');

// ── Favorites ──
function getFavs()   { try{return JSON.parse(localStorage.getItem('wes_favs')||'[]')}catch{return []} }
function saveFavs(a) { localStorage.setItem('wes_favs',JSON.stringify(a)); }
function renderFavs() {
  const bar=document.getElementById('favs-bar');
  bar.innerHTML='';
  getFavs().forEach(({city,country,lat,lon})=>{
    const chip=document.createElement('div');
    chip.className='fav-chip';
    chip.innerHTML=`📍 ${city}${country?', '+country:''} <span class="remove-fav" data-city="${city}">✕</span>`;
    chip.querySelector('.remove-fav').addEventListener('click',e=>{e.stopPropagation();saveFavs(getFavs().filter(f=>f.city!==city));renderFavs();});
    chip.addEventListener('click',()=>fetchWeather(lat,lon,city,country));
    bar.appendChild(chip);
  });
}
document.getElementById('fav-btn').addEventListener('click',()=>{
  if(!currentCity||currentCity==='My Location') return;
  const favs=getFavs();
  if(favs.find(f=>f.city===currentCity)) return;
  if(favs.length>=5) favs.shift();
  favs.push({city:currentCity,country:currentCountry,lat:currentLat,lon:currentLon});
  saveFavs(favs); renderFavs();
});
renderFavs();

// ── Unit toggle ──
unitToggle.addEventListener('click',()=>{
  useCelsius=!useCelsius;
  unitToggle.textContent=useCelsius?'🌡️ Switch to °F':'🌡️ Switch to °C';
  if(currentData) renderWeather(currentData,currentCity,currentCountry);
});

// ── Ambient sounds (Web Audio) ──
soundBtn.addEventListener('click',()=>{
  soundOn=!soundOn;
  soundBtn.textContent=soundOn?'🔊 Sounds: ON':'🔇 Sounds: OFF';
  soundBtn.classList.toggle('sound-on',soundOn);
  if(soundOn) startSound(); else stopSound();
});

function getAudioCtx() {
  if(!audioCtx) audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  if(audioCtx.state==='suspended') audioCtx.resume();
  return audioCtx;
}

function startSound() {
  stopSound();
  const ctx=getAudioCtx();
  const theme=bgLayer.className.replace('bg-layer bg-','');
  const bufLen=ctx.sampleRate*3;
  const buf=ctx.createBuffer(1,bufLen,ctx.sampleRate);
  const data=buf.getChannelData(0);

  if(theme==='rainy'||theme==='stormy') {
    for(let i=0;i<bufLen;i++) data[i]=Math.random()*2-1;
    soundSource=ctx.createBufferSource(); soundSource.buffer=buf; soundSource.loop=true;
    const f=ctx.createBiquadFilter(); f.type='bandpass'; f.frequency.value=600; f.Q.value=0.4;
    soundGain=ctx.createGain(); soundGain.gain.value=theme==='stormy'?0.12:0.08;
    soundSource.connect(f); f.connect(soundGain); soundGain.connect(ctx.destination);
    soundSource.start();
  } else if(theme==='snowy'||theme==='cloudy') {
    for(let i=0;i<bufLen;i++) data[i]=(Math.random()*2-1)*0.3;
    soundSource=ctx.createBufferSource(); soundSource.buffer=buf; soundSource.loop=true;
    const f=ctx.createBiquadFilter(); f.type='lowpass'; f.frequency.value=200;
    soundGain=ctx.createGain(); soundGain.gain.value=0.04;
    soundSource.connect(f); f.connect(soundGain); soundGain.connect(ctx.destination);
    soundSource.start();
  } else if(theme==='sunny') {
    // Gentle birds / wind: subtle high-freq noise
    for(let i=0;i<bufLen;i++) data[i]=(Math.random()*2-1)*0.5;
    soundSource=ctx.createBufferSource(); soundSource.buffer=buf; soundSource.loop=true;
    const f=ctx.createBiquadFilter(); f.type='highpass'; f.frequency.value=2000;
    soundGain=ctx.createGain(); soundGain.gain.value=0.025;
    soundSource.connect(f); f.connect(soundGain); soundGain.connect(ctx.destination);
    soundSource.start();
  }
}

function stopSound() {
  try { if(soundSource){soundSource.stop();soundSource=null;} } catch{}
}

// ── Search ──
searchBtn.addEventListener('click',()=>{const q=cityInput.value.trim();if(q)searchCity(q);});
cityInput.addEventListener('keydown',e=>{if(e.key==='Enter')searchBtn.click();});
locateBtn.addEventListener('click',()=>{
  if(!navigator.geolocation) return showError("Can't find your location 😢");
  show('loading');
  navigator.geolocation.getCurrentPosition(
    pos=>fetchWeather(pos.coords.latitude,pos.coords.longitude,'My Location',''),
    ()=>showError('Location access denied 😢')
  );
});

async function searchCity(query) {
  show('loading');
  try {
    const res=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
    const data=await res.json();
    if(!data.results?.length) return showError(`Can't find "${query}" 🤔`);
    const {latitude,longitude,name,country}=data.results[0];
    fetchWeather(latitude,longitude,name,country);
  } catch {showError("Couldn't connect 🌐 Try again!");}
}

async function fetchWeather(lat,lon,city,country) {
  show('loading');
  currentLat=lat; currentLon=lon; currentCity=city; currentCountry=country;
  try {
    const [wx, aq] = await Promise.all([
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m,visibility,surface_pressure` +
        `&hourly=temperature_2m,apparent_temperature,weather_code,precipitation_probability,uv_index` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max` +
        `&temperature_unit=celsius&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto&forecast_days=7`
      ).then(r=>r.json()),
      fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}` +
        `&current=us_aqi,pm2_5,pm10,nitrogen_dioxide,ozone&timezone=auto`
      ).then(r=>r.json()).catch(()=>null),
    ]);
    currentData=wx;
    renderWeather(wx, city, country, aq);
    fetchAlerts(lat, lon);
    startRefresh(lat,lon,city,country);
  } catch {showError("Couldn't get the weather 😢 Try again!");}
}

// ── Alerts (NWS — US only) ──
async function fetchAlerts(lat,lon) {
  const banner=document.getElementById('alerts-banner');
  banner.classList.add('hidden');
  try {
    const res=await fetch(`https://api.weather.gov/alerts/active?point=${lat.toFixed(4)},${lon.toFixed(4)}`,{headers:{'User-Agent':'WesWeather/1.0'}});
    if(!res.ok) return;
    const data=await res.json();
    const alerts=data.features||[];
    if(!alerts.length) return;
    const top=alerts[0].properties;
    const sev=top.severity;
    banner.className=sev==='Extreme'||sev==='Severe'?'alert-warn':sev==='Moderate'?'alert-watch':'alert-advisory';
    banner.innerHTML=`⚠️ <b>${top.event}</b> — ${top.headline||top.description?.slice(0,120)+'...'}`;
    banner.classList.remove('hidden');
  } catch {}
}

// ── Render ──
function renderWeather(d, city, country, aq) {
  const c=d.current, now=new Date();
  const [condText,,rawTheme]=wmo(c.weather_code);
  const sunriseMs=new Date(d.daily.sunrise[0]).getTime();
  const sunsetMs =new Date(d.daily.sunset[0]).getTime();
  const isNight  =now<sunriseMs||now>sunsetMs;
  const theme    =isNight&&rawTheme==='sunny'?'clear-night':rawTheme;

  setBackground(theme);
  document.getElementById('now-mascot').textContent=MASCOTS[theme]||'🌡️';
  document.getElementById('city-name').textContent=city+(country?', '+country:'');
  document.getElementById('now-date').textContent=
    now.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})+
    ' · '+now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
  document.getElementById('now-cond').textContent=condText;

  const tempF=toF(c.temperature_2m);
  document.getElementById('now-temp').textContent =fmt(c.temperature_2m);
  document.getElementById('now-feels').textContent=fmt(c.apparent_temperature);
  const [word,color]=tempWord(tempF);
  const twEl=document.getElementById('temp-word');
  twEl.textContent=word; twEl.style.color=color;

  document.getElementById('wear-items').innerHTML=
    (WEAR[theme]||WEAR.cloudy).map(([em,lb])=>`<div class="wear-tag">${em} ${lb}</div>`).join('');

  document.getElementById('humidity').textContent=c.relative_humidity_2m+'%';
  document.getElementById('wind').textContent=Math.round(c.wind_speed_10m)+' mph '+degToCompass(c.wind_direction_10m);
  document.getElementById('visibility').textContent=c.visibility>=1000?(c.visibility/1000).toFixed(1)+' km':c.visibility+' m';

  // Pressure + trend
  const pressNow=Math.round(c.surface_pressure);
  const trendIcon=lastPressure===null?'🔽':pressNow>lastPressure?'⬆️':pressNow<lastPressure?'⬇️':'➡️';
  const trendLbl =lastPressure===null?'Pressure':pressNow>lastPressure?'Rising ⬆️':pressNow<lastPressure?'Falling ⬇️':'Steady ➡️';
  document.getElementById('pressure-val').textContent=pressNow+' hPa';
  document.getElementById('pressure-trend').textContent=trendLbl;
  document.getElementById('stat-icon-pressure-override') && (document.getElementById('stat-icon-pressure-override').textContent=trendIcon);
  lastPressure=pressNow;

  const nowIdx=d.hourly.time.findIndex(t=>new Date(t)>=now);
  const uvVal =d.hourly.uv_index[nowIdx>=0?nowIdx:0]??0;
  const [uvText,uvCls]=uvLabel(uvVal);
  const uvEl=document.getElementById('uv');
  uvEl.textContent=uvText; uvEl.className='stat-val '+uvCls;

  const phase=getMoonPhase(now);
  document.getElementById('moon-icon').textContent =moonEmoji(phase);
  document.getElementById('moon-phase').textContent=moonName(phase);

  const fmtT=iso=>new Date(iso).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
  document.getElementById('sunrise').textContent=fmtT(d.daily.sunrise[0]);
  document.getElementById('sunset').textContent =fmtT(d.daily.sunset[0]);

  // AQI
  renderAQI(aq);

  // Play outside
  const nowPrecip=d.hourly.precipitation_probability[nowIdx>=0?nowIdx:0]??0;
  const score=playOutsideScore(tempF,c.wind_speed_10m,nowPrecip,uvVal);
  const [playTxt,playGrad,playReason]=playOutsideLabel(score);
  document.getElementById('play-answer').textContent=playTxt;
  document.getElementById('play-bar').style.width   =score+'%';
  document.getElementById('play-bar').style.background=playGrad;
  document.getElementById('play-reason').textContent=playReason;

  // Fun fact
  document.getElementById('fact-text').textContent=pickRandom(FACTS[theme]||FACTS.cloudy);

  // Hourly
  const hourlyRow=document.getElementById('hourly-row');
  hourlyRow.innerHTML='';
  const start=nowIdx>=0?nowIdx:0;
  for(let i=start;i<start+24&&i<d.hourly.time.length;i++){
    const t=new Date(d.hourly.time[i]);
    const isNow2=i===start;
    const [,icon]=wmo(d.hourly.weather_code[i]);
    const precip=d.hourly.precipitation_probability[i]??0;
    const card=document.createElement('div');
    card.className='hour-card'+(isNow2?' now':'');
    card.innerHTML=`
      <div class="hour-time">${isNow2?'🕐 NOW':t.toLocaleTimeString('en-US',{hour:'numeric',hour12:true})}</div>
      <div class="hour-icon">${icon}</div>
      <div class="hour-temp">${fmt(d.hourly.temperature_2m[i])}</div>
      <div class="hour-feels">${precip>0?'💧 '+precip+'%':'&nbsp;'}</div>
    `;
    hourlyRow.appendChild(card);
  }

  renderTempChart(d);

  // 7-day
  const weekGrid=document.getElementById('week-grid');
  weekGrid.innerHTML='';
  const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  d.daily.time.forEach((dateStr,i)=>{
    const date=new Date(dateStr+'T12:00:00');
    const label=i===0?'Today':days[date.getDay()];
    const [,icon]=wmo(d.daily.weather_code[i]);
    const precip=d.daily.precipitation_probability_max[i]??0;
    const card=document.createElement('div');
    card.className='week-card'+(i===0?' today':'');
    card.innerHTML=`
      <div class="week-day">${label}</div>
      <div class="week-icon">${icon}</div>
      <div class="week-hi">${fmt(d.daily.temperature_2m_max[i])}</div>
      <div class="week-lo">${fmt(d.daily.temperature_2m_min[i])}</div>
      ${precip>20?`<div class="week-rain">💧 ${precip}%</div>`:''}
    `;
    weekGrid.appendChild(card);
  });

  document.getElementById('tip-box').textContent=TIPS[theme]||TIPS.cloudy;

  // Journal tag
  const [,icon]=wmo(c.weather_code);
  document.getElementById('journal-date').textContent=now.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
  document.getElementById('journal-tag').textContent=`${icon} ${fmt(c.temperature_2m)} · ${condText}`;

  // Windy map
  initWindyMap(currentLat,currentLon);

  // Sounds
  if(soundOn) startSound();

  show('weather');
}

// ── AQI ──
function renderAQI(aq) {
  if(!aq?.current) {
    document.getElementById('aqi-score').textContent='--';
    document.getElementById('aqi-label').textContent='No data';
    document.getElementById('aqi-sub').textContent='Air quality unavailable for this location';
    return;
  }
  const aqi=aq.current.us_aqi;
  const {label,cls,advice,pct}=aqiInfo(aqi);
  const scoreEl=document.getElementById('aqi-score');
  scoreEl.textContent=aqi??'--';
  scoreEl.className='aqi-score '+cls;
  document.getElementById('aqi-label').textContent=label;
  document.getElementById('aqi-label').className='aqi-label '+cls;
  document.getElementById('aqi-sub').textContent=advice;
  document.getElementById('aqi-pm25').textContent =(aq.current.pm2_5?.toFixed(1)??'--')+' µg/m³';
  document.getElementById('aqi-pm10').textContent =(aq.current.pm10?.toFixed(1)??'--')+' µg/m³';
  document.getElementById('aqi-no2').textContent  =(aq.current.nitrogen_dioxide?.toFixed(1)??'--')+' µg/m³';
  document.getElementById('aqi-ozone').textContent=(aq.current.ozone?.toFixed(1)??'--')+' µg/m³';
  document.getElementById('aqi-bar').style.left   =Math.min(97,Math.max(2,pct))+'%';
}

// ── Temp Chart ──
function renderTempChart(d) {
  const svg=document.getElementById('temp-chart');
  const daysEl=document.getElementById('chart-days');
  const W=620,H=160,pad=30;
  const highs=d.daily.temperature_2m_max.map(v=>useCelsius?v:toF(v));
  const lows =d.daily.temperature_2m_min.map(v=>useCelsius?v:toF(v));
  const allVals=[...highs,...lows];
  const minV=Math.min(...allVals)-5, maxV=Math.max(...allVals)+5, n=highs.length;
  const xPos=i=>pad+(i/(n-1))*(W-pad*2);
  const yPos=v=>H-pad-((v-minV)/(maxV-minV))*(H-pad*2);
  const areaPath=`M ${xPos(0)},${yPos(highs[0])} `+highs.map((v,i)=>`L ${xPos(i)},${yPos(v)}`).join(' ')+` L ${xPos(n-1)},${H} L ${xPos(0)},${H} Z`;
  const linePath=highs.map((v,i)=>`${i===0?'M':'L'} ${xPos(i)},${yPos(v)}`).join(' ');
  const lowPath =lows.map((v,i) =>`${i===0?'M':'L'} ${xPos(i)},${yPos(v)}`).join(' ');
  svg.innerHTML=`
    <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ff6b35" stop-opacity=".35"/><stop offset="100%" stop-color="#ff6b35" stop-opacity="0"/></linearGradient></defs>
    <path d="${areaPath}" fill="url(#cg)"/>
    <path d="${linePath}" fill="none" stroke="#ff6b35" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${lowPath}"  fill="none" stroke="#4f9eff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5,4"/>
    ${highs.map((v,i)=>`<circle cx="${xPos(i)}" cy="${yPos(v)}" r="5" fill="#ff6b35" stroke="white" stroke-width="2"/><text x="${xPos(i)}" y="${yPos(v)-10}" text-anchor="middle" font-size="11" font-weight="900" fill="#e53935" font-family="Nunito,sans-serif">${Math.round(v)}°</text>`).join('')}
    ${lows.map((v,i)=>`<circle cx="${xPos(i)}" cy="${yPos(v)}" r="4" fill="#4f9eff" stroke="white" stroke-width="2"/>`).join('')}`;
  const days7=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  daysEl.innerHTML=d.daily.time.map((dateStr,i)=>{
    const date=new Date(dateStr+'T12:00:00');
    return `<div class="chart-day">${i===0?'Today':days7[date.getDay()]}</div>`;
  }).join('');
}

// ── Windy Map ──
function buildWindyUrl(lat,lon,layer) {
  const unit=useCelsius?'%C2%B0C':'%C2%B0F';
  return `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&zoom=6&level=surface&overlay=${layer}&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=mph&metricTemp=${unit}&radarRange=-1`;
}
function initWindyMap(lat,lon) {
  document.getElementById('windy-map').src=buildWindyUrl(lat,lon,windyLayer);
}

// Layer buttons
document.querySelectorAll('.map-btn[data-layer]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.map-btn[data-layer]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    windyLayer=btn.dataset.layer;
    if(currentLat) initWindyMap(currentLat,currentLon);
  });
});

// ── Quiz ──
let quizShuffled=[];
function initQuiz() {
  quizShuffled=[...QUIZ_QS].sort(()=>Math.random()-.5);
  quizIdx=-1; quizScore=0; quizTotal=0;
  document.getElementById('quiz-score').textContent='0';
  document.getElementById('quiz-total').textContent='0';
  document.getElementById('quiz-feedback').textContent='';
}
function nextQuestion() {
  quizIdx=(quizIdx+1)%quizShuffled.length;
  quizAnswered=false;
  const q=quizShuffled[quizIdx];
  document.getElementById('quiz-q').textContent=q.q;
  document.getElementById('quiz-feedback').textContent='';
  const choicesEl=document.getElementById('quiz-choices');
  choicesEl.innerHTML='';
  q.choices.forEach((c,i)=>{
    const btn=document.createElement('button');
    btn.className='quiz-choice';
    btn.textContent=c;
    btn.addEventListener('click',()=>{
      if(quizAnswered) return;
      quizAnswered=true; quizTotal++;
      document.getElementById('quiz-total').textContent=quizTotal;
      if(i===q.ans){
        btn.classList.add('correct'); quizScore++;
        document.getElementById('quiz-score').textContent=quizScore;
        document.getElementById('quiz-feedback').textContent=pickRandom(['🎉 Correct! Amazing!','⭐ You got it!','🌟 Brilliant!','🏆 That\'s right!']);
      } else {
        btn.classList.add('wrong');
        choicesEl.querySelectorAll('.quiz-choice')[q.ans].classList.add('correct');
        document.getElementById('quiz-feedback').textContent=pickRandom(['🤔 Not quite!','😅 Oops! Try the next one!','💡 Good guess though!']);
      }
      choicesEl.querySelectorAll('.quiz-choice').forEach(b=>b.disabled=true);
    });
    choicesEl.appendChild(btn);
  });
}
document.getElementById('quiz-next').addEventListener('click',nextQuestion);
initQuiz();

// ── Journal ──
function getJournal()   { try{return JSON.parse(localStorage.getItem('wes_journal')||'[]')}catch{return []} }
function saveJournal(a) { localStorage.setItem('wes_journal',JSON.stringify(a)); }
function renderJournal() {
  const entries=getJournal();
  const el=document.getElementById('journal-entries');
  el.innerHTML='';
  if(!entries.length){el.innerHTML='<p style="color:#aaa;font-size:.9rem;font-weight:700">No entries yet — write your first one! ✏️</p>';return;}
  [...entries].reverse().forEach((e,revIdx)=>{
    const i=entries.length-1-revIdx;
    const div=document.createElement('div');
    div.className='journal-entry';
    div.innerHTML=`
      <div class="j-entry-head">
        <span class="j-entry-date">${e.date}</span>
        <span class="j-entry-tag">${e.tag}</span>
        <button class="j-delete" data-idx="${i}">🗑️</button>
      </div>
      <div class="j-entry-text">${e.text}</div>`;
    div.querySelector('.j-delete').addEventListener('click',()=>{
      const j=getJournal(); j.splice(i,1); saveJournal(j); renderJournal();
    });
    el.appendChild(div);
  });
}
document.getElementById('journal-save').addEventListener('click',()=>{
  const text=document.getElementById('journal-text').value.trim();
  if(!text) return;
  const j=getJournal();
  j.push({
    date:document.getElementById('journal-date').textContent,
    tag :document.getElementById('journal-tag').textContent,
    text
  });
  if(j.length>30) j.shift();
  saveJournal(j);
  document.getElementById('journal-text').value='';
  renderJournal();
});
renderJournal();

// ── Background & particles ──
const ALL_THEMES=['sunny','clear-night','cloudy','rainy','snowy','stormy','foggy'];
function setBackground(theme) {
  ALL_THEMES.forEach(t=>bgLayer.classList.remove('bg-'+t));
  bgLayer.classList.add('bg-'+theme);
  spawnParticles(theme);
}
function spawnParticles(theme) {
  particlesEl.innerHTML='';
  if(theme==='rainy'||theme==='stormy'){
    for(let i=0;i<(theme==='stormy'?90:55);i++){
      const el=document.createElement('div'); el.className='particle drop';
      const h=10+Math.random()*20;
      el.style.cssText=`left:${Math.random()*100}%;top:${-Math.random()*30}%;height:${h}px;opacity:${.3+Math.random()*.5};animation-duration:${.35+Math.random()*.45}s;animation-delay:${-Math.random()*2}s;`;
      particlesEl.appendChild(el);
    }
  }
  if(theme==='snowy'){
    for(let i=0;i<70;i++){
      const el=document.createElement('div'); el.className='particle flake';
      const sz=4+Math.random()*7;
      el.style.cssText=`left:${Math.random()*100}%;top:${-Math.random()*20}%;width:${sz}px;height:${sz}px;animation-duration:${3+Math.random()*4}s;animation-delay:${-Math.random()*5}s;`;
      particlesEl.appendChild(el);
    }
  }
  if(theme==='clear-night'){
    for(let i=0;i<140;i++){
      const el=document.createElement('div'); el.className='particle star';
      const sz=1+Math.random()*3;
      el.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*75}%;width:${sz}px;height:${sz}px;animation-duration:${1.5+Math.random()*3}s;animation-delay:${-Math.random()*4}s;`;
      particlesEl.appendChild(el);
    }
  }
  if(theme==='sunny'){
    const colors=['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff9f1c','#c77dff'];
    for(let i=0;i<28;i++){
      const el=document.createElement('div'); el.className='particle confetti-piece';
      el.style.cssText=`left:${Math.random()*100}%;top:${-Math.random()*10}%;background:${colors[i%colors.length]};animation-duration:${4+Math.random()*4}s;animation-delay:${-Math.random()*6}s;border-radius:${Math.random()>.5?'50%':'3px'};`;
      particlesEl.appendChild(el);
    }
  }
}

// ── Auto-refresh ──
function startRefresh(lat,lon,city,country) {
  clearInterval(refreshTimer); countdown=600; tick();
  refreshTimer=setInterval(()=>{countdown--;tick();if(countdown<=0){countdown=600;fetchWeather(lat,lon,city,country);}},1000);
}
function tick(){const m=Math.floor(countdown/60),s=countdown%60;refreshInfo.textContent=`🔄 ${m}:${String(s).padStart(2,'0')}`;}

// ── Show/hide ──
function showError(msg){errorMsg.textContent=msg;show('error');}
function show(which){
  [loadingEl,errorEl,weatherEl].forEach(el=>el.classList.add('hidden'));
  if(which==='loading')loadingEl.classList.remove('hidden');
  if(which==='error')  errorEl.classList.remove('hidden');
  if(which==='weather')weatherEl.classList.remove('hidden');
}

// ── Boot ──
if(navigator.geolocation){
  show('loading');
  navigator.geolocation.getCurrentPosition(
    pos=>fetchWeather(pos.coords.latitude,pos.coords.longitude,'My Location',''),
    ()=>searchCity('New York')
  );
} else {
  searchCity('New York');
}
