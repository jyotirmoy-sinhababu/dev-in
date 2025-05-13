const express = require('express');
const connectToDb = require('./config/database');
const app = express();

// request handler function
app.use((res, req) => {
  res.send('Hello from the server');
});

//connecting to database first than listening to port
connectToDb()
  .then(() => {
    console.log('Database connection established...');
    app.listen(3000, () => {
      console.log('Server is successfully listening to port 3000');
    });
  })
  .catch((err) => {
    console.error('Database cannot be connected');
  });
