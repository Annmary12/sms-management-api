import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: false,
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Message = mongoose.model('message', messageSchema);

export default Message;
