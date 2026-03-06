const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

// Example of a custom instance method
productSchema.methods.getInfo = function() {
    return `${this.name} - $${this.price} (${this.category})`;
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;