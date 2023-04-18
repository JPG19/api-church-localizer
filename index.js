import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import { getChurches, getChurch, updateChurch } from './controllers/churchController.js';

// Load env vars
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

const app = express();

// allow calls from this origin https://church-localizer.vercel.app'
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://church-localizer.vercel.app', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Use the body-parser middleware
app.use(bodyParser.json());

app.get('/api/churches', (req, res) => {
  getChurches(req, res);
});

app.get('/api/churches/:id', (req, res) => {
  getChurch(req, res);
});

app.put('/api/churches/:id', (req, res) => {
  updateChurch(req, res);
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


