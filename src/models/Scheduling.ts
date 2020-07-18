import { uuid } from 'uuidv4';

class Scheduling {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Scheduling, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Scheduling;
