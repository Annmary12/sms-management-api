import mongoose, { Schema } from 'mongoose';

let messageSchema = new Schema({
  receiver: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Message = mongoose.model('message', messageSchema);

export default Message;
