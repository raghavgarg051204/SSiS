import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  username: { type: String, required: true },
  movie: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true }
});

export default mongoose.model('Review', ReviewSchema);
