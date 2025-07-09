const express = require('express');
const connectToDb = require('./config/database');
const { validateSignUpData } = require('./utils/validation');
const cookieParser = require('cookie-parser');

const User = require('./models/user');
const app = express();

const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cookieParser());

// request handler function
app.post('/signup', async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);
    //Encrypt password
    const { password } = req.body;

    const passwordHash = bcrypt.hash(password, 10);

    //creating new instance for User model
    const user = new User(req.body);
    await user.save();
    res.send('User Added Successfully');
  } catch (error) {
    res.status(400).send('Error saving the users:' + err.message);
  }
});

// login request handler

app.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error('Invalid Credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send('Login Successful');
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    res.status(400).send('Error:' + error.message);
  }
});

// Getting user by emailId
app.get('/user', async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      console.log('error 404, email not found');
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send('Something went wrong');
  }
});

app.get('/profile', async (req, res) => {
  const cookies = req.cookies;
  const { token } = cookies;
  console.log(cookies);
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
