const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./src/database/connect');
const port = process.env.PORT || 3000;
const db = process.env.DB_NAME;
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const corsOptions = {
  origin: '*'
};

app
  .use(cors(corsOptions))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
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
