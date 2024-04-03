import * as userServices from '../services/users.js';
import { message, statusCode } from '../uitilities/constants.js';
import { successAction, failAction } from '../uitilities/response.js';
import logger from '../uitilities/logger/index.js';

async function userList(req, res) {
  try {
    const data = await userServices.userList(req.body);
    res.status(statusCode.success).json(successAction(statusCode.success, data, message.fetch('User')));
  } catch (err) {
    logger.error(err);
    res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
  }
}

async function signup(req, res) {
  try {
    const data = await userServices.signup(req.body);
    res.status(statusCode.success).json(successAction(statusCode.success, data, message.add('User')));
  } catch (err) {
    logger.error(err);
    res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
  }
}

async function userUpdate(req, res) {
  try {
    const data = await userServices.userUpdate(req.params, req.body);
    res.status(statusCode.success).json(successAction(statusCode.success, data, message.update('User')));
  } catch (err) {
    logger.error(err);
    res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
  }
}

async function userDelete(req, res) {
  try {
    const data = await userServices.userDelete(req.params);
    res.status(statusCode.success).json(successAction(statusCode.success, data, message.delete('User')));
  } catch (err) {
    logger.error(err);
    res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
  }
}

async function login(req, res) {
  try {
    const data = await userServices.login(req.body);
    if (data == 'notExist') {
      res.status(statusCode.wrongPassword).json(successAction(statusCode.wrongPassword, data, message.notExist('User')));
    } else if (Object.keys(data).length === 0) {
      res.status(statusCode.wrongPassword).json(successAction(statusCode.wrongPassword, data, message.invalidlogin));
    } else {
      res.status(statusCode.success).json(successAction(statusCode.success, data, message.login));
    }
  } catch (err) {
    logger.error(err);
    res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
  }
}

export { userList, signup, userUpdate, userDelete, login };
