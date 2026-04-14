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
  // Thunder & Lightning
  { q:"What makes thunder?", choices:["Clouds bumping together","Cold and warm air mixing","Lightning heating air super fast","Wind blowing really hard"], ans:2 },
  { q:"A lightning bolt is hotter than...", choices:["A campfire","Boiling water","The surface of the Sun","A pizza oven"], ans:2 },
  { q:"How far away is lightning if you count 5 seconds after the flash?", choices:["1 mile","5 miles","10 miles","Half a mile"], ans:0 },
  { q:"How many times does lightning strike Earth every second?", choices:["1 time","10 times","100 times","1,000 times"], ans:2 },
  { q:"What should you do if you're outside during lightning?", choices:["Stand under a tall tree","Hold your umbrella up high","Crouch low and stay away from trees","Run as fast as you can"], ans:2 },
  { q:"Can lightning strike the same place twice?", choices:["Never","Yes, it happens all the time!","Only in movies","Only if it's raining"], ans:1 },

  // Rain & Water
  { q:"How fast do raindrops fall?", choices:["2 miles per hour","14 miles per hour","50 miles per hour","100 miles per hour"], ans:1 },
  { q:"What shape is a raindrop actually?", choices:["A perfect teardrop","A sphere (round ball)","A flat pancake","A tiny star"], ans:1 },
  { q:"Where does rain come from?", choices:["Giant water tanks in the sky","Water that evaporated from oceans and lakes","Clouds making water from nothing","Airplanes spraying water"], ans:1 },
  { q:"What is acid rain caused by?", choices:["Too many clouds","Air pollution mixing with rainwater","Rain falling through fire","Salty ocean water"], ans:1 },
  { q:"What is a flood?", choices:["A very big puddle","When water covers areas that are usually dry","A type of storm cloud","Very heavy snow"], ans:1 },
  { q:"What country gets the most rainfall on Earth?", choices:["Brazil","India","Colombia","United States"], ans:2 },
  { q:"What is the driest place on Earth?", choices:["The Sahara Desert","Antarctica","Death Valley","The Gobi Desert"], ans:1 },
  { q:"How much of Earth's water is fresh (not salty)?", choices:["50%","25%","3%","75%"], ans:2 },

  // Snow & Ice
  { q:"No two of these are exactly alike — ever!", choices:["Raindrops","Snowflakes","Clouds","Rainbows"], ans:1 },
  { q:"What is the biggest snowflake ever recorded as wide as?", choices:["A coin","Your hand","A pizza","A car"], ans:2 },
  { q:"Snow is actually what color?", choices:["White","Clear / transparent","Light blue","Grey"], ans:1 },
  { q:"What is a blizzard?", choices:["A very cold day","A heavy snowstorm with strong winds","A hailstorm","Freezing rain"], ans:1 },
  { q:"At what temperature does water freeze?", choices:["0°C / 32°F","10°C / 50°F","-10°C / 14°F","5°C / 41°F"], ans:0 },
  { q:"What is an avalanche?", choices:["A huge wave in the ocean","A giant snowball rolling down a mountain","A rapid flow of snow down a slope","A type of blizzard"], ans:2 },
  { q:"What is freezing rain?", choices:["Snow that melts quickly","Rain that freezes when it hits cold surfaces","Hail","Sleet mixed with snow"], ans:1 },
  { q:"What is sleet?", choices:["Frozen rain that forms tiny ice pellets","Snow mixed with mud","Very cold fog","Wind-blown snow"], ans:0 },

  // Wind
  { q:"What causes wind?", choices:["The Earth spinning super fast","Differences in air pressure","The moon pulling air","Trees breathing"], ans:1 },
  { q:"What is a tornado?", choices:["A spinning column of water","A rotating column of air touching the ground","A type of hurricane","Very fast straight winds"], ans:1 },
  { q:"What is a hurricane also called in the Pacific Ocean?", choices:["Tornado","Blizzard","Typhoon","Monsoon"], ans:2 },
  { q:"What is the eye of a hurricane?", choices:["The most dangerous part","The calm, clear center","Where lightning happens","The clouds at the top"], ans:1 },
  { q:"What scale measures tornado strength?", choices:["Richter Scale","Beaufort Scale","Enhanced Fujita Scale","Saffir-Simpson Scale"], ans:2 },
  { q:"What scale measures hurricane strength?", choices:["Richter Scale","Enhanced Fujita Scale","Beaufort Scale","Saffir-Simpson Scale"], ans:3 },
  { q:"Which is stronger, an F5 tornado or a Category 5 hurricane?", choices:["F5 tornado","Category 5 hurricane","They are the same","Neither can be measured"], ans:0 },
  { q:"What is the fastest wind speed ever recorded on Earth?", choices:["200 mph","253 mph","310 mph","400 mph"], ans:2 },

  // Clouds & Atmosphere
  { q:"What is fog made of?", choices:["Smoke","Tiny water droplets touching the ground","Ice crystals in space","Invisible air"], ans:1 },
  { q:"A fluffy white cloud can weigh as much as...", choices:["A school bus","100 elephants","A house","A bicycle"], ans:1 },
  { q:"What are the highest clouds called?", choices:["Cumulus","Stratus","Noctilucent","Cirrus"], ans:2 },
  { q:"What type of cloud looks like a flat grey blanket?", choices:["Cumulus","Stratus","Cumulonimbus","Cirrus"], ans:1 },
  { q:"What type of cloud makes thunderstorms?", choices:["Cumulus","Stratus","Cumulonimbus","Cirrostratus"], ans:2 },
  { q:"How high up does the atmosphere reach?", choices:["10 miles","100 miles","6,000 miles","Infinity"], ans:1 },
  { q:"What layer of atmosphere do we live in?", choices:["Stratosphere","Mesosphere","Troposphere","Thermosphere"], ans:2 },
  { q:"What is the ozone layer?", choices:["A cloud made of dust","A layer of gas that protects us from the Sun's rays","A layer of ice around Earth","Where airplanes fly"], ans:1 },

  // Sun & Temperature
  { q:"How many Earths fit inside the Sun?", choices:["100","10,000","1 million","1 billion"], ans:2 },
  { q:"What is the hottest temperature ever recorded on Earth?", choices:["120°F","130°F (56.7°C) in Death Valley","145°F","100°F"], ans:1 },
  { q:"What is the coldest temperature ever recorded on Earth?", choices:["-100°F","-128.6°F (-89.2°C) in Antarctica","-200°F","-50°F"], ans:1 },
  { q:"What causes the seasons?", choices:["Earth getting closer to the Sun","Earth's tilt as it orbits the Sun","The Moon blocking sunlight","Clouds covering the Sun"], ans:1 },
  { q:"Which is hotter, the surface of the Sun or a lightning bolt?", choices:["The Sun's surface","A lightning bolt","They're the same temperature","Impossible to measure"], ans:1 },
  { q:"What is a heat wave?", choices:["A wave of hot air you can see","A long period of very hot weather","Heat rising from pavement","Sunlight reflecting off water"], ans:1 },
  { q:"What is the UV index?", choices:["How strong the wind is","How humid it is","How strong the Sun's harmful rays are","How hot it feels"], ans:2 },

  // Rainbows & Light
  { q:"What shape is a rainbow really?", choices:["A half circle","A full circle","A straight line","A spiral"], ans:1 },
  { q:"How many colors are in a rainbow?", choices:["5","6","7","8"], ans:2 },
  { q:"What do you need to see a rainbow?", choices:["Sun and clouds","Sun and rain at the same time","Moon and clouds","Two suns"], ans:1 },
  { q:"What is a double rainbow?", choices:["Two rainbows side by side","A rainbow reflected in water, creating two arcs","A rainbow that appears twice a day","A rainbow with 14 colors"], ans:1 },
  { q:"Which color is on the OUTSIDE of a rainbow?", choices:["Violet","Green","Red","Blue"], ans:2 },

  // Hail & Storms
  { q:"What is hail made of?", choices:["Hard snow","Frozen rain balls","Dried mud","Tiny rocks"], ans:1 },
  { q:"What is the biggest hailstone ever recorded the size of?", choices:["A marble","A golf ball","A softball","A volleyball"], ans:2 },
  { q:"Inside a thundercloud, hailstones grow by...", choices:["Getting wet over and over","Being tossed up and down adding more ice layers","Getting squished together","Freezing rain falling on them"], ans:1 },
  { q:"What is a derecho?", choices:["A Spanish word for rain","A long, fast-moving wind storm in a straight line","A type of tornado","A tropical storm"], ans:1 },

  // Weather Forecasting
  { q:"Which is the most accurate weather forecast model?", choices:["A magic 8-ball","GFS","ECMWF","Looking at clouds yourself"], ans:2 },
  { q:"What does a weather vane tell you?", choices:["How fast the wind blows","Which direction the wind comes from","How much rain fell","How cold it is"], ans:1 },
  { q:"What does a barometer measure?", choices:["Temperature","Wind speed","Air pressure","Humidity"], ans:2 },
  { q:"Falling air pressure usually means...", choices:["Good weather is coming","Bad weather is coming","No change in weather","It's going to snow"], ans:1 },
  { q:"What does a hygrometer measure?", choices:["Temperature","Air pressure","Wind speed","Humidity"], ans:3 },
  { q:"What does an anemometer measure?", choices:["Temperature","Wind speed","Humidity","Rainfall"], ans:1 },
  { q:"What is a weather satellite used for?", choices:["Sending TV signals","Taking pictures of clouds and storms from space","Measuring ocean temperature only","Tracking airplanes"], ans:1 },
  { q:"What is Doppler radar used for?", choices:["Tracking airplanes","Detecting precipitation and wind speed","Measuring temperature","Predicting earthquakes"], ans:1 },

  // Climate & Records
  { q:"What is climate?", choices:["Today's weather","The weather pattern of a place over many years","A type of storm","How hot the Sun is"], ans:1 },
  { q:"What is the difference between weather and climate?", choices:["Nothing, they're the same","Weather is short-term, climate is long-term","Climate is short-term, weather is long-term","Weather only happens near oceans"], ans:1 },
  { q:"Which continent is the windiest?", choices:["North America","Asia","Antarctica","Australia"], ans:2 },
  { q:"What is El Niño?", choices:["A Spanish Christmas holiday","A warming of Pacific Ocean water that changes weather worldwide","A type of hurricane","The hottest day of the year"], ans:1 },
  { q:"What is the greenhouse effect?", choices:["Growing plants in a glass building","Gases trapping the Sun's heat in Earth's atmosphere","Green clouds in the sky","Plants releasing oxygen"], ans:1 },
  { q:"Which gas is most responsible for climate change?", choices:["Oxygen","Nitrogen","Carbon Dioxide","Argon"], ans:2 },
  { q:"What is a monsoon?", choices:["A very strong tornado","A season of heavy rainfall","A type of blizzard","A dry desert wind"], ans:1 },
  { q:"What percentage of Earth is covered by water?", choices:["50%","60%","71%","90%"], ans:2 },

  // Fun & Random
  { q:"What is the wettest place on Earth?", choices:["Amazon Rainforest","Mawsynram, India","Hawaii","Seattle, USA"], ans:1 },
  { q:"Cows lying down means it's going to rain — true or false?", choices:["True, scientists proved it","False, it's just a myth","Sometimes true","Only in summer"], ans:1 },
  { q:"What is ball lightning?", choices:["Lightning shaped like a ball that floats — a rare mysterious phenomenon","A type of firework","Lightning that bounces","A glowing cloud"], ans:0 },
  { q:"How long is a typical thunderstorm?", choices:["5 minutes","30 minutes","2 hours","6 hours"], ans:1 },
  { q:"What do animals do before a big storm?", choices:["Nothing different","Become restless and behave unusually","Sleep more than normal","Eat less food"], ans:1 },
  { q:"A ring around the Moon usually means...", choices:["A full moon is coming","Rain or snow may be coming","A lunar eclipse is near","Good weather tomorrow"], ans:1 },
  { q:"What is St. Elmo's Fire?", choices:["A forest fire caused by lightning","A glowing plasma on tall objects during thunderstorms","The Sun seen through clouds","A type of rainbow"], ans:1 },
  { q:"Which direction do hurricanes spin in the Northern Hemisphere?", choices:["Clockwise","Counter-clockwise","They don't spin","Randomly"], ans:1 },
  { q:"What is a waterspout?", choices:["A geyser in the ocean","A tornado over water","A giant ocean wave","A fountain of seawater"], ans:1 },
  { q:"What color is the sky on Mars?", choices:["Blue like Earth","Green","Butterscotch / pinkish-tan","Purple"], ans:3 },
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

  // Update interactive widgets with live data
  updateBurnTime();

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

// ── Clickable Mascot ──
const MASCOT_SAYINGS = {
  sunny:       ['It\'s so bright out! ☀️','Put on sunscreen! 🧴','Perfect kite-flying day! 🪁','Wow, what a sunny day!','I love this weather! 😎'],
  'clear-night':['Look at all those stars! ✨','The moon says hi! 🌙','Perfect night for stargazing! 🔭','It\'s so quiet tonight 🌙','Space is SO big! 🚀'],
  cloudy:      ['Fluffy cloud day! ☁️','The clouds look like animals! 🐘','Maybe it\'ll rain later? 🤔','A perfect reading-inside day 📚','So cozy and grey today!'],
  rainy:       ['Splash splash splash! ☔','Puddle time! 🥾','Rain rain don\'t go away!','Can you hear the raindrops? 🎵','Smell that fresh rain? 🌿'],
  snowy:       ['SNOW DAY! ⛄','Build a snowman with me! ☃️','Catch a snowflake on your tongue! ❄️','Hot cocoa time! ☕','Let\'s have a snowball fight! 🎿'],
  stormy:      ['Whoa, stay safe inside! ⛈️','Count the seconds after lightning! ⚡','Don\'t go outside right now! 🏠','Thunder is SO loud! 💥','This is exciting and scary! 😬'],
  foggy:       ['I can\'t see anything! 👻','Everything looks mysterious! 🌫️','Hold a grown-up\'s hand today! 🤝','Fog is a cloud on the ground! ☁️','It\'s like a ghost town! 👻'],
};
document.getElementById('now-mascot').addEventListener('click', () => {
  const bubble = document.getElementById('mascot-speech');
  const theme = currentData ? (()=>{const c=currentData.current;const[,,rawT]=wmo(c.weather_code);const now=new Date();const sr=new Date(currentData.daily.sunrise[0]);const ss=new Date(currentData.daily.sunset[0]);return(now<sr||now>ss)&&rawT==='sunny'?'clear-night':rawT;})() : 'sunny';
  const sayings = MASCOT_SAYINGS[theme] || MASCOT_SAYINGS.sunny;
  bubble.textContent = pickRandom(sayings);
  bubble.classList.remove('hidden');
  clearTimeout(bubble._t);
  bubble._t = setTimeout(() => bubble.classList.add('hidden'), 3000);
});

// ── Storm Distance Calculator ──
let lightningTime = null;
document.getElementById('lightning-btn').addEventListener('click', () => {
  lightningTime = Date.now();
  document.getElementById('thunder-btn').disabled = false;
  document.getElementById('storm-result').textContent = '⚡ Got it! Now wait for the thunder...';
});
document.getElementById('thunder-btn').addEventListener('click', () => {
  if (!lightningTime) return;
  const secs = (Date.now() - lightningTime) / 1000;
  const miles = (secs / 5).toFixed(1);
  const km = (secs / 3).toFixed(1);
  let msg;
  if (miles < 1) msg = `🔴 ${miles} miles (${km} km) — Very close! Stay inside!`;
  else if (miles < 3) msg = `🟠 ${miles} miles (${km} km) — Pretty close! Be careful!`;
  else if (miles < 6) msg = `🟡 ${miles} miles (${km} km) — Moderate distance.`;
  else msg = `🟢 ${miles} miles (${km} km) — Far away! But stay alert.`;
  document.getElementById('storm-result').textContent = msg;
  document.getElementById('thunder-btn').disabled = true;
  lightningTime = null;
});

// ── UV Burn Timer ──
let skinType = 1, uvTimerInterval = null, uvSecsLeft = 0;
const UV_SKIN_MULT = {1:2.5, 2:3, 3:5, 4:7, 5:9, 6:12};
function calcBurnMins() {
  if (!currentData) return '--';
  const now = new Date();
  const nowIdx = currentData.hourly.time.findIndex(t => new Date(t) >= now);
  const uv = currentData.hourly.uv_index[nowIdx >= 0 ? nowIdx : 0] ?? 0;
  if (uv <= 0) return '∞';
  return Math.round((200 / (uv * 10)) * UV_SKIN_MULT[skinType]);
}
function updateBurnTime() {
  const mins = calcBurnMins();
  document.getElementById('uv-burn-time').textContent = mins === '∞' ? '∞' : mins;
}
document.querySelectorAll('.skin-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.skin-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    skinType = parseInt(btn.dataset.skin);
    updateBurnTime();
    if (uvTimerInterval) { clearInterval(uvTimerInterval); uvTimerInterval = null; document.getElementById('uv-countdown').textContent = ''; document.getElementById('uv-start-btn').textContent = '⏱️ Start Timer!'; }
  });
});
document.getElementById('uv-start-btn').addEventListener('click', () => {
  const mins = calcBurnMins();
  if (mins === '--' || mins === '∞') { document.getElementById('uv-countdown').textContent = 'No UV data right now!'; return; }
  if (uvTimerInterval) { clearInterval(uvTimerInterval); uvTimerInterval = null; document.getElementById('uv-countdown').textContent = ''; document.getElementById('uv-start-btn').textContent = '⏱️ Start Timer!'; return; }
  uvSecsLeft = mins * 60;
  document.getElementById('uv-start-btn').textContent = '⏹️ Stop Timer';
  uvTimerInterval = setInterval(() => {
    uvSecsLeft--;
    const m = Math.floor(uvSecsLeft / 60), s = uvSecsLeft % 60;
    document.getElementById('uv-countdown').textContent = uvSecsLeft > 0 ? `${m}:${String(s).padStart(2,'0')} left` : '🔴 Put on sunscreen NOW!';
    if (uvSecsLeft <= 0) { clearInterval(uvTimerInterval); uvTimerInterval = null; document.getElementById('uv-start-btn').textContent = '⏱️ Start Timer!'; }
  }, 1000);
});

// ── Temperature Lab ──
let convFrom = 'F';
document.querySelectorAll('.conv-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.conv-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    convFrom = btn.dataset.from;
    doConvert();
  });
});
document.getElementById('conv-input').addEventListener('input', doConvert);
function doConvert() {
  const val = parseFloat(document.getElementById('conv-input').value);
  let fEl = document.getElementById('conv-f'), cEl = document.getElementById('conv-c'), kEl = document.getElementById('conv-k'), dEl = document.getElementById('conv-desc');
  if (isNaN(val)) { [fEl, cEl, kEl, dEl].forEach(el => el.textContent = ''); return; }
  let c, f, k;
  if (convFrom === 'F') { f = val; c = (f - 32) * 5/9; k = c + 273.15; }
  else if (convFrom === 'C') { c = val; f = c * 9/5 + 32; k = c + 273.15; }
  else { k = val; c = k - 273.15; f = c * 9/5 + 32; }
  fEl.textContent = `🇺🇸 ${f.toFixed(1)}°F`;
  cEl.textContent = `🌍 ${c.toFixed(1)}°C`;
  kEl.textContent = `🔬 ${k.toFixed(1)} K`;
  let desc = '';
  if (f >= 212) desc = '♨️ Boiling water!';
  else if (f >= 100) desc = '🥵 Dangerously hot!';
  else if (f >= 90) desc = '🔥 Super hot day!';
  else if (f >= 75) desc = '😊 Nice and warm!';
  else if (f >= 60) desc = '🙂 Comfortable!';
  else if (f >= 32) desc = '🧥 Cold! Wear a coat!';
  else if (f >= 0) desc = '🥶 Very freezing!';
  else desc = '❄️ Extreme cold!';
  dEl.textContent = desc;
}

// ── City Compare ──
let compareData = null;
document.getElementById('compare-btn').addEventListener('click', async () => {
  const q = document.getElementById('compare-input').value.trim();
  if (!q) return;
  const grid = document.getElementById('compare-grid');
  grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;font-weight:800;color:#90a4ae">Loading... ☁️</div>';
  try {
    const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=1`).then(r=>r.json());
    if (!geo.results?.length) { grid.innerHTML = `<div style="grid-column:1/-1;color:#e53935;font-weight:800">Can't find "${q}" 🤔</div>`; return; }
    const {latitude:lat2, longitude:lon2, name:name2, country:country2} = geo.results[0];
    const wx2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat2}&longitude=${lon2}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m&temperature_unit=celsius&wind_speed_unit=mph&timezone=auto`).then(r=>r.json());
    compareData = wx2;
    renderCompare(wx2, name2, country2);
  } catch { grid.innerHTML = '<div style="grid-column:1/-1;color:#e53935;font-weight:800">Couldn\'t connect 😢</div>'; }
});
document.getElementById('compare-input').addEventListener('keydown', e => { if (e.key==='Enter') document.getElementById('compare-btn').click(); });
function renderCompare(wx2, name2, country2) {
  const grid = document.getElementById('compare-grid');
  if (!currentData) { grid.innerHTML = '<div style="grid-column:1/-1;color:#e53935;font-weight:800">Search your main city first!</div>'; return; }
  function col(d, name, country) {
    const c = d.current;
    const [desc, icon] = wmo(c.weather_code);
    const tempF = toF(c.temperature_2m);
    const [word, color] = tempWord(tempF);
    return `<div class="compare-col">
      <div class="compare-col-label">📍 City</div>
      <div class="compare-col-city">${name}${country ? ', '+country : ''}</div>
      <div class="compare-col-icon">${icon}</div>
      <div class="compare-col-temp">${fmt(c.temperature_2m)}</div>
      <div class="compare-col-cond">${desc}</div>
      <div class="compare-col-stats">
        <span style="color:${color}">${word}</span>
        <span>💧 ${c.relative_humidity_2m}%</span>
        <span>💨 ${Math.round(c.wind_speed_10m)} mph</span>
      </div>
    </div>`;
  }
  grid.innerHTML = col(currentData, currentCity, currentCountry) + col(wx2, name2, country2);
}

// ── Weather Bingo ──
const BINGO_SQUARES = [
  ['☀️','Sunny'],['🌧️','Rainy'],['❄️','Snowy'],['⛈️','Stormy'],['🌫️','Foggy'],
  ['💨','Windy'],['🌈','Rainbow'],['🌕','Full Moon'],['⚡','Thunder'],['🧥','Cold day'],
  ['🥵','Hot day'],['🌤️','Partly cloudy'],['💧','Humid'],['🌙','Clear night'],['☁️','Cloudy'],
  ['🌡️','Temp > 80°F'],['🥶','Freezing'],['🌊','Stormy waves'],['🎉','Perfect weather'],['🌅','Saw sunrise'],
];
let bingoCards = [];
function newBingoCard() {
  const shuffled = [...BINGO_SQUARES].sort(() => Math.random() - .5);
  bingoCards = shuffled.slice(0, 9).map(sq => ({...sq, marked: false}));
  renderBingo();
}
function renderBingo() {
  const grid = document.getElementById('bingo-grid');
  grid.innerHTML = '';
  bingoCards.forEach((sq, i) => {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell' + (sq.marked ? ' marked' : '');
    cell.innerHTML = `<div class="bingo-cell-icon">${sq[0]}</div><div>${sq[1]}</div>`;
    cell.addEventListener('click', () => {
      bingoCards[i].marked = !bingoCards[i].marked;
      renderBingo();
      checkBingo();
    });
    grid.appendChild(cell);
  });
}
function checkBingo() {
  const m = bingoCards.map(c => c.marked);
  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const win = wins.find(([a,b,c]) => m[a] && m[b] && m[c]);
  const winEl = document.getElementById('bingo-win');
  if (win) {
    winEl.classList.remove('hidden');
    [win[0],win[1],win[2]].forEach(i => document.querySelectorAll('.bingo-cell')[i].classList.add('win'));
  } else { winEl.classList.add('hidden'); }
}
document.getElementById('bingo-reset').addEventListener('click', newBingoCard);
newBingoCard();

// ── Mood Tracker ──
let selectedMood = null;
document.querySelectorAll('.mood-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedMood = btn.dataset.mood;
    document.getElementById('mood-result').textContent = `You're feeling ${selectedMood} today!`;
    const moods = JSON.parse(localStorage.getItem('wes_moods') || '[]');
    moods.unshift({ mood: selectedMood, time: new Date().toLocaleString('en-US', {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}) });
    if (moods.length > 20) moods.pop();
    localStorage.setItem('wes_moods', JSON.stringify(moods));
    renderMoodHistory();
  });
});
function renderMoodHistory() {
  const moods = JSON.parse(localStorage.getItem('wes_moods') || '[]');
  const el = document.getElementById('mood-history');
  el.innerHTML = moods.slice(0, 5).map(m => `<div class="mood-entry"><span>${m.mood}</span><span class="mood-entry-time">${m.time}</span></div>`).join('');
}
renderMoodHistory();

// ── Magic 8-Ball ──
const BALL_ANSWERS = {
  sunny: ['☀️ Sunshine guaranteed!', '🌤️ Bright days ahead!', '😎 The sun says YES!', '🌈 Rainbows incoming!', '🎉 Perfect weather day!'],
  rainy: ['🌧️ Bring your umbrella!', '☔ Rain is definitely coming!', '💦 Get ready to splash!', '🌊 Very wet outlook!', '🌧️ The clouds say maybe...'],
  snowy: ['❄️ Snow day for sure!', '⛄ Build that snowman!', '🥶 Bundle up, definitely!', '☃️ White and magical!', '❄️ Frosty forecast ahead!'],
  stormy: ['⛈️ Stay inside today!', '⚡ Storm is brewing!', '🌩️ Very uncertain...', '🏠 Better safe than sorry!', '😬 Outlook not so sunny!'],
  cloudy: ['🤔 Ask again later...', '☁️ Cloudy with a chance...', '🌥️ Maybe, maybe not!', '😐 The clouds are unsure!', '⛅ Partly possible!'],
  foggy: ['🌫️ Cannot see clearly...', '👻 Outlook is mysterious!', '🤷 The fog says who knows!', '🌁 Unclear at this time!', '❓ Very hazy outlook!'],
  'clear-night': ['🌙 The stars say YES!', '✨ Written in the stars!', '🔭 The moon approves!', '🌌 Galactic good vibes!', '⭐ Stars align for you!'],
};
document.getElementById('ball-shake').addEventListener('click', shakeBall);
document.getElementById('magic-ball').addEventListener('click', shakeBall);
function shakeBall() {
  const ball = document.getElementById('magic-ball');
  ball.classList.remove('shaking');
  void ball.offsetWidth;
  ball.classList.add('shaking');
  document.getElementById('ball-answer').textContent = '...';
  setTimeout(() => {
    const theme = currentData ? (()=>{const c=currentData.current;const[,,rawT]=wmo(c.weather_code);const now=new Date();const sr=new Date(currentData.daily.sunrise[0]);const ss=new Date(currentData.daily.sunset[0]);return(now<sr||now>ss)&&rawT==='sunny'?'clear-night':rawT;})() : 'sunny';
    const answers = BALL_ANSWERS[theme] || BALL_ANSWERS.sunny;
    document.getElementById('ball-answer').textContent = pickRandom(answers);
    ball.classList.remove('shaking');
  }, 600);
}

// ── Slot Machine ──
const SLOT_EMOJIS = ['☀️','🌧️','❄️','⛈️','🌫️','💨','🌈','⛅','🌤️','🌙','⚡','🌊','☁️','🌅','🌡️'];
const SLOT_COMBOS = {
  '☀️☀️☀️': '🎉 JACKPOT! Perfect sunny day! Go outside NOW!',
  '❄️❄️❄️': '⛄ TRIPLE SNOW! Epic blizzard incoming!',
  '⛈️⛈️⛈️': '😱 TRIPLE STORM! HIDE UNDER THE BLANKETS!',
  '🌧️🌧️🌧️': '🌊 RAIN RAIN RAIN! Puddle paradise!',
  '🌈🌈🌈': '✨ TRIPLE RAINBOW! Magic is real today!',
  '💨💨💨': '🌪️ SO MUCH WIND! Hold onto your hat!',
};
let slotSpinning = false;
document.getElementById('slot-spin').addEventListener('click', () => {
  if (slotSpinning) return;
  slotSpinning = true;
  const btn = document.getElementById('slot-spin');
  btn.disabled = true;
  const r1 = document.getElementById('slot-r1'), r2 = document.getElementById('slot-r2'), r3 = document.getElementById('slot-r3');
  [r1, r2, r3].forEach(r => r.classList.add('spinning'));
  const picks = [pickRandom(SLOT_EMOJIS), pickRandom(SLOT_EMOJIS), pickRandom(SLOT_EMOJIS)];
  setTimeout(() => { r1.classList.remove('spinning'); r1.textContent = picks[0]; }, 500);
  setTimeout(() => { r2.classList.remove('spinning'); r2.textContent = picks[1]; }, 900);
  setTimeout(() => {
    r3.classList.remove('spinning'); r3.textContent = picks[2];
    const key = picks.join('');
    const result = SLOT_COMBOS[key] || `${picks[0]}${picks[1]}${picks[2]} — ${pickRandom(['Interesting combo!','What a mix!','Weather is unpredictable!','Try spinning again!','Rare combo!'])}`;
    document.getElementById('slot-result').textContent = result;
    slotSpinning = false;
    btn.disabled = false;
  }, 1300);
});

// ── Precipitation Slider ──
const precipSlider = document.getElementById('precip-slider');
function updatePrecip() {
  const c = parseFloat(precipSlider.value);
  const f = (c * 9/5 + 32).toFixed(0);
  document.getElementById('precip-temp').textContent = `${c}°C / ${f}°F`;
  let type, info;
  if (c >= 4) { type = '🌧️ Rain'; info = 'Above 4°C — rain falls as liquid water droplets!'; }
  else if (c >= 1) { type = '🌦️ Rain or Sleet'; info = 'Near-freezing — it could be rain, sleet, or a mix!'; }
  else if (c >= -1) { type = '🌨️ Sleet or Snow'; info = 'Right at freezing — expect sleet or wet snow!'; }
  else if (c >= -5) { type = '❄️ Snow'; info = 'Below 0°C — snow falls as fluffy flakes!'; }
  else if (c >= -10) { type = '❄️ Heavy Snow'; info = 'Very cold — expect heavy, powdery snow!'; }
  else { type = '💎 Diamond Dust'; info = 'Super cold! Tiny ice crystals fall from the sky!'; }
  document.getElementById('precip-type').textContent = type;
  document.getElementById('precip-info').textContent = info;
}
precipSlider.addEventListener('input', updatePrecip);
updatePrecip();

// ── Sound Mixer ──
let mixerNodes = { rain: null, wind: null, thunder: null, birds: null };
let mixerGains = {};
function getMixerCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}
function createNoiseSource(ctx, freq, type, volume) {
  const bufLen = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
  const filt = ctx.createBiquadFilter(); filt.type = type; filt.frequency.value = freq;
  const gain = ctx.createGain(); gain.gain.value = volume;
  src.connect(filt); filt.connect(gain); gain.connect(ctx.destination);
  src.start();
  return { src, gain };
}
['rain','wind','thunder','birds'].forEach(ch => {
  const slider = document.getElementById('mix-' + ch);
  slider.addEventListener('input', () => {
    const vol = parseInt(slider.value) / 100;
    const ctx = getMixerCtx();
    if (vol <= 0) {
      if (mixerNodes[ch]) { try { mixerNodes[ch].src.stop(); } catch{} mixerNodes[ch] = null; }
      return;
    }
    if (!mixerNodes[ch]) {
      const cfg = { rain: [600,'bandpass',0.1], wind: [150,'lowpass',0.08], thunder: [200,'bandpass',0.15], birds: [3000,'highpass',0.04] };
      const [freq, type, maxVol] = cfg[ch];
      mixerNodes[ch] = createNoiseSource(ctx, freq, type, vol * maxVol);
    } else {
      const cfg = { rain: 0.1, wind: 0.08, thunder: 0.15, birds: 0.04 };
      mixerNodes[ch].gain.gain.setTargetAtTime(vol * cfg[ch], ctx.currentTime, 0.1);
    }
  });
});

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
