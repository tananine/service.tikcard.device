require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');

const deviceRouter = require('./routes/device.routes');

const app = express();
app.use(bodyParser.json());

app.use('/device', deviceRouter);

app.use((error, req, res, next) => {
  const showClientMessage = error.showClientMessage;
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data, showClientMessage });
});

const PORT = process.env.PORT;
const listener = app.listen(PORT, () =>
  console.log('Server started on port ' + listener.address().port)
);
