const bodyParser = require('body-parser');
const express = require('express');

const deviceRouter = require('./routes/device.routes');

const app = express();
app.use(bodyParser.json());

app.use('/device', deviceRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(3003);
