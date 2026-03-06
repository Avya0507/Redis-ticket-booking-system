const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/productDB')
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});