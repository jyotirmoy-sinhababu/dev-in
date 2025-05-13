const mongoose = require('mongoose');

const connectToDb = async () => {
  await mongoose.connect(
    'mongodb+srv://Testing:VhA8irCOBoncmBR7@testing.w68coqi.mongodb.net/devTinder'
  );
};

module.exports = connectToDb;
