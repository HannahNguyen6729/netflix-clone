import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    genre: { type: String },
    type: { type: String },
    content: { type: Array },
  },
  { timestamps: true }
);

export default mongoose.model('List', ListSchema);
