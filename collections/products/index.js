import mongoose from 'mongoose';
import dbSchema from './db-schema.js';

// class ProductClass {
//     static saveProduct(payload) {
//         return this(payload).save();
//     }
//     static findOneByCondition(condition) {
//         return this.findOne({ ...condition, });
//     }
//     static findByCondition(condition) {
//         return this.find({ ...condition, });
//     }
//     static updateProduct(payload) {
//         const updateData = { $set: { ...payload, }, };
//         return this.findByIdAndUpdate(payload.productId, updateData, { new: true, });
//     }
// }
// dbSchema.loadClass(ProductClass);
const products = mongoose.model('products', dbSchema);
export default products;
