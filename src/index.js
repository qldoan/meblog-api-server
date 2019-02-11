require('./global');
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

let app = express();

app.server = http.createServer(app);

let errorHandler = (error, req, res, next) => {
  let json = error;
  
  if (error.toJSON) {
    json = error.toJSON();
  } else {
    json = {
      code: 500,
      message: 'Internal server error'
    };
  }
  res.status(json.code).json(json);
};

app
  .use('/', cors({
    origin: config.allowOrigin,
    optionsSuccessStatus: 200
  }))
  .use(morgan('common'))
  .use(bodyParser.json({
    limit: '50mb'
  }))
  .use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
  }))
  .use(routes)
  .use(errorHandler);

app.get('/', (req, res) => {
  res.send('Storagem API server');
});

app.get('*', (req, res) => {
  res.status(404).json({code: '404', message: 'Not found'});
});

app.server.listen(config.server.port || 3000, () => {
  console.log(`Started ${env} server on port ${app.server.address().port}`);
});
