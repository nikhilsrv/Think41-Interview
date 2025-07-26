import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  order_id: {
    type: Number,
    required: true
  },
  user_id: {
    type: Number,
    required: true
  },
  product_id: {
    type: Number,
    required: true
  },
  inventory_item_id: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Cancelled', 'Pending', 'Shipped', 'Delivered', 'Returned'],
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  shipped_at: {
    type: Date,
    default: null
  },
  delivered_at: {
    type: Date,
    default: null
  },
  returned_at: {
    type: Date,
    default: null
  },
  sale_price: {
    type: Number,
    required: true,
    min: 0
  }
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
export default OrderItem;
