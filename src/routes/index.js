const routes = require('express').Router();
const contacts = require('./contacts')

routes.use('/contacts', contacts)

module.exports = routes;