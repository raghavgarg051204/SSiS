import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  genre: { type: String },
  releaseYear: { type: Number },
  rating: { type: Number, default: 0 }
});

export default mongoose.model('Movie', MovieSchema);
