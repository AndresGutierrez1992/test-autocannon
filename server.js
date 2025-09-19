const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Endpoint simple
app.get('/ping', (req, res) => {
  console.log(' Request recibida en /ping');
  res.json({ pong: true, time: Date.now() });
});

// Endpoint con algo de CPU simulada
app.post('/calc', (req, res) => {
  console.log(' Request recibida en /calc:', req.body);
  const { a = 0, b = 0 } = req.body || {};
  let sum = 0;
  for (let i = 0; i < 50_000; i++) sum += i;
  res.json({ result: a + b, sumInternal: sum });
});

const PORT = 3000;
const server = app.listen(PORT, 'localhost', () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Server is ready to receive requests`);
});

server.on('error', (err) => {
  console.error(' Server error:', err);
});
