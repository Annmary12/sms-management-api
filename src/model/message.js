import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: 'status'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Message = mongoose.model('message', messageSchema);

export default Message;
