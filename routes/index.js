const routes = require('express').Router();
const { getGrandbaby } = require("../controllers/index")

routes.get('/', getGrandbaby)

module.exports = routes;