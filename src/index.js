const express = require('express');
const initializeSocket = require('./socket');
const dotenv=require('dotenv');
dotenv.config();
const app = express();
const port=process.env.SERVER_PORT || 3000;

initializeSocket();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });