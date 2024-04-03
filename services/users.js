import users from '../collections/users/index.js';
import authentications from '../collections/authentications/index.js';
import { hashPassword, comparePassword } from '../uitilities/common.js';
import logger from '../uitilities/logger/index.js';
import jwt from 'jsonwebtoken';

/* Environment */
import config from '../config/default.js';
const env = config[process.env.NODE_ENV || 'staging'];

const jwtSecret = env.jwt.secret;

async function userList(query) {
  try {
    const sort = {};
    sort[query.sortBy] = parseInt(query.sort);
    const startIndex = (parseInt(query.page) - 1) * parseInt(query.limit);
    const limit = parseInt(query.limit);
    return await users.find({}).skip(startIndex).limit(limit).sort(sort);
  } catch (err) {
    logger.error(err);
    throw new Error(err.message);
  }
}

async function signup(body) {
  try {
    const password = await hashPassword(body.password);
    const newUser = new users({
      name: body.name,
      age: body.age,
      email: body.email,
      password,
    });
    return await newUser.save();
  } catch (err) {
    logger.error(err);
    throw new Error(err.message);
  }
}

async function userUpdate(params, body) {
  try {
    return await users.updateOne({ _id: params.id }, { $set: body });
  } catch (err) {
    logger.error(err);
    throw new Error(err.message);
  }
}

async function userDelete(params) {
  try {
    return await users.deleteOne({ _id: params.id });
  } catch (err) {
    logger.error(err);
    throw new Error(err.message);
  }
}

async function login(body) {
  try {
    const user = await users.findOne({ email: body.email }).lean();
    if (user && (await comparePassword(body.password, user.password)) == true) {
      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: 60 * 60,
      });
      user['token'] = token;
      const authentication = new authentications({
        userId: user._id,
        authToken: token,
        expiresIn: 60 * 60,
      });
      await authentication.save();
      return user;
    } else {
      return 'notExist';
    }
  } catch (err) {
    logger.error(err);
    throw new Error(err.message);
  }
}

export { userList, signup, userUpdate, userDelete, login };
