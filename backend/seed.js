const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: "Wireless Headphones",
    price: 59.99, originalPrice: 89.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    category: "Electronics", rating: 4.5, reviews: 128,
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    stock: 45,
  },
  {
    name: "Running Shoes",
    price: 79.99, originalPrice: 110.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    category: "Sports", rating: 4.2, reviews: 85,
    description: "Lightweight running shoes designed for comfort and performance.",
    stock: 30,
  },
  {
    name: "Smart Watch",
    price: 199.99, originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    category: "Electronics", rating: 4.7, reviews: 210,
    description: "Track your fitness, receive notifications, and more.",
    stock: 20,
  },
  {
    name: "Leather Backpack",
    price: 49.99, originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    category: "Accessories", rating: 4.3, reviews: 67,
    description: "Stylish and durable leather backpack for everyday use.",
    stock: 60,
  },
  {
    name: "Coffee Maker",
    price: 34.99, originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    category: "Kitchen", rating: 4.0, reviews: 44,
    description: "Brew perfect coffee every morning with this compact machine.",
    stock: 25,
  },
  {
    name: "Sunglasses",
    price: 24.99, originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    category: "Accessories", rating: 4.1, reviews: 33,
    description: "UV400 protected polarized sunglasses for style and safety.",
    stock: 80,
  },
  {
    name: "Yoga Mat",
    price: 29.99, originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1601925228008-f87a3b3c1d3f?w=400",
    category: "Sports", rating: 4.4, reviews: 92,
    description: "Non-slip premium yoga mat for all types of workouts.",
    stock: 40,
  },
  {
    name: "Desk Lamp",
    price: 19.99, originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Home", rating: 4.2, reviews: 55,
    description: "LED desk lamp with adjustable brightness and USB charging port.",
    stock: 35,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce');
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️ Cleared old products');

    await Product.insertMany(sampleProducts);
    console.log('✅ 8 products inserted!');

    mongoose.connection.close();
    console.log('✅ Done! Database seeded.');
  } catch (error) {
    console.log('❌ Error:', error);
  }
};

seedDatabase();