import mongoose, { Schema } from 'mongoose';

let contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    unique: true,
    required: true
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Contact = mongoose.model('contact', contactSchema);

export default Contact;
