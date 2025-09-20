
<!-- Autocannon es una herramienta de línea de comandos (CLI) y también una librería para Node.js diseñada para realizar pruebas de rendimiento (benchmark y carga) sobre servidores HTTP. Permite generar múltiples conexiones concurrentes para medir métricas clave como:
- Peticiones por segundo (req/s)
- Latencias (p50, p75, p90, p99)
- Throughput (bytes/s)
- Errores y timeouts -->





### Prueba básica

npx autocannon http://localhost:3000/ping


### Incrementar carga

npx autocannon -c 100 -d 30 http://localhost:3000/ping

### Petición POST con cuerpo JSON (PowerShell)

npx autocannon -c 40 -d 20 -m POST -H "Content-Type=application/json" -b '{"a":10,"b":20}' http://localhost:3000/calc

### Petición POST con cuerpo JSON (Linux/Bash)

npx autocannon -c 40 -d 20 -m POST \
  -H "Content-Type=application/json" \
  -b '{"a":10,"b":20}' \
  http://localhost:3000/calc


### Salida en JSON

npx autocannon -c 50 -d 15 --json http://localhost:3000/ping > resultado.json

## Tests Adicionales

### Prueba de estrés extremo
npx autocannon -c 200 -d 60 http://localhost:3000/ping

### Prueba de saturación gradual
npx autocannon -c 500 -d 10 http://localhost:3000/ping

### Prueba de duración extendida
npx autocannon -c 50 -d 120 http://localhost:3000/ping

### Test de latencia mínima (1 conexión)
npx autocannon -c 1 -d 30 http://localhost:3000/ping

### Comparación rápida ping vs calc
npx autocannon -c 20 -d 5 http://localhost:3000/ping && npx autocannon -c 20 -d 5 -m POST -H "Content-Type=application/json" -b '{"a":5,"b":7}' http://localhost:3000/calc

### Test con diferentes payloads JSON

#### Payload pequeño
npx autocannon -c 30 -d 10 -m POST -H "Content-Type=application/json" -b '{"a":1,"b":2}' http://localhost:3000/calc

#### Payload más grande
npx autocannon -c 30 -d 10 -m POST -H "Content-Type=application/json" -b '{"a":999999,"b":888888,"description":"test con números grandes"}' http://localhost:3000/calc

### Tests de rendimiento con warmup
npx autocannon -c 10 -d 5 http://localhost:3000/ping && npx autocannon -c 50 -d 20 http://localhost:3000/ping

### Test con timeout personalizado
npx autocannon -c 50 -d 15 --timeout 5000 http://localhost:3000/ping

### Test con headers personalizados
npx autocannon -c 30 -d 10 -H "User-Agent=AutocannonTest" -H "X-Test-ID=123" http://localhost:3000/ping

### Test de límites (encontrar el punto de quiebre)
npx autocannon -c 1000 -d 30 http://localhost:3000/ping

### Prueba de estabilidad (larga duración, carga moderada)
npx autocannon -c 25 -d 300 http://localhost:3000/ping

### Test con múltiples workers
npx autocannon -c 100 -d 20 --workers 4 http://localhost:3000/ping

### Tests de diferentes métodos HTTP

#### HEAD request
npx autocannon -c 20 -d 10 -m HEAD http://localhost:3000/ping

#### OPTIONS request  
npx autocannon -c 20 -d 10 -m OPTIONS http://localhost:3000/ping

### Exportar resultados detallados
npx autocannon -c 50 -d 20 --json http://localhost:3000/ping > ping_detailed.json
npx autocannon -c 50 -d 20 --json -m POST -H "Content-Type=application/json" -b '{"a":10,"b":20}' http://localhost:3000/calc > calc_detailed.json

### Test de percentiles específicos
npx autocannon -c 50 -d 30 --percentiles 50,75,90,95,99,99.9 http://localhost:3000/ping

### Prueba de reconexión
npx autocannon -c 50 -d 20 --reconnectRate 10 http://localhost:3000/ping

### Test con pipeline HTTP
npx autocannon -c 20 -d 15 --pipelining 10 http://localhost:3000/ping

## Comandos específicos para Linux/Bash

### Pruebas con múltiples líneas (sintaxis bash)
```bash
# Test POST con formato legible
npx autocannon -c 40 -d 20 -m POST \
  -H "Content-Type=application/json" \
  -b '{"a":10,"b":20}' \
  http://localhost:3000/calc

# Test con headers múltiples
npx autocannon -c 30 -d 10 \
  -H "User-Agent=AutocannonTest" \
  -H "X-Test-ID=123" \
  -H "Accept=application/json" \
  http://localhost:3000/ping

# Export con timestamp
npx autocannon -c 50 -d 20 --json \
  http://localhost:3000/ping > "ping_$(date +%Y%m%d_%H%M%S).json"
```

### Scripts bash para automatización
```bash
#!/bin/bash
# Crear archivo: test_suite.sh

echo "Iniciando suite de pruebas..."

echo "Test básico /ping"
npx autocannon -c 50 -d 10 http://localhost:3000/ping

echo "Test básico /calc"
npx autocannon -c 50 -d 10 -m POST \
  -H "Content-Type=application/json" \
  -b '{"a":10,"b":20}' \
  http://localhost:3000/calc

echo "Tests completados"
```

### Comandos con variables de entorno
```bash
export BASE_URL="http://localhost:3000"
export CONNECTIONS=50
export DURATION=20

npx autocannon -c $CONNECTIONS -d $DURATION $BASE_URL/ping
```

### Pipeline y redirección avanzada
```bash
# Test con logging detallado
npx autocannon -c 50 -d 15 http://localhost:3000/ping 2>&1 | tee test_log.txt

# Comparación con timestamp
{
  echo "=== PING TEST $(date) ==="
  npx autocannon -c 30 -d 10 http://localhost:3000/ping
  echo "=== CALC TEST $(date) ==="
  npx autocannon -c 30 -d 10 -m POST \
    -H "Content-Type=application/json" \
    -b '{"a":5,"b":7}' \
    http://localhost:3000/calc
} > comparison_$(date +%Y%m%d).log
```

## Rangos de Rendimiento y Interpretación

### Latencia (Tiempo de Respuesta)

#### Endpoint `/ping` (sin procesamiento)
- **Excelente**: < 5ms promedio
- **Bueno**: 5-15ms promedio  
- **Aceptable**: 15-50ms promedio
- **Malo**: > 50ms promedio

#### Endpoint `/calc` (con CPU intensiva)
- **Excelente**: < 50ms promedio
- **Bueno**: 50-100ms promedio
- **Aceptable**: 100-200ms promedio
- **Malo**: > 200ms promedio

#### Latencia p99 (Percentil 99)
- **Excelente**: < 100ms
- **Bueno**: 100-300ms
- **Aceptable**: 300-500ms
- **Malo**: > 500ms

### Throughput (Requests por Segundo)

#### Para endpoints simples (`/ping`)
- **Excelente**: > 1000 req/s
- **Bueno**: 500-1000 req/s
- **Aceptable**: 100-500 req/s
- **Malo**: < 100 req/s

#### Para endpoints con procesamiento (`/calc`)
- **Excelente**: > 300 req/s
- **Bueno**: 150-300 req/s
- **Aceptable**: 50-150 req/s
- **Malo**: < 50 req/s

### Throughput por nivel de concurrencia

#### Baja concurrencia (1-10 conexiones)
- **Excelente**: > 800 req/s
- **Bueno**: 400-800 req/s
- **Aceptable**: 100-400 req/s
- **Malo**: < 100 req/s

#### Media concurrencia (20-50 conexiones)
- **Excelente**: > 600 req/s
- **Bueno**: 300-600 req/s
- **Aceptable**: 100-300 req/s
- **Malo**: < 100 req/s

#### Alta concurrencia (100+ conexiones)
- **Excelente**: > 400 req/s
- **Bueno**: 200-400 req/s
- **Aceptable**: 50-200 req/s
- **Malo**: < 50 req/s

### Estabilidad y Errores

#### Tasa de errores
- **Excelente**: 0% errores
- **Bueno**: < 0.1% errores
- **Aceptable**: 0.1-1% errores
- **Malo**: > 1% errores

#### Consistencia (desviación estándar)
- **Excelente**: Stdev < 10% del promedio
- **Bueno**: Stdev 10-25% del promedio
- **Aceptable**: Stdev 25-50% del promedio
- **Malo**: Stdev > 50% del promedio

### Pruebas de Duración Extendida

#### Tests de 2+ minutos
- **Excelente**: Rendimiento estable (±5%)
- **Bueno**: Degradación < 10%
- **Aceptable**: Degradación 10-25%
- **Malo**: Degradación > 25% o memory leaks

### Pruebas de Estrés (500+ conexiones)

#### Comportamiento bajo estrés extremo
- **Excelente**: Mantiene > 50% del rendimiento normal
- **Bueno**: Mantiene 25-50% del rendimiento
- **Aceptable**: Mantiene 10-25% del rendimiento
- **Malo**: < 10% del rendimiento o crashes

### Consumo de Recursos (orientativo)

#### CPU durante las pruebas
- **Excelente**: < 70% CPU usage
- **Bueno**: 70-85% CPU usage
- **Aceptable**: 85-95% CPU usage
- **Malo**: > 95% CPU usage sostenido

#### Memoria
- **Excelente**: Uso estable de RAM
- **Bueno**: Crecimiento < 10% durante test
- **Aceptable**: Crecimiento 10-25%
- **Malo**: Memory leaks evidentes

## Ejemplos de Interpretación

### Resultado ejemplo para `/ping`:
```
Latency avg: 2ms (Excelente)
Req/Sec: 650 (Bueno)
p99: 8ms (Excelente)
Errores: 0 (Excelente)
```
**Veredicto**: Servidor muy bien optimizado para endpoints simples.

### Resultado ejemplo para `/calc`:
```
Latency avg: 75ms (Bueno)
Req/Sec: 527 (Excelente para CPU intensive)
p99: 385ms (Aceptable)
Errores: 0 (Excelente)
```
**Veredicto**: Buen rendimiento considerando la carga de CPU.

## Factores que afectan el rendimiento

### Mejoran el rendimiento:
- Más CPU cores
- Más RAM disponible
- SSD vs HDD
- Node.js versión reciente
- Optimizaciones de código
- Keep-alive connections

### Empeoran el rendimiento:
- Procesos en background
- Antivirus activo
- Poca RAM (swap)
- Disco duro fragmentado
- Múltiples aplicaciones corriendo
- Network latency

