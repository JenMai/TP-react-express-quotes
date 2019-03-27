const express = require("express");
const router = require('./router');

const cors = require('cors');
const morgan = require('morgan');
const app = express();

const port = 8081;

app.use(morgan('combined'));
app.use(cors());
app.use(router)
    .listen(port, () => console.log('Example app listening on port ' + port));