import { Router, response } from 'express';
import { parseISO } from 'date-fns';

import SchedulingRepository from '../repositories/SchedulingRepository';
import CreateSchedulingService from '../services/CreateSchedulingService';

const schedulingRouter = Router();
const schedulingRepository = new SchedulingRepository();

schedulingRouter.get('/', (req, res) => {
  const schedulings = schedulingRepository.all();
  return res.json(schedulings);
});

schedulingRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);
    const createScheduling = new CreateSchedulingService(schedulingRepository);
    const scheduling = createScheduling.execute({ provider, date: parsedDate });

    return res.json(scheduling);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default schedulingRouter;
