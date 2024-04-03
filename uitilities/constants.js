/*
 * @file: constants.js
 * @description: It contain constants.
 * @author: Rajneshwar Singh
 */

export const message = {
  somethingWrong: 'Something went wrong',
  tokenRequried: 'Auth token is requried.',
  tokenExpired: 'Session expired, please login again.',
  login: 'Login successfully',

  invalidlogin: 'Invalid login credentials. Please check and try again.',
  add: (labal) => {
    return `${labal} added successfully.`;
  },
  fetch: (labal) => {
    return `${labal} fetched successfully.`;
  },
  update: (labal) => {
    return `${labal} updated successfully.`;
  },
  delete: (labal) => {
    return `${labal} deleted successfully.`;
  },
  notExist: (labal) => {
    return `${lable} not exist`;
  },
};

export const statusCode = {
  success: 200,
  badRequest: 400,
  serverError: 501,
  forbidden: 203,
  notFound: 204,
  notAllowed: 205,
  tokenExpired: 401,
  emailOrUserExist: 207,
  wrongPassword: 208,
  accountDeactivated: 209,
  authTokenRequired: 499,
  unauthorized: 403,
};
