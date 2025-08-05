//Won't push another API key/MySQL password to github a second time

require('dotenv').config();

//Classic setup

const express = require('express');
const app = express();

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

//Basic security middleware

const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());
app.use(cors());

//MongoDB connection

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log('Connected !'))
  .catch(err => console.error('MongoDB connection error:', err));

//App

const viewsRoutes = require('../routes/Views.js');

app.use('/', viewsRoutes);

// Middleware to handle errors

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something is wrong whoops');
})

module.exports = app;