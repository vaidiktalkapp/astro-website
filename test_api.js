const lat = 31.57;
const lon = 75.98;
const date = "2026-08-26";

fetch('http://localhost:3001/api/v1/astrology/today', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat: lat, lon: lon, date: date })
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(err => console.error(err));
