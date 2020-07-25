import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import SchedulingRepository from '../repositories/SchedulingRepository';
import CreateSchedulingService from '../services/CreateSchedulingService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const schedulingRouter = Router();
schedulingRouter.use(ensureAuthenticated);

schedulingRouter.get('/', async (req, res) => {
  const schedulingRepository = getCustomRepository(SchedulingRepository);
  const schedulings = await schedulingRepository.find();
  return res.json(schedulings);
});

schedulingRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);
    const createScheduling = new CreateSchedulingService();

    const scheduling = await createScheduling.execute({
      provider_id,
      date: parsedDate,
    });

    return res.json(scheduling);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default schedulingRouter;
