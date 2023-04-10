import http from 'http';
import dotenv from 'dotenv';

import { getChurches, getChurch } from './controllers/churchController.js';

// Load env vars
dotenv.config({ path: './config/config.env' });

const server = http.createServer((req, res) => {
  if (req.url === '/api/churches' && req.method === 'GET') {
    getChurches(req, res);
  } else if (req.url.match(/\/api\/churches\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getChurch(req, res, id);
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default server;
