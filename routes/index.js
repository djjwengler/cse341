const routes = require('express').Router();
const { index } = require("../controllers/index")

routes.get('/', index)

module.exports = routes;