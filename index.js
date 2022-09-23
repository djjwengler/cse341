const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./src/database/connect');
const port = process.env.PORT || 3000
const db = process.env.DB_NAME
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./src/routes'));

mongodb.initDatabase((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to database ${db} and listening on ${port}`);
  }
});