const mongoose = require('mongoose');

const connectToDb = async () => {
  await mongoose.connect(
    'mongodb+srv://Testing:lMj3irkla3GSePku@testing.w68coqi.mongodb.net/devTinder'
  );
};

module.exports = connectToDb;
