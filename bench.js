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
  try {
    console.log('🚀 Iniciando benchmarks comparativos...\n');
    
    console.log('📊 Benchmark /ping (endpoint simple)');
    console.log('='.repeat(50));
    const r1 = await run({ 
      url: 'http://localhost:3000/ping', 
      connections: 50, 
      duration: 10 
    });
    
    console.log(`📈 Resultados /ping:
  - Req/s promedio: ${r1.requests.average.toFixed(2)}
  - Latencia promedio: ${r1.latency.average.toFixed(2)}ms
  - Latencia p99: ${r1.latency.p99.toFixed(2)}ms
  - Total requests: ${r1.requests.total}
  - Errores: ${r1.errors}\n`);

    console.log('📊 Benchmark /calc (endpoint con CPU)');
    console.log('='.repeat(50));
    const r2 = await run({
      url: 'http://localhost:3000/calc',
      method: 'POST',
      connections: 50,
      duration: 10,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 5, b: 7 })
    });
    
    console.log(`📈 Resultados /calc:
  - Req/s promedio: ${r2.requests.average.toFixed(2)}
  - Latencia promedio: ${r2.latency.average.toFixed(2)}ms
  - Latencia p99: ${r2.latency.p99.toFixed(2)}ms
  - Total requests: ${r2.requests.total}
  - Errores: ${r2.errors}\n`);

    // Análisis comparativo
    const ratio = (r1.requests.average / r2.requests.average).toFixed(2);
    const latencyRatio = (r2.latency.average / r1.latency.average).toFixed(2);
    
    console.log('🔍 Análisis Comparativo:');
    console.log('='.repeat(50));
    console.log(`🚀 /ping es ~${ratio}x más rápido que /calc en throughput`);
    console.log(`⏱️  /calc tiene ~${latencyRatio}x más latencia que /ping`);
    
    // Determinar el impacto del procesamiento CPU
    const cpuImpact = ((r1.requests.average - r2.requests.average) / r1.requests.average * 100).toFixed(1);
    console.log(`🧠 El procesamiento CPU reduce el throughput en ~${cpuImpact}%`);
    
  } catch (error) {
    console.error('❌ Error durante el benchmark:', error);
    process.exit(1);
  }
})();
