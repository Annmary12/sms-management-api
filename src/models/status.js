import mongoose, { Schema } from 'mongoose';

const statusSchema = new Schema({
  name: {
    type: String,
    enum: ['Pending', 'Sent', 'Received']
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Status = mongoose.model('status', statusSchema);

export default Status;
