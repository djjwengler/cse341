const routes = require('express').Router();
const contacts = require('./contacts');

routes.use('/contacts', contacts);
routes.use('/', () => {});

module.exports = routes;
