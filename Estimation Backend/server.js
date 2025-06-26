const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
// Import route handlers
const estimation = require('./routes/estimation');
// const getSubjects = require('./routes/getSemSubjects');

const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Backend uploaded..');
});


app.use('/api', estimation);
// app.use('/api', getSubjects);

const db = process.env.CONNECTION;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('MongoDB connection error:', err));


app.listen(5000, () => console.log(`Server started on port 5000`));
