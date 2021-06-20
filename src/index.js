require('./models/User');
require('./models/Track')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.on('connected', () => {
  console.log('connection Succesful');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connection', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your Email : ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
