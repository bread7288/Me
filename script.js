// Uses Open-Meteo (free, no API key) + Open-Meteo Geocoding

const WMO = {
  0:  ['Clear Sky',          '☀️'],
  1:  ['Mostly Clear',       '🌤️'],
  2:  ['Partly Cloudy',      '⛅'],
  3:  ['Overcast',           '☁️'],
  45: ['Foggy',              '🌫️'],
  48: ['Icy Fog',            '🌫️'],
  51: ['Light Drizzle',      '🌦️'],
  53: ['Drizzle',            '🌦️'],
  55: ['Heavy Drizzle',      '🌧️'],
  61: ['Light Rain',         '🌧️'],
  63: ['Rain',               '🌧️'],
  65: ['Heavy Rain',         '🌧️'],
  71: ['Light Snow',         '🌨️'],
  73: ['Snow',               '❄️'],
  75: ['Heavy Snow',         '❄️'],
  77: ['Snow Grains',        '🌨️'],
  80: ['Light Showers',      '🌦️'],
  81: ['Showers',            '🌧️'],
  82: ['Heavy Showers',      '⛈️'],
  85: ['Snow Showers',       '🌨️'],
  86: ['Heavy Snow Showers', '🌨️'],
  95: ['Thunderstorm',       '⛈️'],
  96: ['Thunderstorm + Hail','⛈️'],
  99: ['Thunderstorm + Hail','⛈️'],
};

function wmo(code) {
  return WMO[code] || ['Unknown', '🌡️'];
}

// DOM refs
const cityInput  = document.getElementById('city-input');
const searchBtn  = document.getElementById('search-btn');
const locateBtn  = document.getElementById('locate-btn');
const loadingEl  = document.getElementById('loading');
const errorEl    = document.getElementById('error');
const errorMsg   = document.getElementById('error-msg');
const weatherEl  = document.getElementById('weather');

searchBtn.addEventListener('click', () => {
  const q = cityInput.value.trim();
  if (q) searchCity(q);
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchBtn.click();
});

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
  } catch {
    showError('Could not reach geocoding service.');
  }
}

async function fetchWeather(lat, lon, city, country) {
  show('loading');
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,visibility,surface_pressure` +
      `&hourly=temperature_2m,weather_code,precipitation_probability` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
      `&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=auto&forecast_days=7`;

    const res  = await fetch(url);
    const data = await res.json();
    renderWeather(data, city, country);
  } catch {
    showError('Could not fetch weather data.');
  }
}

function renderWeather(d, city, country) {
  const c = d.current;

  // Location & time
  document.getElementById('city-name').textContent = city;
  document.getElementById('country').textContent   = country;

  const now = new Date();
  document.getElementById('datetime').textContent =
    now.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' }) +
    ' · ' + now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });

  // Current
  const [condText, condIcon] = wmo(c.weather_code);
  document.getElementById('temp').textContent         = Math.round(c.temperature_2m) + '°F';
  document.getElementById('feels').textContent        = Math.round(c.apparent_temperature) + '°F';
  document.getElementById('cond-icon').textContent    = condIcon;
  document.getElementById('cond-text').textContent    = condText;
  document.getElementById('humidity').textContent     = c.relative_humidity_2m + '%';
  document.getElementById('wind').textContent         = Math.round(c.wind_speed_10m) + ' mph';
  document.getElementById('visibility').textContent   = c.visibility >= 1000
    ? (c.visibility / 1000).toFixed(1) + ' km' : c.visibility + ' m';
  document.getElementById('pressure').textContent     = Math.round(c.surface_pressure) + ' hPa';

  // Sunrise/sunset from daily[0]
  const fmt = (iso) => new Date(iso).toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
  document.getElementById('sunrise').textContent = fmt(d.daily.sunrise[0]);
  document.getElementById('sunset').textContent  = fmt(d.daily.sunset[0]);

  // Hourly (next 24 hrs)
  const track     = document.getElementById('hourly-track');
  const nowHour   = new Date().getHours();
  const todayStr  = new Date().toISOString().slice(0, 10);
  track.innerHTML = '';

  // Find current hour index
  const currentIdx = d.hourly.time.findIndex(t => {
    const d2 = new Date(t);
    return d2 >= new Date();
  });

  const start = currentIdx >= 0 ? currentIdx : 0;
  for (let i = start; i < start + 24 && i < d.hourly.time.length; i++) {
    const t    = new Date(d.hourly.time[i]);
    const isNow = i === start;
    const [, icon] = wmo(d.hourly.weather_code[i]);
    const card = document.createElement('div');
    card.className = 'hour-card' + (isNow ? ' now' : '');
    card.innerHTML = `
      <div class="hour-time">${isNow ? 'Now' : t.toLocaleTimeString('en-US', { hour:'numeric', hour12:true })}</div>
      <div class="hour-icon">${icon}</div>
      <div class="hour-temp">${Math.round(d.hourly.temperature_2m[i])}°</div>
      <div class="hour-precip">${d.hourly.precipitation_probability[i] ?? 0}% 💧</div>
    `;
    track.appendChild(card);
  }

  // 7-day
  const list = document.getElementById('daily-list');
  list.innerHTML = '';
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  d.daily.time.forEach((dateStr, i) => {
    const date  = new Date(dateStr + 'T12:00:00');
    const label = i === 0 ? 'Today' : days[date.getDay()];
    const [, icon] = wmo(d.daily.weather_code[i]);
    const row = document.createElement('div');
    row.className = 'day-row';
    row.innerHTML = `
      <div class="day-name">${label}</div>
      <div class="day-icon">${icon}</div>
      <div class="day-low">${Math.round(d.daily.temperature_2m_min[i])}°</div>
      <div class="day-high">${Math.round(d.daily.temperature_2m_max[i])}°</div>
    `;
    list.appendChild(row);
  });

  show('weather');
}

function showError(msg) {
  errorMsg.textContent = msg;
  show('error');
}

function show(which) {
  loadingEl.classList.add('hidden');
  errorEl.classList.add('hidden');
  weatherEl.classList.add('hidden');
  if (which === 'loading') loadingEl.classList.remove('hidden');
  if (which === 'error')   errorEl.classList.remove('hidden');
  if (which === 'weather') weatherEl.classList.remove('hidden');
}

// Auto-detect location on load
if (navigator.geolocation) {
  show('loading');
  navigator.geolocation.getCurrentPosition(
    (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude, 'My Location', ''),
    () => searchCity('New York') // fallback
  );
} else {
  searchCity('New York');
}
