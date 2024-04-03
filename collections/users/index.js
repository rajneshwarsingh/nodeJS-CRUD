import mongoose from 'mongoose';
import dbSchema from './db-schema.js';

export default mongoose.model('users', dbSchema);
