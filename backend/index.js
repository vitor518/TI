// load environment variables from .env.backend when running locally
const path = require('path');

// load .env.backend from project root (backend runs from backend/ directory)
// load base env (shared for docker) first, then allow local overrides in .env.local
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.backend') });
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.local'), override: true });

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;
const sequelize = require('./db');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
