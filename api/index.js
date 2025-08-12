//Won't push another API key/MySQL password to github a second time

require('dotenv').config();

//Classic setup

const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

//Doesn't need this for vercel prod

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

//Basic security middleware

const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//API key setup
//TODO


//MongoDB connection

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log('Connected !'))
  .catch(err => console.error('MongoDB connection error:', err));

//App

const viewsRoutes = require('../routes/Views.js');
app.use('/api', viewsRoutes);


// Middleware to handle errors

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something is wrong whoops');
})

// Add static middleware with MIME type configuration
app.use('/overlay', express.static(path.join(__dirname, '../public/overlay'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

module.exports = app;