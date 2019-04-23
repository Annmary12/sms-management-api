import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const contactSchema = new Schema({
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

// mongoose pagination plugin
contactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model('contact', contactSchema);

export default Contact;
