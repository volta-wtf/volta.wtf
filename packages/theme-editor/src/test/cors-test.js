import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4445;

// Middleware CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'CORS test endpoint' });
});

app.post('/test-post', (req, res) => {
  res.json({ message: 'POST with CORS works', body: req.body });
});

app.listen(PORT, () => {
  console.log(`🧪 CORS test server running on http://localhost:${PORT}`);
});