const express = require('express');
const connectToDb = require('./config/database');
const User = require('./models/user');
const app = express();

app.use(express.json());

// request handler function
app.post('/signup', async (req, res) => {
  //creating new instance for User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send('User Added Successfully');
  } catch (error) {
    res.status(400).send('Error saving the users:' + err.message);
  }
});

// Getting user by emailId
app.get('/user', async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    res.send(user);
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
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
