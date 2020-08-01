import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return res.json({ user, token });
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
});

export default sessionRouter;
