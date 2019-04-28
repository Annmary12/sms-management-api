import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

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
  read: {
    type: String,
    default: false,
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// mongoose pagination plugin
messageSchema.plugin(mongoosePaginate);

const Message = mongoose.model('message', messageSchema);

export default Message;
