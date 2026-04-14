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
  96: ['Storm + Hail',  '⛈️', 'stormy'],
  99: ['Storm + Hail',  '⛈️', 'stormy'],
};

// Animated mascot per theme
const MASCOTS = {
  sunny:        '😎',
  'clear-night':'🌙',
  cloudy:       '🙂',
  rainy:        '🌧️',
  snowy:        '⛄',
  stormy:       '😬',
  foggy:        '👻',
};

// Simple phrase in the header
const VIBES = {
  sunny:        "It's beautiful outside!",
  'clear-night':"The stars are out tonight!",
  cloudy:       "A bit cloudy today!",
  rainy:        "Grab your umbrella!",
  snowy:        "Snow day! ⛄",
  stormy:       "Stay safe inside!",
  foggy:        "Super foggy out there!",
};

// What to wear — arrays of emoji + label
const WEAR = {
  sunny:        [['👕','T-shirt'],['😎','Sunglasses'],['🧴','Sunscreen']],
  'clear-night':[['🧥','Jacket'],['🌟','Enjoy the stars!']],
  cloudy:       [['👕','T-shirt'],['🧥','Light jacket']],
  rainy:        [['☔','Umbrella'],['🥾','Rain boots'],['🧥','Rain jacket']],
  snowy:        [['🧤','Gloves'],['🧣','Scarf'],['🥾','Snow boots'],['🧥','Big coat']],
  stormy:       [['🏠','Stay inside'],['🕯️','Flashlight just in case']],
  foggy:        [['🧥','Jacket'],['👟','Good shoes']],
};

// Fun facts per theme
const FACTS = {
  sunny:        ['The Sun is SO big that 1 million Earths could fit inside it! 🌍',
                 'A sunny day is actually caused by the Earth tilting toward the Sun! 🌎',
                 'Lightning strikes Earth about 100 times every second! ⚡'],
  'clear-night':['There are more stars in space than grains of sand on ALL of Earth\'s beaches! 🏖️',
                 'The Moon is slowly moving away from Earth — 1.5 inches every year! 🌕',
                 'You can see the Space Station flying by with just your eyes! 🚀'],
  cloudy:       ['A single fluffy cloud can weigh as much as 100 elephants! 🐘',
                 'Clouds are made of billions of tiny water droplets! 💧',
                 'The highest clouds are 50 miles up in the sky! ✈️'],
  rainy:        ['Raindrops fall at about 14 miles per hour! 💨',
                 'Rainbows are actually full circles — you just see the top half! 🌈',
                 'A single thunderstorm can drop millions of gallons of water! 🌊'],
  snowy:        ['No two snowflakes are exactly the same — ever! ❄️',
                 'Snow is actually see-through, not white. It just looks white! 🤍',
                 'The biggest snowflake ever recorded was 15 inches wide — like a pizza! 🍕'],
  stormy:       ['Thunder is the sound of air expanding super fast from lightning! 💥',
                 'A lightning bolt is 5 times hotter than the surface of the Sun! 🌞',
                 'Count the seconds after lightning to find how far away it is! 🔢'],
  foggy:        ['Fog is just a cloud touching the ground! ☁️',
                 'San Francisco\'s famous fog even has a nickname — "Karl"! 🌁',
                 'Some places get fog so thick it drips like rain! 💧'],
};

// Tips per theme
const TIPS = {
  sunny:        '😎 Put on sunscreen! Even on warm sunny days your skin needs protection.',
  'clear-night':'🌙 Great night to look at the stars! Can you find the Big Dipper?',
  cloudy:       '🧥 A light layer wouldn\'t hurt — clouds can make it feel cooler!',
  rainy:        '☔ Puddle jumping is totally allowed today! Just wear boots 😄',
  snowy:        '⛄ Perfect snow day! Build a snowman and drink hot cocoa after.',
  stormy:       '🏠 Stay cozy inside. This is the best time for games and movies!',
  foggy:        '👀 It\'s foggy — hold a grown-up\'s hand if you go out!',
};

// Temperature feeling label
function tempWord(f) {
  if (f >= 95)  return ['🥵 Scorching!',   '#e53935'];
  if (f >= 85)  return ['🔥 Hot!',          '#f4511e'];
  if (f >= 70)  return ['😊 Warm!',         '#fb8c00'];
  if (f >= 55)  return ['🙂 Nice!',         '#43a047'];
  if (f >= 40)  return ['🧥 Chilly!',       '#1e88e5'];
  if (f >= 25)  return ['🥶 Cold!',         '#1565c0'];
  return               ['❄️ Freezing!!!',   '#4a148c'];
}

function wmo(code)         { return WMO[code] || ['Unknown','🌡️','cloudy']; }
function pickRandom(arr)   { return arr[Math.floor(Math.random() * arr.length)]; }
function degToCompass(deg) { return ['N','NE','E','SE','S','SW','W','NW'][Math.round(deg/45)%8]; }
function toF(c)            { return c * 9/5 + 32; }
function fmt(val)          { return Math.round(useCelsius ? val : toF(val)) + (useCelsius ? '°C' : '°F'); }

function uvLabel(uv) {
  if (uv < 3)  return ['Low 🟢',     'uv-low'];
  if (uv < 6)  return ['Medium 🟡',  'uv-mod'];
  if (uv < 8)  return ['High 🟠',    'uv-high'];
  if (uv < 11) return ['Very High 🔴','uv-vhigh'];
  return              ['Extreme 🟣',  'uv-extreme'];
}

// State
let useCelsius = false, currentData = null, currentCity = '', currentCountry = '';
let refreshTimer = null, countdown = 600;

// DOM
const cityInput  = document.getElementById('city-input');
const searchBtn  = document.getElementById('search-btn');
const locateBtn  = document.getElementById('locate-btn');
const loadingEl  = document.getElementById('loading');
const errorEl    = document.getElementById('error');
const errorMsg   = document.getElementById('error-msg');
const weatherEl  = document.getElementById('weather');
const bgLayer    = document.getElementById('bg-layer');
const particlesEl= document.getElementById('particles');
const unitToggle = document.getElementById('unit-toggle');
const refreshInfo= document.getElementById('refresh-info');
const headerSub  = document.getElementById('header-sub');
const headerMascot = document.getElementById('header-mascot');

// Unit toggle
unitToggle.addEventListener('click', () => {
  useCelsius = !useCelsius;
  unitToggle.textContent = useCelsius ? '🌡️ Switch to °F' : '🌡️ Switch to °C';
  if (currentData) renderWeather(currentData, currentCity, currentCountry);
});

// Search
searchBtn.addEventListener('click', () => { const q = cityInput.value.trim(); if (q) searchCity(q); });
cityInput.addEventListener('keydown', e => { if (e.key === 'Enter') searchBtn.click(); });
locateBtn.addEventListener('click', () => {
  if (!navigator.geolocation) return showError("Oops! Can't find your location 😢");
  show('loading');
  navigator.geolocation.getCurrentPosition(
    pos => fetchWeather(pos.coords.latitude, pos.coords.longitude, 'My Location', ''),
    ()  => showError("Location access denied 😢")
  );
});

async function searchCity(query) {
  show('loading');
  try {
    const res  = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
    const data = await res.json();
    if (!data.results?.length) return showError(`Can't find "${query}" 🤔 Try another city!`);
    const { latitude, longitude, name, country } = data.results[0];
    fetchWeather(latitude, longitude, name, country);
  } catch { showError("Oops! Couldn't connect 🌐 Try again!"); }
}

async function fetchWeather(lat, lon, city, country) {
  show('loading');
  currentCity = city; currentCountry = country;
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m,visibility` +
      `&hourly=temperature_2m,apparent_temperature,weather_code,precipitation_probability,uv_index` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max` +
      `&temperature_unit=celsius&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto&forecast_days=7`;
    const res  = await fetch(url);
    currentData = await res.json();
    renderWeather(currentData, city, country);
    startRefresh(lat, lon, city, country);
  } catch { showError("Couldn't get the weather 😢 Try again!"); }
}

function renderWeather(d, city, country) {
  const c   = d.current;
  const now = new Date();

  // Theme
  const [condText,, rawTheme] = wmo(c.weather_code);
  const sunriseMs = new Date(d.daily.sunrise[0]).getTime();
  const sunsetMs  = new Date(d.daily.sunset[0]).getTime();
  const isNight   = now < sunriseMs || now > sunsetMs;
  const theme     = isNight && rawTheme === 'sunny' ? 'clear-night' : rawTheme;

  setBackground(theme);

  // Header
  headerMascot.textContent = MASCOTS[theme] || '🌤️';
  headerSub.textContent    = VIBES[theme]   || 'Check out today\'s weather!';

  // Location
  document.getElementById('city-name').textContent = city + (country ? ', ' + country : '');
  document.getElementById('now-date').textContent  =
    now.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' }) +
    ' · ' + now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
  document.getElementById('now-cond').textContent = condText;

  // Mascot
  document.getElementById('now-mascot').textContent = MASCOTS[theme] || '🌡️';

  // Temp
  const tempF = toF(c.temperature_2m);
  document.getElementById('now-temp').textContent  = fmt(c.temperature_2m);
  document.getElementById('now-feels').textContent = fmt(c.apparent_temperature);

  const [word, color] = tempWord(tempF);
  const twEl = document.getElementById('temp-word');
  twEl.textContent  = word;
  twEl.style.color  = color;

  // What to wear
  const wearItems = WEAR[theme] || WEAR.cloudy;
  document.getElementById('wear-items').innerHTML =
    wearItems.map(([emoji, label]) => `<div class="wear-tag">${emoji} ${label}</div>`).join('');

  // Stats
  document.getElementById('humidity').textContent = c.relative_humidity_2m + '%';
  document.getElementById('wind').textContent     = Math.round(c.wind_speed_10m) + ' mph ' + degToCompass(c.wind_direction_10m);

  const nowIdx = d.hourly.time.findIndex(t => new Date(t) >= now);
  const uvVal  = d.hourly.uv_index[nowIdx >= 0 ? nowIdx : 0] ?? 0;
  const [uvText, uvCls] = uvLabel(uvVal);
  const uvEl = document.getElementById('uv');
  uvEl.textContent = uvText;
  uvEl.className   = 'stat-val ' + uvCls;

  const fmtT = iso => new Date(iso).toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
  document.getElementById('sunrise').textContent = fmtT(d.daily.sunrise[0]);
  document.getElementById('sunset').textContent  = fmtT(d.daily.sunset[0]);

  // Fun fact
  const facts = FACTS[theme] || FACTS.cloudy;
  document.getElementById('fact-text').textContent = pickRandom(facts);

  // Hourly (next 24)
  const hourlyRow = document.getElementById('hourly-row');
  hourlyRow.innerHTML = '';
  const start = nowIdx >= 0 ? nowIdx : 0;
  for (let i = start; i < start + 24 && i < d.hourly.time.length; i++) {
    const t      = new Date(d.hourly.time[i]);
    const isNow2 = i === start;
    const [, icon] = wmo(d.hourly.weather_code[i]);
    const precip   = d.hourly.precipitation_probability[i] ?? 0;
    const card     = document.createElement('div');
    card.className = 'hour-card' + (isNow2 ? ' now' : '');
    card.innerHTML = `
      <div class="hour-time">${isNow2 ? '🕐 NOW' : t.toLocaleTimeString('en-US',{hour:'numeric',hour12:true})}</div>
      <div class="hour-icon">${icon}</div>
      <div class="hour-temp">${fmt(d.hourly.temperature_2m[i])}</div>
      <div class="hour-feels">${precip > 0 ? '💧 ' + precip + '%' : '&nbsp;'}</div>
    `;
    hourlyRow.appendChild(card);
  }

  // 7-day week grid
  const weekGrid = document.getElementById('week-grid');
  weekGrid.innerHTML = '';
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  d.daily.time.forEach((dateStr, i) => {
    const date    = new Date(dateStr + 'T12:00:00');
    const label   = i === 0 ? 'Today' : days[date.getDay()];
    const [, icon] = wmo(d.daily.weather_code[i]);
    const precip  = d.daily.precipitation_probability_max[i] ?? 0;
    const card    = document.createElement('div');
    card.className = 'week-card' + (i === 0 ? ' today' : '');
    card.innerHTML = `
      <div class="week-day">${label}</div>
      <div class="week-icon">${icon}</div>
      <div class="week-hi">${fmt(d.daily.temperature_2m_max[i])}</div>
      <div class="week-lo">${fmt(d.daily.temperature_2m_min[i])}</div>
      ${precip > 20 ? `<div class="week-rain">💧 ${precip}%</div>` : ''}
    `;
    weekGrid.appendChild(card);
  });

  // Tip
  document.getElementById('tip-box').textContent = TIPS[theme] || TIPS.cloudy;

  show('weather');
}

// ── Background & particles ──
const ALL_THEMES = ['sunny','clear-night','cloudy','rainy','snowy','stormy','foggy'];

function setBackground(theme) {
  ALL_THEMES.forEach(t => bgLayer.classList.remove('bg-' + t));
  bgLayer.classList.add('bg-' + theme);
  spawnParticles(theme);
}

function spawnParticles(theme) {
  particlesEl.innerHTML = '';

  if (theme === 'rainy' || theme === 'stormy') {
    for (let i = 0; i < (theme === 'stormy' ? 90 : 55); i++) {
      const el = document.createElement('div');
      el.className = 'particle drop';
      const h = 10 + Math.random() * 20;
      el.style.cssText = `left:${Math.random()*100}%;top:${-Math.random()*30}%;height:${h}px;opacity:${.3+Math.random()*.5};animation-duration:${.35+Math.random()*.45}s;animation-delay:${-Math.random()*2}s;`;
      particlesEl.appendChild(el);
    }
  }

  if (theme === 'snowy') {
    for (let i = 0; i < 70; i++) {
      const el = document.createElement('div');
      el.className = 'particle flake';
      const sz = 4 + Math.random() * 7;
      el.style.cssText = `left:${Math.random()*100}%;top:${-Math.random()*20}%;width:${sz}px;height:${sz}px;animation-duration:${3+Math.random()*4}s;animation-delay:${-Math.random()*5}s;`;
      particlesEl.appendChild(el);
    }
  }

  if (theme === 'clear-night') {
    for (let i = 0; i < 140; i++) {
      const el = document.createElement('div');
      el.className = 'particle star';
      const sz = 1 + Math.random() * 3;
      el.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*75}%;width:${sz}px;height:${sz}px;animation-duration:${1.5+Math.random()*3}s;animation-delay:${-Math.random()*4}s;`;
      particlesEl.appendChild(el);
    }
  }

  if (theme === 'sunny') {
    const colors = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff9f1c','#c77dff'];
    for (let i = 0; i < 30; i++) {
      const el = document.createElement('div');
      el.className = 'particle confetti-piece';
      el.style.cssText = `left:${Math.random()*100}%;top:${-Math.random()*10}%;background:${colors[i%colors.length]};animation-duration:${4+Math.random()*4}s;animation-delay:${-Math.random()*6}s;border-radius:${Math.random()>.5?'50%':'3px'};`;
      particlesEl.appendChild(el);
    }
  }
}

// ── Auto-refresh ──
function startRefresh(lat, lon, city, country) {
  clearInterval(refreshTimer);
  countdown = 600;
  tick();
  refreshTimer = setInterval(() => { countdown--; tick(); if (countdown <= 0) { countdown = 600; fetchWeather(lat, lon, city, country); } }, 1000);
}
function tick() {
  const m = Math.floor(countdown/60), s = countdown%60;
  refreshInfo.textContent = `🔄 Refreshes in ${m}:${String(s).padStart(2,'0')}`;
}

// ── Show/hide ──
function showError(msg) { errorMsg.textContent = msg; show('error'); }
function show(which) {
  [loadingEl, errorEl, weatherEl].forEach(el => el.classList.add('hidden'));
  if (which === 'loading') loadingEl.classList.remove('hidden');
  if (which === 'error')   errorEl.classList.remove('hidden');
  if (which === 'weather') weatherEl.classList.remove('hidden');
}

// ── Boot ──
if (navigator.geolocation) {
  show('loading');
  navigator.geolocation.getCurrentPosition(
    pos => fetchWeather(pos.coords.latitude, pos.coords.longitude, 'My Location', ''),
    ()  => searchCity('New York')
  );
} else {
  searchCity('New York');
}
