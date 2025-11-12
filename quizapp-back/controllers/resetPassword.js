const mongoose = require('mongoose');
const User = require('./models/user'); // adjust path if needed

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://admin:NSukiTDOuttd9Auw@cluster0.odyo9j9.mongodb.net/quizdb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

async function resetPasswords() {
  try {
    // Fetch all users
    const users = await User.find();

    for (const user of users) {
      // Replace password with plain-text 'test123' (or any password you choose)
      user.password = 'test123';
      await user.save();
      console.log(`Updated password for user: ${user.email}`);
    }

    console.log('✅ All passwords reset to plain-text!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error resetting passwords:', err);
    process.exit(1);
  }
}

resetPasswords();
