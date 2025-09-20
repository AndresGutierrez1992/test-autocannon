
// Umbrales de Aceptación (ejemplo)

const autocannon = require('autocannon');

autocannon({ url: 'http://localhost:3000/ping', duration: 10, connections: 50 }, (err, res) => {
  if (err) {
    console.error('❌ Error en la prueba:', err);
    process.exit(1);
  }
  
  // Corrigiendo el acceso a latencia p99
  const p99 = res.latency.p99;
  console.log('📊 Resultados de la prueba:');
  console.log('  - Latencia p99:', p99, 'ms');
  console.log('  - Requests/sec promedio:', res.requests.average);
  console.log('  - Total requests:', res.requests.total);
  console.log('  - Errores:', res.errors);
  
  // Validación de umbral
  const THRESHOLD_P99 = 500; // 500ms como umbral más realista para este endpoint
  
  if (p99 > THRESHOLD_P99) {
    console.error(`❌ FALLO: p99 (${p99}ms) > ${THRESHOLD_P99}ms`);
    console.error('🚨 El rendimiento está por debajo del umbral aceptable');
    process.exit(2);
  }
  
  console.log('✅ OK: rendimiento aceptable');
  console.log(`🎯 p99 (${p99}ms) está dentro del umbral (${THRESHOLD_P99}ms)`);
  process.exit(0);
});
