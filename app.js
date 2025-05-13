const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'superSecretKey',
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use the auth routes
app.use('/auth', authRoutes);

// Register form
app.get('/register', (req, res) => {
  res.render('register');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
