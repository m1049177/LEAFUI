export const enum TechnologyType {
  CLIENT = 'CLIENT',
  SERVER = 'SERVER',
  CLOUD = 'CLOUD',
  DATABASE = 'DATABASE',
  STORAGE = 'STORAGE',
  MIDDLEWARE = 'MIDDLEWARE'
}

export interface ITechnologyStack {
  id?: number;
  name?: string;
  type?: string;
}

export class TechnologyStack implements ITechnologyStack {
  constructor(public id?: number, public name?: string, public type?: string) {}
}
