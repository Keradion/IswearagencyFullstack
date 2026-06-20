/**
 * Seed script — creates the admin user in MongoDB Atlas.
 * Run once: npm run seed
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const ADMIN_EMAIL = 'mesfin@iswearagency.com';
const ADMIN_PASSWORD = 'mesfin@iswear';
const ADMIN_NAME = 'Mesfin';

async function seed() {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log('✅ Connected');

    // Check if admin already exists
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      console.log('ℹ️  Admin user already exists:', ADMIN_EMAIL);
      console.log('   To reset the password, delete the user from Atlas and re-run this script.');
      await mongoose.disconnect();
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    // Create admin
    const admin = await User.create({
      email: ADMIN_EMAIL,
      passwordHash,
      role: 'admin',
      name: ADMIN_NAME,
    });

    console.log('✅ Admin user created successfully!');
    console.log('   Email   :', admin.email);
    console.log('   Name    :', admin.name);
    console.log('   Role    :', admin.role);
    console.log('   ID      :', admin._id);
    console.log('\n🔐 Login credentials:');
    console.log('   Email   :', ADMIN_EMAIL);
    console.log('   Password:', ADMIN_PASSWORD);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seed();
