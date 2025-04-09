// backends/Server.js
import cors from 'cors';
import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';

// ROUTER'ları içe aktar

// ES module için __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static dosya servisi (örneğin asset görselleri)
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));

// API Router'ları
// app.use('/assets', assetController);
// app.use('/scene', sceneController);

app.get('/', (req, res) => {
    res.send('✅ LÖVE2D Web Editor Backend is running');
  });
  

// HTTP + WebSocket birlikte kullanımı
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// WebSocket bağlantısı
wss.on('connection', (ws) => {
  console.log('WebSocket bağlandı');

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);
      if (msg.type === 'UPDATE_SCENE') {
        // Broadcast tüm client'lara
        wss.clients.forEach((client) => {
          if (client.readyState === 1 && client !== ws) {
            client.send(JSON.stringify({ type: 'SCENE_UPDATED', payload: msg.payload }));
          }
        });
      }
    } catch (err) {
      console.error('WebSocket mesaj hatası:', err);
    }
  });
});

// PORT dinleme
server.listen(3000, () => {
  console.log(' Server is running on http://localhost:3000');
});
