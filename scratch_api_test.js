

async function test() {
  const res = await fetch('http://localhost:3001/api/v1/astrology/today', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat: 28.6139, lon: 77.2090, tzone: 5.5, date: '2026-08-26' })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

test();
