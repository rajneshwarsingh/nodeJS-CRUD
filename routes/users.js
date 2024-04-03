import express from 'express';
import * as user from '../controllers/users.js';
import validationMiddleware from '../validators/joi.validator.js';
import checkAuthToken from '../uitilities/auth.js';
const router = express.Router();

/* User CRUD */
router.get('/', (req, res, next) => validationMiddleware(req, res, next, 'listing'), checkAuthToken, user.userList);
router.put('/:id', (req, res, next) => validationMiddleware(req, res, next, 'user'), checkAuthToken, user.userUpdate);
router.delete('/:id', checkAuthToken, user.userDelete);

router.post('/login', (req, res, next) => validationMiddleware(req, res, next, 'login'), user.login);
router.post('/signup', (req, res, next) => validationMiddleware(req, res, next, 'user'), user.signup);

export default router;
