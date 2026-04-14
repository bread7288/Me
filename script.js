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
  if(!navigator.onLine){showError("You're offline 📵 Check your WiFi!");return;}
  try {
    const res=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
    const data=await res.json();
    if(!data.results?.length) return showError(`Can't find "${query}" 🤔 Try a bigger nearby city!`);
    const {latitude,longitude,name,country}=data.results[0];
    fetchWeather(latitude,longitude,name,country);
  } catch {showError("Couldn't connect 🌐 Try again!",0,0,query,'');}}


async function fetchWeather(lat,lon,city,country) {
  show('loading');
  currentLat=lat; currentLon=lon; currentCity=city; currentCountry=country;

  // Check internet first
  if(!navigator.onLine) {
    showError("You're offline 📵 Check your WiFi or data and try again!");
    return;
  }

  // Fetch data (separate try/catch so render errors don't fake a network error)
  let wx, aq;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(), 10000);
    [wx, aq] = await Promise.all([
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m,visibility,surface_pressure` +
        `&hourly=temperature_2m,apparent_temperature,weather_code,precipitation_probability,uv_index` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max` +
        `&temperature_unit=celsius&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto&forecast_days=7`,
        {signal:controller.signal}
      ).then(r=>r.json()),
      fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}` +
        `&current=us_aqi,pm2_5,pm10,nitrogen_dioxide,ozone&timezone=auto`
      ).then(r=>r.json()).catch(()=>null),
    ]);
    clearTimeout(timeout);
    if(!wx?.current) throw new Error('Bad data');
  } catch(e) {
    const msg = e.name==='AbortError'
      ? "Taking too long ⏱️ Check your internet and try again!"
      : "Couldn't reach the weather servers 🌐 Try again in a moment!";
    showError(msg, lat, lon, city, country);
    return;
  }

  // Render (separate try/catch — display errors shouldn't hide the weather)
  currentData = wx;
  try {
    renderWeather(wx, city, country, aq);
  } catch(e) {
    console.error('Render error:', e);
    show('weather'); // still show something
  }
  fetchAlerts(lat, lon);
  startRefresh(lat,lon,city,country);
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
  renderFieldTrip(theme);

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
function showError(msg, lat, lon, city, country) {
  errorMsg.textContent = msg;
  const existing = document.getElementById('retry-btn');
  if (existing) existing.remove();
  if (lat != null) {
    const btn = document.createElement('button');
    btn.id = 'retry-btn';
    btn.textContent = '🔄 Try Again!';
    btn.style.cssText = 'margin-top:14px;display:block;width:100%;background:#ff5252;color:white;border:none;border-radius:50px;padding:14px;font-family:Nunito,sans-serif;font-size:1rem;font-weight:900;cursor:pointer;box-shadow:0 5px 0 #b71c1c;';
    btn.onclick = () => fetchWeather(lat, lon, city, country);
    errorEl.appendChild(btn);
  }
  show('error');
}
function show(which){
  [loadingEl,errorEl,weatherEl].forEach(el=>el.classList.add('hidden'));
  if(which==='loading')loadingEl.classList.remove('hidden');
  if(which==='error')  errorEl.classList.remove('hidden');
  if(which==='weather')weatherEl.classList.remove('hidden');
}

// ── School Picker — Live worldwide search via OpenStreetMap Nominatim ──
const _SCHOOL_STARTERS = [
  // Pennsylvania Public Districts
  'Abington School District, PA','Agora Cyber Charter School, PA','Albert Gallatin Area SD, PA',
  'Allentown City School District, PA','Altoona Area School District, PA','Ambridge Area SD, PA',
  'Annville-Cleona SD, PA','Armstrong School District, PA','Avon Grove SD, PA',
  'Bald Eagle Area SD, PA','Baldwin-Whitehall SD, PA','Bangor Area SD, PA',
  'Beaver Area SD, PA','Bellefonte Area SD, PA','Bensalem Township SD, PA',
  'Berwick Area SD, PA','Bethel Park SD, PA','Bethlehem Area SD, PA',
  'Big Spring SD, PA','Bloomsburg Area SD, PA','Blue Mountain SD, PA',
  'Boyertown Area SD, PA','Bristol Township SD, PA','Brookville Area SD, PA',
  'Butler Area SD, PA','Canon-McMillan SD, PA','Carbondale Area SD, PA',
  'Carlisle Area SD, PA','Catasauqua Area SD, PA','Central Bucks SD, PA',
  'Central Dauphin SD, PA','Chambersburg Area SD, PA','Chartiers Valley SD, PA',
  'Cheltenham SD, PA','Chester-Upland SD, PA','Clarion Area SD, PA',
  'Coatesville Area SD, PA','Conestoga Valley SD, PA','Connellsville Area SD, PA',
  'Cornwall-Lebanon SD, PA','Council Rock SD, PA','Crawford Central SD, PA',
  'Crestwood SD, PA','Cumberland Valley SD, PA','Dallas SD, PA',
  'Daniel Boone Area SD, PA','Danville Area SD, PA','Downingtown Area SD, PA',
  'Dubois Area SD, PA','East Penn SD, PA','East Stroudsburg Area SD, PA',
  'Eastern Lancaster County SD, PA','Easton Area SD, PA','Elizabeth Forward SD, PA',
  'Elizabethtown Area SD, PA','Ellwood City Area SD, PA','Ephrata Area SD, PA',
  'Erie City SD, PA','Exeter Township SD, PA','Fleetwood Area SD, PA',
  'Fox Chapel Area SD, PA','Franklin Area SD, PA','Freedom Area SD, PA',
  'Garnet Valley SD, PA','Gateway SD, PA','Great Valley SD, PA',
  'Greater Latrobe SD, PA','Greensburg Salem SD, PA','Grove City Area SD, PA',
  'Hamburg Area SD, PA','Harrisburg City SD, PA','Hatboro-Horsham SD, PA',
  'Haverford Township SD, PA','Hazleton Area SD, PA','Hempfield SD, PA',
  'Hermitage SD, PA','Highlands SD, PA','Hollidaysburg Area SD, PA',
  'Indiana Area SD, PA','Jersey Shore Area SD, PA','Jim Thorpe Area SD, PA',
  'Juniata County SD, PA','Kennett Consolidated SD, PA','Kiski Area SD, PA',
  'Kutztown Area SD, PA','Lake-Lehman SD, PA','Lampeter-Strasburg SD, PA',
  'Lancaster SD, PA','Laurel Highlands SD, PA','Lebanon SD, PA',
  'Lewisburg Area SD, PA','Ligonier Valley SD, PA','Lower Merion SD, PA',
  'Lower Moreland Township SD, PA','Manheim Central SD, PA','Manheim Township SD, PA',
  'Mars Area SD, PA','Marple Newtown SD, PA','Mckeesport Area SD, PA',
  'Methacton SD, PA','Mifflin County SD, PA','Millcreek Township SD, PA',
  'Milton Area SD, PA','Moshannon Valley SD, PA','Mount Lebanon SD, PA',
  'Muhlenberg SD, PA','Nazareth Area SD, PA','Neshaminy SD, PA',
  'New Castle Area SD, PA','North Allegheny SD, PA','North Penn SD, PA',
  'Norristown Area SD, PA','Northampton Area SD, PA','Norwin SD, PA',
  'Owen J Roberts SD, PA','Palmerton Area SD, PA','Parkland SD, PA',
  'Pen Argyl Area SD, PA','Penn Hills SD, PA','Penn Manor SD, PA',
  'Penn-Trafford SD, PA','Pennsbury SD, PA','Peters Township SD, PA',
  'Philadelphia City SD, PA','Pine Grove Area SD, PA','Pine-Richland SD, PA',
  'Pittsburgh Public Schools, PA','Pleasant Valley SD, PA','Plum Borough SD, PA',
  'Pocono Mountain SD, PA','Pottsgrove SD, PA','Pottstown SD, PA',
  'Pottsville Area SD, PA','Quakertown Community SD, PA','Radnor Township SD, PA',
  'Reading SD, PA','Riverview SD, PA','Salisbury Township SD, PA',
  'Scranton SD, PA','Selinsgrove Area SD, PA','Seneca Valley SD, PA',
  'Shaler Area SD, PA','Shenango Area SD, PA','Shippensburg Area SD, PA',
  'Slippery Rock Area SD, PA','Solanco SD, PA','Somerset Area SD, PA',
  'Souderton Area SD, PA','South Fayette Township SD, PA','South Western SD, PA',
  'Southern Lehigh SD, PA','Springfield SD (Delaware County), PA','Spring-Ford Area SD, PA',
  'State College Area SD, PA','Steel Valley SD, PA','Stroudsburg Area SD, PA',
  'Susquehanna Township SD, PA','Tamaqua Area SD, PA','Tredyffrin-Easttown SD, PA',
  'Twin Valley SD, PA','Unionville-Chadds Ford SD, PA','Upper Darby SD, PA',
  'Upper Dublin SD, PA','Upper Merion Area SD, PA','Upper Moreland Township SD, PA',
  'Upper Perkiomen SD, PA','Upper St Clair SD, PA','Waynesboro Area SD, PA',
  'West Allegheny SD, PA','West Chester Area SD, PA','West Jefferson Hills SD, PA',
  'West Shore SD, PA','Western Wayne SD, PA','Whitehall-Coplay SD, PA',
  'Wilkes-Barre Area SD, PA','William Penn SD, PA','Williamsport Area SD, PA',
  'Wilson SD (Berks County), PA','Wilson Area SD (Northampton), PA','Wissahickon SD, PA',
  'Woodland Hills SD, PA','Wyoming Area SD, PA','Wyoming Valley West SD, PA',
  'York City SD, PA','York Suburban SD, PA',
  // PA Private & Charter Schools
  'Agora Cyber Charter, PA','Archbishop Carroll High School, PA','Archbishop Wood High School, PA',
  'Baldwin School, PA','Cardinal O\'Hara High School, PA','Chestnut Hill Academy, PA',
  'Devon Preparatory School, PA','Episcopal Academy, PA','Friends\' Central School, PA',
  'Germantown Academy, PA','Germantown Friends School, PA','Gwynedd Mercy Academy, PA',
  'Haverford School, PA','Holy Ghost Preparatory School, PA','La Salle College High School, PA',
  'Malvern Preparatory School, PA','Merion Mercy Academy, PA','Methacton HS Charter School, PA',
  'Notre Dame de Namur University School, PA','Pennsylvania Leadership Charter School, PA',
  'Quaker Valley SD, PA','Roman Catholic High School, PA','Saint Joseph\'s Preparatory School, PA',
  'Shipley School, PA','Villanova Preparatory School, PA',
  // Famous PA Elementary Schools
  'Albert M. Greenfield Elementary, Philadelphia PA','Anne Frank Elementary, Pittsburgh PA',
  'Bache-Martin Elementary, Philadelphia PA','Barry Elementary, Philadelphia PA',
  'Bryant Elementary, Philadelphia PA','Cayuga Elementary, Philadelphia PA',
  'Clara Barton Elementary, Pittsburgh PA','Eleanor Roosevelt Elementary, PA',
  'Franklin Learning Center, Philadelphia PA','Greenfield Elementary, Philadelphia PA',
  'Hill Elementary School, State College PA','Houston Elementary, Philadelphia PA',
  'Keystone Elementary, PA','Lawton Elementary, Philadelphia PA',
  'Lincoln Elementary, Philadelphia PA','Logan Elementary, Philadelphia PA',
  'Masterman School, Philadelphia PA','McCall Elementary, Philadelphia PA',
  'Penn Alexander School, Philadelphia PA','Penrose Elementary, Philadelphia PA',
  'Reynolds Elementary, Pittsburgh PA','Science Leadership Academy, Philadelphia PA',
  'Shawmont Elementary, Philadelphia PA','Taggart Elementary, Philadelphia PA',
  'Vare-Washington Elementary, Philadelphia PA','Washington Elementary, Allentown PA',
  // Major US Districts (other states)
  'New York City Department of Education, NY','Los Angeles Unified SD, CA',
  'Chicago Public Schools, IL','Houston ISD, TX','Dallas ISD, TX',
  'Miami-Dade County Public Schools, FL','Broward County Public Schools, FL',
  'Clark County SD (Las Vegas), NV','Palm Beach County SD, FL','Hillsborough County SD, FL',
  'Orange County Public Schools, FL','Gwinnett County Public Schools, GA',
  'Wake County Public Schools, NC','Charlotte-Mecklenburg Schools, NC',
  'Fairfax County Public Schools, VA','Prince George\'s County PS, MD',
  'Montgomery County Public Schools, MD','Baltimore City Public Schools, MD',
  'Boston Public Schools, MA','Detroit Public Schools, MI',
  'Denver Public Schools, CO','Seattle Public Schools, WA',
  'Portland Public Schools, OR','Minneapolis Public Schools, MN',
  'Indianapolis Public Schools, IN','Columbus City Schools, OH',
  'Cleveland Metropolitan SD, OH','Cincinnati Public Schools, OH',
  'Nashville Metropolitan SD, TN','Memphis-Shelby County Schools, TN',
  'Atlanta Public Schools, GA','Jefferson County Public Schools, KY (Louisville)',
  'Phoenix Union High School District, AZ','Tucson Unified SD, AZ',
  'San Diego Unified SD, CA','San Francisco Unified SD, CA',
  'Sacramento City Unified SD, CA','Fresno Unified SD, CA',
  'Long Beach Unified SD, CA','Oakland Unified SD, CA',
  'San Jose Unified SD, CA','Elk Grove Unified SD, CA',
  'Aurora Public Schools, CO','Jefferson County R-1 SD, CO (Denver area)',
  'St. Louis Public Schools, MO','Kansas City Public Schools, MO',
  'Omaha Public Schools, NE','New Orleans Public Schools, LA',
  'Baton Rouge EBR Parish Schools, LA','Albuquerque Public Schools, NM',
  'Salt Lake City SD, UT','Granite SD, UT','Jordan SD, UT',
  'Anchorage SD, AK','Honolulu DOE, HI',
  'Guilford County Schools, NC','Forsyth County Schools, NC',
  'Durham Public Schools, NC','Raleigh Wake County, NC',
  'Berkeley County SD, SC','Richland One SD, SC','Greenville County Schools, SC',
  'Knox County Schools, TN','Knox County Public Schools, TN',
  'Jefferson County SD, AL (Birmingham)','Mobile County Public Schools, AL',
  'Tulsa Public Schools, OK','Oklahoma City Public Schools, OK',
  'Little Rock School District, AR','St. Paul Public Schools, MN',
  'Richmond Public Schools, VA','Virginia Beach City Public Schools, VA',
  'Norfolk Public Schools, VA','Chesterfield County Public Schools, VA',
  'Loudoun County Public Schools, VA','Alexandria City Public Schools, VA',
  'Arlington Public Schools, VA',
  // Generic school names for small towns
  'Lincoln Elementary School','Washington Elementary School','Jefferson Elementary School',
  'Roosevelt Elementary School','Kennedy Elementary School','Adams Elementary School',
  'Madison Elementary School','Monroe Elementary School','Jackson Elementary School',
  'Franklin Elementary School','Grant Elementary School','Eisenhower Elementary School',
  'Wilson Elementary School','Harrison Elementary School','Tyler Elementary School',
  'Polk Elementary School','Taylor Elementary School','Fillmore Elementary School',
  'Pierce Elementary School','Buchanan Elementary School','Johnson Elementary School',
  'Cleveland Elementary School','McKinley Elementary School','Taft Elementary School',
  'Harding Elementary School','Coolidge Elementary School','Hoover Elementary School',
  'Truman Elementary School','Dwight D. Eisenhower Elementary','Nixon Elementary School',
  'Ford Elementary School','Carter Elementary School','Reagan Elementary School',
  'Martin Luther King Jr. Elementary','Rosa Parks Elementary School',
  'Abraham Lincoln Elementary','George Washington Elementary','Benjamin Franklin Elementary',
  'Thomas Jefferson Elementary','Frederick Douglass Elementary','Harriet Tubman Elementary',
  'Sojourner Truth Elementary','Cesar Chavez Elementary School','Maya Angelou Elementary',
  'Oak Grove Elementary','Maple Grove Elementary','Pine Ridge Elementary',
  'Riverside Elementary','Hillside Elementary','Valley View Elementary',
  'Lakewood Elementary','Crestview Elementary','Parkview Elementary',
  'Greenwood Elementary','Westwood Elementary','Eastwood Elementary',
  'Northwood Elementary','Southwood Elementary','Maplewood Elementary',
  'Cedarwood Elementary','Elmwood Elementary','Birchwood Elementary',
  'Cherry Hill Elementary','Sunnybrook Elementary','Spring Valley Elementary',
  'Autumn Ridge Elementary','Mountain View Elementary','Ocean View Elementary',
  'Forest Glen Elementary','Meadowbrook Elementary','Rolling Hills Elementary',
  'Pleasant Hill Elementary','Happy Hollow Elementary','Clear Creek Elementary',
  'Blue Ridge Elementary','Silver Lake Elementary','Golden Gate Elementary',
  'Sunrise Elementary','Sunset Elementary','Moonrise Elementary',
  'Star Valley Elementary','Rainbow Elementary','Thunderbird Elementary',
  'Eagle Ridge Elementary','Falcon Ridge Elementary','Hawk Ridge Elementary',
  'Owl Creek Elementary','Fox Run Elementary','Deer Run Elementary',
  'Beaver Creek Elementary','Otter Creek Elementary','Wolf Creek Elementary',
];

let selectedSchool = localStorage.getItem('wes_school') || '';
let _schoolTimer = null;
let _lastSchoolQ = '';

// Search OpenStreetMap Nominatim — knows every school on Earth
async function searchSchoolsWorld(q) {
  try {
    const params = new URLSearchParams({
      q, format:'json', limit:10, addressdetails:1, dedupe:1,
      'accept-language':'en'
    });
    const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: { 'User-Agent': 'WesWeatherApp/1.0' }
    });
    const data = await res.json();
    const EDU_TYPES = new Set(['school','university','college','kindergarten',
      'academy','library','language_school','music_school','driving_school',
      'childcare','preschool','prep_school']);
    const EDU_WORDS = ['school','academy','elementary','middle school','high school',
      'college','university','institute','learning','education','prep','primary',
      'secondary','junior','senior','nursery','kindergarten','charter'];
    return data.filter(r => {
      const dn = (r.display_name||'').toLowerCase();
      return EDU_TYPES.has(r.type) || EDU_TYPES.has(r.class) ||
             EDU_WORDS.some(w => dn.includes(w));
    }).map(r => {
      const a = r.address || {};
      const name = r.name || a.amenity || a.building || q;
      const parts = [a.city||a.town||a.village||a.county||'', a.state||a.state_district||'', a.country||''].filter(Boolean);
      return name + (parts.length ? ' — ' + parts.join(', ') : '');
    });
  } catch { return []; }
}

function initSchoolPicker() {
  const input     = document.getElementById('school-search');
  const dropdown  = document.getElementById('school-dropdown');
  const selectedEl= document.getElementById('ft-school-selected');
  const badgeEl   = document.getElementById('ft-school-badge');

  function renderDropdown(results, rawQ) {
    dropdown.innerHTML = '';
    results.forEach(school => {
      const div = document.createElement('div');
      div.className = 'ft-school-opt';
      const lo = school.toLowerCase(), lq = rawQ.toLowerCase();
      const idx = lo.indexOf(lq);
      if (idx >= 0) {
        div.innerHTML = school.slice(0,idx) +
          `<span class="ft-school-match">${school.slice(idx,idx+rawQ.length)}</span>` +
          school.slice(idx+rawQ.length);
      } else { div.textContent = school; }
      div.addEventListener('click', () => showSelected(school));
      dropdown.appendChild(div);
    });
    const custom = document.createElement('div');
    custom.className = 'ft-school-opt custom-opt';
    custom.textContent = `✏️ Use "${rawQ}"`;
    custom.addEventListener('click', () => showSelected(rawQ));
    dropdown.appendChild(custom);
    dropdown.classList.remove('hidden');
  }

  function showSelected(name) {
    selectedSchool = name;
    localStorage.setItem('wes_school', name);
    input.value = '';
    dropdown.classList.add('hidden');
    badgeEl.textContent = '🏫 ' + name;
    selectedEl.classList.remove('hidden');
    input.closest('.ft-school-search-wrap').style.display = 'none';
  }

  if (selectedSchool) showSelected(selectedSchool);

  document.getElementById('ft-school-clear').addEventListener('click', () => {
    selectedSchool = '';
    localStorage.removeItem('wes_school');
    selectedEl.classList.add('hidden');
    input.closest('.ft-school-search-wrap').style.display = '';
    input.value = '';
    input.focus();
  });

  input.addEventListener('input', () => {
    const rawQ = input.value.trim();
    const q = rawQ.toLowerCase();
    dropdown.innerHTML = '';
    if (!rawQ) { dropdown.classList.add('hidden'); return; }

    // Instant local results
    const local = _SCHOOL_STARTERS.filter(s => s.toLowerCase().includes(q)).slice(0, 6);
    if (local.length) renderDropdown(local, rawQ);
    else {
      const searching = document.createElement('div');
      searching.className = 'ft-school-opt';
      searching.style.color = '#90a4ae';
      searching.textContent = '🔍 Searching every school in the world...';
      dropdown.appendChild(searching);
      const custom2 = document.createElement('div');
      custom2.className = 'ft-school-opt custom-opt';
      custom2.textContent = `✏️ Use "${rawQ}"`;
      custom2.addEventListener('click', () => showSelected(rawQ));
      dropdown.appendChild(custom2);
      dropdown.classList.remove('hidden');
    }

    // Debounced worldwide API search (500ms, min 3 chars)
    clearTimeout(_schoolTimer);
    if (rawQ.length < 3) return;
    _lastSchoolQ = rawQ;
    _schoolTimer = setTimeout(async () => {
      if (_lastSchoolQ !== rawQ) return; // stale
      const worldResults = await searchSchoolsWorld(rawQ + ' school');
      if (_lastSchoolQ !== rawQ) return; // stale
      if (worldResults.length) renderDropdown(worldResults, rawQ);
    }, 500);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) showSelected(input.value.trim());
    if (e.key === 'Escape') dropdown.classList.add('hidden');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.ft-school-search-wrap')) dropdown.classList.add('hidden');
  });
}
initSchoolPicker();

// ── Collapsible Sections ──
(function initCollapsible() {
  const saved = JSON.parse(localStorage.getItem('wes_collapsed') || '{}');
  document.querySelectorAll('.section-head').forEach(head => {
    const content = head.nextElementSibling;
    if (!content) return;
    const chevron = document.createElement('span');
    chevron.className = 'section-chevron';
    chevron.textContent = '▼';
    head.appendChild(chevron);
    const key = head.textContent.trim().slice(0, 40);
    if (saved[key]) {
      content.style.display = 'none';
      head.classList.add('sec-collapsed');
    }
    head.addEventListener('click', () => {
      const isHidden = content.style.display === 'none';
      content.style.display = isHidden ? '' : 'none';
      head.classList.toggle('sec-collapsed', !isHidden);
      saved[key] = !isHidden;
      localStorage.setItem('wes_collapsed', JSON.stringify(saved));
    });
  });
})();

// ── Field Trip Packing ──
const FT_ALWAYS = [
  ['🎒','Backpack'],['💧','Full water bottle'],['🍎','Snack or lunch'],
  ['📱','Charged phone/device'],['💊','Any medicine you need'],
  ['💰','A little money'],['📝','Permission slip'],['🪪','School ID'],
];
const FT_WEATHER = {
  sunny:        [['🧴','Sunscreen'],['🕶️','Sunglasses'],['🧢','Hat or cap'],['👕','Light breathable clothes']],
  'clear-night':[['🔦','Flashlight'],['🧥','Warm jacket'],['🌡️','Hand warmers'],['🔭','Binoculars for stars']],
  cloudy:       [['🧥','Light jacket'],['☔','Compact umbrella just in case'],['👟','Comfy walking shoes']],
  rainy:        [['☔','Umbrella'],['🥾','Rain boots'],['🧥','Rain jacket'],['🧦','Extra socks'],['🛍️','Bag for wet stuff']],
  snowy:        [['🧤','Gloves'],['🧣','Scarf'],['🥾','Snow boots'],['🧥','Heavy warm coat'],['🧦','Thick socks'],['🌡️','Hand warmers']],
  stormy:       [['📞','Emergency contact #'],['☔','Full rain gear'],['🏠','Check if trip is still on!'],['🔦','Flashlight']],
  foggy:        [['🧥','Jacket'],['🔦','Small flashlight'],['👟','Good grip shoes'],['🌡️','Layer up!']],
};
const FT_TRIP_EXTRAS = {
  // ── Farms ──
  farm:         { label:'🐄 Farm Extras', tip:'🚜 Bared Farm tips: Wear clothes you don\'t mind getting muddy! Be gentle with animals and don\'t feed them unless a farmer says okay!', items:[['👟','OLD shoes — it WILL get muddy!'],['👖','Old clothes you can get dirty'],['🧤','Gloves for touching animals'],['🤧','Allergy medicine (hay & animals!)'],['🧴','Hand sanitizer — wash up after animals!'],['📸','Camera for animal photos'],['👃','FYI — farms smell funny! 😄'],['🥕','No outside animal food']] },
  orchard:      { label:'🍎 Apple Orchard Extras', tip:'🍎 Orchard tips: Don\'t eat apples straight off the tree until they\'re washed! The best apples are higher up — a picker stick helps!', items:[['🧺','Bag or basket for picking apples'],['🧥','Comfy layers — orchards can be breezy'],['👟','Closed-toe shoes for uneven ground'],['🍎','Leave space in your backpack for apples!'],['📸','Camera — apple trees are beautiful!']] },
  pumpkin:      { label:'🎃 Pumpkin Patch Extras', tip:'🎃 Pumpkin tips: The heavier the pumpkin the harder to carry! Bring a bag or wagon. Fields can be muddy!', items:[['👟','Boots or old shoes (muddy fields!)'],['🧤','Gloves — pumpkin stems are scratchy'],['🛍️','Big bag to carry your pumpkin'],['📸','Camera — great photo spot!'],['🌾','Watch out for hay and mud']] },
  berry:        { label:'🍓 Berry Farm Extras', tip:'🍓 Berry tips: Don\'t eat berries until washed! Pick gently — berries bruise easily. Wear clothes you don\'t mind staining!', items:[['👚','Clothes you don\'t mind staining (berries are juicy!)'],['🧺','Picking container'],['👟','Old shoes — ground can be muddy'],['🧴','Sunscreen (you\'ll be bending over a lot!)'],['🫧','Extra napkins or wipes']] },
  flower:       { label:'🌻 Flower Farm Extras', tip:'🌸 Flower tips: Don\'t pick flowers unless told to! Some flowers can irritate skin — wash hands after touching.', items:[['🤧','Allergy medicine (pollen galore!)'],['🧴','Sunscreen'],['📸','Camera — so many pretty photos!'],['🧤','Light gloves if you have plant allergies'],['🕶️','Sunglasses for bright fields']] },
  bees:         { label:'🐝 Bee Farm Extras', tip:'🐝 Bee tips: Stay calm around bees — they won\'t sting if you don\'t swat! The beekeeper will give you a suit. This is SO cool!', items:[['🧥','Long sleeves and long pants'],['🧦','Tall socks (tuck pants in!)'],['🤐','Stay calm and move slowly'],['🤧','Allergy medicine if you\'re allergic to bees!'],['🍯','Space in your bag for honey jars!']] },
  horse:        { label:'🐴 Horse Ranch Extras', tip:'🐴 Horse tips: Approach horses from the side and let them sniff your hand first. Don\'t run or make loud noises — it scares them!', items:[['🥾','Boots with a small heel (for stirrups)'],['👖','Long pants to protect legs'],['🧤','Riding gloves if you have them'],['🤧','Allergy medicine (horse hair & hay)'],['🧴','Hand sanitizer'],['📸','Camera for horse photos!']] },
  crop:         { label:'🌾 Crop Farm Extras', tip:'🌾 Crop farm tips: Huge machines are super loud! You might get a hearing protector to wear. Fields go on forever — stay with your group!', items:[['👟','Sturdy old shoes'],['🧢','Hat — fields have zero shade'],['🧴','Lots of sunscreen'],['🤧','Allergy medicine (pollen & dust)'],['💧','Extra water — it gets hot in open fields']] },
  // ── Nature ──
  nature:       { label:'🥾 Hiking Extras', tip:'🥾 Hiking tips: Stay on the trail, never pick plants, and always walk with your group. Leave no trace!', items:[['🥾','Sturdy hiking shoes/boots'],['🧴','Bug spray'],['🧴','Sunscreen'],['🗺️','Trail map'],['🔦','Small flashlight'],['🩹','Band-aids (just in case)'],['🧤','Gloves if cold']] },
  forest:       { label:'🌳 Forest Extras', tip:'🌳 Forest tips: Watch out for poison ivy (leaves of 3, let it be!). Stay on paths and never wander off alone!', items:[['🧥','Long sleeves (bug & scratch protection)'],['🧦','Tall socks (tuck pants in for ticks!)'],['🔦','Flashlight — forests can be dark'],['🧴','Bug spray'],['📸','Camera for wildlife'],['🔍','Magnifying glass for cool bugs & plants']] },
  mountain:     { label:'🏔️ Mountain Extras', tip:'🏔️ Mountain tips: The higher you go the colder and windier it gets! Temperature drops 3°F every 1000 feet up!', items:[['🧥','Extra warm layer (mountains are cold!)'],['🥾','Hiking boots with ankle support'],['🧤','Gloves'],['🧣','Scarf or neck gaiter'],['💧','Lots of water (exercise + altitude)'],['🕶️','Sunglasses (UV is stronger at altitude!)'],['🧴','Sunscreen']] },
  park:         { label:'🏞️ Park Extras', tip:'⚽ Park tips: Stay in designated areas, pick up any trash you see, and share the playground!', items:[['⚽','Sports equipment if allowed'],['🪁','Frisbee or kite'],['🧺','Picnic blanket'],['🧴','Sunscreen'],['🛍️','Trash bag to help clean up']] },
  lake:         { label:'🌊 Lake/Pond Extras', tip:'🌊 Lake tips: Never swim without a lifeguard present. Watch out for slippery rocks near the water!', items:[['🩱','Swimsuit (if swimming is planned)'],['🏊','Towel'],['👟','Water shoes (rocks are slippery!)'],['🧴','Sunscreen'],['🦟','Bug spray (lakes = mosquitoes!)'],['🛍️','Dry bag for electronics']] },
  river:        { label:'🏞️ River Extras', tip:'🌊 River tips: Never wade into fast-moving water! Even shallow fast rivers can knock you over. Stay back from the banks!', items:[['👟','Water-resistant shoes'],['🧥','Light jacket (rivers are breezy)'],['🦟','Bug spray'],['🔍','Net or jar for catching pond creatures'],['📸','Camera — rivers are gorgeous!']] },
  tidepools:    { label:'🐠 Tide Pool Extras', tip:'🐠 Tide pool tips: NEVER pick up or move sea creatures! Step carefully — wet rocks are very slippery. Check tide times!', items:[['👟','Rubber-soled shoes (SO slippery!)'],['🧴','Sunscreen'],['🔍','Magnifying glass for tiny creatures'],['📸','Waterproof camera/phone case'],['💧','Water to rinse hands'],['🧤','Gloves if handling rocks']] },
  cave:         { label:'⛏️ Cave Extras', tip:'⛏️ Cave tips: Caves are dark, cold, and wet! Never touch the rock formations — the oils from your hands damage them over thousands of years!', items:[['🔦','Good flashlight (REQUIRED!)'],['🧥','Warm jacket (caves stay around 50°F!)'],['🥾','Boots with grip (wet floors)'],['🧢','Helmet if provided'],['🤫','Quiet voice — caves echo!'],['🤐','Don\'t touch the stalactites/stalagmites!']] },
  waterfall:    { label:'💧 Waterfall Extras', tip:'💧 Waterfall tips: The mist can make rocks very slippery! Stay behind safety barriers. Get ready to get a little wet!', items:[['🌧️','Light rain jacket (you WILL get misted!)'],['🥾','Waterproof boots with grip'],['🛍️','Dry bag for your phone'],['📸','Waterproof camera case'],['🧥','Extra change of clothes']] },
  beach:        { label:'🏖️ Beach Extras', tip:'🌊 Beach tips: Always swim where a lifeguard can see you! Reapply sunscreen every hour — sand reflects the sun!', items:[['🩱','Swimsuit'],['🏊','Towel'],['🧴','SPF 50+ sunscreen'],['🕶️','Sunglasses'],['🧢','Hat'],['👟','Water shoes'],['👔','Change of dry clothes'],['🛍️','Bag for wet stuff'],['🪣','Bucket and shovel']] },
  camping:      { label:'🏕️ Camping Extras', tip:'🏕️ Camping tips: Leave no trace! Pack out everything you pack in. Bears love food smells — store food properly!', items:[['🛏️','Sleeping bag'],['⛺','Check if tents are provided'],['🔦','Headlamp'],['🦟','Heavy-duty bug spray'],['🧦','Extra warm socks'],['🧹','Trash bag'],['🪥','Toothbrush & toiletries'],['🌡️','Hand warmers for night']] },
  garden:       { label:'🌱 Botanical Garden Extras', tip:'🌿 Garden tips: Don\'t pick any flowers or plants! The gardens take years to grow. Bees and butterflies are your friends here!', items:[['🤧','Allergy medicine (lots of pollen!)'],['🕶️','Sunglasses'],['🧴','Sunscreen'],['📸','Camera — so beautiful!'],['👟','Comfy walking shoes (lots of paths)']] },
  communityGarden:{ label:'🥦 Community Garden Extras', tip:'🌱 Garden tips: You might get to pick veggies! Wash anything before eating it. Digging in soil is really good for you!', items:[['🧤','Gardening gloves'],['👟','Old shoes (soil & mud)'],['🧴','Hand sanitizer'],['🌱','Bag for any veggies you pick'],['📸','Camera to document what\'s growing']] },
  // ── Animals ──
  zoo:          { label:'🦁 Zoo Extras', tip:'🐘 Zoo tips: Never tap glass or yell at animals — it really stresses them out. Look for animals "hiding" — it\'s like a scavenger hunt!', items:[['👟','Comfy walking shoes (LOTS of walking)'],['🗺️','Zoo map'],['📸','Camera'],['🧴','Sunscreen (mostly outdoors)'],['💧','Extra water'],['🤫','Quiet voice near shy animals']] },
  aquarium:     { label:'🐠 Aquarium Extras', tip:'🦈 Aquarium tips: Tap the glass ONLY if there\'s a sign saying you can. Sharks are actually mostly friendly! Touch tanks are the best part!', items:[['👟','Comfy shoes (slippery floors!)'],['🤫','Quiet indoor voice'],['📸','Camera (no flash — it scares fish!)'],['💧','Water — it can get stuffy inside'],['🔍','Look for the hidden creatures in tanks!']] },
  butterfly:    { label:'🦋 Butterfly Garden Extras', tip:'🦋 Butterfly tips: Move S-L-O-W-L-Y! Butterflies will land on you if you\'re still. Don\'t touch their wings — it damages their scales!', items:[['🌸','Wear bright colors — butterflies love them!'],['🤫','Move slowly and quietly'],['📸','Camera ready at all times'],['🤧','Allergy medicine'],['🧴','No strong perfume (confuses butterflies)']] },
  wildlife:     { label:'🦌 Wildlife Refuge Extras', tip:'🦌 Wildlife tips: Stay on marked paths and keep noise down. Never feed wild animals — even cute ones! They need to stay wild.', items:[['🔭','Binoculars for spotting animals'],['📓','Nature journal to draw what you see'],['🤫','Super quiet voice'],['🧥','Earth-toned clothes (blend in)'],['🦟','Bug spray'],['📸','Camera with zoom if possible']] },
  birds:        { label:'🐦 Bird Sanctuary Extras', tip:'🦅 Bird tips: Bring binoculars! Birds have amazing hearing — even a whisper can spook them. Look up AND down!', items:[['🔭','Binoculars (essential!)'],['📓','Bird checklist to mark species'],['🤫','VERY quiet voice'],['🧥','Muted colors (no bright clothes)'],['📸','Camera with zoom'],['👟','Soft-soled quiet shoes']] },
  fishHatchery: { label:'🐟 Fish Hatchery Extras', tip:'🐟 Hatchery tips: You might get to feed the fish! Watch thousands of baby fish swimming together — it\'s mesmerizing!', items:[['👟','Waterproof shoes (wet floors everywhere)'],['🧥','Light jacket (hatcheries are cool inside)'],['📸','Camera'],['🤐','Don\'t put hands in the tanks unless told'],['🐟','Ask if you can feed the fish!']] },
  pettingZoo:   { label:'🐑 Petting Zoo Extras', tip:'🐐 Petting zoo tips: Baby goats WILL try to eat your clothes — that\'s normal! Let animals smell your hand first before petting.', items:[['🧴','Lots of hand sanitizer'],['👟','Old shoes (animals poop everywhere!)'],['🤧','Allergy medicine'],['🧤','Optional gloves'],['👃','It will smell — that\'s okay! 😄'],['🫶','Be gentle and calm with animals']] },
  reptile:      { label:'🦎 Reptile Center Extras', tip:'🐍 Reptile tips: Reptiles are cold-blooded — they feel the same temperature as the room! Never startle them. Some can be held!', items:[['🧴','Hand sanitizer (after handling reptiles)'],['📸','Camera — amazing photo ops!'],['🤐','No sudden loud noises'],['🤔','It\'s okay to be nervous — just watch!'],['🔍','Look for camouflaged lizards in the tanks']] },
  // ── Science & Learning ──
  museum:       { label:'🏛️ Museum Extras', tip:'🎨 Museum tips: Walk quietly, don\'t touch exhibits unless there\'s a "touch me" sign, and read the signs — you might learn something amazing!', items:[['📓','Notebook for drawings & notes'],['✏️','Pencils (pens sometimes not allowed)'],['👟','Comfy walking shoes'],['🤫','Indoor voice'],['📸','Camera (check rules first)']] },
  science:      { label:'🔬 Science Center Extras', tip:'🧪 Science center tips: Touch EVERYTHING labeled "interactive"! Ask questions — the staff loves explaining experiments!', items:[['👟','Shoes you can run/jump in'],['📓','Science journal for notes'],['✏️','Pencil'],['🤩','Curiosity! Ask ALL the questions!'],['📸','Camera for cool demos']] },
  planetarium:  { label:'🔭 Planetarium Extras', tip:'🌌 Planetarium tips: The lights go totally dark — don\'t be scared! You\'ll see the whole universe above you. It\'s magical!', items:[['😴','You might get sleepy in the dark (it\'s cozy!)'],['📓','Notebook for star names'],['🤩','Look EVERYWHERE — stars in all directions!'],['👟','Comfy shoes'],['🤫','Very quiet — sound carries in domes']] },
  space:        { label:'🚀 Space Center Extras', tip:'🚀 Space tips: Real rockets are HUGE in person. Ask astronauts how they go to the bathroom in space — seriously, it\'s wild!', items:[['📓','Notebook for facts'],['📸','Camera (rockets are photogenic!)'],['🤩','Questions ready for astronauts/staff'],['👟','Comfy walking shoes'],['🧢','Hat if outdoor rocket displays']] },
  tech:         { label:'🖥️ Tech Museum Extras', tip:'💻 Tech tips: Touch everything! Coding exhibits, robot controls, VR headsets — try it all. You\'re going to want to work here someday!', items:[['🎮','Gaming skills activated!'],['📓','Notebook for cool tech facts'],['👟','Comfy shoes (interactive = lots of moving)'],['🤩','Try every single interactive station!']] },
  library:      { label:'📚 Library Extras', tip:'📚 Library tips: Libraries are silent — indoor voices only! You might get to pick books to borrow. Bring your library card!', items:[['🤫','Super quiet voice'],['📚','Library card if you have one'],['📓','Notebook if you want to copy info'],['👟','Soft-soled quiet shoes'],['🧠','Be ready to learn something new!']] },
  history:      { label:'🏰 Historical Site Extras', tip:'🏛️ History tips: These places are REALLY old — be extra careful. Imagine what it was like to live there. History is actually a mystery!', items:[['📓','History journal'],['✏️','Pencil for sketching old buildings'],['📸','Camera — old buildings are amazing'],['👟','Comfortable walking shoes'],['🤔','Lots of "why?" questions ready!']] },
  observatory:  { label:'🌌 Observatory Extras', tip:'🔭 Observatory tips: Telescopes are huge! You might see craters on the Moon, rings of Saturn, or nearby galaxies. Dress warm — observatories open at night!', items:[['🌙','Best at night — it might be late!'],['🧥','Warm clothes (observatories are open-air & cold)'],['📓','Star map or notebook'],['🔭','Binoculars of your own if you have them'],['😴','Energy drink for nighttime visits!']] },
  // ── Community ──
  fireStation:  { label:'🚒 Fire Station Extras', tip:'🔥 Fire station tips: You might get to sit in the fire truck! Firefighters LOVE answering kid questions — ask them everything!', items:[['📓','Notebook for fire safety facts'],['📸','Camera (fire trucks are awesome!)'],['🤩','Questions: How heavy is the gear? How hot is fire?'],['👟','Closed-toe shoes for safety']] },
  police:       { label:'👮 Police Station Extras', tip:'👮 Police tips: You might get fingerprinted (just for fun!) and see the dispatch center. Officers love showing kids around!', items:[['📓','Notebook'],['📸','Camera'],['🤩','Questions ready for officers'],['👟','Closed-toe shoes for safety']] },
  hospital:     { label:'🏥 Hospital Extras', tip:'🏥 Hospital tips: Hospitals have lots of rules to keep patients safe. Speak quietly and keep hands to yourself — germs are everywhere!', items:[['🧴','Hand sanitizer (essential!)'],['🤫','Very quiet indoor voice'],['😷','Mask if required'],['🧴','Wash hands at every sink you see!'],['💙','Be kind — patients are having tough days']] },
  bakery:       { label:'🍞 Bakery Extras', tip:'🥐 Bakery tips: It\'s SO warm inside from the ovens! You might get to knead dough or decorate something. And yes — there will probably be samples!', items:[['🤤','Empty stomach (samples are the best part!)'],['👟','Closed-toe shoes (hot ovens nearby)'],['🧤','Bring your own apron if you have one'],['📸','Camera for food photos'],['🫧','Hair tie if you have long hair (food safety)']] },
  restaurant:   { label:'🍕 Restaurant Kitchen Extras', tip:'👨‍🍳 Kitchen tips: Restaurant kitchens are LOUD and fast! Chefs work super hard. You\'ll see how many people it takes to make one meal!', items:[['👟','Closed-toe shoes (safety rule)'],['📓','Notebook to write down recipes'],['🍴','Questions: What\'s the hardest dish to make?'],['😮','Be amazed at how fast everything moves!']] },
  factory:      { label:'🏭 Factory Extras', tip:'🏗️ Factory tips: Factories are LOUD! You\'ll probably wear ear protection. Watch how things are made from raw materials to finished product!', items:[['🔇','Ear protection (usually provided)'],['👟','Sturdy closed-toe shoes (required!)'],['🧥','Long sleeves (safety rule)'],['📸','Ask before taking photos'],['📓','Notes on how things are made!']] },
  recycling:    { label:'♻️ Recycling Center Extras', tip:'♻️ Recycling tips: It\'s smelly and loud but SO important! You\'ll see how your recycling becomes brand new things. Every bottle you recycle matters!', items:[['👟','Old closed-toe shoes'],['🧥','Clothes you can get dirty'],['🔇','Expect loud machinery — ear protection provided'],['💚','Learn what CAN and CAN\'T be recycled'],['📓','Notes on what happens to plastic, glass, paper']] },
  cityHall:     { label:'🏛️ City Hall Extras', tip:'🏛️ City hall tips: This is where laws for your town are made! You might get to sit in the council chamber. Government is how communities make decisions!', items:[['👔','Dress nicely — it\'s a formal building'],['📓','Notebook for civic facts'],['🤫','Professional quiet voice'],['🤔','Questions: How do you make a new law?'],['📸','Camera for the building architecture']] },
  construction: { label:'🏗️ Construction Extras', tip:'🚧 Construction tips: Safety first! Hard hats required. Never touch equipment. Architects and engineers solve huge puzzles every day!', items:[['🪖','Hard hat (usually provided)'],['👟','Sturdy closed-toe shoes (REQUIRED)'],['🧥','Clothes that can get dusty'],['📸','Camera for cool machinery'],['🤔','Ask: How tall will it be when done?']] },
  airport:      { label:'✈️ Airport Extras', tip:'✈️ Airport tips: You\'ll go through security — everything in your bag will be X-rayed. Planes are MUCH bigger up close! Ask about the control tower!', items:[['🪪','ID if required'],['📦','Leave water at home (security rules)'],['👟','Easy slip-off shoes (security checkpoint)'],['📸','Camera for planes'],['✈️','Ask: How do planes actually fly?!']] },
  harbor:       { label:'⚓ Harbor Extras', tip:'⚓ Harbor tips: Big ships are way bigger in person! Salt air smells amazing. Learn how sailors navigate using stars — GPS didn\'t always exist!', items:[['🧥','Windbreaker (harbors are breezy!)'],['🕶️','Sunglasses (sun reflects off water)'],['📸','Camera — boats and water are beautiful'],['💧','Extra water'],['🧴','Sunscreen']] },
  // ── Arts & Entertainment ──
  theater:      { label:'🎭 Theater Extras', tip:'🎭 Theater tips: Silence your phone! Clap between acts, not during. Live theater is different every single performance — enjoy the magic!', items:[['👔','Nice clean clothes (it\'s a fancy event!)'],['🤫','Phone on silent — don\'t forget!'],['📓','Program from the show as a souvenir'],['👏','Clap loudly at the end!'],['🤐','No talking during the performance']] },
  art:          { label:'🎨 Art Gallery Extras', tip:'🖼️ Art tips: You don\'t need to "understand" art — just feel what it makes you think! Never stand too close to or touch the paintings!', items:[['📓','Sketch pad to draw your own inspired art'],['✏️','Pencils'],['🤫','Quiet voice'],['👀','Look for hidden details in paintings!'],['🎨','What\'s your favorite piece? Why?']] },
  concert:      { label:'🎵 Concert Hall Extras', tip:'🎵 Concert tips: Classical music = sit still and quiet! Rock concert = let loose! Either way, music is an amazing experience live!', items:[['👔','Nice clothes for classical / comfy for other music'],['🤫','Silence phone completely!'],['👏','Know when to clap — ask a teacher!'],['🎵','Listen for instruments you recognize'],['📸','Check if photos are allowed']] },
  amusement:    { label:'🎢 Amusement Park Extras', tip:'🎡 Amusement tips: Check height requirements for rides! The line is long but worth it. Hydrate — you\'ll walk MILES throughout the day!', items:[['👟','Sneakers with straps (no flip flops on rides!)'],['🧴','Sunscreen'],['💧','Refillable water bottle'],['💰','Extra money for food/games'],['🧢','Hat (but secure it on rides!)'],['🎢','Ask which ride is the best!']] },
  carnival:     { label:'🎠 Carnival Extras', tip:'🎪 Carnival tips: The games are designed to be hard — don\'t worry if you don\'t win! The food and rides are the real prize!', items:[['💰','Extra money for games & food'],['👟','Comfy shoes (lots of walking)'],['🧴','Sunscreen (outdoors all day)'],['📸','Camera'],['🤤','Try the funnel cake — it\'s amazing!']] },
  circus:       { label:'🎪 Circus Extras', tip:'🤹 Circus tips: The performers practice for YEARS! Look at all the different acts happening at once. The clowns aren\'t scary — they\'re athletes!', items:[['📸','Camera for acrobat photos!'],['👟','Comfy shoes'],['💰','Money for souvenirs/snacks'],['🤩','Sit close to the center for best view'],['😲','Try to watch 3 things at once!']] },
  stadium:      { label:'⚽ Sports Stadium Extras', tip:'🏟️ Stadium tips: Stadiums are LOUD! Cheer for your team (or both!). Look at how the grass is perfectly maintained — it\'s an art form!', items:[['🧢','Team hat or colors'],['💰','Money for stadium food'],['🔭','Binoculars for far seats'],['🧴','Sunscreen for outdoor stadiums'],['📸','Camera'],['🗣️','Practice your team cheer!']] },
  movieStudio:  { label:'🎬 Movie Studio Extras', tip:'🎥 Studio tips: Movie magic is all tricks and green screens! You might see real props from famous movies. Everything is WAY smaller in real life!', items:[['📸','Camera (ask where photos are allowed)'],['📓','Autograph book in case you meet someone famous!'],['👟','Comfy walking shoes (studios are huge)'],['🎬','Spot things from movies you recognize!'],['🤩','Look for the green screen sets']] },
  // ── Travel & Transport ──
  train:        { label:'🚂 Train Ride Extras', tip:'🚂 Train tips: Trains are smooth and relaxing! Watch the scenery go by. Train conductors are happy to answer questions if they\'re not busy!', items:[['🪟','Window seat if possible!'],['📸','Camera for scenery shots'],['🎵','Headphones & music for the ride'],['🍎','Snacks for the journey'],['📚','Book in case it\'s a long ride'],['🗓️','Check the departure time carefully!']] },
  boat:         { label:'🚢 Boat Tour Extras', tip:'⛵ Boat tips: Watch the horizon if you feel sick — it really helps! Boats rock more than you\'d expect. Life jackets are your best friend!', items:[['🌊','Motion sickness medicine if needed'],['🧥','Windbreaker (boats are VERY breezy!)'],['🕶️','Sunglasses (sun + water = bright!)'],['🧴','Waterproof sunscreen'],['📸','Waterproof camera case'],['👟','Non-slip shoes (decks get wet)']] },
  cityTour:     { label:'🏙️ City Tour Extras', tip:'🌆 City tour tips: Cities have SO much history hidden in plain sight! Look up — buildings are more interesting the higher your eyes go!', items:[['👟','Very comfy walking shoes'],['📸','Camera for architecture'],['📓','Notes on interesting buildings'],['💰','Money for a snack break'],['🗺️','City map to follow along'],['🧴','Sunscreen if an outdoor tour']] },
  pool:         { label:'🏊 Aquatic Center Extras', tip:'🏊 Pool tips: No running on pool deck — it\'s slippery! Shower before entering. Swim caps keep hair out of filters!', items:[['🩱','Swimsuit'],['🏊','Towel (bring two!)'],['🥽','Goggles'],['🧴','Waterproof sunscreen for outdoor pools'],['👟','Flip flops for the locker room'],['🧴','Shampoo & soap'],['👙','Dry change of clothes']] },
  iceskating:   { label:'⛸️ Ice Skating Extras', tip:'⛸️ Skating tips: Everyone falls — even pros! Bend your knees, lean slightly forward, and don\'t look at your feet. Wear THICK socks!', items:[['🧤','Thick warm gloves (ice is cold AND you\'ll fall on your hands!)'],['🧥','Warm jacket'],['🧦','Thick tall socks for skate boots'],['👖','Long pants to protect your knees'],['🩺','Band-aids (just in case)'],['🤣','Fall gracefully and laugh about it!']] },
  bowling:      { label:'🎳 Bowling Extras', tip:'🎳 Bowling tips: Bowling shoes are required — they have special soles! Approach the line slowly, swing your arm like a pendulum, and release smoothly!', items:[['🧦','Extra socks (you wear rental bowling shoes!)'],['👕','Comfortable clothes you can swing your arm in'],['💰','Quarters for arcade games after'],['🎳','Practice your approach before it\'s your turn!'],['🤝','High-fives for everyone\'s strikes AND gutter balls!']] },
};

// ── Extra trips added ──
Object.assign(FT_TRIP_EXTRAS, {
  // More Travel
  submarine:      { label:'🤿 Submarine Extras', tip:'🤿 Sub tips: Submarines are TINY inside — no running! You\'ll go underwater and look out portholes. The pressure makes your ears pop!', items:[['🤧','Bring ear drops if ears pop easily'],['👟','Flat non-slip shoes (very tight spaces)'],['📸','Waterproof camera case'],['😮','Be ready to be amazed!']] },
  lighthouse:     { label:'🗼 Lighthouse Extras', tip:'🗼 Lighthouse tips: Most lighthouses have LOTS of stairs — can be 200 steps to the top! The view from the top is totally worth it!', items:[['👟','Good grip shoes for spiral stairs'],['🧥','Wind jacket (it\'s breezy at the top!)'],['📸','Camera — ocean views are stunning'],['💪','Get ready to climb! Lots of steps!']] },
  kayaking:       { label:'🛶 Kayaking Extras', tip:'🛶 Kayaking tips: Life jacket always on! Paddle with your core, not just your arms. If you tip, stay calm — float on your back!', items:[['🩱','Swimsuit or clothes that can get wet'],['🧴','Waterproof sunscreen'],['🕶️','Sunglasses with strap'],['👟','Water shoes or sandals with straps'],['🛍️','Dry bag for phone & snacks'],['🧥','Light jacket for after']] },
  helicopter:     { label:'🚁 Helicopter Extras', tip:'🚁 Helicopter tips: It\'s LOUD inside — you\'ll wear headphones! The rotor blows everything around during takeoff. Breathtaking views!', items:[['🔇','Expect loud noise — hearing protection provided'],['🧥','Secure jacket (wind from rotors!)'],['🕶️','Sunglasses'],['🚫','No loose items that can fly away!'],['📸','Camera — views are unbeatable!']] },
  hotAirBalloon:  { label:'🎈 Hot Air Balloon Extras', tip:'🎈 Balloon tips: Balloons go wherever the wind goes — the pilot uses height to steer! You\'ll be VERY high up. Don\'t look down if you\'re scared of heights!', items:[['🧥','Warm layers — it\'s cold up high!'],['👟','Flat shoes (you stand in a basket)'],['📸','Camera for sky views'],['💊','Motion sickness meds if needed'],['🚫','No dangling bags or accessories']] },
  // More Farms
  dairy:          { label:'🥛 Dairy Farm Extras', tip:'🐄 Dairy tips: You might get to milk a cow! Cows give milk TWICE a day. It takes 350 squirts to make a gallon! Wash hands before and after!', items:[['👟','Old shoes — barn floors are messy!'],['🧥','Old clothes'],['🧤','Gloves for milking'],['🤧','Allergy medicine (hay & animal hair)'],['🧴','Hand sanitizer'],['🥛','Ask if you can taste fresh milk!']] },
  sheepFarm:      { label:'🐑 Sheep Farm Extras', tip:'🐑 Sheep tips: Shearing doesn\'t hurt! Wool grows back every year. One sheep can make 4-9 pounds of wool. That\'s enough for a whole sweater!', items:[['👟','Old shoes'],['🧥','Old clothes'],['🧤','Gloves'],['🤧','Allergy medicine (wool & hay)'],['📸','Camera — lambs are SO cute!'],['🧶','Ask about what wool becomes']] },
  pigFarm:        { label:'🐷 Pig Farm Extras', tip:'🐷 Pig tips: Pigs are actually very clean animals — they roll in mud to cool down because they can\'t sweat! They\'re also super smart!', items:[['👟','VERY old shoes — mud everywhere!'],['👖','Old pants (it\'s muddy)'],['🧴','Lots of hand sanitizer'],['👃','It will smell — that\'s normal! 😄'],['📸','Camera — piglets are adorable!']] },
  goatFarm:       { label:'🐐 Goat Farm Extras', tip:'🐐 Goat tips: Goats will try to eat ANYTHING — your shoelaces, your bag straps, your sleeves! Hold on tight to your stuff!', items:[['👟','Old shoes'],['🧥','Old clothes (goats are nibbles!)'],['🤧','Allergy medicine'],['🧴','Hand sanitizer'],['📸','Camera — baby goats (kids) are hilarious!'],['😂','Guard your snacks!']] },
  alpacaFarm:     { label:'🦙 Alpaca Farm Extras', tip:'🦙 Alpaca tips: Alpacas might spit if they\'re annoyed — keep calm and don\'t startle them! Their fiber is softer than cashmere!', items:[['🧥','Old jacket (spitting risk!)'],['👟','Farm boots'],['🤧','Allergy medicine'],['🧴','Hand sanitizer'],['🧶','Ask to touch the raw fiber — so soft!'],['📸','Camera — alpacas are hilarious looking!']] },
  sugarShack:     { label:'🍁 Maple Syrup Extras', tip:'🍁 Maple tips: It takes 40 GALLONS of sap to make 1 gallon of syrup! Syrup is made in late winter/early spring when days warm up. The sugarhouse is very steamy!', items:[['🧥','Jacket — sap runs in cold weather!'],['👟','Boots for snowy/muddy sugar bush'],['🤤','VERY empty stomach — samples incoming!'],['🍁','Ask about tapping a tree!'],['📸','Camera for the steam & boiling kettles']] },
  christmasTree:  { label:'🎄 Christmas Tree Extras', tip:'🎄 Tree farm tips: Fresh-cut trees smell AMAZING! Bring a saw (or the farm has them). Trees are heavier than they look — you\'ll need help carrying!', items:[['🧥','Warm winter jacket'],['🧤','Gloves (pine needles are prickly!)'],['👟','Waterproof boots (often muddy/snowy)'],['📏','Measure your ceiling height before picking a tree!'],['🚗','How are you getting it home? Measure your car!']] },
  lavender:       { label:'💜 Lavender Farm Extras', tip:'💜 Lavender tips: The smell is SO strong but relaxing! Bees LOVE lavender — stay calm around them. Best visited in summer when everything is purple!', items:[['🤧','Allergy medicine (VERY polleny!)'],['🕶️','Sunglasses'],['🧴','Sunscreen'],['📸','Camera — purple fields are gorgeous!'],['🛍️','Bag for lavender products to buy'],['🐝','Stay calm around bees']] },
  mushroom:       { label:'🍄 Mushroom Farm Extras', tip:'🍄 Mushroom tips: Farms grow mushrooms in the dark! It\'s like a cave. Never eat wild mushrooms you find yourself — some are poisonous! Only eat ones from the farm.', items:[['🧥','Jacket — mushroom rooms are cool & damp'],['🚫','NEVER eat found mushrooms — farm only!'],['📸','Camera — mushrooms look alien!'],['🔦','Flashlight if rooms are very dark'],['🛍️','Bag to buy fresh mushrooms']] },
  greenhouse:     { label:'🪴 Greenhouse Extras', tip:'🌱 Greenhouse tips: It\'s HOT and humid inside — like a tropical jungle! Plants from all over the world grow here. Touch only what you\'re told you can!', items:[['👕','Light clothes — it\'s warm & humid inside!'],['🤧','Allergy medicine'],['💧','Extra water — you\'ll sweat!'],['📸','Camera for exotic plants'],['🚫','Don\'t touch plants without permission']] },
  cornMaze:       { label:'🌽 Corn Maze Extras', tip:'🌽 Maze tips: Mazes can be HUGE — up to a mile of paths! If you get lost, look for the highest point. Maps are usually given at the entrance. Corn is taller than you think!', items:[['👟','Good walking shoes'],['📱','Phone charged (in case you actually get lost!)'],['💧','Water bottle'],['🗺️','Take the map at the entrance!'],['🧴','Bug spray (corn fields = bugs)'],['👀','Look for clues on signs inside']] },
  hydroponics:    { label:'💧 Hydroponic Farm Extras', tip:'🌱 Hydro tips: Plants grow in WATER with no soil! It uses 90% less water than regular farming. The roots hang in nutrient water. Super futuristic!', items:[['👟','Comfy shoes'],['📓','Notebook — so much cool science!'],['📸','Camera — plants in water look amazing'],['🤔','Ask: How do plants grow without dirt?!']] },
  chickenFarm:    { label:'🐔 Chicken Farm Extras', tip:'🐔 Chicken tips: Chickens lay one egg per day! They\'re actually descended from dinosaurs. Let the chickens come to you — chasing them stresses them out!', items:[['👟','Old shoes (chicken coops smell!)'],['🤧','Allergy medicine (feathers & hay)'],['🧴','Hand sanitizer'],['📸','Camera — chicks are SO fluffy!'],['🥚','Ask if you can collect eggs!']] },
  fishFarm:       { label:'🐟 Fish Farm Extras', tip:'🐟 Fish farm tips: Aquaculture feeds millions of people! You\'ll see fish at every life stage. The tanks are LOUD with water filters. No hands in the water!', items:[['👟','Waterproof shoes (wet floors)'],['🧥','Light jacket (damp & cool inside)'],['📸','Camera for fish photos'],['🚫','Keep hands out of tanks'],['🐟','Ask: What do the fish eat?']] },
  rabbitFarm:     { label:'🐰 Rabbit Farm Extras', tip:'🐰 Rabbit tips: Rabbits thump their back feet when scared — move slowly! They can\'t vomit, so they\'re very careful eaters. Hold them like a football — support the bottom!', items:[['🧤','Gloves if allergic to fur'],['🤧','Allergy medicine (rabbit fur)'],['🧴','Hand sanitizer'],['👐','Learn how to hold a rabbit correctly!'],['📸','Camera — bunnies are adorable']] },
  winery:         { label:'🍇 Vineyard Extras', tip:'🍇 Vineyard tips: Grapes are harvested in fall! Grape-stomping was how wine was made for thousands of years. You\'ll probably get to taste grape juice!', items:[['👟','Old shoes (grape juice stains!)'],['👖','Old pants — stomping is messy'],['📸','Camera — vineyards are beautiful'],['🍇','Ask about picking grapes!'],['👃','The smell of fermenting grapes is wild']] },
  teaFarm:        { label:'🍵 Tea Farm Extras', tip:'🍵 Tea tips: Tea leaves are picked by hand — one leaf at a time! The top two leaves make the best tea. Green, black, and white tea all come from the SAME plant!', items:[['🧥','Light layers'],['🍵','Come thirsty — tea tasting time!'],['📸','Camera for tea fields'],['🤔','Ask: How is green tea different from black tea?'],['🛍️','Buy some tea to bring home!']] },
  coffeeFarm:     { label:'☕ Coffee Farm Extras', tip:'☕ Coffee tips: Coffee grows on trees! The red "cherries" are the coffee fruit. It takes 2,000 coffee cherries to make 1 pound of coffee. Ask for a hot chocolate version!', items:[['🧥','Light jacket (mountain farms are cool)'],['📸','Camera for coffee cherry trees'],['🤔','Ask: How does a bean become coffee?!'],['🛍️','Bag to buy coffee for parents'],['☕','Try roasted coffee smell even if you don\'t drink it!']] },
  nutFarm:        { label:'🥜 Nut Farm Extras', tip:'🥜 Nut tips: Almonds, walnuts, pecans, and pistachios all grow on trees! Nuts are shaken loose by huge machines. Watch out for falling nuts!', items:[['🧢','Hat — nuts fall from trees!'],['👟','Old closed-toe shoes'],['🤧','VERY important: allergy medicine if you have nut allergies!'],['🧤','Gloves for picking'],['🛍️','Bag to bring nuts home']] },
  // Wild Nature
  desert:         { label:'🏜️ Desert Extras', tip:'🏜️ Desert tips: Deserts are HOT during the day but COLD at night! They\'re not just sand — most are full of plants and animals. Look for cacti, lizards, and roadrunners!', items:[['💧','Lots of extra water (you\'ll sweat a ton!)'],['🧴','Lots of sunscreen'],['🕶️','Sunglasses (sand reflects sun)'],['🧢','Wide-brim hat'],['🧥','Light long sleeves (sun protection)'],['👟','Closed-toe shoes (scorpions hide in sand)'],['👁️','Look before stepping anywhere!']] },
  volcano:        { label:'🌋 Volcano Extras', tip:'🌋 Volcano tips: Most safe to visit volcanoes aren\'t actively erupting! The lava rock is super sharp. The landscape looks like another planet!', items:[['🥾','VERY sturdy boots (lava rock shreds regular shoes!)'],['🧥','Layers — volcanoes change temperature fast'],['💨','Face mask if near volcanic gas vents'],['📸','Camera — unreal landscapes!'],['🚫','Never leave marked paths — lava rock is unstable']] },
  hotSprings:     { label:'♨️ Hot Springs Extras', tip:'♨️ Hot spring tips: Some springs are too hot to swim in — always check! The minerals make the water different colors. The smell can be like rotten eggs — that\'s sulfur!', items:[['🩱','Swimsuit (if swimming is allowed)'],['🏊','Towel'],['👟','Water shoes (mineral deposits are sharp)'],['👃','It might smell like eggs — totally normal!'],['💧','Drink lots of water — minerals make you sweaty'],['📸','Camera — colors are wild']] },
  geyser:         { label:'💦 Geyser Extras', tip:'💦 Geyser tips: Geysers erupt on a schedule! Old Faithful erupts every 90 minutes. They shoot boiling water 100+ feet! Stay behind the railing — the ground around them is HOT and thin!', items:[['⏰','Arrive early to get a good spot for the eruption!'],['🚫','NEVER step off the boardwalk — ground is thin!'],['📸','Camera ready for the eruption!'],['🧥','You\'ll get misted — light jacket'],['⌚','Check the eruption schedule']] },
  swamp:          { label:'🐊 Swamp Extras', tip:'🌿 Swamp tips: Swamps are FULL of life — alligators, frogs, birds, and bugs! Wear long everything. Move slowly and quietly to see the most animals!', items:[['🦟','Bug spray (heavy duty!)'],['🧥','Long sleeves'],['🧦','Tall socks (tuck pants in)'],['🥾','Waterproof boots'],['🤧','Allergy medicine'],['📸','Camera — wildlife everywhere!'],['🔦','Flashlight for dark areas']] },
  rainforest:     { label:'🌴 Rainforest Extras', tip:'🌴 Rainforest tips: It rains EVERY DAY in a rainforest! Half of all Earth\'s species live there. You\'ll hear SO many sounds. The canopy above is like another world!', items:[['☔','Lightweight rain jacket (it WILL rain)'],['🦟','Strong bug spray (tropical insects!)'],['🥾','Waterproof boots (ground is always wet)'],['💧','Water (humidity makes you thirsty)'],['📸','Camera — incredible wildlife!'],['🚫','Don\'t touch anything — some plants have toxins']] },
  fossilSite:     { label:'🦕 Fossil Site Extras', tip:'🦕 Fossil tips: Real fossils are millions of years old! You might find shells, leaves, or even bones. Always ask before picking anything up — some fossils are protected!', items:[['🥾','Sturdy boots for rocky terrain'],['🧤','Gloves for digging'],['📓','Fossil identification book/app'],['🔍','Magnifying glass'],['🪣','Small brush for cleaning finds'],['🚫','Check rules about taking fossils home']] },
  canyon:         { label:'🏔️ Canyon Extras', tip:'🏞️ Canyon tips: Looking down is VERY scary but beautiful! Stay far from the edge. Canyons echo — say something and hear it bounce back! The layers of rock show millions of years of history.', items:[['🥾','Hiking boots (uneven rocky trails)'],['💧','Extra water (hiking canyons is HOT)'],['🧴','Lots of sunscreen'],['🧢','Hat'],['📸','Camera — views are incredible'],['🚫','NEVER lean over the edge']] },
  glacier:        { label:'🧊 Glacier Extras', tip:'🧊 Glacier tips: Glaciers move VERY slowly — about a foot per day! The ice looks blue because it\'s so dense it absorbs red light. Do NOT step off marked paths — ice cracks!', items:[['🧥','Very warm layers — glaciers are freezing!'],['🥾','Waterproof insulated boots'],['🧤','Warm gloves'],['🕶️','Sunglasses (ice reflects sun strongly!)'],['🧴','Sunscreen (UV reflects off ice!)'],['🚫','Never leave marked paths']] },
  arboretum:      { label:'🌳 Arboretum Extras', tip:'🌳 Arboretum tips: An arboretum is a garden of TREES from all over the world! Each tree has a sign with its name and country. The oldest trees can be hundreds of years old!', items:[['🤧','Allergy medicine (pollen everywhere!)'],['📸','Camera — beautiful trees'],['👟','Comfy walking shoes (lots of paths)'],['📓','Sketch book to draw trees'],['🔍','Look for the oldest tree on the map!']] },
  prairie:        { label:'🌾 Prairie Extras', tip:'🌾 Prairie tips: Prairies once covered a third of North America! The grass can be taller than a person. Prairie wind is constant — hold onto your hat! Look for bison, prairie dogs, and hawks!', items:[['🧢','Hat (constant wind)'],['🧴','Sunscreen (zero shade)'],['💧','Lots of water'],['🔭','Binoculars for spotting animals'],['🦟','Bug spray'],['📸','Camera for big sky photos']] },
  saltFlats:      { label:'🤍 Salt Flats Extras', tip:'🌊 Salt flat tips: Salt flats look like a frozen ocean! They\'re blindingly white and reflect the sky like a mirror. The ground crunches when you walk. Wear old shoes — salt ruins them!', items:[['🕶️','Very dark sunglasses (SUPER bright!)'],['🧴','Lots of sunscreen (reflects off salt!)'],['👟','Old shoes (salt ruins footwear)'],['💧','Lots of water (very hot & dry)'],['📸','Camera — amazing mirror effect photos!']] },
  sandDunes:      { label:'🏖️ Sand Dune Extras', tip:'🏜️ Dune tips: Climbing dunes is exhausting — 3 steps up = 1 step slides back! Sliding down is amazing. Sand gets EVERYWHERE — even in food!', items:[['👟','Shoes that close tightly (sand inside shoes is miserable)'],['🧥','Long sleeves (sand = natural sandpaper)'],['🕶️','Goggles or sunglasses (wind blows sand)'],['🧴','Sunscreen'],['🛍️','Bag that zips tight (sand gets into everything!)']] },
  meadow:         { label:'🌸 Wildflower Meadow Extras', tip:'🌸 Meadow tips: Never pick wildflowers — it stops them seeding for next year! Meadows are FULL of pollinators. Lie in the grass and look up — you\'ll see butterflies, bees, and birds above!', items:[['🤧','Allergy medicine (pollen central!)'],['🧴','Sunscreen'],['📸','Camera for macro flower shots'],['🔍','Magnifying glass for tiny bugs'],['🧺','Picnic blanket to lie on']] },
  snowyMountain:  { label:'⛷️ Snowy Mountain Extras', tip:'⛄ Snow tips: Always ski or sled with a buddy! Snow is heavier than it looks — don\'t stand under snow-loaded branches! Hot chocolate at the lodge is MANDATORY.', items:[['🧥','Full snow gear: jacket + pants'],['🧤','Waterproof gloves'],['🥾','Snow boots'],['🧣','Scarf or neck warmer'],['🕶️','Ski goggles or sunglasses (snow blindness!)'],['🧦','TWO pairs of socks'],['🌡️','Hand & toe warmers']] },
  // More Animals
  insectarium:    { label:'🪲 Insect Museum Extras', tip:'🐛 Insect tips: There are 10 QUINTILLION insects on Earth! Some exhibits have live insects you can hold. Don\'t squish anything — bugs are amazing!', items:[['🤧','Allergy medicine just in case'],['📸','Camera for close-up bug shots'],['🔍','Magnifying glass'],['😮','Be brave — try holding a bug!'],['📓','Notebook to draw favorite bugs']] },
  dolphinCenter:  { label:'🐬 Dolphin Center Extras', tip:'🐬 Dolphin tips: Dolphins are as smart as 3-year-old humans! They have names for each other (signature whistles). You might get to touch or even swim with them!', items:[['🩱','Swimsuit (if interaction is planned)'],['🏊','Towel'],['📸','Waterproof camera case'],['🧴','Sunscreen'],['😮','Get ready to be amazed by their intelligence!']] },
  wolfSanctuary:  { label:'🐺 Wolf Sanctuary Extras', tip:'🐺 Wolf tips: Wolves are NOT dangerous at sanctuaries — they\'re rescues that can\'t survive in wild. They communicate through howling. If you howl, they might howl back!', items:[['🤫','Calm quiet voice'],['📸','Camera with zoom (wolves keep distance)'],['📓','Note their pack behavior — who\'s the leader?'],['🐾','Look for paw prints in the mud!']] },
  bigCat:         { label:'🐆 Big Cat Extras', tip:'🐆 Big cat tips: Big cats are NEVER safe to pet even at sanctuaries — their claws are razor sharp! But they\'re incredible to observe. Cheetahs can go 0 to 60 mph in 3 seconds!', items:[['📸','Camera with ZOOM — stay at distance'],['🤫','No sudden loud movements'],['🚫','NEVER put hands through fences'],['📓','Spot the differences between leopard and cheetah spots!']] },
  owlCenter:      { label:'🦉 Owl Extras', tip:'🦉 Owl tips: Owls can rotate their head 270°! They fly silently because of special feathers. You might get a bird to land on your glove during a falconry demo!', items:[['🧤','Ask about falconry gloves — they\'re heavy!'],['🤫','VERY quiet — owls have sensitive hearing'],['📸','Camera — owls are majestic'],['📓','Learn which owl calls mean what'],['🌙','Owls are usually more active in evening']] },
  turtleSanctuary:{ label:'🐢 Turtle Sanctuary Extras', tip:'🐢 Turtle tips: Sea turtles are ancient — they outlived dinosaurs! They can hold their breath for 7 hours. Never pick them up by the shell — it hurts them!', items:[['🧴','Sunscreen (outdoor sanctuary)'],['📸','Camera — turtles are gorgeous'],['🚫','Never pick up turtles without permission'],['👀','Look for baby turtles — they\'re tiny!'],['🏊','Ask if you can see turtles swimming']] },
  alligatorFarm:  { label:'🐊 Alligator Farm Extras', tip:'🐊 Gator tips: Alligators can run 35 mph for short distances — NEVER get close! They look slow but they\'re lightning fast. Their bite is the strongest of any animal!', items:[['🚫','NEVER lean over or reach toward alligators — EVER'],['📸','Camera with ZOOM'],['👀','Count how many you can spot — some hide underwater!'],['🤯','Ask: How old are the oldest alligators here?']] },
  catCafe:        { label:'🐱 Cat Café Extras', tip:'🐱 Cat café tips: Cats choose YOU — never chase them! Move slowly, let them sniff your hand, and wait for them to come over. These cats need forever homes!', items:[['🤧','Allergy medicine (CAT HAIR everywhere!)'],['🧴','Hand sanitizer before & after'],['💰','Buy a drink — that\'s how the café supports the cats'],['😊','Let cats come to you — don\'t chase them'],['📸','Camera for cute cat shots']] },
  animalShelter:  { label:'🐕 Animal Shelter Extras', tip:'🐾 Shelter tips: These animals need love! Speak softly and move gently — many have had tough lives. You might be the best part of their day! Shelters desperately need volunteers.', items:[['🤧','Allergy medicine (fur everywhere!)'],['🧴','Hand sanitizer'],['🤫','Calm soft voice'],['💙','Bring a big heart — these animals need kindness!'],['🚫','Ask before approaching any cage or kennel']] },
  veterinary:     { label:'🩺 Vet Clinic Extras', tip:'🐾 Vet tips: Vets go to school for 8+ years! They treat animals from tiny hamsters to giant horses. You might see X-rays, surgeries, or dental cleanings on animals!', items:[['🤧','Allergy medicine (all kinds of animal hair)'],['🧴','Hand sanitizer'],['📓','Notebook for medical facts'],['🤔','Ask: What\'s the funniest thing you\'ve ever treated?'],['🐾','Ask what animals you\'ll get to see today']] },
  bearSanctuary:  { label:'🐻 Bear Sanctuary Extras', tip:'🐻 Bear tips: Bears can smell food from 20 miles away! Never bring food near bear exhibits. Black bears and grizzlies are VERY different — learn to tell them apart!', items:[['🚫','NO food near bear areas — ever!'],['📸','Camera with zoom — stay at safe distance'],['📓','Learn bear vs. grizzly differences'],['🐻','Watch their foraging behavior — it\'s fascinating!']] },
  penguinCenter:  { label:'🐧 Penguin Center Extras', tip:'🐧 Penguin tips: Penguins are VERY loud! They\'re also surprisingly fast swimmers — up to 25 mph underwater. The waddle on land hides how graceful they are in water!', items:[['🧥','Jacket — penguin habitats are kept very cold!'],['📸','Camera — penguins are hilarious'],['🤫','They\'re loud but sensitive to sudden noise'],['👀','Watch their underwater swimming — incredible!']] },
  sealCenter:     { label:'🦭 Seal Center Extras', tip:'🦭 Seal tips: Seals and sea lions are different — sea lions have ear flaps and can walk on flippers! They bark constantly and love performing. Their whiskers feel vibrations in water!', items:[['🧴','Sunscreen (outdoor exhibits)'],['📸','Camera — seals are playful'],['💧','Water — outdoor & sunny'],['👂','They\'re LOUD — you\'ve been warned!']] },
  elephantSanctuary:{ label:'🐘 Elephant Extras', tip:'🐘 Elephant tips: Elephants never forget — really! They remember people for decades. They mourn their dead and feel joy and sadness. You might get to feed them!', items:[['📸','Camera — elephants are majestic'],['🥕','Ask if you can bring fruits/veggies to feed them!'],['🤫','Calm voice — they\'re sensitive to emotion'],['💧','Water — you\'ll be outside a lot'],['👀','Watch how they use their trunk — it has 40,000 muscles!']] },
  batCave:        { label:'🦇 Bat Cave Extras', tip:'🦇 Bat tips: Bats eat 1,000 mosquitoes per hour — they\'re heroes! They navigate by sonar (echolocation). Some bat caves have MILLIONS of bats flying out at dusk — it looks like a tornado!', items:[['🔦','Headlamp or flashlight'],['🧥','Jacket — caves are cold & damp'],['🤫','Very quiet — sound echoes everywhere'],['⏰','Arrive at dusk to see the bats fly out — INCREDIBLE!'],['🚫','Never touch bats — disease risk']] },
  antFarm:        { label:'🐜 Ant Exhibit Extras', tip:'🐜 Ant tips: Ants can carry 50x their own weight! A colony has up to 500 million ants. The queen can live 30 years! Watch them farm fungus, carry leaves, and build tunnels — it\'s mesmerizing!', items:[['🔍','Magnifying glass'],['📓','Sketch their tunnel system'],['📸','Camera for close-ups'],['🕰️','Watch for 10 minutes straight — you\'ll see amazing things']] },
  ostrichFarm:    { label:'🦤 Ostrich Farm Extras', tip:'🦤 Ostrich tips: Ostriches are the BIGGEST birds and fastest runners on land — 45 mph! Their eyes are bigger than their brain! They can kick hard enough to kill a lion — stay back!', items:[['🚫','Never get close to ostriches — dangerous kicks!'],['📸','Camera with ZOOM'],['👀','Watch their weird running style — hilarious!'],['🥚','Ask to see/hold an ostrich egg — they\'re HUGE!']] },
  // History & Culture
  dinosaurMuseum: { label:'🦕 Dinosaur Museum Extras', tip:'🦕 Dino tips: Real dinosaur fossils took millions of years to form! T-Rex had arms too tiny to reach its own mouth. Birds are literally living dinosaurs!', items:[['📓','Dino notebook'],['📸','Camera for skeleton photos'],['🤔','Ask: Which dino was the smartest?'],['👀','Find every dinosaur on the floor map!'],['🦕','Spot the difference between real bones and casts']] },
  childrenMuseum: { label:'🎪 Children\'s Museum Extras', tip:'🎉 Children\'s museum tips: TOUCH EVERYTHING — that\'s literally what it\'s for! There are usually shows, building stations, water tables, and fake cities. Run between activities!', items:[['👟','Sneakers you can run in'],['👕','Clothes that can get wet or dirty'],['📸','Camera'],['💰','Quarters for special activities sometimes'],['🤩','Try EVERY single station!']] },
  aviationMuseum: { label:'✈️ Aviation Museum Extras', tip:'✈️ Aviation tips: The first airplane flew only 120 feet — shorter than a Boeing 747! Some museums let you sit in cockpits. Ask what the oldest plane there is!', items:[['📸','Camera — planes are amazing up close'],['📓','Notebook for cool airplane facts'],['👀','Can you find a WWII plane?'],['🤔','Ask: How do planes actually fly? (lift!)'],['🚀','Look for rockets and space planes too!']] },
  maritimeMuseum: { label:'⚓ Maritime Museum Extras', tip:'⚓ Maritime tips: Old ships were made of wood and had NO GPS — sailors used stars and math! Some museums have real ships you can board. The anchor of a big ship weighs 30,000 pounds!', items:[['📸','Camera — old ships are incredible'],['👟','Comfy shoes (ships have uneven decks)'],['📓','Notes on navigation tools'],['⚓','Ask: How did sailors know where they were before GPS?']] },
  livingHistory:  { label:'🏡 Living History Extras', tip:'⏰ Living history tips: People dress and act like they\'re in a different time period! They cook on open fires, make things by hand, and talk like it\'s 200 years ago. Ask them "modern" questions!', items:[['📓','Journal to write what you see'],['📸','Camera for costume photos'],['🤔','Ask them questions — they\'ll answer in character!'],['👀','Spot things they don\'t have that we do (electricity, phones!)']] },
  nativeAmerican: { label:'🪶 Native Culture Extras', tip:'🪶 Native culture tips: Hundreds of different Native American nations each have unique languages, art, and traditions. This history is thousands of years old — treat everything with deep respect!', items:[['🤫','Respectful quiet listening'],['📓','Notes on different nations\' traditions'],['📸','Ask before photographing sacred items'],['💙','Approach with curiosity and respect'],['🛍️','Support native artists by buying their crafts']] },
  medievalCastle: { label:'🏰 Castle Extras', tip:'🏰 Castle tips: Castle walls could be 30 feet thick! Knights in full armor weighed 60+ extra pounds. Castles had no central heating — everyone was cold! Ask about the dungeon!', items:[['🥾','Good walking shoes for uneven stone floors'],['📸','Camera — castles are epic'],['📓','Notes on castle parts (turret, moat, drawbridge)'],['⚔️','Ask to try on any armor replicas!'],['👀','Find where the archers shot arrows from']] },
  ghostTown:      { label:'👻 Ghost Town Extras', tip:'👻 Ghost town tips: Ghost towns were abandoned when mines ran out or the railroad moved. Some were abandoned so fast that meals were left on tables! They\'re like time capsules!', items:[['🥾','Good boots (uneven ground, old boards)'],['📸','Camera — spooky and beautiful'],['🔦','Flashlight for dark buildings'],['🚫','Don\'t enter unsafe buildings'],['👻','Look for clues about who lived there!']] },
  pioneerVillage: { label:'🪓 Pioneer Village Extras', tip:'🤠 Pioneer tips: Pioneers walked 2,000 miles to settle the West! They made everything themselves — clothes, food, tools. Life was incredibly hard but they were incredibly tough!', items:[['📸','Camera for log cabin photos'],['📓','Notes on pioneer tools and jobs'],['🤔','Ask: What would you miss most from today\'s world?'],['👀','Can you churn butter or dip candles?']] },
  civilRights:    { label:'✊ Civil Rights Museum Extras', tip:'✊ Civil rights tips: The Civil Rights Movement changed America forever. The people who fought for equal rights were brave beyond belief. History is something we ALL share and learn from.', items:[['📓','Notes on important figures and dates'],['💙','Come with respect and an open heart'],['🤔','Think: What can YOU do to make things more fair?'],['📸','Ask which areas allow photos']] },
  warMuseum:      { label:'🎖️ Military Museum Extras', tip:'🎖️ Military tips: War museums teach us about sacrifice and bravery. Veterans who fought are heroes. Learn about the technology, history, and human stories behind each conflict.', items:[['🤫','Respectful quiet voice'],['📓','Notebook for history notes'],['📸','Ask before photographing specific items'],['💙','If veterans are present, thank them'],['👀','Find the oldest weapon on display']] },
  japaneseGarden: { label:'⛩️ Japanese Garden Extras', tip:'🌸 Garden tips: Japanese gardens are designed to look like nature but are COMPLETELY planned — every rock and plant has a meaning. Raking gravel gardens is like meditation!', items:[['🤫','Very quiet — gardens are peaceful places'],['📸','Camera — stunning at every angle'],['👟','Soft-soled quiet shoes'],['🤧','Allergy medicine (cherry blossoms!)'],['🍵','Try the tea if they offer it!']] },
  culturalCenter: { label:'🌍 Cultural Center Extras', tip:'🌎 Cultural tips: Every culture has food, music, dance, and art that\'s totally unique! Keep an open mind — something might look or smell unfamiliar but is treasured by millions of people!', items:[['💙','Open heart and curious mind'],['📓','Notes on traditions you didn\'t know about'],['📸','Ask about photo rules'],['🍽️','Try any food samples offered!'],['🛍️','Support the culture by buying handmade items']] },
  waxMuseum:      { label:'🏛️ Wax Museum Extras', tip:'🏛️ Wax tips: Wax figures take 6+ months to make! Each hair is inserted individually. Stand next to famous people, athletes, and world leaders and take hilarious photos!', items:[['📸','Camera — photo opportunities are AMAZING'],['😁','Practice your celebrity poses'],['👀','Try to find the one that looks most real!'],['🤣','Take the funniest photo you can with each figure']] },
  // Science Labs
  weatherStation: { label:'🌡️ Weather Station Extras', tip:'🌡️ Weather tips: Meteorologists use huge computers running millions of calculations! The equipment measures wind, rain, pressure, and more every few seconds. This is where forecasts are born!', items:[['📓','Notebook for weather instrument names'],['🤔','Ask: How accurate are 10-day forecasts?'],['📸','Camera for the cool equipment'],['👀','Watch live radar data if they show it']] },
  archaeologicalDig:{ label:'⛏️ Dig Site Extras', tip:'🦴 Dig tips: Real archaeologists work in tiny squares with brushes and toothpicks! They photograph everything before moving it. Finding one potsherd can take all day — patience is key!', items:[['🥾','Boots for rough terrain'],['🧤','Digging gloves'],['🖌️','Soft brush for cleaning finds'],['🔍','Magnifying glass'],['📓','Field notebook for sketching finds'],['☀️','Lots of sunscreen — dig sites have zero shade']] },
  robotLab:       { label:'🤖 Robot Lab Extras', tip:'🤖 Robot tips: Robots are programmed with step-by-step instructions — just like following a recipe! Some robots learn on their own using AI. You might get to program one yourself!', items:[['📓','Notebook for coding concepts'],['🤔','Ask: What\'s the hardest thing to teach a robot?'],['📸','Camera for robot photos'],['💻','You might get to code something — bring your thinking brain!']] },
  tvStudio:       { label:'📺 TV Studio Extras', tip:'📺 Studio tips: Everything you see on TV is fake in some way — sets are much smaller than they look! You might stand behind a news anchor\'s desk or see the weather green screen!', items:[['📸','Camera — you might be on TV!'],['👔','Nice clothes in case you\'re filmed'],['🎬','Ask to stand in front of the green screen'],['📓','Notes on how TV is actually made'],['👀','Spot the cameras, lights, and microphones']] },
  radioStation:   { label:'📻 Radio Station Extras', tip:'📻 Radio tips: DJs talk over music, manage call-ins, AND watch 10 screens at once — all live! If you go into the booth, you\'ll see how complicated it actually is!', items:[['🎙️','You might get to talk into a mic!'],['🤫','Dead quiet in the recording room'],['📓','Notes on how radio waves travel'],['🤔','Ask: What happens if a DJ says the wrong thing live?'],['🎵','Ask what the most requested song of all time is']] },
  recordingStudio:{ label:'🎙️ Recording Studio Extras', tip:'🎙️ Studio tips: A "perfect" 3-minute song can take 200+ takes to record! The soundproofing makes studios the quietest places on Earth. You might get to hear your voice recorded!', items:[['🤫','Extremely quiet in all booths'],['📸','Camera (ask first)'],['🎤','Ask if you can say something into the microphone!'],['👂','Listen for how different the recorded voice sounds'],['🎵','Ask: How long does an album usually take to make?']] },
  gemMine:        { label:'💎 Gem Mining Extras', tip:'💎 Mining tips: Real gems are hidden in gravel! You\'ll sift through sand and water to find actual gemstones. Everything you find you get to keep! Rubies, garnets, and sapphires are common!', items:[['👟','Old shoes — you\'ll get wet!'],['💧','Water shoes or waterproof boots'],['🧴','Sunscreen (usually outdoor)'],['🛍️','Bag to bring home your gems'],['🔍','Magnifying glass to inspect finds'],['📗','Gem identification guide']] },
  goldPanning:    { label:'⛏️ Gold Panning Extras', tip:'⛏️ Gold tips: Gold is HEAVY — that\'s how you find it! Swirl the pan, let the heavy gold sink, and the sand washes away. Even tiny flakes are real gold! The Gold Rush changed America!', items:[['👟','Waterproof shoes — hands in water the whole time!'],['🧤','Waterproof gloves (water is cold)'],['🛍️','Tiny vial to collect your gold flakes!'],['💪','Your arms will get tired — swirling is hard work'],['🤯','Ask: How much gold is left in rivers today?']] },
  newspaper:      { label:'📰 Newspaper Extras', tip:'📰 Newspaper tips: A daily newspaper makes thousands of decisions every day — what goes on page 1? How big is the headline? Printing presses are HUGE and incredibly fast!', items:[['🔇','Printing presses are VERY loud — ear protection!'],['📸','Camera for the presses (they\'re massive!)'],['📓','Write your own headline for today\'s weather!'],['🖊️','Ask: How do reporters find their stories?']] },
  // Food & Making Things
  chocolateFactory:{ label:'🍫 Chocolate Factory Extras', tip:'🍫 Choc tips: Chocolate comes from cacao beans that grow in tropical pods! It takes 400 beans to make one pound of chocolate. The smell inside a chocolate factory is INCREDIBLE!', items:[['🤤','Empty stomach — samples are coming!'],['👟','Closed-toe shoes (safety)'],['🧥','Chocolate stains — wear old clothes just in case'],['📸','Camera for the machines'],['🍫','Bring a bag for chocolate purchases!']] },
  iceCreamFactory:{ label:'🍦 Ice Cream Factory Extras', tip:'🍦 Ice cream tips: Ice cream needs to be churned to add air — without air it\'s just frozen cream! Ben & Jerry\'s rejects ice cream go to pig farms. You\'ll probably get to taste test!', items:[['🤤','Hunger level: MAXIMUM'],['👟','Closed-toe shoes'],['📸','Camera'],['🧊','Watch the flash-freezing process — -300°F!'],['🍦','Ask what the weirdest flavor they ever made was!']] },
  candyFactory:   { label:'🍬 Candy Factory Extras', tip:'🍬 Candy tips: Jelly beans take 7-21 DAYS to make! Every candy is a chemistry experiment. Gummy bears are made with gelatin from animal bones — crazy but true!', items:[['🤤','Come hungry for samples!'],['📸','Camera for colorful machines'],['🧴','The sugar smell is intense — maybe not if you have headaches'],['🦷','Brush your teeth after the samples! 😄'],['🛍️','Bag for candy purchases']] },
  toyFactory:     { label:'🧸 Toy Factory Extras', tip:'🧸 Toy tips: Toy designers are called "toy inventors" and they test toys by playing with them for their job! Toys go through hundreds of safety tests before kids can play with them!', items:[['📸','Camera — toy machines are colorful!'],['📓','Notes on how your favorite toy type is made'],['🤔','Ask: What was the first toy ever tested here?'],['🧸','You might get to test an unreleased toy!']] },
  pottery:        { label:'🏺 Pottery Extras', tip:'🏺 Pottery tips: The pottery wheel spins incredibly fast — you\'ll get clay on everything! Your hands will be covered. Even bad pottery is beautiful because YOU made it!', items:[['👕','VERY old clothes — clay stains forever'],['👟','Old shoes'],['💍','Remove rings and bracelets'],['📸','Take photos before and after!'],['🤲','Wash hands thoroughly after — clay dries them out']] },
  glassblowing:   { label:'🫧 Glassblowing Extras', tip:'🫧 Glass tips: Glass is made from SAND! It\'s heated to 2,000°F to melt. Glassblowers spin the pipe constantly or the glass sags. The glowing orb of hot glass is hypnotizing!', items:[['🔥','Stay behind safety barriers — glass is 2,000°F!'],['🕶️','Eye protection might be provided'],['📸','Camera — glowing glass is beautiful'],['🤔','Ask: How long did it take to learn this?'],['🛍️','Handmade glass art pieces for sale!']] },
  cookingClass:   { label:'👨‍🍳 Cooking Class Extras', tip:'🍳 Cooking tips: Chefs say "mise en place" — everything in its place! Prep all ingredients before you start cooking. Always wash your hands before touching food!', items:[['👕','Apron or old clothes (food splatters!)'],['🫧','Hair tie if you have long hair'],['🧴','Hand sanitizer before starting'],['📓','Recipe notebook to write down what you make'],['🤤','Come hungry — you\'ll eat what you cook!']] },
  printing:       { label:'📰 Printing Press Extras', tip:'📰 Press tips: Gutenberg\'s printing press from 1440 changed the world! Before it, books were copied by hand for years each. Modern presses can print 3 million pages per hour!', items:[['🔇','Presses are VERY loud!'],['👟','Closed-toe shoes (heavy machinery nearby)'],['📸','Camera — giant rolls of paper are cool'],['📓','Notes on how ink and plates work'],['🖨️','Ask if you can take home a printed sample!']] },
  soapMaking:     { label:'🧼 Soap & Candle Extras', tip:'🧼 Soap tips: Soap works by surrounding dirt with molecules that attract both water and oil — then water washes it all away! Candles have been made since ancient Egypt. You\'ll get to make your own!', items:[['👕','Old clothes (dyes stain)'],['👟','Closed-toe shoes (hot wax risk)'],['📸','Camera for colorful soaps & candles'],['🛍️','Extra bag to carry home your creations!'],['🧼','Your handmade soap will last months!']] },
  // Energy & Environment
  solarFarm:      { label:'☀️ Solar Farm Extras', tip:'☀️ Solar tips: One solar panel can power a TV for a year! Solar farms can cover hundreds of acres. The panels track the sun automatically — they rotate all day!', items:[['🕶️','Sunglasses — panels reflect bright light!'],['🧴','Sunscreen'],['📸','Camera — rows of panels look amazing from above'],['📓','Notes on how solar works'],['🤔','Ask: How many homes does this farm power?']] },
  windFarm:       { label:'💨 Wind Farm Extras', tip:'💨 Wind tips: Wind turbine blades are longer than a 747\'s wingspan! They spin slowly but the tips move at 200 mph! You can stand UNDER one — they\'re way bigger than you\'d think!', items:[['🧥','Jacket — wind farms are WINDY!'],['🧢','Secure hat'],['📸','Camera — turbines are massive'],['📓','Notes on how turbines generate electricity'],['🤔','Ask: How strong does wind need to be to make power?']] },
  waterTreatment: { label:'💧 Water Treatment Extras', tip:'💧 Water tips: The water you drink was once wastewater! It goes through 6 stages of cleaning and emerges perfectly clean. Your tap water travels miles through underground pipes!', items:[['👟','Closed-toe shoes (safety)'],['🤧','It might smell in some areas'],['📓','Notes on each cleaning stage'],['🤔','Ask: How long does the full cleaning take?'],['💧','Appreciate every glass of water after this!']] },
  dam:            { label:'🌊 Dam Extras', tip:'🌊 Dam tips: Dams can hold back millions of gallons of water! The power of falling water spins turbines that make electricity. The lake behind a dam is called a reservoir!', items:[['🥾','Good walking shoes'],['📸','Camera — dams are enormous and dramatic'],['💧','Extra water (outdoor walking tour)'],['🤔','Ask: How long did it take to build?'],['👀','Look for fish ladders that help salmon swim upstream!']] },
  foodBank:       { label:'🥫 Food Bank Extras', tip:'🥫 Food bank tips: Food banks sort millions of pounds of food! You\'ll probably get to help sort, pack, or organize. Even 2nd graders can make a real difference here!', items:[['👟','Comfortable work shoes'],['👕','Clothes you can work in'],['💙','Big heart and ready to help!'],['🧤','Work gloves for heavy lifting (if allowed)'],['💪','You might sort hundreds of cans today!']] },
  postOffice:     { label:'📬 Post Office Extras', tip:'📬 Post office tips: The USPS delivers to every address in America — even houses in the middle of nowhere! Letters travel across the country in 1-3 days. Zip codes were invented in 1963!', items:[['📸','Camera for the sorting machines — they\'re fast!'],['📓','Notes on how mail is sorted'],['✉️','Write and mail a postcard from the post office!'],['🤔','Ask: What\'s the weirdest thing that\'s been mailed?']] },
  courthouse:     { label:'⚖️ Courthouse Extras', tip:'⚖️ Courthouse tips: You might sit in the JURY box! Courtrooms have very strict rules — no phones, stand when the judge enters. Judges wear robes and use a gavel to call order!', items:[['👔','Nice clean clothes — it\'s a formal place'],['🤫','Professional quiet voice'],['📓','Notes on how trials work'],['📸','Usually no photos allowed inside'],['⚖️','Ask: What\'s the most interesting case ever tried here?']] },
  // Fun Spots
  trampolinePark: { label:'🦘 Trampoline Park Extras', tip:'🎉 Trampoline tips: Grip socks are REQUIRED — they\'re usually sold at the park. Bend your knees when landing! Trampolines burn calories like crazy — you\'ll be exhausted after 30 minutes!', items:[['🧦','Grip socks (park sells them but bring your own to save $$)'],['👕','Comfortable stretchy clothes'],['💧','Water — you\'ll sweat a LOT!'],['📱','Leave phone secured — it can fly out of pockets'],['💰','Extra money for games & food']] },
  escapeRoom:     { label:'🔐 Escape Room Extras', tip:'🔐 Escape tips: Talk to your team constantly — share EVERYTHING you find! Don\'t overthink it — first ideas are often right. The record for most rooms escaped in one day is 21!', items:[['🧠','Thinking brain FULLY charged'],['🤝','Team communication is key — share everything!'],['⏰','Pay attention to the timer'],['💡','Think outside the box — solutions are creative!'],['😂','It\'s okay if you don\'t escape — it\'s super hard!']] },
  rockClimbingGym:{ label:'🧗 Rock Climbing Extras', tip:'🧗 Climbing tips: Use your LEGS to push up, not your arms — arms tire out fast! Keep your hips close to the wall. Falling is safe with a harness — don\'t be afraid to fall!', items:[['👟','Sneakers or rent climbing shoes there'],['👖','Stretchy pants or shorts'],['💧','Water — climbing is exhausting'],['🧤','Chalk bag if you have one'],['💪','Your arms will be sore tomorrow — that\'s normal!']] },
  laserTag:       { label:'🔫 Laser Tag Extras', tip:'🎯 Laser tag tips: The secret is to stay low and move fast! Hide in corners to ambush people. Your vest lights up when you\'re tagged — protect your sensors! Team up with friends!', items:[['👟','Sneakers you can run in'],['👕','Dark clothes are harder to see!'],['💧','Water — it gets sweaty in there'],['💰','Extra tokens if you want more rounds'],['🏃','Be ready to run fast!']] },
  miniGolf:       { label:'⛳ Mini Golf Extras', tip:'⛳ Mini golf tips: Aim at the side walls if the shot is blocked — use bank shots! Soft gentle puts are almost always better than hard ones. The windmill hole requires timing!', items:[['👟','Any comfortable shoes'],['🧴','Sunscreen if outdoor course'],['💰','Usually pay per person per round'],['📸','Camera for funny hole-in-one celebrations!'],['🤝','Keep score honestly!']] },
  goKart:         { label:'🏎️ Go Kart Extras', tip:'🏎️ Kart tips: Brake BEFORE turns, accelerate OUT of them! Don\'t rear-end other karts — it slows both of you down. The indoor tracks are smaller but faster. Helmets are required!', items:[['🪖','Helmet provided — check it fits snugly'],['👟','Closed-toe shoes required'],['👕','Fitted clothes — nothing loose near wheels'],['💰','Often paid per session or per race'],['🏁','Practice your racing line — outside-inside-outside!']] },
  rollerSkating:  { label:'🛼 Roller Skating Extras', tip:'🛼 Skating tips: Bend your knees and lean forward slightly — that\'s the whole secret! Use the side walls when learning. Wrist guards save you from the most common injuries!', items:[['🧤','Wrist guards (most falls land on hands)'],['🧦','Thick comfortable socks'],['👕','Comfy clothes you can move in'],['💰','Rental skates cost extra usually'],['🎵','The music at rinks is always great — enjoy it!']] },
  archery:        { label:'🏹 Archery Extras', tip:'🏹 Archery tips: It\'s ALL about your stance and anchor point! Stand sideways, pull back to the same spot on your face every time. Releasing smoothly is everything!', items:[['👟','Closed-toe flat shoes'],['👕','Close-fitting sleeve on drawing arm'],['💪','Your arms will ache — archery uses weird muscles!'],['🎯','Focus on form, not the target at first'],['📸','Camera for action shots!']] },
  zipLine:        { label:'🪂 Zip Line Extras', tip:'🤩 Zip line tips: Keep your feet up and lean back slightly. The faster the line the more exhilarating! Ropes courses test balance, strength, and BRAVERY. You can do it!', items:[['👟','Closed-toe sneakers (required!)'],['👖','Long pants recommended'],['💪','Upper body strength helps for ropes courses'],['🚫','No loose items — everything can fall'],['💧','Water — outdoor & physical']] },
  arcadeCenter:   { label:'🕹️ Arcade Extras', tip:'🎮 Arcade tips: Skee-ball gives the most tickets for the least skill! Go for games where you can win jackpots — they pay out way more. Bring a cup to collect your tickets!', items:[['💰','Lots of quarters (or check if they have a card system)'],['📱','Phone for photos of high scores'],['🛍️','Bag for prize counter purchases'],['🎯','Scope out which games have the most tickets before playing!'],['🏆','Win enough for the prize YOU want!']] },
  vrCenter:       { label:'🥽 VR Center Extras', tip:'🥽 VR tips: VR can make some people dizzy at first — if you feel weird, take the headset off! The controllers track your hands so wave them around. You can literally be ANYWHERE!', items:[['👟','Sneakers (you\'ll be moving around a lot!)'],['💳','Usually charged per experience or hourly'],['😤','You might look silly flailing around — that\'s okay!'],['🤯','Pick the most extreme experience — you\'re safely on the ground!'],['📸','Someone should video you from outside!']] },
  waterPark:      { label:'💦 Water Park Extras', tip:'🌊 Water park tips: Apply sunscreen BEFORE putting on your swimsuit! Reapply every hour — water washes it off. Waterproof sandals are essential — hot pavement = burned feet!', items:[['🩱','Swimsuit that stays on (no loose fits for slides!)'],['🧴','SPF 50+ waterproof sunscreen'],['👟','Water sandals with straps'],['🏊','Two towels (one to use, one for backup)'],['🛍️','Waterproof bag for phone'],['💰','Locker rental for valuables'],['💧','Refillable water bottle']] },
  laserMaze:      { label:'🌀 Laser Maze Extras', tip:'🔴 Laser maze tips: Move S-L-O-W-L-Y! Contort your body through the beams — it\'s like yoga mixed with spy training! The fastest times belong to the most patient people!', items:[['👕','Flexible fitted clothes'],['👟','Grip socks or flat sneakers'],['⌚','Race the clock for your best time!'],['😂','You WILL set off the alarm — it\'s funny!'],['💪','Stretch before going in!']] },
  miniBowling:    { label:'🎳 Mini Bowling Extras', tip:'🎳 Mini bowling tips: A smaller lane means smaller balls and shorter distances! The pins still knock better with a smooth roll than a hard throw. Curve the ball toward the pins!', items:[['🧦','Non-slip socks (bowling alleys need them)'],['💰','Usually paid per game'],['🎳','Practice your approach before the game starts'],['📸','Celebrate every spare and strike!'],['🤝','High-five everyone regardless of score']] },
  // Creative Arts
  ballet:         { label:'🩰 Ballet Extras', tip:'🩰 Ballet tips: Ballet dancers train for 10+ years! Pointe shoes are extremely painful. The jumping and lifting requires incredible strength. You\'ll probably get to try some basic positions!', items:[['👟','Flexible flat shoes or ballet flats'],['👕','Stretchy comfortable clothes'],['📸','Camera for your plié photos!'],['🤔','Ask: How many hours do dancers practice a day?'],['🩰','Try the five positions — they\'re harder than they look!']] },
  danceStudio:    { label:'💃 Dance Studio Extras', tip:'💃 Dance tips: Every dance style uses different muscles! Hip-hop, ballet, salsa, and tap all have totally different techniques. You\'ll learn a move or two — dance is for EVERYONE!', items:[['👟','Flexible shoes or clean sneakers'],['👕','Stretchy clothes you can move in'],['💧','Water — dancing is a workout!'],['📸','Camera for action shots'],['😄','Don\'t be embarrassed — everyone looks silly at first!']] },
  sculptureGarden:{ label:'🗿 Sculpture Garden Extras', tip:'🗿 Sculpture tips: Outdoor sculptures change with the seasons — snow, rain, and sun create different moods! Some sculptures are interactive. Art doesn\'t have to make sense to be beautiful!', items:[['👟','Comfy walking shoes'],['🧴','Sunscreen (outdoor and sunny)'],['📸','Camera — sculptures photograph amazingly'],['📓','Sketch your favorite piece'],['🤔','Ask: What is this sculpture ABOUT? There\'s no wrong answer!']] },
  ceramicsStudio: { label:'🏺 Ceramics Extras', tip:'🎨 Ceramics tips: Clay feels amazing! Hand-building lets you make anything — pinch pots, coil pots, slab buildings. Your piece needs to DRY then FIRE in a kiln at 2200°F to become permanent!', items:[['👕','VERY old clothes — clay stains everything'],['💍','Remove ALL jewelry — clay ruins it'],['👟','Old shoes'],['📸','Photos BEFORE and AFTER — it shrinks in the kiln!'],['🎁','Your creation gets mailed to you after firing!']] },
  musicClass:     { label:'🎸 Music Studio Extras', tip:'🎵 Music tips: You\'ll probably try multiple instruments! Guitars, drums, keyboards, and more. Don\'t worry about sounding perfect — everyone starts somewhere. Music is just organized sound!', items:[['📸','Camera for your rock star moment!'],['🎵','Which instrument have you always wanted to try?'],['📓','Notes on music theory basics'],['🎸','Ask to try the instrument you\'re most curious about!'],['🤘','Have FUN — music is supposed to be joyful']] },
  puppetShow:     { label:'🪆 Puppet Show Extras', tip:'🎭 Puppet tips: Puppeteers are amazing performers — they act, do voices, AND move puppets all at once! You might get to try controlling a puppet yourself backstage!', items:[['📸','Camera for show photos'],['🤫','Quiet during the performance'],['😂','Laugh at all the jokes — performers can hear you!'],['🎭','Ask if you can see backstage after'],['🪆','Watch how the puppeteer makes the puppet seem alive']] },
  magicShow:      { label:'🪄 Magic Show Extras', tip:'🪄 Magic tips: The secret to every magic trick is MISDIRECTION — the magician makes you look where they want! Don\'t try to look for the trick too hard — just enjoy the magic!', items:[['📸','Camera (no spoilers!)'],['😮','Practice your amazed face'],['🙋','Volunteer to be the assistant if asked — it\'s the best!'],['🪄','Try to figure out ONE trick — it\'s okay if you can\'t!'],['👏','Applaud enthusiastically — magicians love it']] },
  // School Trips
  collegeTour:    { label:'🎓 College Tour Extras', tip:'🎓 College tips: College campuses are HUGE — some are like small cities! Students live there and go to classes all day. This could be YOUR school someday! Ask students what their favorite class is!', items:[['👟','Comfy walking shoes — campuses are huge!'],['💧','Water bottle'],['📓','Notes on majors and cool programs'],['📸','Camera for the buildings'],['🤔','Ask a student: What\'s the hardest part of college?'],['🎓','Start thinking about what you want to study!']] },
  anotherSchool:  { label:'🏫 School Visit Extras', tip:'🏫 Other school tips: Every school does things a little differently! Different schedules, mascots, and traditions. You might find something you wish YOUR school had!', items:[['📓','Notebook to write down cool differences'],['😊','Be friendly — introduce yourself to students there'],['👀','Spot 5 things different from your school'],['📸','Camera if allowed'],['🤔','Ask: What do you love most about your school?']] },
  highSchool:     { label:'🏢 High School Visit Extras', tip:'🏢 High school tips: High school has LOTS more classes to choose from — art, cooking, engineering, and more! Lockers, different teachers for each class, and clubs for everything!', items:[['📓','Notes on cool elective classes you want to take someday'],['😮','High schoolers seem really grown up — that\'ll be you!'],['🤔','Ask: What clubs should I join when I get here?'],['👀','Find the gym, cafeteria, and your favorite-looking classroom']] },
  tradeSchool:    { label:'🔧 Trade School Extras', tip:'🔧 Trade tips: Plumbers, electricians, welders, and chefs all go to trade school! They can earn GREAT money and there\'s always work. Trades keep the whole world running!', items:[['👟','Closed-toe shoes — safety requirement'],['🧥','Old clothes (hands-on work!)'],['🧤','Safety gloves if provided'],['📸','Camera for the cool tools and machinery'],['🤔','Ask: How long until someone is ready for a real job?']] },
  schoolScienceLab:{ label:'🔬 Science Lab Extras', tip:'🔬 Lab tips: Real labs have VERY strict safety rules — for good reason! Chemicals can be dangerous. But you\'ll use real microscopes, pipettes, and maybe even Bunsen burners!', items:[['🥽','Safety goggles (usually provided)'],['🧤','Lab gloves if provided'],['🧥','Lab coat if provided'],['👟','Closed-toe shoes (REQUIRED in labs)'],['📓','Lab notebook for observations'],['🚫','Never touch anything without asking first']] },
  schoolPlay:     { label:'🎭 School Play Extras', tip:'🎭 Play tips: The performers rehearsed for WEEKS! Clap loud — they can hear you and it gives them energy. Live theater has mistakes sometimes and that\'s what makes it special!', items:[['📸','Camera (usually allowed at school plays!)'],['👏','Prepare your loudest applause'],['💐','Flowers for a performer if you know one!'],['🤫','Quiet during the performance'],['📓','Program as a keepsake']] },
  scienceFair:    { label:'🏆 Science Fair Extras', tip:'🏆 Fair tips: Every science fair project asks ONE question, then tests it! The judges aren\'t looking for the fanciest project — they want to see real scientific thinking. Explain YOUR idea!', items:[['📓','Notes on projects you find interesting'],['🤔','Ask presenters: What surprised you about your results?'],['📸','Camera for cool project photos'],['🏅','Vote for your favorite if there\'s a People\'s Choice!'],['💡','Get inspired for YOUR own project!']] },
  mathOlympiad:   { label:'🔢 Math Olympiad Extras', tip:'🔢 Math tips: Math competitions test creative problem-solving, not just memorizing! Some problems have MANY right ways to solve them. Stay calm, work neatly, show all your steps!', items:[['✏️','Sharpened pencils (2-3 extras!)'],['📐','Ruler and compass if allowed'],['💧','Water bottle'],['🍎','Light snack for brain fuel'],['😌','Stay calm — skip hard problems and come back to them'],['📓','Scratch paper for working out problems']] },
  spellingBee:    { label:'🐝 Spelling Bee Extras', tip:'🐝 Spelling tips: Always ask for the language of origin and a sentence — they\'re allowed and super helpful! Say the word BEFORE and AFTER spelling it. If you go blank, start over from the beginning!', items:[['✏️','Pencil to trace letters on your palm'],['💧','Water — your mouth gets dry from nerves!'],['😌','Deep breath before each word'],['📝','Ask for: definition, language of origin, use in a sentence'],['🏆','No matter what place — you made it here! That\'s amazing!']] },
  bookFair:       { label:'📚 Book Fair Extras', tip:'📚 Book fair tips: The Scholastic Book Fair visits millions of schools! You might find books, posters, puzzles, and cool accessories. Pick a book that\'s a LITTLE harder than your level to grow!', items:[['💰','Book fair money! (Ask parents ahead of time)'],['📋','Wishlist from home if parents gave you one'],['📚','Browse ALL the shelves before deciding'],['🤔','Ask a teacher: What\'s the best book here?'],['🛍️','Bag to carry your purchases']] },
  artShow:        { label:'🎨 Art Show Extras', tip:'🎨 Art show tips: Every piece of art took effort and courage to share! Tell the artist something specific you like — not just "that\'s good" but WHY you like it. Artists love specific compliments!', items:[['📸','Camera for your favorite pieces'],['💙','Kind specific compliments for artists'],['📓','Sketch your own inspired piece later'],['👀','Find the most unusual piece in the show'],['🤔','Ask an artist: What were you feeling when you made this?']] },
  sportsDay:      { label:'🏅 Field Day Extras', tip:'🏅 Field day tips: Field day is about FUN not just winning! Cheer for EVERYONE — your team AND the other teams. Drink water constantly — outdoor sports in the sun dehydrate you fast!', items:[['👟','Your best running sneakers'],['🧦','Comfortable athletic socks'],['👕','School spirit shirt or team color'],['💧','BIG water bottle — refill it constantly!'],['🧴','Sunscreen — you\'ll be outside all day!'],['🍎','Energy snack for between events'],['😊','Bring your sportsmanship — cheer for everyone!']] },
  imax:           { label:'🎬 IMAX Extras', tip:'🎬 IMAX tips: IMAX screens are 8 stories tall and the sound system has perfect surround sound. Sit in the middle rows — too close and you\'ll get a neck cramp from looking up! Space and nature films are INCREDIBLE in IMAX!', items:[['💺','Arrive early for center seats'],['🍿','Get popcorn — it\'s a movie tradition!'],['😮','Prepare to have your mind blown by the screen size'],['🔇','Phone on silent and face-down'],['👀','Look at the WHOLE screen — there\'s so much detail']] },
});

function renderFieldTrip(theme) {
  const groups = document.getElementById('fieldtrip-groups');
  const intro  = document.getElementById('fieldtrip-intro');
  const packed = document.getElementById('fieldtrip-packed');
  if (!currentTripType) { intro.textContent = '👆 Pick your trip type above first!'; groups.innerHTML = ''; return; }
  const weatherItems = FT_WEATHER[theme] || FT_WEATHER.cloudy;
  const tripExtra = FT_TRIP_EXTRAS[currentTripType] || { label:'🎒 Trip Extras', tip:'', items:[] };
  const themeLabel = theme.charAt(0).toUpperCase() + theme.slice(1).replace('-',' ');
  const allGroups = [
    { label: '✅ Always Bring', items: FT_ALWAYS },
    { label: `${MASCOTS[theme]||'🌤️'} For Today's ${themeLabel} Weather`, items: weatherItems },
    { label: tripExtra.label, items: tripExtra.items, tip: tripExtra.tip },
  ];
  intro.textContent = selectedSchool
    ? `🏫 ${selectedSchool} — tap each item to check it off!`
    : 'Tap each item to check it off your list!';
  groups.innerHTML = '';
  let totalItems = 0, checkedItems = 0;
  allGroups.forEach(group => {
    const div = document.createElement('div');
    div.className = 'fieldtrip-group';
    let tipHtml = group.tip ? `<div class="ft-farm-tip">${group.tip}</div>` : '';
    div.innerHTML = `<div class="fieldtrip-group-lbl">${group.label}</div>${tipHtml}<div class="fieldtrip-items"></div>`;
    const itemsEl = div.querySelector('.fieldtrip-items');
    group.items.forEach(([em, text]) => {
      totalItems++;
      const item = document.createElement('div');
      item.className = 'fieldtrip-item';
      item.innerHTML = `<div class="ft-checkbox"></div><div class="ft-icon">${em}</div><div class="ft-text">${text}</div>`;
      item.addEventListener('click', () => {
        const isChecked = item.classList.toggle('checked');
        item.querySelector('.ft-checkbox').textContent = isChecked ? '✓' : '';
        checkedItems += isChecked ? 1 : -1;
        packed.classList.toggle('hidden', checkedItems < totalItems);
      });
      itemsEl.appendChild(item);
    });
    groups.appendChild(div);
  });
  packed.classList.add('hidden');
}

// Trip type picker
document.querySelectorAll('.ft-trip-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ft-trip-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTripType = btn.dataset.trip;
    if (currentData) {
      const c = currentData.current;
      const [,,rawT] = wmo(c.weather_code);
      const now = new Date(), sr = new Date(currentData.daily.sunrise[0]), ss = new Date(currentData.daily.sunset[0]);
      const theme = (now < sr || now > ss) && rawT === 'sunny' ? 'clear-night' : rawT;
      renderFieldTrip(theme);
    } else {
      document.getElementById('fieldtrip-intro').textContent = 'Now search a city to see your full packing list!';
    }
  });
});
// Pre-select farm since that's Wes's trip!
document.querySelector('.ft-trip-btn[data-trip="farm"]').classList.add('active');

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
