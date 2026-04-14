// Wes's Weather World — Open-Meteo (free, no API key)

const WMO = {
  0:  ['Clear Sky',     '☀️',  'sunny'],
  1:  ['Mostly Clear',  '🌤️', 'sunny'],
  2:  ['Partly Cloudy', '⛅',  'cloudy'],
  3:  ['Overcast',      '☁️',  'cloudy'],
  45: ['Foggy',         '🌫️', 'foggy'],
  48: ['Icy Fog',       '🌫️', 'foggy'],
  51: ['Light Drizzle', '🌦️', 'rainy'],
  53: ['Drizzle',       '🌦️', 'rainy'],
  55: ['Heavy Drizzle', '🌧️', 'rainy'],
  61: ['Light Rain',    '🌧️', 'rainy'],
  63: ['Rain',          '🌧️', 'rainy'],
  65: ['Heavy Rain',    '🌧️', 'rainy'],
  71: ['Light Snow',    '🌨️', 'snowy'],
  73: ['Snow',          '❄️',  'snowy'],
  75: ['Heavy Snow',    '❄️',  'snowy'],
  77: ['Snow Grains',   '🌨️', 'snowy'],
  80: ['Light Showers', '🌦️', 'rainy'],
  81: ['Showers',       '🌧️', 'rainy'],
  82: ['Heavy Showers', '⛈️', 'stormy'],
  85: ['Snow Showers',  '🌨️', 'snowy'],
  86: ['Heavy Snow',    '🌨️', 'snowy'],
  95: ['Thunderstorm',  '⛈️', 'stormy'],
  96: ['Storm + Hail',  '⛈️', 'stormy'],
  99: ['Storm + Hail',  '⛈️', 'stormy'],
};

// Big animated mascot per theme
const MASCOTS = {
  sunny:       '😎',
  'clear-night':'🌙',
  cloudy:      '😶‍🌫️',
  rainy:       '🌧️',
  snowy:       '⛄',
  stormy:      '😱',
  foggy:       '👻',
};

// Title bar icon per theme
const TITLE_ICONS = {
  sunny:       '☀️',
  'clear-night':'🌙',
  cloudy:      '☁️',
  rainy:       '☔',
  snowy:       '❄️',
  stormy:      '⛈️',
  foggy:       '🌫️',
};

// Fun facts for kids
const FACTS = {
  sunny:  [
    'Lightning strikes Earth about 100 times every second! ⚡',
    'The Sun is SO big that 1 million Earths could fit inside it! 🌍',
    'A sunny day on Venus would be worse — it\'s 900°F there! 🔥',
  ],
  cloudy: [
    'Clouds are made of billions of tiny water droplets! 💧',
    'A fluffy cloud can weigh as much as 100 elephants! 🐘',
    'The highest clouds are called "noctilucent" and glow at night! ✨',
  ],
  rainy:  [
    'Rain drops fall at about 14 miles per hour! 💨',
    'A single thunderstorm can drop millions of gallons of water! 🌊',
    'Rainbows are actually full circles — you just see the top half! 🌈',
  ],
  snowy:  [
    'No two snowflakes are exactly alike — ever! ❄️',
    'Snow is actually clear, not white. It just looks white! 🤍',
    'The biggest snowflake ever was 15 inches wide — as big as a pizza! 🍕',
  ],
  stormy: [
    'Thunder is the sound of air expanding super fast from lightning! 💥',
    'A lightning bolt is 5x hotter than the surface of the Sun! 🌞',
    'You can tell how far away lightning is — count seconds after the flash! 🔢',
  ],
  foggy:  [
    'Fog is basically a cloud that\'s touching the ground! ☁️',
    'Some places in California get fog so thick it drips like rain! 🌁',
    'San Francisco is famous for its fog — it even has a name: "Karl"! 🌉',
  ],
  'clear-night': [
    'There are more stars in space than grains of sand on all Earth\'s beaches! ⭐',
    'The Moon is slowly moving away from Earth — about 1.5 inches per year! 🌕',
    'You can see the International Space Station with just your eyes! 🚀',
  ],
};

// Tips for kids
const TIPS = {
  sunny:       '😎 Put on sunscreen before going outside today!',
  cloudy:      '🧥 Might want a light jacket — it could get breezy!',
  rainy:       '☔ Don\'t forget your umbrella! Puddle jumping is optional 😄',
  snowy:       '⛄ Bundle up with your warmest coat, hat, and gloves!',
  stormy:      '🏠 Best to stay inside during the storm. Stay safe!',
  foggy:       '👀 It\'s foggy out — hold a grown-up\'s hand if you go out!',
  'clear-night':'🌙 Great night to stargaze! Can you find the Big Dipper?',
};

function wmo(code) { return WMO[code] || ['Unknown', '🌡️', 'cloudy']; }
function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// State
let useCelsius     = false;
let currentData    = null;
let currentCity    = '';
let currentCountry = '';
let refreshTimer   = null;
let countdown      = 600;

// DOM
const cityInput   = document.getElementById('city-input');
const searchBtn   = document.getElementById('search-btn');
const locateBtn   = document.getElementById('locate-btn');
const loadingEl   = document.getElementById('loading');
const errorEl     = document.getElementById('error');
const errorMsg    = document.getElementById('error-msg');
const weatherEl   = document.getElementById('weather');
const bgLayer     = document.getElementById('bg-layer');
const particles   = document.getElementById('particles');
const unitToggle  = document.getElementById('unit-toggle');
const refreshInfo = document.getElementById('refresh-info');
const titleIcon   = document.getElementById('title-icon');

// Unit toggle
unitToggle.addEventListener('click', () => {
  useCelsius = !useCelsius;
  unitToggle.textContent = useCelsius ? 'Switch to °F' : 'Switch to °C';
  if (currentData) renderWeather(currentData, currentCity, currentCountry);
});

function toF(c) { return c * 9/5 + 32; }
function fmt(val) {
  return Math.round(useCelsius ? val : toF(val)) + (useCelsius ? '°C' : '°F');
}

// Search / locate
searchBtn.addEventListener('click', () => { const q = cityInput.value.trim(); if (q) searchCity(q); });
cityInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchBtn.click(); });
locateBtn.addEventListener('click', () => {
  if (!navigator.geolocation) return showError('Geolocation not supported 😢');
  show('loading');
  navigator.geolocation.getCurrentPosition(
    (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude, 'My Location', ''),
    () => showError('Location access denied 😢')
  );
});

async function searchCity(query) {
  show('loading');
  try {
    const res  = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
    const data = await res.json();
    if (!data.results?.length) return showError(`Hmm, can't find "${query}" 🤔 Try another city!`);
    const { latitude, longitude, name, country } = data.results[0];
    fetchWeather(latitude, longitude, name, country);
  } catch { showError('Oops! Couldn\'t connect. Try again! 🌐'); }
}

async function fetchWeather(lat, lon, city, country) {
  show('loading');
  currentCity    = city;
  currentCountry = country;
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,` +
      `relative_humidity_2m,visibility,surface_pressure,dew_point_2m` +
      `&hourly=temperature_2m,weather_code,precipitation_probability,uv_index` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,` +
      `precipitation_probability_max` +
      `&temperature_unit=celsius&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto&forecast_days=7`;

    const res  = await fetch(url);
    const data = await res.json();
    currentData = data;
    renderWeather(data, city, country);
    startRefreshCountdown(lat, lon, city, country);
  } catch { showError('Oops! Couldn\'t get the weather. Try again! ☁️'); }
}

function renderWeather(d, city, country) {
  const c   = d.current;
  const now = new Date();

  // Location & time
  document.getElementById('city-name').textContent = city;
  document.getElementById('country').textContent   = country ? ', ' + country : '';
  document.getElementById('datetime').textContent  =
    now.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' }) +
    ' · ' + now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });

  // Condition
  const [condText, , theme] = wmo(c.weather_code);
  const sunriseMs = new Date(d.daily.sunrise[0]).getTime();
  const sunsetMs  = new Date(d.daily.sunset[0]).getTime();
  const isNight   = now.getTime() < sunriseMs || now.getTime() > sunsetMs;
  const bgTheme   = isNight && theme === 'sunny' ? 'clear-night' : theme;

  setBackground(bgTheme);

  // Mascot + title icon
  document.getElementById('mascot').textContent    = MASCOTS[bgTheme] || '🌡️';
  titleIcon.textContent                            = TITLE_ICONS[bgTheme] || '🌤️';

  document.getElementById('temp').textContent      = fmt(c.temperature_2m);
  document.getElementById('feels').textContent     = fmt(c.apparent_temperature);
  document.getElementById('cond-text').textContent = condText;
  document.getElementById('humidity').textContent  = c.relative_humidity_2m + '%';
  document.getElementById('wind').textContent      = Math.round(c.wind_speed_10m) + ' mph';
  document.getElementById('wind-dir').textContent  = degToCompass(c.wind_direction_10m);
  document.getElementById('visibility').textContent = c.visibility >= 1000
    ? (c.visibility / 1000).toFixed(1) + ' km' : c.visibility + ' m';

  // UV from nearest hour
  const currentHourIdx = d.hourly.time.findIndex(t => new Date(t) >= now);
  const uvIdx = currentHourIdx >= 0 ? currentHourIdx : 0;
  const uvVal = d.hourly.uv_index[uvIdx] ?? 0;
  const uvEl  = document.getElementById('uv');
  uvEl.textContent = uvVal.toFixed(1) + ' — ' + uvLabel(uvVal);
  uvEl.className   = uvClass(uvVal);

  // Sunrise/sunset
  const fmtT = (iso) => new Date(iso).toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
  document.getElementById('sunrise').textContent = fmtT(d.daily.sunrise[0]);
  document.getElementById('sunset').textContent  = fmtT(d.daily.sunset[0]);

  // Fun fact
  const facts = FACTS[bgTheme] || FACTS.cloudy;
  document.getElementById('funfact-text').textContent = pickRandom(facts);

  // Hourly
  const track  = document.getElementById('hourly-track');
  track.innerHTML = '';
  const start  = currentHourIdx >= 0 ? currentHourIdx : 0;
  const hTemps = d.hourly.temperature_2m.slice(start, start + 24);
  const minHT  = Math.min(...hTemps), maxHT = Math.max(...hTemps);

  for (let i = start; i < start + 24 && i < d.hourly.time.length; i++) {
    const t      = new Date(d.hourly.time[i]);
    const isNow2 = i === start;
    const [, icon] = wmo(d.hourly.weather_code[i]);
    const precip   = d.hourly.precipitation_probability[i] ?? 0;
    const tempVal  = d.hourly.temperature_2m[i];
    const barPct   = maxHT > minHT ? ((tempVal - minHT) / (maxHT - minHT)) * 100 : 50;

    const card = document.createElement('div');
    card.className = 'hour-card' + (isNow2 ? ' now' : '');
    card.innerHTML = `
      <div class="hour-time">${isNow2 ? 'NOW' : t.toLocaleTimeString('en-US', { hour:'numeric', hour12:true })}</div>
      <div class="hour-icon">${icon}</div>
      <div class="hour-temp">${fmt(tempVal)}</div>
      <div class="hour-precip">${precip > 0 ? precip + '% 💧' : '&nbsp;'}</div>
      <div class="hour-bar-wrap"><div class="hour-bar" style="width:${barPct}%"></div></div>
    `;
    track.appendChild(card);
  }

  // 7-day
  const list      = document.getElementById('daily-list');
  list.innerHTML  = '';
  const days      = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const allMins   = d.daily.temperature_2m_min;
  const allMaxs   = d.daily.temperature_2m_max;
  const globalMin = Math.min(...allMins);
  const globalMax = Math.max(...allMaxs);

  d.daily.time.forEach((dateStr, i) => {
    const date    = new Date(dateStr + 'T12:00:00');
    const label   = i === 0 ? 'Today' : days[date.getDay()];
    const [, icon] = wmo(d.daily.weather_code[i]);
    const lo       = allMins[i], hi = allMaxs[i];
    const range    = globalMax - globalMin || 1;
    const barLeft  = ((lo - globalMin) / range) * 100;
    const barWidth = ((hi - lo) / range) * 100;

    const row = document.createElement('div');
    row.className = 'day-row';
    row.innerHTML = `
      <div class="day-name">${label}</div>
      <div class="day-icon">${icon}</div>
      <div class="day-bar-wrap">
        <div class="day-bar" style="left:${barLeft}%;width:${barWidth}%"></div>
      </div>
      <div class="day-low">${fmt(lo)}</div>
      <div class="day-high">${fmt(hi)}</div>
    `;
    list.appendChild(row);
  });

  // Tip
  document.getElementById('tip-card').textContent = TIPS[bgTheme] || TIPS.cloudy;

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
  particles.innerHTML = '';

  if (theme === 'rainy' || theme === 'stormy') {
    const count = theme === 'stormy' ? 90 : 55;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'particle drop';
      const h = 10 + Math.random() * 20;
      el.style.cssText = `left:${Math.random()*100}%;top:${-Math.random()*30}%;height:${h}px;opacity:${0.3+Math.random()*0.5};animation-duration:${0.35+Math.random()*0.45}s;animation-delay:${-Math.random()*2}s;`;
      particles.appendChild(el);
    }
  }

  if (theme === 'snowy') {
    for (let i = 0; i < 70; i++) {
      const el = document.createElement('div');
      el.className = 'particle flake';
      const sz = 4 + Math.random() * 7;
      el.style.cssText = `left:${Math.random()*100}%;top:${-Math.random()*20}%;width:${sz}px;height:${sz}px;animation-duration:${3+Math.random()*4}s;animation-delay:${-Math.random()*5}s;`;
      particles.appendChild(el);
    }
  }

  if (theme === 'clear-night') {
    for (let i = 0; i < 130; i++) {
      const el = document.createElement('div');
      el.className = 'particle star';
      const sz = 1 + Math.random() * 3;
      el.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*75}%;width:${sz}px;height:${sz}px;animation-duration:${1.5+Math.random()*3}s;animation-delay:${-Math.random()*4}s;`;
      particles.appendChild(el);
    }
  }
}

// ── Helpers ──
function degToCompass(deg) {
  return ['N','NE','E','SE','S','SW','W','NW'][Math.round(deg / 45) % 8];
}
function uvLabel(uv) {
  if (uv < 3)  return 'Low 🟢';
  if (uv < 6)  return 'Medium 🟡';
  if (uv < 8)  return 'High 🟠';
  if (uv < 11) return 'Very High 🔴';
  return 'Extreme 🟣';
}
function uvClass(uv) {
  if (uv < 3)  return 'uv-low';
  if (uv < 6)  return 'uv-mod';
  if (uv < 8)  return 'uv-high';
  if (uv < 11) return 'uv-vhigh';
  return 'uv-extreme';
}

// ── Auto-refresh ──
function startRefreshCountdown(lat, lon, city, country) {
  clearInterval(refreshTimer);
  countdown = 600;
  updateLabel();
  refreshTimer = setInterval(() => {
    countdown--;
    updateLabel();
    if (countdown <= 0) { countdown = 600; fetchWeather(lat, lon, city, country); }
  }, 1000);
}
function updateLabel() {
  const m = Math.floor(countdown / 60), s = countdown % 60;
  refreshInfo.textContent = `🔄 Updates in ${m}:${String(s).padStart(2,'0')}`;
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
    (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude, 'My Location', ''),
    () => searchCity('New York')
  );
} else {
  searchCity('New York');
}
