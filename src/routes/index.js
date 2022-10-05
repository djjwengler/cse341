const routes = require('express').Router();
const contacts = require('./contacts');

routes.use('/', require('./swagger'));
routes.use('/contacts', contacts);
routes.use('/', () => {});

module.exports = routes;
