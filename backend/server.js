require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error('Missing MONGO_URI. Copy .env.example to .env and fill your Atlas URI.');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error.message));

app.get('/', (req, res) => {
  res.json({ message: 'Accessories API is running' });
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product id' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, price, image, category, description } = req.body;
    const product = await Product.create({
      name,
      price,
      image,
      category,
      description,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
