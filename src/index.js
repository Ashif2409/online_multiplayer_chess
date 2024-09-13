require('dotenv').config()
const express = require('express');
// const initializeSocket = require('./socket');


const app = express();
app.use(express.json());


const {connectDb}=require('./db/dbConnection')

const port=process.env.SERVER_PORT || 3000;

(async function() {
  await connectDb()
})();
const {userRouter}=require('./route/index')
app.use(userRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });