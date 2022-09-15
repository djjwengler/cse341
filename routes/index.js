const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Oliver James Wengler');
});

module.exports = routes;