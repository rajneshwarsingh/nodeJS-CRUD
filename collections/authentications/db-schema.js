import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  authToken: {
    type: String,
    required: true,
  },
  expiresIn: {
    type: String,
    required: true,
  },
});

export default authSchema;
