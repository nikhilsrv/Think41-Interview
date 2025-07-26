import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
    unique: true
  },
  user_id: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Cancelled', 'Pending', 'Shipped', 'Delivered', 'Returned'],
    required: true
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'Other'],
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  returned_at: {
    type: Date,
    default: null
  },
  shipped_at: {
    type: Date,
    default: null
  },
  delivered_at: {
    type: Date,
    default: null
  },
  num_of_item: {
    type: Number,
    required: true,
    min: 1
  }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
