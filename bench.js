const autocannon = require('autocannon');

function run (opts) {
  return new Promise((resolve, reject) => {
    const inst = autocannon(opts, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    autocannon.track(inst, { renderProgressBar: true });
  });
}

(async () => {
  console.log('Benchmark /ping');
  const r1 = await run({ url: 'http://localhost:3000/ping', connections: 50, duration: 10 });
  console.log('Req/s promedio /ping:', r1.requests.average);

  console.log('Benchmark /calc');
  const r2 = await run({
    url: 'http://localhost:3000/calc',
    method: 'POST',
    connections: 50,
    duration: 10,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ a: 5, b: 7 })
  });
  console.log('Req/s promedio /calc:', r2.requests.average);

  const ratio = (r1.requests.average / r2.requests.average).toFixed(2);
  console.log(`/ping es ~${ratio} veces más rápido que /calc.`);
})();
