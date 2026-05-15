const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected');

    // Delete existing admin if any
    await User.deleteOne({ email: 'admin@shopease.com' });

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await User.create({
      name: 'Admin',
      email: 'admin@shopease.com',
      password: hashedPassword,
      isAdmin: true,
    });

    console.log('✅ Admin created!');
    console.log('📧 Email: admin@shopease.com');
    console.log('🔑 Password: admin123');

    mongoose.connection.close();
  } catch (error) {
    console.log('❌ Error:', error);
  }
};

createAdmin();