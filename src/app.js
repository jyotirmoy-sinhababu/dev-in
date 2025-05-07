const express = require('express');

const app = express();

// request handler function
app.use((res, req) => {
  res.send('Hello from the server');
});

app.listen(3000, () => {
  console.log('Server is successfully listening to port 3000');
});
