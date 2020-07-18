import { startOfHour } from 'date-fns';

import Scheduling from '../models/Scheduling';
import SchedulingRepository from '../repositories/SchedulingRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateSchedulingService {
  private schedulingRepository: SchedulingRepository;

  constructor(schedulingRepository: SchedulingRepository) {
    this.schedulingRepository = schedulingRepository;
  }

  public execute({ provider, date }: Request): Scheduling {
    const schedulingDate = startOfHour(date);

    const findSchedulingOnTheSameDate = this.schedulingRepository.findByDate(
      schedulingDate,
    );

    if (findSchedulingOnTheSameDate) {
      throw Error('This time already scheduled');
    }

    const scheduling = this.schedulingRepository.create({
      provider,
      date: schedulingDate,
    });

    return scheduling;
  }
}

export default CreateSchedulingService;
