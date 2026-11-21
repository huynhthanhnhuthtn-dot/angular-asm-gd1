require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'),
);

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error('Missing MONGO_URI. Copy .env.example to .env and fill your Atlas URI.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
  } catch (error) {
    console.error(error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
