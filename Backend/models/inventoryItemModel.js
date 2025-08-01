import mongoose from 'mongoose';

const productSaleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  product_id: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  sold_at: {
    type: Date,
    required: true
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  product_category: {
    type: String,
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  product_brand: {
    type: String,
    required: true
  },
  product_retail_price: {
    type: Number,
    required: true,
    min: 0
  },
  product_department: {
    type: String,
    required: true
  },
  product_sku: {
    type: String,
    required: true
  },
  product_distribution_center_id: {
    type: Number,
    required: true
  }
});

const Inventory = mongoose.model('InventoryItem', productSaleSchema);
export default Inventory;
