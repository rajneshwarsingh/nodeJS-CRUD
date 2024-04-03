import express from 'express';
import * as product from '../controllers/products.js';
import validationMiddleware from '../validators/joi.validator.js';
import checkAuthToken from '../uitilities/auth.js';
const router = express.Router();

/* Product CRUD */
router.get('/', (req, res, next) => validationMiddleware(req, res, next, 'listing'), checkAuthToken, product.productList);
router.post('/', (req, res, next) => validationMiddleware(req, res, next, 'product'), checkAuthToken, product.productAdd);
router.put('/:id', (req, res, next) => validationMiddleware(req, res, next, 'product'), checkAuthToken, product.productUpdate);
router.delete('/:id', checkAuthToken, product.productDelete);

export default router;
