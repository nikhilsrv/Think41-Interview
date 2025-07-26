import mongoose from 'mongoose';

const distributionCenterSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

const DistributionCenter = mongoose.model('DistributionCenter', distributionCenterSchema);
export default DistributionCenter;
