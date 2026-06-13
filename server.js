import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Calculator route
app.get('/calculator.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'calculator.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ VUNA Calculator running at http://localhost:${PORT}`);
});