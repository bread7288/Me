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

const MASCOTS = { sunny:'😎', 'clear-night':'🌙', cloudy:'🙂', rainy:'🌧️', snowy:'⛄', stormy:'😬', foggy:'👻' };
const VIBES   = { sunny:"It's beautiful outside!", 'clear-night':"The stars are out tonight!", cloudy:"A bit cloudy today!", rainy:"Grab your umbrella!", snowy:"Snow day! ⛄", stormy:"Stay safe inside!", foggy:"Super foggy out there!" };

const WEAR = {
  sunny:        [['👕','T-shirt'],['😎','Sunglasses'],['🧴','Sunscreen']],
  'clear-night':[['🧥','Jacket'],['🌟','Stargazing!']],
  cloudy:       [['👕','T-shirt'],['🧥','Light jacket']],
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

// Moon phase emoji from 0–1 phase value
function moonEmoji(phase) {
  const idx = Math.round(phase * 8) % 8;
  return ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'][idx];
}
function moonName(phase) {
  if (phase < 0.03 || phase > 0.97) return 'New Moon';
  if (phase < 0.22) return 'Waxing Crescent';
  if (phase < 0.28) return 'First Quarter';
  if (phase < 0.47) return 'Waxing Gibbous';
  if (phase < 0.53) return 'Full Moon';
  if (phase < 0.72) return 'Waning Gibbous';
  if (phase < 0.78) return 'Last Quarter';
  return 'Waning Crescent';
}
function getMoonPhase(date) {
  const known = new Date(2000, 0, 6, 18, 14).getTime() / 1000; // known new moon
  const period = 2551443; // seconds in a lunar cycle
  return ((date.getTime() / 1000 - known) % period + period) % period / period;
}

function tempWord(f) {
  if (f >= 95)  return ['🥵 Scorching!',  '#e53935'];
  if (f >= 85)  return ['🔥 Hot!',         '#f4511e'];
  if (f >= 70)  return ['😊 Warm!',        '#fb8c00'];
  if (f >= 55)  return ['🙂 Nice!',        '#43a047'];
  if (f >= 40)  return ['🧥 Chilly!',      '#1e88e5'];
  if (f >= 25)  return ['🥶 Cold!',        '#1565c0'];
  return              ['❄️ Freezing!!!',   '#4a148c'];
}

function playOutsideScore(tempF, windMph, rainPct, uvVal) {
  let score = 100;
  // Temperature
  if (tempF < 32)       score -= 60;
  else if (tempF < 45)  score -= 30;
  else if (tempF > 95)  score -= 50;
  else if (tempF > 85)  score -= 20;
  else if (tempF >= 60 && tempF <= 82) score += 10;
  // Rain
  score -= rainPct * 0.7;
  // Wind
  if (windMph > 30) score -= 30;
  else if (windMph > 20) score -= 15;
  // UV
  if (uvVal >= 11) score -= 20;
  else if (uvVal >= 8) score -= 10;
  return Math.max(0, Math.min(100, score));
}

function playOutsideLabel(score) {
  if (score >= 75) return ['YES! Go outside! 🎉', `linear-gradient(90deg,#4caf50,#8bc34a)`, '🌳 Perfect weather to run around and have fun!'];
  if (score >= 45) return ['Maybe... 🤔', `linear-gradient(90deg,#ff9800,#ffc107)`, '🏃 It\'s okay outside, but bring a jacket just in case!'];
  return ['Stay Inside 🏠', `linear-gradient(90deg,#f44336,#e91e63)`, '🛋️ Better to stay cozy inside today!'];
}

function uvLabel(uv) {
  if (uv < 3)  return ['Low 🟢',      'uv-low'];
  if (uv < 6)  return ['Medium 🟡',   'uv-mod'];
  if (uv < 8)  return ['High 🟠',     'uv-high'];
  if (uv < 11) return ['Very High 🔴','uv-vhigh'];
  return              ['Extreme 🟣',   'uv-extreme'];
}

function wmo(code)         { return WMO[code] || ['Unknown','🌡️','cloudy']; }
function pickRandom(arr)   { return arr[Math.floor(Math.random() * arr.length)]; }
function degToCompass(deg) { return ['N','NE','E','SE','S','SW','W','NW'][Math.round(deg/45)%8]; }
function toF(c)            { return c * 9/5 + 32; }
function fmt(val)          { return Math.round(useCelsius ? val : toF(val)) + (useCelsius ? '°C' : '°F'); }

// ── State ──
let useCelsius = false, currentData = null, currentCity = '', currentCountry = '';
let currentLat = null, currentLon = null;
let refreshTimer = null, countdown = 600;
let weatherMap = null, mapMarker = null, radarLayer = null, radarOn = true;

// ── Favorites (localStorage) ──
function getFavs() { try { return JSON.parse(localStorage.getItem('wes_favs') || '[]'); } catch { return []; } }
function saveFavs(a) { localStorage.setItem('wes_favs', JSON.stringify(a)); }

function renderFavs() {
  const bar = document.getElementById('favs-bar');
  const favs = getFavs();
  bar.innerHTML = '';
  favs.forEach(({ city, country, lat, lon }) => {
    const chip = document.createElement('div');
    chip.className = 'fav-chip';
    chip.innerHTML = `📍 ${city}${country ? ', ' + country : ''} <span class="remove-fav" data-city="${city}">✕</span>`;
    chip.querySelector('.remove-fav').addEventListener('click', e => {
      e.stopPropagation();
      saveFavs(getFavs().filter(f => f.city !== city));
      renderFavs();
    });
    chip.addEventListener('click', () => fetchWeather(lat, lon, city, country));
    bar.appendChild(chip);
  });
}

document.getElementById('fav-btn').addEventListener('click', () => {
  if (!currentCity || currentCity === 'My Location') return;
  const favs = getFavs();
  if (favs.find(f => f.city === currentCity)) return;
  if (favs.length >= 5) favs.shift();
  favs.push({ city: currentCity, country: currentCountry, lat: currentLat, lon: currentLon });
  saveFavs(favs);
  renderFavs();
});

renderFavs();

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
const refreshInfo = document.getElementById('refresh-info');
const headerSub   = document.getElementById('header-sub');
const headerMascot= document.getElementById('header-mascot');
const radarBtn    = document.getElementById('radar-btn');
const recenterBtn = document.getElementById('recenter-btn');

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
  if (!navigator.geolocation) return showError("Can't find your location 😢");
  show('loading');
  navigator.geolocation.getCurrentPosition(
    pos => fetchWeather(pos.coords.latitude, pos.coords.longitude, 'My Location', ''),
    ()  => showError('Location access denied 😢')
  );
});

// ── Radar toggle ──
radarBtn.addEventListener('click', () => {
  radarOn = !radarOn;
  radarBtn.textContent = radarOn ? '🌧️ Rain Radar: ON' : '🌧️ Rain Radar: OFF';
  radarBtn.classList.toggle('active', radarOn);
  if (radarOn) loadRadar();
  else if (radarLayer) { weatherMap.removeLayer(radarLayer); radarLayer = null; }
});

recenterBtn.addEventListener('click', () => {
  if (weatherMap && currentLat) weatherMap.setView([currentLat, currentLon], 8);
});

// ── Geocode ──
async function searchCity(query) {
  show('loading');
  try {
    const res  = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
    const data = await res.json();
    if (!data.results?.length) return showError(`Can't find "${query}" 🤔`);
    const { latitude, longitude, name, country } = data.results[0];
    fetchWeather(latitude, longitude, name, country);
  } catch { showError("Couldn't connect 🌐 Try again!"); }
}

async function reverseGeocode(lat, lon) {
  try {
    const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const data = await res.json();
    const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || 'Unknown';
    const country = data.address?.country || '';
    return { city, country };
  } catch { return { city: `${lat.toFixed(2)}, ${lon.toFixed(2)}`, country: '' }; }
}

// ── Fetch weather ──
async function fetchWeather(lat, lon, city, country) {
  show('loading');
  currentLat = lat; currentLon = lon;
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

// ── Render ──
function renderWeather(d, city, country) {
  const c   = d.current;
  const now = new Date();

  const [condText,, rawTheme] = wmo(c.weather_code);
  const sunriseMs = new Date(d.daily.sunrise[0]).getTime();
  const sunsetMs  = new Date(d.daily.sunset[0]).getTime();
  const isNight   = now < sunriseMs || now > sunsetMs;
  const theme     = isNight && rawTheme === 'sunny' ? 'clear-night' : rawTheme;

  setBackground(theme);

  headerMascot.textContent = MASCOTS[theme] || '🌤️';
  headerSub.textContent    = VIBES[theme] || 'Check the weather!';

  document.getElementById('city-name').textContent = city + (country ? ', ' + country : '');
  document.getElementById('now-date').textContent  =
    now.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' }) +
    ' · ' + now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
  document.getElementById('now-cond').textContent  = condText;
  document.getElementById('now-mascot').textContent = MASCOTS[theme] || '🌡️';

  const tempF = toF(c.temperature_2m);
  document.getElementById('now-temp').textContent  = fmt(c.temperature_2m);
  document.getElementById('now-feels').textContent = fmt(c.apparent_temperature);
  const [word, color] = tempWord(tempF);
  const twEl = document.getElementById('temp-word');
  twEl.textContent = word; twEl.style.color = color;

  document.getElementById('wear-items').innerHTML =
    (WEAR[theme] || WEAR.cloudy).map(([em, lb]) => `<div class="wear-tag">${em} ${lb}</div>`).join('');

  document.getElementById('humidity').textContent = c.relative_humidity_2m + '%';
  document.getElementById('wind').textContent     = Math.round(c.wind_speed_10m) + ' mph ' + degToCompass(c.wind_direction_10m);

  const nowIdx = d.hourly.time.findIndex(t => new Date(t) >= now);
  const uvVal  = d.hourly.uv_index[nowIdx >= 0 ? nowIdx : 0] ?? 0;
  const [uvText, uvCls] = uvLabel(uvVal);
  const uvEl = document.getElementById('uv');
  uvEl.textContent = uvText; uvEl.className = 'stat-val ' + uvCls;

  // Moon phase
  const phase = getMoonPhase(now);
  document.getElementById('moon-icon').textContent  = moonEmoji(phase);
  document.getElementById('moon-phase').textContent = moonName(phase);

  const fmtT = iso => new Date(iso).toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
  document.getElementById('sunrise').textContent = fmtT(d.daily.sunrise[0]);
  document.getElementById('sunset').textContent  = fmtT(d.daily.sunset[0]);

  // Play outside meter
  const nowPrecip = d.hourly.precipitation_probability[nowIdx >= 0 ? nowIdx : 0] ?? 0;
  const score = playOutsideScore(tempF, c.wind_speed_10m, nowPrecip, uvVal);
  const [playTxt, playGrad, playReason] = playOutsideLabel(score);
  document.getElementById('play-answer').textContent  = playTxt;
  document.getElementById('play-bar').style.width     = score + '%';
  document.getElementById('play-bar').style.background= playGrad;
  document.getElementById('play-reason').textContent  = playReason;

  // Fun fact
  document.getElementById('fact-text').textContent = pickRandom(FACTS[theme] || FACTS.cloudy);

  // Hourly
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
      <div class="hour-feels">${precip > 0 ? '💧 '+precip+'%' : '&nbsp;'}</div>
    `;
    hourlyRow.appendChild(card);
  }

  // Temperature SVG chart
  renderTempChart(d);

  // 7-day
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

  document.getElementById('tip-box').textContent = TIPS[theme] || TIPS.cloudy;

  show('weather');

  // Init map after weather shown (needs DOM visible)
  requestAnimationFrame(() => initMap(currentLat, currentLon));
}

// ── SVG Temp Chart ──
function renderTempChart(d) {
  const svg = document.getElementById('temp-chart');
  const daysEl = document.getElementById('chart-days');
  const W = 620, H = 160, pad = 30;
  const highs = d.daily.temperature_2m_max.map(v => useCelsius ? v : toF(v));
  const lows  = d.daily.temperature_2m_min.map(v => useCelsius ? v : toF(v));
  const allVals = [...highs, ...lows];
  const minV = Math.min(...allVals) - 5;
  const maxV = Math.max(...allVals) + 5;
  const n = highs.length;

  const xPos = i => pad + (i / (n - 1)) * (W - pad * 2);
  const yPos = v => H - pad - ((v - minV) / (maxV - minV)) * (H - pad * 2);

  // gradient area under highs
  const areaPoints = highs.map((v, i) => `${xPos(i)},${yPos(v)}`).join(' ');
  const areaPath = `M ${xPos(0)},${yPos(highs[0])} ` +
    highs.map((v, i) => `L ${xPos(i)},${yPos(v)}`).join(' ') +
    ` L ${xPos(n-1)},${H} L ${xPos(0)},${H} Z`;

  const linePath = highs.map((v, i) => `${i===0?'M':'L'} ${xPos(i)},${yPos(v)}`).join(' ');
  const lowPath  = lows.map((v, i)  => `${i===0?'M':'L'} ${xPos(i)},${yPos(v)}`).join(' ');

  svg.innerHTML = `
    <defs>
      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ff6b35" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#ff6b35" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="${areaPath}" fill="url(#chartGrad)"/>
    <path d="${linePath}" fill="none" stroke="#ff6b35" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${lowPath}"  fill="none" stroke="#4f9eff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5,4"/>
    ${highs.map((v, i) => `
      <circle cx="${xPos(i)}" cy="${yPos(v)}" r="5" fill="#ff6b35" stroke="white" stroke-width="2"/>
      <text x="${xPos(i)}" y="${yPos(v)-10}" text-anchor="middle" font-size="11" font-weight="900" fill="#e53935" font-family="Nunito,sans-serif">${Math.round(v)}°</text>
    `).join('')}
    ${lows.map((v, i) => `
      <circle cx="${xPos(i)}" cy="${yPos(v)}" r="4" fill="#4f9eff" stroke="white" stroke-width="2"/>
    `).join('')}
  `;

  const days7 = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  daysEl.innerHTML = d.daily.time.map((dateStr, i) => {
    const date = new Date(dateStr + 'T12:00:00');
    return `<div class="chart-day">${i===0?'Today':days7[date.getDay()]}</div>`;
  }).join('');
}

// ── Map ──
async function initMap(lat, lon) {
  if (!weatherMap) {
    weatherMap = L.map('weather-map', { zoomControl: true, attributionControl: true })
      .setView([lat, lon], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(weatherMap);

    weatherMap.on('click', async e => {
      const { lat: clat, lng: clon } = e.latlng;
      const popup = L.popup().setLatLng([clat, clon])
        .setContent('<div class="map-popup">⏳ Loading...</div>')
        .openOn(weatherMap);
      try {
        const [geo, wx] = await Promise.all([
          reverseGeocode(clat, clon),
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${clat}&longitude=${clon}&current=temperature_2m,weather_code&temperature_unit=celsius&timezone=auto`).then(r=>r.json()),
        ]);
        const [, icon] = wmo(wx.current.weather_code);
        const [desc]   = wmo(wx.current.weather_code);
        const t = fmt(wx.current.temperature_2m);
        popup.setContent(`
          <div class="map-popup">
            <span class="pop-icon">${icon}</span>
            <div class="pop-city">${geo.city}</div>
            <div>${desc}</div>
            <div class="pop-temp">${t}</div>
          </div>
        `);
      } catch { popup.setContent('<div class="map-popup">❌ Could not load weather</div>'); }
    });

    if (radarOn) loadRadar();
  } else {
    weatherMap.setView([lat, lon], 7);
  }

  // Update marker
  if (mapMarker) weatherMap.removeLayer(mapMarker);
  const [, icon] = wmo(currentData?.current?.weather_code ?? 0);
  const divIcon = L.divIcon({
    html: `<div class="map-emoji">${icon}</div>`,
    className: '',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
  mapMarker = L.marker([lat, lon], { icon: divIcon }).addTo(weatherMap);
  mapMarker.bindPopup(`<div class="map-popup"><b class="pop-city">${currentCity}</b><br><span class="pop-temp">${document.getElementById('now-temp').textContent}</span></div>`);
}

async function loadRadar() {
  if (!weatherMap) return;
  if (radarLayer) { weatherMap.removeLayer(radarLayer); radarLayer = null; }
  try {
    const data  = await fetch('https://api.rainviewer.com/public/weather-maps.json').then(r => r.json());
    const frames = data.radar.past;
    if (!frames.length) return;
    const frame = frames[frames.length - 1];
    radarLayer = L.tileLayer(
      `https://tilecache.rainviewer.com${frame.path}/256/{z}/{x}/{y}/2/1_1.png`,
      { opacity: 0.55, zIndex: 10, attribution: 'RainViewer' }
    ).addTo(weatherMap);
  } catch { console.warn('Radar unavailable'); }
}

// ── Background & particles ──
const ALL_THEMES = ['sunny','clear-night','cloudy','rainy','snowy','stormy','foggy'];
function setBackground(theme) {
  ALL_THEMES.forEach(t => bgLayer.classList.remove('bg-'+t));
  bgLayer.classList.add('bg-'+theme);
  spawnParticles(theme);
}
function spawnParticles(theme) {
  particlesEl.innerHTML = '';
  if (theme === 'rainy' || theme === 'stormy') {
    for (let i = 0; i < (theme==='stormy'?90:55); i++) {
      const el = document.createElement('div');
      el.className = 'particle drop';
      const h = 10 + Math.random()*20;
      el.style.cssText=`left:${Math.random()*100}%;top:${-Math.random()*30}%;height:${h}px;opacity:${.3+Math.random()*.5};animation-duration:${.35+Math.random()*.45}s;animation-delay:${-Math.random()*2}s;`;
      particlesEl.appendChild(el);
    }
  }
  if (theme === 'snowy') {
    for (let i = 0; i < 70; i++) {
      const el = document.createElement('div');
      el.className = 'particle flake';
      const sz = 4+Math.random()*7;
      el.style.cssText=`left:${Math.random()*100}%;top:${-Math.random()*20}%;width:${sz}px;height:${sz}px;animation-duration:${3+Math.random()*4}s;animation-delay:${-Math.random()*5}s;`;
      particlesEl.appendChild(el);
    }
  }
  if (theme === 'clear-night') {
    for (let i = 0; i < 140; i++) {
      const el = document.createElement('div');
      el.className = 'particle star';
      const sz = 1+Math.random()*3;
      el.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*75}%;width:${sz}px;height:${sz}px;animation-duration:${1.5+Math.random()*3}s;animation-delay:${-Math.random()*4}s;`;
      particlesEl.appendChild(el);
    }
  }
  if (theme === 'sunny') {
    const colors=['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff9f1c','#c77dff'];
    for (let i = 0; i < 28; i++) {
      const el = document.createElement('div');
      el.className = 'particle confetti-piece';
      el.style.cssText=`left:${Math.random()*100}%;top:${-Math.random()*10}%;background:${colors[i%colors.length]};animation-duration:${4+Math.random()*4}s;animation-delay:${-Math.random()*6}s;border-radius:${Math.random()>.5?'50%':'3px'};`;
      particlesEl.appendChild(el);
    }
  }
}

// ── Auto-refresh ──
function startRefresh(lat, lon, city, country) {
  clearInterval(refreshTimer);
  countdown = 600; tick();
  refreshTimer = setInterval(() => {
    countdown--; tick();
    if (countdown <= 0) { countdown = 600; fetchWeather(lat, lon, city, country); }
  }, 1000);
}
function tick() {
  const m = Math.floor(countdown/60), s = countdown%60;
  refreshInfo.textContent = `🔄 Refreshes in ${m}:${String(s).padStart(2,'0')}`;
}

// ── Show/hide ──
function showError(msg) { errorMsg.textContent = msg; show('error'); }
function show(which) {
  [loadingEl, errorEl, weatherEl].forEach(el => el.classList.add('hidden'));
  if (which==='loading') loadingEl.classList.remove('hidden');
  if (which==='error')   errorEl.classList.remove('hidden');
  if (which==='weather') weatherEl.classList.remove('hidden');
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
