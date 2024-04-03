/*
 * @file: common.js
 * @description: It contain auth functions.
 * @author: Rajneshwar Singh
 */

import jwt from 'jsonwebtoken';
import authentications from '../collections/authentications/index.js';
import users from '../collections/users/index.js';
import { message, statusCode } from '../uitilities/constants.js';
import { failAction } from '../uitilities/response.js';

/* Environment */
import 'dotenv/config';
import config from '../config/default.js';
const env = config[process.env.NODE_ENV || 'staging'];
const jwtSecret = env.jwt.secret;

async function checkAuthToken(req, res, next) {
  if (req.headers.authorization) {
    await jwt.verify(req.headers.authorization, jwtSecret, async function (err, decoded) {
      if (err) {
        if (err.message === 'jwt expired') {
          res.status(statusCode.tokenExpired).json(failAction(statusCode.tokenExpired, message.tokenExpired, message.tokenExpired));
        } else {
          res.status(statusCode.tokenExpired).json(failAction(statusCode.tokenExpired, err.message, message.tokenExpired));
        }
      } else {
        const authentication = await authentications.findOne({
          userId: decoded.userId,
          token: req.headers.authorization,
        });
        if (authentication) {
          req.user = await users.findOne({ _id: authentication.userId }, { name: 1, age: 1, email: 1 });
          next();
        } else {
          res.status(statusCode.tokenExpired).json(failAction(statusCode.tokenExpired, message.tokenExpired, message.tokenExpired));
        }
      }
    });
  } else {
    res.status(statusCode.authTokenRequired).json(failAction(statusCode.authTokenRequired, message.tokenRequried, message.tokenRequried));
  }
}

export default checkAuthToken;
