const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/movies', require('./controllers/movies'));
app.use('/api/v1/dogs', require('./controllers/dogs'));
app.use('/api/v1/countries', require('./controllers/countries'));
app.use('/api/v1/pizzas', require('./controllers/pizzas'));
app.use('/api/v1/states', require('./controllers/states'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
