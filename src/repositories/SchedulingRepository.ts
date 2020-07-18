import { isEqual } from 'date-fns';
import Scheduling from '../models/Scheduling';

interface CreateSchedulingDTO {
  provider: string;
  date: Date;
}

class SchedulingRepository {
  private scheduling: Scheduling[];

  constructor() {
    this.scheduling = [];
  }

  public create({ provider, date }: CreateSchedulingDTO): Scheduling {
    const scheduling = new Scheduling({ provider, date });

    this.scheduling.push(scheduling);

    return scheduling;
  }

  public all(): Scheduling[] {
    return this.scheduling;
  }

  public findByDate(date: Date): Scheduling | null {
    const findScheduling = this.scheduling.find(s => isEqual(date, s.date));
    return findScheduling || null;
  }
}

export default SchedulingRepository;
