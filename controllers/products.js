import * as productServices from '../services/products.js';
import { message, statusCode } from '../uitilities/constants.js';
import { successAction, failAction } from '../uitilities/response.js';
import logger from '../uitilities/logger/index.js';

async function productList(req, res) {
  try {
    const data = await productServices.productList(req.query);
    res.status(statusCode.success).json(successAction(statusCode.success, data, message.fetch('Product')));
  } catch (err) {
    logger.error(err);
    res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
  }
}

async function productAdd(req, res) {
  try {
    const data = await productServices.productAdd(req.body);
    res.status(statusCode.success).json(successAction(statusCode.success, data, message.add('Product')));
  } catch (err) {
    logger.error(err);
    res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
  }
}

async function productUpdate(req, res) {
  try {
    const data = await productServices.productUpdate(req.params, req.body);
    res.status(statusCode.success).json(successAction(statusCode.success, data, message.update('Product')));
  } catch (err) {
    logger.error(err);
    res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
  }
}

async function productDelete(req, res) {
  try {
    const data = await productServices.productDelete(req.params);
    res.status(statusCode.success).json(successAction(statusCode.success, data, message.delete('Product')));
  } catch (err) {
    logger.error(err);
    res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
  }
}

export { productList, productAdd, productUpdate, productDelete };
