import { Router } from 'express';
import { uuid } from 'uuidv4';

const schedulingRouter = Router();

const scheduler = [];

schedulingRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const scheduling = {
    id: uuid(),
    provider,
    date,
  };

  scheduler.push(scheduling);

  return res.json(scheduling);
});

export default schedulingRouter;
