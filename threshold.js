const autocannon = require('autocannon');

autocannon({ url: 'http://localhost:3000/ping', duration: 10, connections: 50 }, (err, res) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const p99 = res.latency['99'];
  console.log('Latencia p99:', p99, 'ms');
  if (p99 > 15) {
    console.error('Fallo: p99 > 15ms');
    process.exit(2);
  }
  console.log('OK: rendimiento aceptable.');
  process.exit(0);
});
