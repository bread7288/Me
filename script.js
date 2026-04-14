// Weather Now — Open-Meteo (free, no API key needed)

const WMO = {
  0:  ['Clear Sky',          '☀️', 'sunny'],
  1:  ['Mostly Clear',       '🌤️', 'sunny'],
  2:  ['Partly Cloudy',      '⛅',  'cloudy'],
  3:  ['Overcast',           '☁️',  'cloudy'],
  45: ['Foggy',              '🌫️', 'foggy'],
  48: ['Icy Fog',            '🌫️', 'foggy'],
  51: ['Light Drizzle',      '🌦️', 'rainy'],
  53: ['Drizzle',            '🌦️', 'rainy'],
  55: ['Heavy Drizzle',      '🌧️', 'rainy'],
  61: ['Light Rain',         '🌧️', 'rainy'],
  63: ['Rain',               '🌧️', 'rainy'],
  65: ['Heavy Rain',         '🌧️', 'rainy'],
  71: ['Light Snow',         '🌨️', 'snowy'],
  73: ['Snow',               '❄️',  'snowy'],
  75: ['Heavy Snow',         '❄️',  'snowy'],
  77: ['Snow Grains',        '🌨️', 'snowy'],
  80: ['Light Showers',      '🌦️', 'rainy'],
  81: ['Showers',            '🌧️', 'rainy'],
  82: ['Heavy Showers',      '⛈️', 'stormy'],
  85: ['Snow Showers',       '🌨️', 'snowy'],
  86: ['Heavy Snow Showers', '🌨️', 'snowy'],
  95: ['Thunderstorm',       '⛈️', 'stormy'],
  96: ['Thunderstorm+Hail',  '⛈️', 'stormy'],
  99: ['Thunderstorm+Hail',  '⛈️', 'stormy'],
};

const TIPS = {
  sunny:  ['Great day to go outside — don\'t forget sunscreen!', 'Clear skies ahead. Perfect for a walk or a bike ride.', 'Sun\'s out! Stay hydrated.'],
  cloudy: ['Clouds are nature\'s sunshade. Enjoy the mild light!', 'Overcast days are great for photography — no harsh shadows.', 'A cozy reading-indoors kind of day.'],
  rainy:  ['Grab an umbrella before heading out!', 'Perfect weather for hot cocoa and a good book.', 'Rain is great — the plants love it!'],
  snowy:  ['Bundle up and enjoy the snow!', 'Watch out for icy paths. Wear grip shoes.', 'Snow day vibes! ⛄'],
  stormy: ['Stay indoors and away from windows during thunder.', 'Unplug sensitive electronics during the storm.', 'Thunder means lightning is nearby. Stay safe!'],
  foggy:  ['Low visibility — drive slowly and use fog lights.', 'Foggy mornings often clear into beautiful afternoons!', 'Mysterious weather today. Stay alert while driving.'],
};

function wmo(code) { return WMO[code] || ['Unknown', '🌡️', 'cloudy']; }

function pickTip(theme) {
  const arr = TIPS[theme] || TIPS.cloudy;
  return arr[Math.floor(Math.random() * arr.length)];
}

// State
let useCelsius    = false;
let currentData   = null;
let currentCity   = '';
let currentCountry= '';
let refreshTimer  = null;
let countdown     = 600; // 10 min

// DOM refs
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

// ── Unit toggle ──
unitToggle.addEventListener('click', () => {
  useCelsius = !useCelsius;
  unitToggle.textContent = useCelsius ? '°F' : '°C';
  if (currentData) renderWeather(currentData, currentCity, currentCountry);
});

function toF(c) { return c * 9/5 + 32; }
function fmt(val) {
  return Math.round(useCelsius ? val : toF(val)) + (useCelsius ? '°C' : '°F');
}

// ── Search / locate ──
searchBtn.addEventListener('click', () => { const q = cityInput.value.trim(); if (q) searchCity(q); });
cityInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchBtn.click(); });
locateBtn.addEventListener('click', () => {
  if (!navigator.geolocation) return showError('Geolocation not supported.');
  show('loading');
  navigator.geolocation.getCurrentPosition(
    (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude, 'My Location', ''),
    () => showError('Location access denied.')
  );
});

async function searchCity(query) {
  show('loading');
  try {
    const res  = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
    const data = await res.json();
    if (!data.results?.length) return showError(`City "${query}" not found.`);
    const { latitude, longitude, name, country } = data.results[0];
    fetchWeather(latitude, longitude, name, country);
  } catch { showError('Could not reach geocoding service.'); }
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
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max` +
      `&temperature_unit=celsius&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto&forecast_days=7`;

    const res  = await fetch(url);
    const data = await res.json();
    currentData = data;
    renderWeather(data, city, country);
    startRefreshCountdown(lat, lon, city, country);
  } catch { showError('Could not fetch weather data.'); }
}

// ── Render ──
function renderWeather(d, city, country) {
  const c = d.current;

  // Location & time
  document.getElementById('city-name').textContent = city;
  document.getElementById('country').textContent   = country;
  const now = new Date();
  document.getElementById('datetime').textContent =
    now.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' }) +
    ' · ' + now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });

  // Current condition
  const [condText, condIcon, theme] = wmo(c.weather_code);

  // Day or night?
  const sunriseMs = new Date(d.daily.sunrise[0]).getTime();
  const sunsetMs  = new Date(d.daily.sunset[0]).getTime();
  const isNight   = now.getTime() < sunriseMs || now.getTime() > sunsetMs;
  const bgTheme   = isNight && (theme === 'sunny') ? 'clear-night' : theme;

  // Set background
  setBackground(bgTheme, isNight);

  document.getElementById('temp').textContent      = fmt(c.temperature_2m);
  document.getElementById('feels').textContent     = fmt(c.apparent_temperature);
  document.getElementById('cond-icon').textContent = condIcon;
  document.getElementById('cond-text').textContent = condText;
  document.getElementById('humidity').textContent  = c.relative_humidity_2m + '%';
  document.getElementById('wind').textContent      = Math.round(c.wind_speed_10m) + ' mph';
  document.getElementById('wind-dir').textContent  = degToCompass(c.wind_direction_10m);
  document.getElementById('visibility').textContent = c.visibility >= 1000
    ? (c.visibility / 1000).toFixed(1) + ' km' : c.visibility + ' m';
  document.getElementById('pressure').textContent  = Math.round(c.surface_pressure) + ' hPa';
  document.getElementById('dewpoint').textContent  = fmt(c.dew_point_2m);

  // UV Index from current hour
  const currentHourIdx = d.hourly.time.findIndex(t => new Date(t) >= now);
  const uvVal = d.hourly.uv_index[currentHourIdx >= 0 ? currentHourIdx : 0] ?? 0;
  const uvEl  = document.getElementById('uv');
  uvEl.textContent = uvVal.toFixed(1) + ' ' + uvLabel(uvVal);
  uvEl.className   = uvClass(uvVal);

  // Sunrise / sunset
  const fmt2 = (iso) => new Date(iso).toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
  document.getElementById('sunrise').textContent = fmt2(d.daily.sunrise[0]);
  document.getElementById('sunset').textContent  = fmt2(d.daily.sunset[0]);

  // AQI banner (simple placeholder based on visibility as proxy)
  const aqiBanner = document.getElementById('aqi-banner');
  aqiBanner.classList.add('hidden'); // hide — no AQI from open-meteo basic tier

  // Hourly (next 24 hrs)
  const track = document.getElementById('hourly-track');
  track.innerHTML = '';
  const startIdx = currentHourIdx >= 0 ? currentHourIdx : 0;
  const hourTemps = d.hourly.temperature_2m.slice(startIdx, startIdx + 24);
  const minHT = Math.min(...hourTemps);
  const maxHT = Math.max(...hourTemps);

  for (let i = startIdx; i < startIdx + 24 && i < d.hourly.time.length; i++) {
    const t      = new Date(d.hourly.time[i]);
    const isNow2 = i === startIdx;
    const [, icon] = wmo(d.hourly.weather_code[i]);
    const precip   = d.hourly.precipitation_probability[i] ?? 0;
    const tempVal  = d.hourly.temperature_2m[i];
    const barPct   = maxHT > minHT ? ((tempVal - minHT) / (maxHT - minHT)) * 100 : 50;

    const card = document.createElement('div');
    card.className = 'hour-card' + (isNow2 ? ' now' : '');
    card.innerHTML = `
      <div class="hour-time">${isNow2 ? 'Now' : t.toLocaleTimeString('en-US', { hour:'numeric', hour12:true })}</div>
      <div class="hour-icon">${icon}</div>
      <div class="hour-temp">${fmt(tempVal)}</div>
      ${precip > 0 ? `<div class="hour-precip">${precip}% 💧</div>` : '<div class="hour-precip" style="opacity:0">0%</div>'}
      <div class="hour-bar-wrap"><div class="hour-bar" style="width:${barPct}%"></div></div>
    `;
    track.appendChild(card);
  }

  // 7-day
  const list = document.getElementById('daily-list');
  list.innerHTML = '';
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const allMins = d.daily.temperature_2m_min;
  const allMaxs = d.daily.temperature_2m_max;
  const globalMin = Math.min(...allMins);
  const globalMax = Math.max(...allMaxs);

  d.daily.time.forEach((dateStr, i) => {
    const date    = new Date(dateStr + 'T12:00:00');
    const label   = i === 0 ? 'Today' : days[date.getDay()];
    const [, icon] = wmo(d.daily.weather_code[i]);
    const lo      = allMins[i], hi = allMaxs[i];
    const range   = globalMax - globalMin || 1;
    const barLeft = ((lo - globalMin) / range) * 100;
    const barWidth= ((hi - lo) / range) * 100;
    const precip  = d.daily.precipitation_probability_max[i] ?? 0;

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

  // Weather tip
  document.getElementById('tip-card').textContent = '💡 ' + pickTip(theme);

  show('weather');
}

// ── Background & particles ──
const BG_THEMES = ['sunny','clear-night','cloudy','rainy','snowy','stormy','foggy'];

function setBackground(theme, isNight) {
  BG_THEMES.forEach(t => bgLayer.classList.remove('bg-' + t));
  bgLayer.classList.add('bg-' + theme);
  spawnParticles(theme, isNight);
}

function spawnParticles(theme, isNight) {
  particles.innerHTML = '';

  if (theme === 'rainy' || theme === 'stormy') {
    const count = theme === 'stormy' ? 80 : 50;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'particle drop';
      const h = 8 + Math.random() * 18;
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${-Math.random() * 30}%;
        height: ${h}px;
        opacity: ${0.3 + Math.random() * 0.4};
        animation-duration: ${0.4 + Math.random() * 0.5}s;
        animation-delay: ${-Math.random() * 2}s;
      `;
      particles.appendChild(el);
    }
  }

  if (theme === 'snowy') {
    for (let i = 0; i < 60; i++) {
      const el = document.createElement('div');
      el.className = 'particle flake';
      const sz = 3 + Math.random() * 6;
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${-Math.random() * 20}%;
        width: ${sz}px; height: ${sz}px;
        animation-duration: ${3 + Math.random() * 4}s;
        animation-delay: ${-Math.random() * 5}s;
      `;
      particles.appendChild(el);
    }
  }

  if (theme === 'clear-night') {
    for (let i = 0; i < 120; i++) {
      const el = document.createElement('div');
      el.className = 'particle star';
      const sz = 1 + Math.random() * 2.5;
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 70}%;
        width: ${sz}px; height: ${sz}px;
        animation-duration: ${1.5 + Math.random() * 3}s;
        animation-delay: ${-Math.random() * 4}s;
      `;
      particles.appendChild(el);
    }
  }
}

// ── Helpers ──
function degToCompass(deg) {
  const dirs = ['N','NE','E','SE','S','SW','W','NW'];
  return dirs[Math.round(deg / 45) % 8];
}

function uvLabel(uv) {
  if (uv < 3)  return '(Low)';
  if (uv < 6)  return '(Mod)';
  if (uv < 8)  return '(High)';
  if (uv < 11) return '(V.High)';
  return '(Extreme)';
}

function uvClass(uv) {
  if (uv < 3)  return 'uv-low';
  if (uv < 6)  return 'uv-mod';
  if (uv < 8)  return 'uv-high';
  if (uv < 11) return 'uv-vhigh';
  return 'uv-extreme';
}

// ── Auto-refresh every 10 min ──
function startRefreshCountdown(lat, lon, city, country) {
  clearInterval(refreshTimer);
  countdown = 600;
  updateRefreshLabel();
  refreshTimer = setInterval(() => {
    countdown--;
    updateRefreshLabel();
    if (countdown <= 0) {
      countdown = 600;
      fetchWeather(lat, lon, city, country);
    }
  }, 1000);
}

function updateRefreshLabel() {
  const m = Math.floor(countdown / 60);
  const s = countdown % 60;
  refreshInfo.textContent = `Auto-refresh in ${m}:${String(s).padStart(2,'0')}`;
}

// ── Show/hide ──
function showError(msg) { errorMsg.textContent = msg; show('error'); }

function show(which) {
  loadingEl.classList.add('hidden');
  errorEl.classList.add('hidden');
  weatherEl.classList.add('hidden');
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
