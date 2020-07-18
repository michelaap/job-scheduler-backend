import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import SchedulingRepository from '../repositories/SchedulingRepository';

const schedulingRouter = Router();
const schedulingRepository = new SchedulingRepository();

schedulingRouter.get('/', (req, res) => {
  const schedulings = schedulingRepository.all();
  return res.json(schedulings);
});

schedulingRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));
  const findSchedulingOnTheSameDate = schedulingRepository.findByDate(
    parsedDate,
  );

  if (findSchedulingOnTheSameDate) {
    return res.status(400).json({ message: 'This time already scheduled' });
  }

  const scheduling = schedulingRepository.create(provider, parsedDate);
  return res.json(scheduling);
});

export default schedulingRouter;
